document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const submittedInfo = document.getElementById("submitted-info");
    
    if (submittedInfo) {
        const firstName = params.get("firstName") || "N/A";
        const lastName = params.get("lastName") || "N/A";
        const email = params.get("email") || "N/A";
        const mobile = params.get("mobile") || "N/A";
        const businessName = params.get("businessName") || "N/A";
        const timestamp = params.get("timestamp") || "N/A";
        
        submittedInfo.innerHTML = `
            <h2>Thank You, ${firstName}!</h2>
            <p>We have received your application.</p>
            <div class="info-box">
                <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Business Name:</strong> ${businessName}</p>
                <p><strong>Submitted On:</strong> ${new Date(timestamp).toLocaleString()}</p>
            </div>
        `;
        
        // Fade-in effect
        submittedInfo.style.opacity = 0;
        submittedInfo.style.transform = "translateY(20px)";
        setTimeout(() => {
            submittedInfo.style.transition = "opacity 1s ease-out, transform 0.8s ease-out";
            submittedInfo.style.opacity = 1;
            submittedInfo.style.transform = "translateY(0)";
        }, 100);
    }
});
