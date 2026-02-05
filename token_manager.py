import json
import os
from typing import Dict, Any, Optional
from db_helpers import execute_query

class TokenManager:
    """Manages API tokens with persistence in Database and fallbacks to ENV/File."""
    
    TABLE_NAME = "api_tokens"

    @staticmethod
    def ensure_table_exists():
        """Create the api_tokens table if it doesn't exist."""
        query = f"""
        CREATE TABLE IF NOT EXISTS {TokenManager.TABLE_NAME} (
            service_name VARCHAR(50) PRIMARY KEY,
            tokens JSONB NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        try:
            execute_query(query)
            # print(f"✅ Table '{TokenManager.TABLE_NAME}' verified/created.")
            return True
        except Exception as e:
            print(f"❌ Error creating table '{TokenManager.TABLE_NAME}': {e}")
            return False

    def __init__(self, service_name: str, default_token_file: str):
        self.service_name = service_name
        self.token_file = default_token_file
        self.ensure_table_exists()

    def load_tokens(self) -> Dict[str, Any]:
        """
        Load tokens using the following priority:
        1. Environment Variable (SERVICE_TOKENS_JSON)
        2. Database (api_tokens table)
        3. Local JSON file (fallback/dev)
        """
        # 1. Try Environment Variable
        env_key = f"{self.service_name.upper()}_TOKENS_JSON"
        env_val = os.getenv(env_key)
        if env_val:
            try:
                tokens = json.loads(env_val)
                print(f"✅ [{self.service_name}] Loaded tokens from ENV: {env_key}")
                return tokens
            except json.JSONDecodeError:
                print(f"❌ [{self.service_name}] Error: {env_key} is not valid JSON.")

        # 2. Try Database
        query = f"SELECT tokens FROM {TokenManager.TABLE_NAME} WHERE service_name = %s"
        try:
            result = execute_query(query, (self.service_name,), fetch_one=True, use_dict=True)
            if result and result.get('tokens'):
                print(f"✅ [{self.service_name}] Loaded tokens from Database.")
                return result['tokens']
        except Exception as e:
            print(f"❌ [{self.service_name}] Error loading tokens from DB: {e}")

        # 3. Try Local File
        if os.path.exists(self.token_file):
            try:
                with open(self.token_file, 'r') as f:
                    tokens = json.load(f)
                print(f"✅ [{self.service_name}] Loaded tokens from {self.token_file}.")
                return tokens
            except json.JSONDecodeError:
                print(f"❌ [{self.service_name}] Error: {self.token_file} is corrupted.")
        
        print(f"⚠️ [{self.service_name}] No tokens found in ENV, DB, or File.")
        return {}

    def save_tokens(self, tokens: Dict[str, Any]):
        """Save tokens to Database and Local File."""
        if not tokens:
            return

        # 1. Save to Database
        query = f"""
        INSERT INTO {TokenManager.TABLE_NAME} (service_name, tokens, updated_at)
        VALUES (%s, %s, CURRENT_TIMESTAMP)
        ON CONFLICT (service_name)
        DO UPDATE SET 
            tokens = EXCLUDED.tokens,
            updated_at = EXCLUDED.updated_at;
        """
        try:
            execute_query(query, (self.service_name, json.dumps(tokens)))
            print(f"💾 [{self.service_name}] Saved tokens to Database.")
        except Exception as e:
            print(f"❌ [{self.service_name}] Error saving tokens to DB: {e}")

        # 2. Save to Local File (for redundancy/dev)
        try:
            with open(self.token_file, 'w') as f:
                json.dump(tokens, f, indent=4)
        except Exception as e:
            print(f"⚠️ [{self.service_name}] Error saving tokens to local file: {e}")
