let userId = document.getElementById("userId");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let msg = document.getElementById("msg");
let toggle = document.getElementById("toggle");

// 👁️ show/hide password
toggle.addEventListener("click", ()=>{

    if(password.type === "password"){
        password.type = "text";
    } else {
        password.type = "password";
    }

});

// 🔐 Login check
loginBtn.addEventListener("click", ()=>{

    let id = userId.value.trim();
    let pass = password.value.trim();

    // ❗ empty check
    if(id === "" || pass === ""){
        msg.innerText = "Please fill all fields!";
        msg.style.color = "yellow";
        return;
    }

    // ✅ demo login (fixed id & password)
    if(id === "743976alfa2@" && pass === "SK ALFAZ 007"){
        msg.innerText = "Login Successful ✅";
        msg.style.color = "lime";

        // redirect (optional)
        setTimeout(()=>{
            window.location.href = "wa.html";
        },1000);

    } else {
        msg.innerText = "Invalid ID or Password ❌";
        msg.style.color = "red";
    }




});