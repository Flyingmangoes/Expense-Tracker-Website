from flask import Flask
from routes.auth_routes import auth_bp
from routes.expenses_routes import expenses_bp
from routes.user_routes import users_bp

app = Flask(__name__)

app.register_blueprint()
app.register_blueprint()
app.register_blueprint()

if __name__ == "__main__":
    app.run(debug=True)