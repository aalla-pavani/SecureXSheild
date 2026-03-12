from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import numpy as np
from dqn_agent import DQNAgent
from data_loader import extract_features
from config import *
from url_parser import parse_url
import os



app = Flask(__name__)
CORS(app)

# Load model once at startup
agent = DQNAgent(STATE_SIZE, ACTION_SIZE)
agent.model.load_state_dict(torch.load("final_model.pth", map_location=torch.device("cpu")))
agent.model.eval()
@app.route('/')
def home():
    return "SecureXShield API is running"
@app.route('/predict', methods=['POST'])
def predict_url():
    data = request.get_json()
    url = data.get('url', '').strip()

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        # --- Parse the URL ---
        parsed = parse_url(url)

        # --- Extract features for ML model ---
        features = extract_features(url)
        feature_names = [
            "URL length",
            "Domain length",
            "Dots in domain",
            "Hyphens in domain",
            "Underscores in domain",
            "Forward slashes in path",
            "Digits in domain",
            "IP address present",
            "'@' symbol present",
            "Double slash in path",
            "Shortening service used",
            "TLD length",
            "HTTPS protocol",
            "Phishing keywords in domain"
        ]

        # --- Prepare for model inference ---
        features_tensor = torch.tensor(features, dtype=torch.float32).unsqueeze(0).to(DEVICE)

        with torch.no_grad():
            outputs = agent.model(features_tensor)
            probabilities = torch.softmax(outputs, dim=1).cpu().numpy()[0]
            _, predicted = torch.max(outputs.data, 1)
            result = predicted.item()

        verdict = "Phishing" if result == 1 else "Legitimate"

        # --- Return everything ---
        return jsonify({
            "success": True,
            "url": url,
            "verdict": verdict,
            "probabilities": {
                "legitimate": float(probabilities[0]),
                "phishing": float(probabilities[1])
            },
            "parsed_url": parsed,
            "features": features,
            "feature_names": feature_names
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)


# https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/ -> Legimate
# http://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/  ->Pishing
