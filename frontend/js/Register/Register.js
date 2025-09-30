import { showAlert, hideAlert, initAlert } from '../component/alert-overlay.js'
initAlert()

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