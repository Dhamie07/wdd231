document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, initializing script...");

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) lastModifiedElement.textContent = document.lastModified;

    const membersContainer = document.getElementById("members-container");
    if (membersContainer) {
        fetchMembers(membersContainer);
    }

    const toggleButton = document.getElementById("toggle-view");
    if (toggleButton && membersContainer) {
        toggleButton.addEventListener("click", () => {
            membersContainer.classList.toggle("grid-view");
        });
    }
});

async function fetchMembers(container) {
    try {
        const response = await fetch("chamber/data/members.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();
        displayMembers(members, container);
    } catch (error) {
        console.error("Error loading members:", error);
        container.innerHTML = `<p style="color: red;">Failed to load members.</p>`;
    }
}

function displayMembers(members, container) {
    container.innerHTML = members.map(member => `
        <div class="member-card">
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.level)}</p>
        </div>
    `).join("");
}

function getMembershipLevel(level) {
    return level === 3 ? "Gold Member" : level === 2 ? "Silver Member" : "Member";
}




