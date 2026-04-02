let passwordEl = document.getElementById("password");
let generateBtn = document.getElementById("generateBtn");
let copyBtn = document.getElementById("copyBtn");
let toggleBtn = document.getElementById("toggleBtn");

let lengthEl = document.getElementById("length");
let lenVal = document.getElementById("lenVal");

let uppercaseEl = document.getElementById("uppercase");
let lowercaseEl = document.getElementById("lowercase");
let numbersEl = document.getElementById("numbers");
let symbolsEl = document.getElementById("symbols");

let strengthEl = document.getElementById("strength");
let historyBox = document.getElementById("historyBox");


lengthEl.addEventListener("input", ()=>{
    lenVal.innerText = lengthEl.value;
});


generateBtn.addEventListener("click", generatePassword);


function generatePassword(){

    let length = lengthEl.value;

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+";

    let chars = "";

    if(uppercaseEl.checked) chars += upper;
    if(lowercaseEl.checked) chars += lower;
    if(numbersEl.checked) chars += numbers;
    if(symbolsEl.checked) chars += symbols;

    if(chars === ""){
        alert("Select at least one option!");
        return;
    }

    let password = "";

    for(let i=0;i<length;i++){
        let random = Math.floor(Math.random() * chars.length);
        password += chars[random];
    }

    passwordEl.value = password;

    // 🔥 strength check
    checkStrength(password);

    // 💾 save history
    saveHistory(password);
    showHistory();
}


copyBtn.addEventListener("click", ()=>{
    if(passwordEl.value === ""){
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(passwordEl.value);
    alert("Copied!");
});


toggleBtn.addEventListener("click", ()=>{

    if(passwordEl.type === "password"){
        passwordEl.type = "text";
        toggleBtn.innerText = "Hide";
    } 
    else{
        passwordEl.type = "password";
        toggleBtn.innerText = "Show";
    }

});


function checkStrength(password){

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    if(strength <= 2){
        strengthEl.innerText = "Weak";
        strengthEl.className = "weak";
    }
    else if(strength === 3){
        strengthEl.innerText = "Medium";
        strengthEl.className = "medium";
    }
    else{
        strengthEl.innerText = "Strong";
        strengthEl.className = "strong";
    }
}


function saveHistory(password){

    let history = JSON.parse(localStorage.getItem("pwHistory")) || [];

    history.unshift(password);

    localStorage.setItem("pwHistory", JSON.stringify(history.slice(0,5)));
}


function showHistory(){

    let history = JSON.parse(localStorage.getItem("pwHistory")) || [];

    historyBox.innerHTML = "";

    history.forEach(pw => {

        let div = document.createElement("div");
        div.classList.add("history-item");
        div.innerText = pw;

        div.onclick = ()=>{
            passwordEl.value = pw;
            checkStrength(pw);
        };

        historyBox.appendChild(div);
    });
}


showHistory();