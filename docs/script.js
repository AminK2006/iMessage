let startX = 0;
let swipeMode = false;

function enableSwipeMode() {
  const messages = document.querySelectorAll(".message.sent");
  messages.forEach(msg => {
    msg.classList.add("swiped");
    const ts = msg.querySelector(".timestamp");
    if (ts) ts.style.opacity = "1";
  });
  swipeMode = true;
}

function disableSwipeMode() {
  const messages = document.querySelectorAll(".message.sent");
  messages.forEach(msg => {
    msg.classList.remove("swiped");
    const ts = msg.querySelector(".timestamp");
    if (ts) ts.style.opacity = "0";
  });
  swipeMode = false;
}

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener("touchmove", e => {
  const deltaX = e.touches[0].clientX - startX;
  if (deltaX < -20 && !swipeMode) enableSwipeMode();
}, { passive: true });

document.addEventListener("touchend", () => {
  if (swipeMode) {
    setTimeout(disableSwipeMode, 2500);
  }
});

function toggleEditor() {
  const editor = document.querySelector(".editor-panel");
  editor.style.display = editor.style.display === "none" ? "flex" : "none";
}

function addMessage() {
  const sender = document.getElementById("senderSelect").value;
  const text = document.getElementById("messageText").value;
  const time = document.getElementById("messageTime").value;
  const status = document.getElementById("status").value;

  if (!text || !time) return;

  const container = document.getElementById("chatBackground");

  const wrapper = document.createElement("div");
  wrapper.className = "bubble-wrapper";

  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;

  if (sender === "sent") {
    const ts = document.createElement("div");
    ts.className = "timestamp";
    ts.innerText = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.appendChild(ts);

    wrapper.appendChild(msg);

    if (status) {
      const stat = document.createElement("div");
      stat.className = "status-wrapper";
      stat.innerText = status;
      wrapper.appendChild(stat);
    }
  } else {
    wrapper.appendChild(msg);
  }

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}
