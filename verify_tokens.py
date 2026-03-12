from token_manager import TokenManager
from db_helpers import execute_query


def test_token_manager():
    print("🧪 Testing TokenManager...")
    
    service = "test_service"
    tm = TokenManager(service)
    
    test_tokens = {"access_token": "test_access", "refresh_token": "test_refresh"}
    
    # 1. Test Saving
    print("Saving test tokens...")
    tm.save_tokens(test_tokens)
    
    # 2. Test Loading (from DB)
    print("Loading test tokens from DB...")
    loaded = tm.load_tokens()
    if loaded == test_tokens:
        print("✅ DB Load Success!")
    else:
        print(f"❌ DB Load Failed: Expected {test_tokens}, got {loaded}")

    # Cleanup
    execute_query(f"DELETE FROM {TokenManager.TABLE_NAME} WHERE service_name = %s", (service,))
    print("🧹 Cleanup complete.")

if __name__ == "__main__":
    test_token_manager()
