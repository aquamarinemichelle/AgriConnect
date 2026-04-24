# 🌱 AgriConnect

> AI-powered agriculture support platform helping farmers make informed decisions through modern technology.

🔗 **Live Demo:** [agriconnect-vspv.onrender.com](https://agriconnect-vspv.onrender.com)

---

## 📖 Overview

AgriConnect is a full-stack agricultural platform that combines machine learning, real-time weather data, and an intuitive dashboard to support farmers and agricultural communities. The core focus is **AI-driven crop disease detection** — giving farmers the tools to identify plant diseases early and reduce crop loss.

---

## ✨ Features

### 🌿 Crop Disease Detection *(Core Feature)*
- Upload an image of a crop or plant leaf
- AI model analyzes the image using deep learning
- Identifies possible plant diseases with confidence scores
- Provides treatment recommendations to help farmers act early

### 🐄 Livestock Health Diagnosis
- Input symptoms observed in livestock
- AI model suggests possible illnesses or health conditions
- Designed as a **decision-support tool**, not a medical replacement
- Supports cattle, sheep, goats, and buffalo

### ☁️ Weather Information
- Displays real-time weather readings
- Helps users understand environmental conditions affecting crops
- Weather data shown alongside plant health insights

### 💬 AI Chatbot *(In Progress)*
- Conversational assistant for agricultural questions
- Currently under development
- Demonstrates the platform's future expansion potential

### 📊 Unified Dashboard
- View crop disease scan results
- Access weather readings
- Review livestock diagnosis inputs
- All insights and analysis in one place

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Python, Flask, Flask-CORS |
| AI / ML | TensorFlow, Keras, scikit-learn |
| Database | Supabase |
| Auth | Firebase |
| Deployment | Render |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+

### Frontend Setup
```bash
cd agri
npm install
npm run dev
```

### Backend Setup
```bash
cd test
pip install -r requirements.txt
python app.py
```

### Environment Variables
Create a `.env` file in the `agri/` folder with the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

---

## 🎯 Project Focus

Built under hackathon time constraints, development prioritized:

1. **AI image-based crop disease detection** — the core innovation
2. A functional, clean UI with real data display
3. Demonstrating AI's potential in solving real agricultural problems

---

## ⚠️ Disclaimer

AgriConnect is a prototype and educational project. AI predictions are **not** a substitute for professional agricultural or veterinary advice. Always consult a qualified expert for critical decisions.

---

## 📌 Roadmap

- [ ] Improve crop disease detection model accuracy
- [ ] Fully implement AI chatbot
- [ ] Expand livestock species support
- [ ] Add multilingual support for wider accessibility
- [ ] Offline mode for low-connectivity farming areas

---

