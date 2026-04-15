const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const reportList = document.getElementById("reportList");
const loadStudentsBtn = document.getElementById("loadStudents");
const loadReportBtn = document.getElementById("loadReport");

const API_BASE = "http://localhost:3000";

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;

  const response = await fetch(`${API_BASE}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, email }),
  });

  const data = await response.json();
  console.log("Added student:", data);

  studentForm.reset();
  loadStudents();
});

loadStudentsBtn.addEventListener("click", loadStudents);

async function loadStudents() {
  const response = await fetch(`${API_BASE}/students`);
  const students = await response.json();

  studentList.innerHTML = "";

  students.forEach((student) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${student.student_id} - ${student.first_name} ${student.last_name} (${student.email})
      <button onclick="deleteStudent(${student.student_id})">Delete</button>
    `;
    studentList.appendChild(li);
  });
}

async function deleteStudent(id) {
  await fetch(`${API_BASE}/students/${id}`, {
    method: "DELETE",
  });

  loadStudents();
}

loadReportBtn.addEventListener("click", loadReport);

async function loadReport() {
  const response = await fetch(`${API_BASE}/report`);
  const report = await response.json();

  reportList.innerHTML = "";

  report.forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.first_name} ${row.last_name} - ${row.course_name} - Grade: ${row.grade}`;
    reportList.appendChild(li);
  });
}
