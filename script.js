let patients =
    JSON.parse(localStorage.getItem("patients")) || [];


// Give older patients an ID if they don't already have one

patients.forEach(function(patient) {

    if (!patient.id) {

        patient.id =
            Date.now() + Math.random();

    }

});


localStorage.setItem(
    "patients",
    JSON.stringify(patients)
);


// ========================================
// PATIENT LIST PAGE
// ========================================


const form =
    document.querySelector("form");


const nameInput =
    document.querySelector("#patientName");


const dobInput =
    document.querySelector("#dob");


const phoneInput =
    document.querySelector("#phone");


const patientList =
    document.querySelector("#patientList");


const searchInput =
    document.querySelector("#searchInput");


const patientCount =
    document.querySelector("#patientCount");


// ========================================
// PHONE NUMBER FORMATTING
// ========================================


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function() {

            let numbers =
                phoneInput.value.replace(/\D/g, "");


            if (numbers.length > 10) {

                numbers =
                    numbers.slice(0, 10);

            }


            if (numbers.length > 6) {

                phoneInput.value =
                    `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;

            } else if (numbers.length > 3) {

                phoneInput.value =
                    `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;

            } else {

                phoneInput.value =
                    numbers;

            }

        }
    );

}


// ========================================
// DISPLAY PATIENTS
// ========================================


function displayPatients() {

    patientList.innerHTML = "";


    patientCount.textContent =
        `(${patients.length})`;


    for (let patient of patients) {

        patientList.innerHTML += `

            <div class="patient-card">

                <h3>
                    ${patient.name}
                </h3>

                <p>
                    DOB: ${patient.dob}
                </p>

                <p>
                    Phone: ${patient.phone}
                </p>


                <button
                    type="button"
                    onclick="viewPatient(${patient.id})"
                >
                    View Profile
                </button>

            </div>

        `;

    }

}


// ========================================
// SEARCH PATIENTS
// ========================================


function searchPatients() {

    let searchTerm =
        searchInput.value.toLowerCase();


    let filteredPatients =
        patients.filter(function(patient) {

            return patient.name
                .toLowerCase()
                .includes(searchTerm);

        });


    patientList.innerHTML = "";


    patientCount.textContent =
        `(${filteredPatients.length})`;


    for (let patient of filteredPatients) {

        patientList.innerHTML += `

            <div class="patient-card">

                <h3>
                    ${patient.name}
                </h3>

                <p>
                    DOB: ${patient.dob}
                </p>

                <p>
                    Phone: ${patient.phone}
                </p>


                <button
                    type="button"
                    onclick="viewPatient(${patient.id})"
                >
                    View Profile
                </button>

            </div>

        `;

    }

}


// ========================================
// ADD PATIENT
// ========================================


if (form) {

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let patient = {

                id: Date.now(),

                name: nameInput.value,

                dob: dobInput.value,

                phone: phoneInput.value

            };


            patients.push(patient);


            localStorage.setItem(
                "patients",
                JSON.stringify(patients)
            );


            displayPatients();


            form.reset();

        }
    );

}


// ========================================
// SEARCH EVENT
// ========================================


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            searchPatients();

        }
    );

}


// ========================================
// LOAD PATIENT LIST
// ========================================


if (patientList) {

    displayPatients();

}


// ========================================
// PATIENT PROFILE PAGE
// ========================================


// Open patient profile

function viewPatient(patientId) {

    window.location.href =
        `patient.html?id=${patientId}`;

}


// ========================================
// BLOOD PRESSURE CLASSIFICATION
// ========================================


function classifyBloodPressure(
    topNumber,
    bottomNumber
) {

    /*
        AHA/ACC categories:

        Normal:
        Top < 120 AND Bottom < 80

        Elevated:
        Top 120-129 AND Bottom < 80

        Stage 1:
        Top 130-139 OR Bottom 80-89

        Stage 2:
        Top >= 140 OR Bottom >= 90

        Severe:
        Top > 180 OR Bottom > 120


        "Low" is included as a separate
        demo flag for readings that don't
        fall into one of the higher categories.
    */


    if (
        topNumber > 180 ||
        bottomNumber > 120
    ) {

        return "Severe";

    }


    if (
        topNumber >= 140 ||
        bottomNumber >= 90
    ) {

        return "Stage 2";

    }


    if (
        topNumber >= 130 ||
        bottomNumber >= 80
    ) {

        return "Stage 1";

    }


    if (
        topNumber >= 120 &&
        topNumber <= 129 &&
        bottomNumber < 80
    ) {

        return "Elevated";

    }


    if (
        topNumber < 90 ||
        bottomNumber < 60
    ) {

        return "Low";

    }


    return "Normal";

}


