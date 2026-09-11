import io
import unittest
from contextlib import redirect_stdout
from unittest.mock import Mock, patch

from oura_fetcher import OuraClient
from token_manager import TokenManager
from wakatime_client import WakaTimeClient


class OuraClientTests(unittest.TestCase):
    @patch("oura_fetcher.TokenManager")
    def test_heart_rate_fetches_every_page(self, token_manager_cls):
        token_manager_cls.return_value.load_tokens.return_value = {
            "access_token": "valid-token",
            "refresh_token": "valid-refresh",
        }

        first_page = Mock(status_code=200)
        first_page.json.return_value = {
            "data": [{"timestamp": "2026-01-01T00:00:00Z"}],
            "next_token": "page-two",
        }
        second_page = Mock(status_code=200)
        second_page.json.return_value = {
            "data": [{"timestamp": "2026-01-01T00:05:00Z"}],
            "next_token": None,
        }

        client = OuraClient("client-id", "client-secret")
        client.session.get = Mock(side_effect=[first_page, second_page])

        result = client.get_heart_rate(
            "2026-01-01T00:00:00",
            "2026-01-01T23:59:59",
        )

        self.assertEqual(len(result["data"]), 2)
        self.assertNotIn("next_token", client.session.get.call_args_list[0].kwargs["params"])
        self.assertEqual(
            client.session.get.call_args_list[1].kwargs["params"]["next_token"],
            "page-two",
        )

    @patch("oura_fetcher.requests.post")
    @patch("oura_fetcher.TokenManager")
    def test_scope_denial_does_not_refresh_or_block_other_endpoints(
        self,
        token_manager_cls,
        post,
    ):
        token_manager_cls.return_value.load_tokens.return_value = {
            "access_token": "valid-token",
            "refresh_token": "valid-refresh",
        }

        client = OuraClient("client-id", "client-secret")
        scope_denied = Mock(status_code=401)
        scope_denied.json.return_value = {
            "detail": "Token is not authorized access stress scope."
        }
        successful = Mock(status_code=200)
        successful.json.return_value = {"data": [{"day": "2026-01-01"}]}
        client.session.get = Mock(side_effect=[scope_denied, successful])

        output = io.StringIO()
        with redirect_stdout(output):
            self.assertEqual(
                client.get_daily_resilience("2026-01-01", "2026-01-02"),
                {},
            )
            result = client.get_daily_activity("2026-01-01", "2026-01-02")

        self.assertEqual(result, {"data": [{"day": "2026-01-01"}]})
        self.assertIsNone(client.auth_error)
        self.assertEqual(
            client.scope_errors,
            {
                "/usercollection/daily_resilience": (
                    "Token is not authorized access stress scope."
                )
            },
        )
        post.assert_not_called()
        self.assertIn("stress scope", output.getvalue())

    @patch("oura_fetcher.requests.post")
    @patch("oura_fetcher.TokenManager")
    def test_failed_refresh_is_attempted_only_once(self, token_manager_cls, post):
        tokens = {"access_token": "expired", "refresh_token": "already-used"}
        token_manager = token_manager_cls.return_value
        token_manager.load_tokens.side_effect = [tokens, tokens]

        refresh_response = Mock(status_code=400)
        post.return_value = refresh_response

        client = OuraClient("client-id", "client-secret")
        unauthorized = Mock(status_code=401)
        client.session.get = Mock(return_value=unauthorized)

        output = io.StringIO()
        with redirect_stdout(output):
            self.assertEqual(client.get_daily_activity("2026-01-01", "2026-01-02"), {})
            self.assertEqual(client.get_daily_sleep("2026-01-01", "2026-01-02"), {})

        self.assertEqual(post.call_count, 1)
        self.assertEqual(client.session.get.call_count, 1)
        self.assertIn("run `python3 oura_setup.py`", output.getvalue())

    @patch("oura_fetcher.requests.post")
    @patch("oura_fetcher.TokenManager")
    def test_refresh_persists_rotated_refresh_token(self, token_manager_cls, post):
        old_tokens = {
            "access_token": "expired",
            "refresh_token": "old-refresh",
            "scope": "daily",
        }
        token_manager = token_manager_cls.return_value
        token_manager.load_tokens.return_value = old_tokens
        token_manager.save_tokens.return_value = True

        refresh_response = Mock(status_code=200)
        refresh_response.json.return_value = {
            "access_token": "new-access",
            "refresh_token": "new-refresh",
            "expires_in": 86400,
        }
        post.return_value = refresh_response

        client = OuraClient("client-id", "client-secret")
        client._refresh_token()

        saved_tokens = token_manager.save_tokens.call_args.args[0]
        self.assertEqual(saved_tokens["access_token"], "new-access")
        self.assertEqual(saved_tokens["refresh_token"], "new-refresh")
        self.assertEqual(saved_tokens["scope"], "daily")


class WakaTimeClientTests(unittest.TestCase):
    @patch("wakatime_client.TokenManager")
    def test_missing_stats_scope_has_reauthorization_instruction(self, token_manager_cls):
        token_manager = token_manager_cls.return_value
        token_manager.load_tokens.return_value = {
            "access_token": "token-with-old-scopes",
            "refresh_token": "refresh-token",
        }

        client = WakaTimeClient("client-id", "client-secret")
        forbidden = Mock(
            status_code=403,
            text='{"error": "This resource requires scopes: read_stats."}',
        )
        client.session.get = Mock(return_value=forbidden)

        output = io.StringIO()
        with redirect_stdout(output):
            self.assertIsNone(client.get_stats())

        self.assertIn("read_stats", client.last_error)
        self.assertIn("python3 wakatime_setup.py", output.getvalue())


class TokenManagerTests(unittest.TestCase):
    @patch("token_manager.execute_query")
    def test_save_reports_database_success(self, execute_query):
        manager = TokenManager("service")

        self.assertTrue(manager.save_tokens({"access_token": "secret"}))
        self.assertEqual(execute_query.call_count, 2)

    @patch("token_manager.execute_query")
    def test_save_reports_database_failure(self, execute_query):
        execute_query.side_effect = [None, RuntimeError("database unavailable")]
        manager = TokenManager("service")

        self.assertFalse(manager.save_tokens({"access_token": "secret"}))


if __name__ == "__main__":
    unittest.main()
