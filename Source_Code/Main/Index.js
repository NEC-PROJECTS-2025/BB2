
function displayFileName(event) {
  var file = event.target.files[0];
  var fileNameDisplay = document.getElementById('fileNameDisplay');
  fileNameDisplay.innerHTML = ''; // Clear the previous file name
  
  if (file) {
      // Display the file name
      fileNameDisplay.textContent = 'Selected file: ' + file.name;
  }
}

function submitImage() {
  const fileInput = document.getElementById("imageInput");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  // Send the image to the Flask server for prediction
  fetch("http://127.0.0.1:5000/predict", {  // URL to your Flask backend
      method: "POST",
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      console.log("Prediction result:", data);
      document.getElementById("result").innerHTML = "Prediction: " + data.result;
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Failed to fetch the prediction. Please try again.");
  });
}
