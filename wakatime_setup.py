import os
import webbrowser
import json
import requests
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from dotenv import load_dotenv

# Load environment variables
# load_dotenv()

CLIENT_ID = os.getenv("WAKA_CLIENT_ID")
CLIENT_SECRET = os.getenv("WAKA_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8000/callback"
TOKEN_FILE = "wakatime_tokens.json"

class OAuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == "/callback":
            query_params = parse_qs(parsed_path.query)
            if "code" in query_params:
                code = query_params["code"][0]
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(b"<h1>Authorization Successful!</h1><p>You can close this window and check your terminal.</p>")
                
                # Exchange code for token
                exchange_code_for_token(code)
            else:
                self.send_response(400)
                self.wfile.write(b"<h1>Authorization Failed!</h1><p>No code found.</p>")
        else:
            self.send_response(404)
            self.wfile.write(b"Not Found")

def exchange_code_for_token(code):
    print("\n🔄 Exchanging authorization code for access tokens...")
    url = "https://wakatime.com/oauth/token"
    # WakaTime expects data as form-urlencoded
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI, 
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Portfolio/1.0'
    }
    
    try:
        response = requests.post(url, data=data, headers=headers)
        
        # Always print text if not 200 to debug
        if response.status_code != 200:
            print(f"❌ Failed to exchange token: {response.status_code} - {response.text}")
            os._exit(1)

        try:
            tokens = response.json()
            print("✅ Tokens received!")
            save_tokens(tokens)
            print(f"✅ Tokens saved to {TOKEN_FILE}")
            
            # Print the tokens compactly so user can copy to env if needed
            print(f"\n[OPTIONAL] You can set this as WAKA_TOKENS_JSON in your env:\n{json.dumps(tokens)}")
            
            print("\n🎉 Setup complete! You can now run the fetcher.")
            os._exit(0)
        except Exception as json_err:
            print(f"❌ Error parsing JSON: {json_err}")
            print(f"RAW RESPONSE: {response.text}")
            os._exit(1)
    except Exception as e:
        print(f"❌ Error during token exchange: {e}")
        os._exit(1)

def save_tokens(tokens):
    with open(TOKEN_FILE, "w") as f:
        json.dump(tokens, f, indent=4)

def main():
    print("--- WakaTime OAuth2 Setup ---")
    
    if not CLIENT_ID or not CLIENT_SECRET:
        print("❌ Error: WAKA_CLIENT_ID or WAKA_CLIENT_SECRET not found in .env file.")
        print("Please add them to your .env file and run this script again.")
        return

    # Construct Authorization URL
    # https://wakatime.com/oauth/authorize?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope={scope}
    # Scopes: email, read_logged_time, read_stats
    scopes = "email,read_logged_time,read_stats"
    auth_url = (
        f"https://wakatime.com/oauth/authorize?"
        f"response_type=code&client_id={CLIENT_ID}&"
        f"redirect_uri={REDIRECT_URI}&scope={scopes}&state=setup"
    )
    
    print(f"\n1. Opening browser to: {auth_url}")
    webbrowser.open(auth_url)
    
    print("\n2. Waiting for callback on http://localhost:8000/callback ...")
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, OAuthHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
