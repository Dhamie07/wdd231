const courses = [
    { subject: "CSE", number: "110", title: "Intro to Programming", credits: 2, certificate: "CS Fundamentals", description: "Basic programming concepts.", technology: ["Python"] },
    { subject: "WDD", number: "130", title: "Web Development I", credits: 2, certificate: "Web Development", description: "HTML and CSS basics.", technology: ["HTML", "CSS"] },
    { subject: "CSE", number: "111", title: "Data Structures", credits: 2, certificate: "CS Fundamentals", description: "Fundamentals of data structures.", technology: ["Python"] },
    { subject: "CSE", number: "210", title: "Software Engineering", credits: 2, certificate: "Software Engineering", description: "Software development methodologies.", technology: ["Java"] },
    { subject: "WDD", number: "131", title: "Advanced Web Development", credits: 2, certificate: "Web Development", description: "JavaScript for dynamic web apps.", technology: ["JavaScript"] },
    { subject: "WDD", number: "231", title: "JavaScript Development", credits: 3, certificate: "Full Stack Development", description: "JavaScript for frontend & backend.", technology: ["JavaScript", "Node.js"] }
];

const courseDetails = document.getElementById("course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" class="close-btn">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;

    courseDetails.showModal();

    document.getElementById("closeModal").addEventListener("click", () => {
        courseDetails.close();
    });

    courseDetails.addEventListener("click", (event) => {
        if (event.target === courseDetails) {
            courseDetails.close();
        }
    });
}

function filterCourses(category) {
    let filtered = courses;
    if (category !== "all") {
        filtered = courses.filter(course => course.subject.includes(category));
    }

    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = "";
    
    filtered.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        courseCard.textContent = `${course.subject} ${course.number} - ${course.title}`;
        
        // Add event listener to open modal with details
        courseCard.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        coursesContainer.appendChild(courseCard);
    });
}

// Initialize by displaying all courses
filterCourses('all');
