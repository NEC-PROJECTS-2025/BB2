// Get references to the form, checkboxes, and report container
const form = document.getElementById("symptomForm");
const checkboxes = form.querySelectorAll('input[type="checkbox"]');
const report = document.getElementById("report");
const reportContent = document.querySelector(".report-content");

// Function to handle form submission
function submitSymptoms() {
  // Get selected symptoms
  const selectedSymptoms = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedSymptoms.push(checkbox.value);
    }
  });

  // Display an alert or message if no symptoms are selected
  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom before submitting.");
    return;
  }

  // Example logic for different symptom outcomes (you can customize this logic)
  let riskLevel = "";
  if (selectedSymptoms.length <= 2) {
    riskLevel = "low risk. Continue monitoring your symptoms.";
  } else if (selectedSymptoms.length <= 4) {
    riskLevel = "medium risk. It's advisable to consult a doctor.";
  } else {
    riskLevel = "high risk. Please seek medical attention immediately and take prediction test";
  }

  // Update the report content dynamically
  reportContent.innerHTML = `Symptoms indicate ${riskLevel}`;
  
  // Show the report section after submission
  report.classList.remove("hidden");
}

// Function to show the report (on button click)
function showReport() {
  if (!report.classList.contains("hidden")) {
    alert("Report is already displayed.");
  } else {
    alert("Please submit the form first to generate the report.");
  }
}
