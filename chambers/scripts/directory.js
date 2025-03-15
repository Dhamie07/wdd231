// Toggle Mobile Navigation
document.getElementById("menu-toggle").addEventListener("click", function () {
    const navMenu = document.getElementById("nav-menu");
    navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
});

// Update Footer Year & Last Modified Date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch & Display Members from JSON
async function fetchMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.getElementById("members-container");
    container.innerHTML = "";

    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" width="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
            <p>Membership Level: ${member.level}</p>
        `;
        container.appendChild(memberCard);
    });
}

// Toggle View Mode
document.getElementById("toggleView").addEventListener("click", function () {
    const container = document.getElementById("members-container");
    container.classList.toggle("list-view");
    container.classList.toggle("grid-view");
});

// Initialize
fetchMembers();
