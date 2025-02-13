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
    `;

        const newEntry = { type, day, startTime, endTime, class: classValue, subject };
        let timetableData = JSON.parse(localStorage.getItem("timetableData")) || [];
        timetableData.push(newEntry);
        localStorage.setItem("timetableData", JSON.stringify(timetableData));
    });

}