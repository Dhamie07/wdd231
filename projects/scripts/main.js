// main.js (use type="module")

document.addEventListener('DOMContentLoaded', () => {
    // === DOM SELECTORS ===
    const chocolateGrid = document.querySelector(".chocolate-grid");
    const modal = document.getElementById("chocoModal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.getElementById("closeModal");
    const funFactContainer = document.getElementById("funFact");
    const spotlightContainer = document.getElementById("chocoSpotlight");

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // === NAVIGATION TOGGLE ===
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // === HELPER FUNCTIONS ===
    function createCard(choco) {
        const card = document.createElement("div");
        card.className = "choco-card";
        card.innerHTML = `
            <img src="${choco.image}" alt="${choco.name}">
            <h3>${choco.name}</h3>
            <p><strong>Origin:</strong> ${choco.origin}</p>
            <p><strong>Type:</strong> ${choco.type}</p>
            <p><strong>Rating:</strong> ${choco.rating}⭐</p>
        `;
        card.addEventListener("click", () => {
            showModal(choco);
        });
        return card;
    }

    function showModal(choco) {
        modalContent.innerHTML = `
            <h2>${choco.name}</h2>
            <p><strong>Origin:</strong> ${choco.origin}</p>
            <p><strong>Type:</strong> ${choco.type}</p>
            <p><strong>Description:</strong> ${choco.description}</p>
            <p><strong>Rating:</strong> ${choco.rating}⭐</p>
        `;
        modal.showModal();
    }

    function displayFunFact(fact) {
        if (funFactContainer) {
            funFactContainer.textContent = "Tap for a fun chocolate fact!";
            funFactContainer.style.cursor = "pointer";
            funFactContainer.addEventListener("click", () => {
                modalContent.textContent = fact;
                modal.showModal();
            });
        }
    }

    function displayChocolateSpotlight(chocolate) {
        if (spotlightContainer) {
            spotlightContainer.innerHTML = `
                <h3>Tap to see the Chocolate of the Month!</h3>
            `;
            spotlightContainer.style.cursor = "pointer";
            spotlightContainer.addEventListener("click", () => {
                modalContent.innerHTML = `
                    <h2>${chocolate.name}</h2>
                    <p><strong>Origin:</strong> ${chocolate.origin}</p>
                    <p><strong>Tasting Notes:</strong> ${chocolate.tastingNotes}</p>
                    <img src="${chocolate.image}" alt="${chocolate.name}" loading="lazy" style="max-width: 100%;">
                `;
                modal.showModal();
            });
        }
    }

    // === FETCH DATA FUNCTION ===
    async function loadChocolates() {
        try {
            const response = await fetch("data/chocolates.json");
            const data = await response.json();

            // Store data in localStorage
            localStorage.setItem("chocolates", JSON.stringify(data));

            // Display chocolates
            if (chocolateGrid) {
                data.slice(0, 15).forEach(choco => {
                    const card = createCard(choco);
                    chocolateGrid.appendChild(card);
                });
            }

            // Use array method to select a random chocolate for spotlight
            if (spotlightContainer) {
                const random = data[Math.floor(Math.random() * data.length)];
                displayChocolateSpotlight(random);
            }

            // Load a fun fact from array (using the data from the JSON)
            if (funFactContainer) {
                const facts = [
                    "Chocolate was once used as currency!",
                    "Dark chocolate contains powerful antioxidants.",
                    "Cacao trees can live for 200 years.",
                    "White chocolate isn’t technically chocolate!",
                    "The scientific name for cacao means 'food of the gods'."
                ];
                const pick = facts[Math.floor(Math.random() * facts.length)];
                displayFunFact(pick);
            }

        } catch (error) {
            console.error("Error loading chocolates:", error);
            if (funFactContainer) {
                funFactContainer.textContent = "Sorry, we couldn't load a fun fact today.";
            }
            if (spotlightContainer) {
                spotlightContainer.innerHTML = `<p>Error loading spotlight.</p>`;
            }
        }
    }

    // === EVENT LISTENERS ===
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.close();
        });
    }

    // === RUN ===
    // Load chocolate data only if we are on the homepage (where the hero exists)
    if (document.querySelector(".hero")) {
        loadChocolates();
    }
});