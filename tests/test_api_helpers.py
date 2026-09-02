import os
import unittest
from unittest.mock import Mock, patch

from api_helpers import get_lastfm_top_tracks


class LastFmTopTracksTests(unittest.TestCase):
    @patch.dict(os.environ, {'LAST_FM_KEY': 'test-key'}, clear=True)
    @patch('api_helpers.requests.get')
    def test_fetches_rolling_seven_day_top_tracks(self, mock_get):
        response = Mock(status_code=200)
        response.json.return_value = {
            'toptracks': {
                'track': [
                    {'name': 'Track One', 'artist': {'name': 'Artist One'}},
                    {'name': 'Track Two', 'artist': {'name': 'Artist Two'}},
                ]
            }
        }
        mock_get.return_value = response

        songs = get_lastfm_top_tracks(2)

        self.assertEqual(
            songs,
            [['Track One', 'Artist One'], ['Track Two', 'Artist Two']],
        )
        _, kwargs = mock_get.call_args
        self.assertEqual(kwargs['params']['method'], 'user.gettoptracks')
        self.assertEqual(kwargs['params']['period'], '7day')
        self.assertEqual(kwargs['params']['limit'], 2)
        self.assertEqual(kwargs['timeout'], 20)

    @patch.dict(os.environ, {'LAST_FM_KEY': 'test-key'}, clear=True)
    @patch('api_helpers.requests.get')
    def test_raises_for_api_error_hidden_in_json(self, mock_get):
        response = Mock(status_code=200)
        response.json.return_value = {
            'error': 26,
            'message': 'Suspended API key',
        }
        mock_get.return_value = response

        with self.assertRaisesRegex(RuntimeError, 'Last.fm API error 26'):
            get_lastfm_top_tracks()

    @patch.dict(os.environ, {}, clear=True)
    def test_raises_when_api_key_is_missing(self):
        with self.assertRaisesRegex(RuntimeError, 'LAST_FM_KEY'):
            get_lastfm_top_tracks()


if __name__ == '__main__':
    unittest.main()
