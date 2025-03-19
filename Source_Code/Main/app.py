
import os
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
import numpy as np

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Load the trained model (adjust the path as needed)
# model = tf.keras.models.load_model('./model_Adam.h5')  # Update path if necessary

# Preprocess the image to match the model input format
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))  # Adjust target size if needed
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize the image to [0, 1]
    model = tf.keras.models.load_model('./model_Adam.h5')  # Update path if necessary
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)
    # You will need to have `train_data.class_indices` available. Assuming it was saved or can be accessed.
    class_labels = {0: 'Healthy', 1: 'Unhealthy'}  # Replace with the actual labels of your dataset
    predicted_label = class_labels.get(predicted_class[0], 'Unknown')
    return predicted_label

# Route to handle image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Save the uploaded image to the 'uploads' folder
        img_path = os.path.join('uploads', file.filename)
        file.save(img_path)

        # Preprocess the image and predict
        print(img_path)
        res = preprocess_image(img_path)
        # predicted_label = predict_image(img_array)

        # Return the result as JSON
        return jsonify({'result': res})

    return jsonify({'error': 'Failed to process the image'}), 500

if __name__ == '__main__':
    # Ensure the 'uploads' directory exists
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(debug=True)
