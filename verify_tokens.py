from token_manager import TokenManager
import os
import json
from dotenv import load_dotenv

# load_dotenv()

def test_token_manager():
    print("🧪 Testing TokenManager...")
    
    service = "test_service"
    token_file = "test_tokens.json"
    tm = TokenManager(service, token_file)
    
    test_tokens = {"access_token": "test_access", "refresh_token": "test_refresh"}
    
    # 1. Test Saving
    print("Saving test tokens...")
    tm.save_tokens(test_tokens)
    
    # 2. Test Loading (from DB)
    print("Loading test tokens from DB...")
    # Clear env var if it exists to ensure we hit DB
    env_key = f"{service.upper()}_TOKENS_JSON"
    if env_key in os.environ:
        del os.environ[env_key]
        
    loaded = tm.load_tokens()
    if loaded == test_tokens:
        print("✅ DB Load Success!")
    else:
        print(f"❌ DB Load Failed: Expected {test_tokens}, got {loaded}")

    # 3. Test ENV Precedence
    print("Testing ENV precedence...")
    env_tokens = {"access_token": "env_access"}
    os.environ[env_key] = json.dumps(env_tokens)
    
    loaded_env = tm.load_tokens()
    if loaded_env == env_tokens:
        print("✅ ENV Precedence Success!")
    else:
        print(f"❌ ENV Precedence Failed: Expected {env_tokens}, got {loaded_env}")

    # Cleanup
    if os.path.exists(token_file):
        os.remove(token_file)
    from db_helpers import execute_query
    execute_query(f"DELETE FROM {TokenManager.TABLE_NAME} WHERE service_name = %s", (service,))
    print("🧹 Cleanup complete.")

if __name__ == "__main__":
    test_token_manager()
