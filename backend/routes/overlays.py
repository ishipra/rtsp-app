from flask import Blueprint, request, jsonify, current_app
from models import overlay_schema
from bson import ObjectId


overlay_bp = Blueprint("overlay", __name__)

@overlay_bp.route("/api/overlays", methods=["POST"])
def create_overlay():
    data = request.json
    overlay = overlay_schema(data)

    collection = current_app.config["COLLECTION"]
    result = collection.insert_one(overlay)

    overlay["_id"] = str(result.inserted_id)
    return jsonify(overlay), 201

@overlay_bp.route("/api/overlays", methods=["GET"])
def get_overlays():
    collection = current_app.config["COLLECTION"]
    overlays = []

    for overlay in collection.find():
        overlay["_id"] = str(overlay["_id"])
        overlays.append(overlay)

    return jsonify(overlays), 200 

@overlay_bp.route("/api/overlays/<id>", methods=["PUT"])
def update_overlay(id):
    data = request.json
    collection = current_app.config["COLLECTION"]

    collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )

    return jsonify({"message": "Overlay updated"}), 200


@overlay_bp.route("/api/overlays/<id>", methods=["DELETE"])
def delete_overlay(id):
    collection = current_app.config["COLLECTION"]
    collection.delete_one({"_id": ObjectId(id)})

    return jsonify({"message": "Overlay deleted"}), 200
