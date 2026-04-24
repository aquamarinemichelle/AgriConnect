from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pickle
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models
print("Loading models...")
try:
    model = tf.keras.models.load_model('plant_disease_model.h5')
    with open('class_names.pkl', 'rb') as f:
        class_names = pickle.load(f)
    print(f"✅ Model loaded successfully! Ready to predict {len(class_names)} classes")
except Exception as e:
    print(f"⚠️ Error loading models: {e}")
    model = None
    class_names = []

# Load animal disease models
print("Loading animal disease models...")
try:
    with open('disease_model.pkl', 'rb') as f:
        animal_model = pickle.load(f)
    with open('label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    with open('animals_list.pkl', 'rb') as f:
        animals_list = pickle.load(f)
    with open('symptoms_list.pkl', 'rb') as f:
        symptoms_list = pickle.load(f)
    print("✅ Animal disease models loaded!")
except Exception as e:
    print(f"⚠️ Error loading animal models: {e}")
    animal_model = None
    label_encoders = None
    animals_list = []
    symptoms_list = []

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'AgriConnect API is running!'})

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'AgriConnect API is running',
        'model_loaded': model is not None
    })

@app.route('/api/crop/predict', methods=['POST'])
def crop_predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        img = tf.keras.preprocessing.image.load_img(file, target_size=(224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        
        predictions = model.predict(img_array)
        top_indices = np.argsort(predictions[0])[::-1][:3]
        
        primary_idx = top_indices[0]
        primary_disease = class_names[primary_idx] if class_names else str(primary_idx)
        primary_confidence = round(float(predictions[0][primary_idx]) * 100, 2)
        is_healthy = 'healthy' in primary_disease.lower()

        alternative_diagnoses = []
        for idx in top_indices[1:]:
            alternative_diagnoses.append({
                'disease': class_names[idx] if class_names else str(idx),
                'confidence': round(float(predictions[0][idx]) * 100, 2),
                'is_healthy': 'healthy' in (class_names[idx] if class_names else '').lower()
            })

        return jsonify({
            'primary_diagnosis': {
                'disease': primary_disease,
                'confidence': primary_confidence,
                'is_healthy': is_healthy
            },
            'alternative_diagnoses': alternative_diagnoses,
            'recommendations': 'Consult an agricultural expert for treatment advice.' if not is_healthy else 'Your plant appears healthy. Continue regular care.'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def animal_predict():
    try:
        data = request.get_json()
        return jsonify({
            'primary_diagnosis': {'disease': 'Analysis pending', 'confidence': 0},
            'alternative_diagnoses': [],
            'diagnosis_type': 'AI',
            'recommendations': 'Please consult a veterinarian.',
            'animal': data.get('animal', ''),
            'age': data.get('age', 0),
            'temperature': data.get('temperature', 0),
            'symptoms': data.get('symptoms', [])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        return jsonify({
            'status': 'success',
            'response': f"Thank you for your message: '{message}'. Our AI assistant is being set up. Please check back soon!"
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)