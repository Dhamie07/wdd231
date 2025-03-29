document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, initializing script...");

    // Toggle Mobile Navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
        });
    }

    // Update Footer Year & Last Modified Date
    const yearElement = document.getElementById("year");
    const lastModifiedElement = document.getElementById("lastModified");
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    if (lastModifiedElement) lastModifiedElement.textContent = document.lastModified;

    // Fetch & Display Members
    const membersContainer = document.getElementById("members-container");
    if (membersContainer) {
        console.log("Members container found, fetching members...");
        fetchMembers();
    }

    // Toggle View Mode
    const toggleButton = document.querySelector("#toggle-view");
    if (toggleButton && membersContainer) {
        toggleButton.addEventListener("click", () => {
            membersContainer.classList.toggle("grid-view");
        });
    }
});

// Fetch & Display Members
async function fetchMembers() {
    const container = document.getElementById("members-container");
    if (!container) return;

    try {
        console.log("Fetching members...");
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();
        console.log("Members data:", members);
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        container.innerHTML = `<p style="color: red;">Failed to load members. Check console for details.</p>`;
    }
}

// Display Members
function displayMembers(members) {
    const container = document.getElementById("members-container");
    if (!container) return;

    container.innerHTML = members.map(member => `
        <div class="member-card">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.level)}</p>
        </div>
    `).join("");

    console.log("Members displayed successfully.");
}

// Convert membership level to readable text
function getMembershipLevel(level) {
    switch (level) {
        case 3: return "Gold Member";
        case 2: return "Silver Member";
        default: return "Member";
    }
}


