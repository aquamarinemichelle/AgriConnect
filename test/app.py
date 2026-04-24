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
    # Load your trained model
    model = tf.keras.models.load_model('plant_disease_model.h5')
    
    # Load class names
    with open('class_names.pkl', 'rb') as f:
        class_names = pickle.load(f)
    
    print(f"✅ Model loaded successfully! Ready to predict {len(class_names)} classes")
except Exception as e:
    print(f"⚠️ Error loading models: {e}")
    model = None
    class_names = []

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'AgriConnect API is running',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # Check if image file is in request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Process image (adjust dimensions based on your model)
        img = tf.keras.preprocessing.image.load_img(file, target_size=(224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        
        # Make prediction
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        
        return jsonify({
            'disease': class_names[predicted_class] if class_names else str(predicted_class),
            'confidence': confidence,
            'success': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'AgriConnect API is running!'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
