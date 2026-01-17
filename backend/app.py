from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from routes.overlays import overlay_bp
from flask import send_from_directory

app = Flask(__name__)
CORS(app)

# 🔹 CONNECT TO MONGODB
client = MongoClient("mongodb://localhost:27017/")
db = client["rtsp_overlay"]
collection = db["overlays"]

# 🔹 STORE COLLECTION INSIDE APP CONFIG
app.config["COLLECTION"] = collection

# 🔹 REGISTER ROUTES
app.register_blueprint(overlay_bp)

@app.route("/streams/<path:filename>")
def stream_files(filename):
    return send_from_directory("streams", filename)


@app.route("/")
def home():
    return "Backend running with MongoDB"

if __name__ == "__main__":
    app.run(debug=True)
