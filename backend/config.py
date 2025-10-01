from dotenv import load_dotenv
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
EXPENSES_DB_PATH = os.path.join(BASE_DIR, "models", "expenses.db")
USER_DB_PATH = os.path.join(BASE_DIR, "models", "user.db")
CATEGORIES_DB_PATH = os.path.join(BASE_DIR, "models", "categories.db")

# -------- URL CONFIGURATION --------
load_dotenv()

ENV = os.getenv("ENV", "prod")

if ENV == "dev":
    API_USER_URL = "http://127.0.0.1:5000/users"
else:
    API_USER_URL = "https://EXPNS.com/users" 