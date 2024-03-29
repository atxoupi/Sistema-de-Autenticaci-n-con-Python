"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import json
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def singup():

    password = request.json.get("password", None)
    email = request.json.get("email", None)
    pw_hash = current_app.bcrypt.generate_password_hash(password).decode("utf-8")
    users=User(email=email, password=pw_hash,is_active=True)
    db.session.add(users)
    db.session.commit()

    response_body = {
        "message": "Usuario Añadido"
    }

    return jsonify(response_body), 200

#login User
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    print("Estamos en el back")
    data= request.get_json()
    #validate
    if not data["email"]:
        return jsonify({"error": "Invalid"}), 400
    if not data["password"]:
        return jsonify({"error": "Invalid"}), 400
    user = User.query.filter_by(email=data["email"]).first()
    comprobacion=bcrypt.check_password_hash(user.password, data["password"])
    print(comprobacion)
    if comprobacion!=true:
    #if data["password"]!= user.password:
        return jsonify({"error": "Invalid"}), 400
    acces_token = create_access_token(identity=user.email)
    
    return jsonify({"access_token": acces_token}), 200

@api.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    current_user_email= get_jwt_identity()
    user= User.query.filter_by(email=current_user_email).first()
    return jsonify({"data": user.serialize()}), 200