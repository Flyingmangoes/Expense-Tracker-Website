from flask import Flask
from backend.config import API_USER_URL

@app.route(API_USER_URL, methods = ['GET'])
def user_routes():
    
 