// ========================================
// DISPLAY VITALS
// ========================================


function displayVitals(patient) {

    const vitalsDisplay =
        document.querySelector("#vitalsDisplay");


    const bloodPressureResult =
        document.querySelector("#bloodPressureResult");


    if (
        !vitalsDisplay ||
        !bloodPressureResult
    ) {

        return;

    }


    if (
        !patient ||
        !patient.vitals
    ) {

        vitalsDisplay.textContent =
            "No vitals recorded.";


        bloodPressureResult.innerHTML = "";


        return;

    }


    const statusClass =
        patient.vitals.status
            .toLowerCase()
            .replace(" ", "-");


    vitalsDisplay.textContent =
        `Blood Pressure: ${patient.vitals.bloodPressure}`;


    bloodPressureResult.innerHTML = `

        <div class="blood-pressure-result ${statusClass}">

            <h3>
                Blood Pressure
            </h3>


            <p class="blood-pressure-value">
                ${patient.vitals.bloodPressure}
            </p>


            <p class="blood-pressure-status">
                ${patient.vitals.status}
            </p>

        </div>

    `;

}
// ========================================
// DISPLAY MEDICATIONS
// ========================================

function displayMedications(patient) {

    const medicationList =
        document.querySelector("#medicationList");


    if (!medicationList) {
        return;
    }


    if (
        !patient ||
        !patient.medications ||
        patient.medications.length === 0
    ) {

        medicationList.innerHTML =
            "<p>No medications recorded.</p>";

        return;

    }


    medicationList.innerHTML = "";


    for (let medication of patient.medications) {

        medicationList.innerHTML += `

            <div class="medication-card">

                <h3>
                    ${medication.name}
                </h3>

                <p>
                    <strong>Dosage:</strong>
                    ${medication.dosage}
                </p>

                <p>
                    <strong>Frequency:</strong>
                    ${medication.frequency}
                </p>

            </div>

        `;

    }

}

// ========================================
// LOAD PATIENT PROFILE
// ========================================


function loadPatientProfile() {

    const patientProfile =
        document.querySelector("#patientProfile");


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const patientId =
        Number(urlParams.get("id"));


    const patient =
        patients.find(function(patient) {

            return patient.id === patientId;

        });


    if (!patient) {

        patientProfile.innerHTML = `

            <h2>
                Patient Not Found
            </h2>

            <p>
                We couldn't find this patient.
            </p>

        `;

        return;

    }


    patientProfile.innerHTML = `

        <div class="patient-profile">

            <h2>
                ${patient.name}
            </h2>


            <p>
                <strong>
                    Date of Birth:
                </strong>

                ${patient.dob}
            </p>


            <p>
                <strong>
                    Phone:
                </strong>

                ${patient.phone}
            </p>

        </div>

    `;


    displayVitals(patient);
displayMedications(patient);
}


// Only run on patient.html

if (
    window.location.pathname.includes(
        "patient.html"
    )
) {

    loadPatientProfile();

}


// ========================================
// GO BACK
// ========================================


function goBack() {

    window.location.href =
        "index.html";

}


// ========================================
// SHOW VITALS FORM
// ========================================


