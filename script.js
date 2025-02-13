// JavaScript to handle dynamic entries
let timetableData = JSON.parse(localStorage.getItem("timetableData")) || [];

function createSubjectInputs() {
    const numSubjects = document.getElementById('subjectCount').value;
    const subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = ""; // Clear existing inputs

    for (let i = 0; i < numSubjects; i++) {
        const subjectInput = document.createElement('input');
        subjectInput.type = 'text';
        subjectInput.placeholder = `Subject ${i + 1}`;
        subjectInput.className = "subject-input";
        subjectList.appendChild(subjectInput);
    }
}


function addEntry() {
    const type = document.getElementById("type").value;
    const day = document.getElementById("day").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const classValue = document.getElementById("class").value;
    //const subject = document.getElementById("subject-list").value;

    const subjectInputs = document.querySelectorAll(".subject-input");
    const subjects = Array.from(subjectInputs).map(input => input.value); // Join subjects with commas


    const table = type === "lecture"
        ? document.getElementById("lectureTable")
        : document.getElementById("practicalTable");

    subjects.forEach(subject => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
        <td>${day}</td>
        <td>${startTime} - ${endTime}</td>
        <td>${classValue}</td>
        <td>${subject}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;

        const newEntry = { type, day, startTime, endTime, class: classValue, subject };
        let timetableData = JSON.parse(localStorage.getItem("timetableData")) || [];
        timetableData.push(newEntry);
        localStorage.setItem("timetableData", JSON.stringify(timetableData));
    });


}

// Function to delete a specific row
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Function to clear the entire timetable
function clearTimetable() {
    document.getElementById("lectureTable").innerHTML = `
        <tr><th>Day</th><th>Timing</th><th>Class</th><th>Subject</th><th>Action</th></tr>
    `;
    document.getElementById("practicalTable").innerHTML = `
        <tr><th>Day</th><th>Timing</th><th>Class</th><th>Subject</th><th>Action</th></tr>
    `;
    localStorage.removeItem("timetableData"); // Clear localStorage as well
}
