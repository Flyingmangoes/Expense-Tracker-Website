import { showAlert, hideAlert, initAlert } from "../component/alert-overlay";
initAlert()

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
            body   : JSON.stringify({name: username, password: userpassword})
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