function showVitalsForm() {

    const vitalsForm =
        document.querySelector("#vitalsForm");


    vitalsForm.innerHTML = `

        <form id="vitalsInputForm">

            <label for="bloodPressure">
                Blood Pressure
            </label>


            <input
                type="text"
                id="bloodPressure"
                placeholder="Example: 120/80"
                maxlength="7"
            >


            <button type="submit">
                Save Vitals
            </button>

        </form>

    `;


    const bloodPressureInput =
        document.querySelector(
            "#bloodPressure"
        );


    // ========================================
    // AUTO-FORMAT BLOOD PRESSURE
    // ========================================


    bloodPressureInput.addEventListener(
        "input",
        function() {

            let numbers =
                bloodPressureInput.value
                    .replace(/\D/g, "");


            if (numbers.length > 6) {

                numbers =
                    numbers.slice(0, 6);

            }


            if (numbers.length > 3) {

                bloodPressureInput.value =
                    numbers.slice(0, 3) +
                    "/" +
                    numbers.slice(3);

            } else {

                bloodPressureInput.value =
                    numbers;

            }

        }
    );


    // ========================================
    // SAVE VITALS
    // ========================================


    const vitalsInputForm =
        document.querySelector(
            "#vitalsInputForm"
        );


    vitalsInputForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const bloodPressure =
                bloodPressureInput.value;


            const numbers =
                bloodPressure.split("/");


            // Make sure the user entered
            // something like 120/80

            if (
                numbers.length !== 2 ||
                numbers[0] === "" ||
                numbers[1] === ""
            ) {

                alert(
                    "Please enter blood pressure like 120/80."
                );

                return;

            }


            const topNumber =
                Number(numbers[0]);


            const bottomNumber =
                Number(numbers[1]);


            if (
                Number.isNaN(topNumber) ||
                Number.isNaN(bottomNumber) ||
                topNumber <= 0 ||
                bottomNumber <= 0
            ) {

                alert(
                    "Please enter valid blood pressure numbers."
                );

                return;

            }


            // Classify the reading

            const bloodPressureStatus =
                classifyBloodPressure(
                    topNumber,
                    bottomNumber
                );


            // Get current patient

            const urlParams =
                new URLSearchParams(
                    window.location.search
                );


            const patientId =
                Number(urlParams.get("id"));


            const patient =
                patients.find(function(patient) {

                    return patient.id === patientId;

                });


            if (!patient) {

                alert(
                    "Patient could not be found."
                );

                return;

            }


            // Save vitals to patient record

            patient.vitals = {

                bloodPressure:
                    bloodPressure,

                topNumber:
                    topNumber,

                bottomNumber:
                    bottomNumber,

                status:
                    bloodPressureStatus

            };


            // Save updated patient array

            localStorage.setItem(
                "patients",
                JSON.stringify(patients)
            );


            // Immediately update the page

            displayVitals(patient);


            console.log(
                "Blood Pressure:",
                bloodPressure
            );


            console.log(
                "Top Number:",
                topNumber
            );


            console.log(
                "Bottom Number:",
                bottomNumber
            );


            console.log(
                "Status:",
                bloodPressureStatus
            );


            console.log(
                "Updated Patient:",
                patient
            );

        }
    );

}
// ========================================
// SHOW MEDICATION FORM
// ========================================

function showMedicationForm() {

    const medicationForm =
        document.querySelector("#medicationForm");


    medicationForm.innerHTML = `

        <form id="medicationInputForm">

            <label for="medicationName">
                Medication Name
            </label>

            <input
                type="text"
                id="medicationName"
                placeholder="Example: Medication A"
                required
            >


            <label for="medicationDosage">
                Dosage
            </label>

            <input
                type="text"
                id="medicationDosage"
                placeholder="Example: 10 mg"
                required
            >


            <label for="medicationFrequency">
                Frequency
            </label>

            <input
                type="text"
                id="medicationFrequency"
                placeholder="Example: Once daily"
                required
            >


            <button type="submit">
                Save Medication
            </button>

        </form>

    `;


    const medicationInputForm =
        document.querySelector(
            "#medicationInputForm"
        );


    medicationInputForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const medicationName =
                document.querySelector(
                    "#medicationName"
                ).value;


            const medicationDosage =
                document.querySelector(
                    "#medicationDosage"
                ).value;


            const medicationFrequency =
                document.querySelector(
                    "#medicationFrequency"
                ).value;


            // Get current patient

            const urlParams =
                new URLSearchParams(
                    window.location.search
                );


            const patientId =
                Number(urlParams.get("id"));


            const patient =
                patients.find(function(patient) {

                    return patient.id === patientId;

                });


            if (!patient) {

                alert(
                    "Patient could not be found."
                );

                return;

            }


            // Create medications array
            // if this patient does not
            // have one yet

            if (!patient.medications) {

                patient.medications = [];

            }


            // Add the medication

            patient.medications.push({

                name: medicationName,

                dosage: medicationDosage,

                frequency: medicationFrequency

            });


            // Save updated patients

            localStorage.setItem(
                "patients",
                JSON.stringify(patients)
            );


            // Update the medication list

            displayMedications(patient);


            // Clear the form

            medicationInputForm.reset();

        }
    );

}