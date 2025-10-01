from flask import Blueprint, request, jsonify
import sqlite3

expenses_bp = Blueprint()

