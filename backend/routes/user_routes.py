from flask import Blueprint, request, jsonify
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash   
from backend.config import USER_DB_PATH

users_bp = Blueprint("users", __name__, url_prefix = "/api")

def get_db_connection():
    conn = sqlite3.connect(USER_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
    
@users_bp.route("/register", methods = ["POST"])
def register_users():
    data = request.get_json()    
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    gender = data.get("gender")

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)",
            (name, email, hashed_password, gender)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 409 
    finally:
        conn.close()

    return jsonify ({"message": "User registered successfully"}), 201  

@users_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        return jsonify({"error": "Missing name or password"}), 400
    
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE name = ?", (name,)).fetchone() 
    conn.close()

    if user is None or not check_password_hash(user["password"], password):
        return jsonify ({"error": "Invalid Credentials"}), 401
    
    return jsonify({"message": "Login successful", "user": {"id": user["id"], "name": user["name"], "email": user["email"]}})