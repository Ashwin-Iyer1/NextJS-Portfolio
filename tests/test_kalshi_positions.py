import unittest
from decimal import Decimal
from unittest.mock import patch

from kalshi import process_holdings_with_series_info
from kalshi_tracker import insert_positions_bulk


class KalshiPositionProcessingTests(unittest.TestCase):
    @patch("kalshi.get_series_info")
    @patch("kalshi.get_market_info")
    def test_processes_current_fixed_point_position_schema(
        self, get_market_info, get_series_info
    ):
        get_series_info.return_value = {
            "series": {"title": "Test Series", "category": "Test"}
        }
        get_market_info.return_value = {
            "market": {
                "event_ticker": "KXTEST-26SEP12",
                "title": "Will the test pass?",
                "subtitle": "Test market",
                "yes_sub_title": "Yes",
                "no_sub_title": "No",
                "last_price_dollars": "0.6000",
            }
        }
        holdings = {
            "market_positions": [
                {
                    "ticker": "KXTEST-26SEP12-PASS",
                    "position_fp": "-2.50",
                    "market_exposure_dollars": "0.7500",
                    "realized_pnl_dollars": "0.1000",
                    "fees_paid_dollars": "0.0200",
                }
            ]
        }

        positions = process_holdings_with_series_info(holdings)

        self.assertEqual(len(positions), 1)
        position = positions[0]
        self.assertEqual(position["event_ticker"], "KXTEST-26SEP12")
        self.assertEqual(position["signed_open_position"], Decimal("-2.50"))
        self.assertEqual(position["total_absolute_position"], Decimal("2.50"))
        self.assertEqual(position["current_price"], Decimal("60.0000"))
        self.assertEqual(position["purchase_price"], Decimal("70"))
        self.assertEqual(position["pnl"], Decimal("33.000000"))
        self.assertEqual(position["fees_paid"], Decimal("2.0000"))

    @patch("kalshi.get_series_info")
    @patch("kalshi.get_market_info")
    def test_retains_legacy_integer_field_support(
        self, get_market_info, get_series_info
    ):
        get_series_info.return_value = None
        get_market_info.return_value = {
            "market": {"last_price": 55, "title": "Legacy market"}
        }
        holdings = {
            "market_positions": [
                {
                    "ticker": "KXLEGACY-26SEP12-YES",
                    "position": 3,
                    "market_exposure": 120,
                    "realized_pnl": 5,
                    "fees_paid": 1,
                }
            ]
        }

        position = process_holdings_with_series_info(holdings)[0]

        self.assertEqual(position["signed_open_position"], Decimal("3"))
        self.assertEqual(position["current_price"], Decimal("55"))
        self.assertEqual(position["purchase_price"], Decimal("40"))
        self.assertEqual(position["pnl"], Decimal("49"))

    @patch("kalshi.get_series_info")
    @patch("kalshi.get_market_info")
    def test_skips_zero_fixed_point_positions(
        self, get_market_info, get_series_info
    ):
        holdings = {
            "market_positions": [
                {"ticker": "KXTEST-26SEP12-CLOSED", "position_fp": "0.00"}
            ]
        }

        self.assertEqual(process_holdings_with_series_info(holdings), [])
        get_market_info.assert_not_called()
        get_series_info.assert_not_called()

    def test_empty_bulk_insert_is_a_successful_noop(self):
        self.assertTrue(insert_positions_bulk([]))


if __name__ == "__main__":
    unittest.main()
