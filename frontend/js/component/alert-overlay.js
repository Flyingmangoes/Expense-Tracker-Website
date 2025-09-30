// ---custom alert box---
export function showAlert(message, type = "error") {
    const overlay = document.querySelector(".alert-overlay");
    const content = overlay.querySelector(".alert-content");
    const title   = overlay.querySelector(".alert-title");
    const alertBox  = overlay.querySelector(".alert-window");
    const titlebar  = overlay.querySelector(".alert-titlebar")
 
    content.textContent = message;

    switch (type) {
        case "success":
            title.textContent = "Success!";
            alertBox.style.borderColor = "#28a745";
            titlebar.style.backgroundColor = "#28a745";
            break;
        case "warning":
            title.textContent = "Warning!";
            alertBox.style.borderColor = "#ffc107";
            titlebar.style.backgroundColor = "#ffc107";
            break;
        case "error":
        default:
            title.textContent = "Alert!";
            alertBox.style.borderColor = "#dc3545";
            titlebar.style.backgroundColor = "#dc3545";
            break;
    }

    // ---show overlay---

    overlay.style.display = "flex";
    alertBox.style.transition = "none";
    alertBox.style.transform = "scale(0.8)";
    alertBox.style.opacity = "0";
    
    requestAnimationFrame(() => {
        alertBox.style.transition = "all 0.2s ease-out";
        alertBox.style.transform  = "scale(1)";
        alertBox.style.opacity    = "1";
    });
}

// ---hide alert---
export function hideAlert() {
    const overlay = document.querySelector(".alert-overlay");
    overlay.style.display = "none";
}

// ---add to dom---
export function initAlert() {
    document.addEventListener("DOMContentLoaded", () => {
        const overlay  = document.querySelector(".alert-overlay");
        const closeBtn = document.getElementById("close-alert");

        if (closeBtn) {
            closeBtn.addEventListener("click", hideAlert);
        }

        // Optional: click background to close
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) hideAlert();
        });

        // Optional: ESC key to close
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") hideAlert();
        });
    });
}

