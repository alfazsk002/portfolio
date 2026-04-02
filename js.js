// 🔄 LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader) loader.style.display = "none";
});

// 🌙 THEME TOGGLE
const toggle = document.getElementById("themeToggle");

if(toggle){
  if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    toggle.innerHTML = "☀️";
  }

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

// 📱 MENU TOGGLE
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

if(menuToggle && nav){

  // open + close
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // outside click conflict prevent
    nav.classList.toggle("active");
  });

  // outside click close
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove("active");
    }
  });
}

// 🔗 BUTTON NAVIGATION
const routes = {
  btn1: "wa.html",
  btn2: "index.html",
  btn3: "lip.html",
  btn4: "pw.html",
  btn5: "fp.html"
};

Object.keys(routes).forEach(id => {
  const btn = document.getElementById(id);
  if(btn){
    btn.addEventListener("click", () => {
      window.location.href = routes[id];
    });
  }
});

// 📩 EMAIL (EmailJS)
(function(){
  emailjs.init("h4-YldhZCkRgRj62Q");
})();

const sendBtn = document.getElementById("sendBtn");

if(sendBtn){
  sendBtn.addEventListener("click", () => {

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const msg = document.getElementById("msg")?.value.trim();

    if(!name || !email || !msg){
      alert("Fill all fields ❌");
      return;
    }

    const params = {
      from_name: name,
      reply_to: email,
      message: msg
    };

    emailjs.send("service_342n5hk", "template_hn5b5ej", params)
      .then(() => alert("Message sent successfully 🚀"))
      .catch(() => alert("Failed to send ❌"));
  });
}

// 🤖 CHATBOT
const chatBody = document.getElementById("chat-body");
const input = document.getElementById("chat-input");

if(input && chatBody){
  input.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
      let msg = input.value.trim();
      if(msg === "") return;

      chatBody.innerHTML += `<div class="msg user">${msg}</div>`;

      let reply = "I am just a demo bot 😄";

      if(msg.toLowerCase().includes("hello")){
        reply = "Hey there! 👋";
      } 
      else if(msg.toLowerCase().includes("project")){
        reply = "Check my projects section 🚀";
      }

      setTimeout(() => {
        chatBody.innerHTML += `<div class="msg bot">${reply}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);

      input.value = "";
    }
  });
}

// 💬 CHAT TOGGLE
function toggleChat(){
  const chat = document.getElementById("chatbot");
  if(chat) chat.classList.toggle("collapsed");
}