import os
import secrets
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlencode, urlparse

import requests

from token_manager import TokenManager

CLIENT_ID = os.getenv("OURA_CLIENT_ID")
CLIENT_SECRET = os.getenv("OURA_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8000/callback"
OAUTH_STATE = secrets.token_urlsafe(32)


class OAuthHandler(BaseHTTPRequestHandler):
    def _respond(self, status, body):
        self.send_response(status)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(body.encode("utf-8"))

    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == "/callback":
            query_params = parse_qs(parsed_path.query)
            if query_params.get("state", [None])[0] != OAUTH_STATE:
                self._respond(400, "<h1>Authorization Failed</h1><p>Invalid OAuth state.</p>")
            elif "code" in query_params:
                code = query_params["code"][0]
                if exchange_code_for_token(code):
                    self.server.authorization_succeeded = True
                    self._respond(
                        200,
                        "<h1>Authorization Successful!</h1>"
                        "<p>You can close this window.</p>",
                    )
                else:
                    self._respond(
                        500,
                        "<h1>Authorization Failed</h1>"
                        "<p>Check the setup command output for details.</p>",
                    )
            else:
                self._respond(400, "<h1>Authorization Failed</h1><p>No code found.</p>")
        else:
            self._respond(404, "Not Found")


def exchange_code_for_token(code):
    print("\n🔄 Exchanging authorization code for access tokens...")
    url = "https://api.ouraring.com/oauth/token"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI, 
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    
    try:
        response = requests.post(
            url,
            data=data,
            headers={"Accept": "application/json"},
            timeout=20,
        )
        response.raise_for_status()
        tokens = response.json()
    except (requests.RequestException, ValueError) as exc:
        print(f"❌ Oura token exchange failed: {exc}")
        return False

    print("✅ Tokens received!")
    if not save_tokens(tokens):
        print("❌ Tokens were received but could not be saved to the database.")
        return False

    print("✅ Tokens saved via TokenManager (Database)")
    print("\n🎉 Setup complete! You can now run the fetcher.")
    return True

def save_tokens(tokens):
    """Save tokens using TokenManager."""
    return TokenManager("oura").save_tokens(tokens)

def main():
    print("--- Oura OAuth2 Setup ---")

    if not CLIENT_ID or not CLIENT_SECRET:
        print("❌ Error: OURA_CLIENT_ID and OURA_CLIENT_SECRET are required.")
        return 1

    auth_url = "https://cloud.ouraring.com/oauth/authorize?" + urlencode({
        "response_type": "code",
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": (
            "email personal daily heartrate workout tag session spo2 "
            "stress heart_health"
        ),
        "state": OAUTH_STATE,
    })
    
    print(f"\n1. Opening browser to: {auth_url}")
    webbrowser.open(auth_url)
    
    print("\n2. Waiting for callback on http://localhost:8000/callback ...")
    server_address = ('127.0.0.1', 8000)
    httpd = HTTPServer(server_address, OAuthHandler)
    httpd.authorization_succeeded = False
    httpd.handle_request()
    return 0 if httpd.authorization_succeeded else 1

if __name__ == "__main__":
    raise SystemExit(main())
