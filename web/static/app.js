const messages = document.getElementById('messages');
const form = document.getElementById('composer');
const input = document.getElementById('message');
const status = document.getElementById('status');
let socket;

function addMessage(message, mine = false) {
  const row = document.createElement('div');
  row.className = `message-row ${mine ? 'mine' : ''}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = message.text;
  const meta = document.createElement('small');
  meta.textContent = `${message.user} · ${new Date(message.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
  bubble.appendChild(meta);
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

async function loadHistory() {
  const res = await fetch('/api/messages');
  if (!res.ok) return;
  const history = await res.json();
  history.forEach(m => addMessage(m, m.user === 'Gokul'));
}

function connect() {
  socket = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
  socket.onopen = () => { status.textContent = 'Online'; };
  socket.onmessage = event => {
    const m = JSON.parse(event.data);
    addMessage(m, m.user === 'Gokul');
  };
  socket.onclose = () => { status.textContent = 'Reconnecting…'; setTimeout(connect, 1500); };
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text || !socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({user: 'Gokul', text}));
  input.value = '';
  input.focus();
});

loadHistory();
connect();
