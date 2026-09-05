patients = []


def add_patient():
    name = input("Patient name: ")
    dob = input("Date of birth: ")
    phone = input("Phone number: ")

    patient = {
        "name": name,
        "dob": dob,
        "phone": phone
    }

    patients.append(patient)

    print("\nPatient added successfully!")

def view_patients():
    print("\nPatients in CareTrack:")

    for patient in patients:
        print("Name:", patient["name"])
        print("DOB:", patient["dob"])
        print("Phone:", patient["phone"])
        print("--------------------")
while True:
    print("\n================================")
    print("          CARETRACK")
    print("================================")
    print("1. Add Patient")
    print("2. View Patients")
    print("3. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        add_patient()

    elif choice == "2":
        view_patients()

    elif choice == "3":
        print("Goodbye!")
        break