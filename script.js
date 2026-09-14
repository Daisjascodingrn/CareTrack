let patients = JSON.parse(localStorage.getItem("patients")) || [];

console.log(patients);

const form = document.querySelector("form");
const nameInput = document.querySelector('input[type="text"]');
const dobInput = document.querySelector("#dob");
const phoneInput = document.querySelector("#phone");
const patientList = document.querySelector("#patientList");
searchInput.addEventListener("input", function() {
    console.log(searchInput.value);
});
const searchInput = document.querySelector("#searchInput");
function displayPatients() {
    patientList.innerHTML = "";

    for (let patient of patients) {
        patientList.innerHTML += `
            <div class="patient-card">
                <h3>${patient.name}</h3>
                <p>DOB: ${patient.dob}</p>
                <p>Phone: ${patient.phone}</p>
            </div>
        `;
    }
}

displayPatients();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let patient = {
        name: nameInput.value,
        dob: dobInput.value,
        phone: phoneInput.value
    };

    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));

    console.log(patients);

    displayPatients();

    console.log(nameInput.value);
    console.log(dobInput.value);
    console.log(phoneInput.value);
    console.log("Patient added!");

    form.reset();
});
searchInput.addEventListener("input", function() {
    console.log(searchInput.value);
});
