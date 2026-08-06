from app.database.database import engine

try:
    with engine.connect() as connection:
        print("✅ Database Connected Successfully!")
except Exception as e:
    print("❌ Connection Failed")
    print(e)
