# PhishUrlHunter–Reinforcement Learning-Based Phishing Detection
PhishUrlHunter is a phishing detection system that identifies malicious URLs and websites using **Deep Reinforcement Learning**, specifically a **Deep Q-Network (DQN)**.  
The project enables real-time phishing detection through a backend server and an interactive web interface.

---
## Live Demo

**Try it here:**  
https://secure-x-sheild-bzfh.vercel.app/

---
## Features

- Extracts and analyzes URL and website-based features  
- Real-time phishing detection using Python backend (`server.py`)  
- User-friendly web interface for submitting URLs  
- Modular architecture for easy scalability and updates  
- Logging, visualization, and performance evaluation  
- Designed for cybersecurity research and phishing prevention  

---

## How It Works

1. User submits a URL via the web interface  
2. Feature extraction module processes the URL  
3. Deep Q-Network (DQN) model analyzes the features  
4. System classifies the URL as:
   - ✅ Legitimate  
   - ⚠️ Phishing  

---

## Tech Stack

- **Machine Learning**: Deep Reinforcement Learning (DQN)  
- **Backend**: Python (Flask / FastAPI)  
- **Frontend**: HTML, CSS, JavaScript  
- **Libraries**: TensorFlow / PyTorch, Scikit-learn  

---
## Installation & Setup

You can run the project locally using the following steps:

### Clone the Repository
git clone https://github.com/RamakotireddyGuttikonda/PhishUrlHunter.git
cd PhishingDetection-ReinforcementLearning

### 1.Run the Backend:

cd backend
pip install -r requirements.txt
python server.py

###2.Run the Frontend:
cd PhishingDetection-ReinforcementLearning
npm install @vitejs/plugin-react --save-dev
npm run dev
By default, the server runs at http://localhost:5000/

## Test Phishing Detection

- Enter URLs in the web app input field and submit.  
- The server will return detection results in real-time.  

---

## Thank You

- If you consider my project a good one, please ⭐ star it!  
- You can contact me via **pavaniaalla2005@gmail.com** 
