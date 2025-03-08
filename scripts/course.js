const courses = [
    { code: "CSE 110", name: "Intro to Programming", completed: true },
    { code: "WDD 130", name: "Web Development I", completed: false },
    { code: "CSE 111", name: "Data Structures", completed: false },
    { code: "CSE 210", name: "Software Engineering", completed: true },
    { code: "WDD 131", name: "Advanced Web Development", completed: false },
    { code: "WDD 231", name: "JavaScript Development", completed: true }
];

function filterCourses(category) {
    let filtered = courses;
    if (category !== "all") {
        filtered = courses.filter(course => course.code.includes(category));
    }

    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = "";
    
    filtered.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (course.completed) courseCard.classList.add("completed");
        courseCard.textContent = `${course.code} - ${course.name}`;
        coursesContainer.appendChild(courseCard);
    });
}

filterCourses('all'); // Display all courses initially
