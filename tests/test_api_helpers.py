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

    @patch.dict(os.environ, {'LAST_FM_KEY': 'test-key'}, clear=True)
    @patch('api_helpers.time.time', return_value=2_000_000_000)
    @patch('api_helpers.requests.get')
    def test_aggregates_recent_scrobbles_when_chart_is_empty(
        self, mock_get, mock_time
    ):
        empty_chart = Mock(status_code=200)
        empty_chart.json.return_value = {'toptracks': {'track': []}}
        recent_page = Mock(status_code=200)
        recent_page.json.return_value = {
            'recenttracks': {
                'track': [
                    {'name': 'Song B', 'artist': {'#text': 'Artist B'}},
                    {'name': 'Song A', 'artist': {'#text': 'Artist A'}},
                    {'name': 'Song B', 'artist': {'#text': 'Artist B'}},
                    {
                        'name': 'Still Playing',
                        'artist': {'#text': 'Artist C'},
                        '@attr': {'nowplaying': 'true'},
                    },
                ],
                '@attr': {'totalPages': '1'},
            }
        }
        mock_get.side_effect = [empty_chart, recent_page]

        songs = get_lastfm_top_tracks(2)

        self.assertEqual(
            songs,
            [['Song B', 'Artist B'], ['Song A', 'Artist A']],
        )
        recent_params = mock_get.call_args_list[1].kwargs['params']
        self.assertEqual(recent_params['method'], 'user.getrecenttracks')
        self.assertEqual(recent_params['from'], 2_000_000_000 - 604_800)
        self.assertEqual(mock_time.call_count, 1)

    @patch.dict(os.environ, {'LAST_FM_KEY': 'test-key'}, clear=True)
    @patch('api_helpers.requests.get')
    def test_uses_latest_nonempty_week_when_recent_history_is_empty(
        self, mock_get
    ):
        payloads = [
            {'toptracks': {'track': []}},
            {'recenttracks': {'track': [], '@attr': {'totalPages': '1'}}},
            {
                'weeklychartlist': {
                    'chart': [
                        {'from': '100', 'to': '199'},
                        {'from': '200', 'to': '299'},
                    ]
                }
            },
            {'weeklytrackchart': {'track': []}},
            {
                'weeklytrackchart': {
                    'track': [
                        {'name': 'Older Song', 'artist': {'#text': 'Older Artist'}}
                    ]
                }
            },
        ]
        responses = []
        for payload in payloads:
            response = Mock(status_code=200)
            response.json.return_value = payload
            responses.append(response)
        mock_get.side_effect = responses

        songs = get_lastfm_top_tracks(10)

        self.assertEqual(songs, [['Older Song', 'Older Artist']])
        requested_methods = [
            call.kwargs['params']['method'] for call in mock_get.call_args_list
        ]
        self.assertEqual(
            requested_methods,
            [
                'user.gettoptracks',
                'user.getrecenttracks',
                'user.getweeklychartlist',
                'user.getweeklytrackchart',
                'user.getweeklytrackchart',
            ],
        )
        self.assertEqual(mock_get.call_args_list[3].kwargs['params']['from'], '200')
        self.assertEqual(mock_get.call_args_list[4].kwargs['params']['from'], '100')

    @patch.dict(os.environ, {}, clear=True)
    def test_raises_when_api_key_is_missing(self):
        with self.assertRaisesRegex(RuntimeError, 'LAST_FM_KEY'):
            get_lastfm_top_tracks()


if __name__ == '__main__':
    unittest.main()
