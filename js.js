
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});


// 🌙 THEME TOGGLE
const toggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
  toggle.innerHTML = "☀️";
}
if(toggle){
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");


  if(document.body.classList.contains("light")){
    localStorage.setItem("theme","light");
    toggle.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme","dark");
    toggle.innerHTML = "🌙";
  }
});
}
document.getElementById("btn1").addEventListener("click", () => {
  window.location.href = "wa.html";
});

document.getElementById("btn2").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("btn3").addEventListener("click", () => {
  window.location.href = "lip.html";
});

document.getElementById("btn4").addEventListener("click", () => {
  window.location.href = "pw.html";
});

document.getElementById("btn5").addEventListener("click", () => {
  window.location.href = "fp.html";
});

// 📩 CONTACT FORM

// 🔑 INIT
(function(){
  emailjs.init("h4-YldhZCkRgRj62Q");
})();


// 🚀 SEND MESSAGE
document.getElementById("sendBtn").addEventListener("click", () => {

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const msgInput = document.getElementById("msg");

if(!nameInput || !emailInput || !msgInput){
  console.error("Input fields missing ❌");
}
 const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();

  if(name === "" || email === "" || msg === ""){
    alert("Fill all fields ❌");
    return;
  }


  const params = {
    from_name: name,
    reply_to: email,
    message: msg
  };

  emailjs.send("service_342n5hk", "template_hn5b5ej", params)
    .then(() => {
      alert("Message sent successfully 🚀");
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send ❌");
    });

});
// 🤖 CHATBOT
const chatBody = document.getElementById("chat-body");
const input = document.getElementById("chat-input"); // ✅ FIX

input.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    let msg = input.value.trim();
    if(msg === "") return;

    // 🧑 USER MESSAGE
    chatBody.innerHTML += `<div class="msg user">${msg}</div>`;

    // 🤖 BOT REPLY
    let reply = "I am just a demo bot 😄";

    if(msg.toLowerCase().includes("hello")){
      reply = "Hey there! 👋";
    } else if(msg.toLowerCase().includes("project")){
      reply = "Check my projects section 🚀";
    }

    // BOT MESSAGE ADD
    setTimeout(() => {
      chatBody.innerHTML += `<div class="msg bot">${reply}</div>`;
      chatBody.scrollTop = chatBody.scrollHeight; // auto scroll
    }, 500);

    input.value = "";
  }
});


// 🔥 TOGGLE CHAT (outside রাখা জরুরি)
function toggleChat(){
  let chat = document.getElementById("chatbot");
  chat.classList.toggle("collapsed");
}