//---register---
const postregister = document.getElementById("register-form");
if (postregister) {
    postregister.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username= document.getElementById("username").value;
        const useremail   = document.getElementById("usermail").value;
        const userpassword= document.getElementById("password").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch (`${API_URL}/api/register`, {
                method : "POST",
                headers: {"Content-type":"application/json"},
                body   : JSON.stringify({name: username, email: useremail, password: userpassword, gender: gender})
            });

            const data = await response.json()

            if (response.ok) {
                console.log("Registration success")
                showAlert("Registration success!", "success");

            } else {
                showAlert(data.message  || "Registration failed!", "error");
            }

        } catch (err){
            console.error("Error", err);
            showAlert("Something went wrong. Try again later.", "error");
        } 
    });
}

// ---login---
const postlogin = document.getElementById("login-form");
if (postlogin) {
    postlogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const userpassword = document.getElementById("password").value;
        
    try {
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch (`${API_URL}/api/login`, {
            method :"POST",
            headers:{"Content-type":"application/json"},
            body   :({name: username, password: userpassword})
        });

        const data = await response.json()

        if (response.ok){
            console.log("Login Success!")
            showAlert("Credential Valid", "success");

        } else {
            showAlert(data.message || "Credential Invalid", "error")
        }

    } catch(err) {
        console.error("Error", err)
        showAlert("Something went wrong. Try again later.", "error");
    }
    });
}


// ---custom alert box---
function showAlert(message, type = "error") {
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
function hideAlert() {
    const overlay = document.querySelector(".alert-overlay");
    overlay.style.display = "none";
}
// ---add to dom---
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


