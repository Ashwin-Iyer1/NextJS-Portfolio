import json
from typing import Dict, Any, Optional
from db_helpers import execute_query

class TokenManager:
    """Manages API tokens with persistence in Database."""
    
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
            return True
        except Exception as e:
            print(f"❌ Error creating table '{TokenManager.TABLE_NAME}': {e}")
            return False

    def __init__(self, service_name: str):
        self.service_name = service_name
        self.ensure_table_exists()

    def load_tokens(self) -> Dict[str, Any]:
        """Load tokens from the database."""
        query = f"SELECT tokens FROM {TokenManager.TABLE_NAME} WHERE service_name = %s"
        try:
            result = execute_query(query, (self.service_name,), fetch_one=True, use_dict=True)
            if result and result.get('tokens'):
                print(f"✅ [{self.service_name}] Loaded tokens from Database.")
                return result['tokens']
        except Exception as e:
            print(f"❌ [{self.service_name}] Error loading tokens from DB: {e}")

        print(f"⚠️ [{self.service_name}] No tokens found in DB.")
        return {}

    def save_tokens(self, tokens: Dict[str, Any]):
        """Save tokens to the database."""
        if not tokens:
            return

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
