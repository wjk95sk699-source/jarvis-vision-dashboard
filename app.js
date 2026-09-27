const clock = document.getElementById('clock');
const assistantOutput = document.getElementById('assistantOutput');
const commandInput = document.getElementById('commandInput');
const submitCommand = document.getElementById('submitCommand');
const voiceButton = document.getElementById('voiceButton');
const scanButton = document.getElementById('scanButton');

const responses = {
  default: 'All systems nominal. Awaiting instruction.',
  'open security feed': 'Security feed activated. Threat overview now displayed.',
  'scan city': 'Scanning urban environment. Updating live map and object density.',
  'summarize status': 'Core AI stable, sensors online, propulsion ready, and security grid synchronized.',
  'hello': 'Hello. JARVIS is online and ready for action.',
  'status': 'Power is optimal, shields are online, and all subsystems are stable.',
};

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  clock.textContent = time;
}

function speakResponse(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1.1;
  synth.cancel();
  synth.speak(utterance);
}

function handleCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;

  const response = responses[command] || `Command received: "${rawCommand}". Executing requested protocol.`;
  assistantOutput.textContent = `"${response}"`;
  speakResponse(response);
  commandInput.value = '';
}

submitCommand.addEventListener('click', () => {
  handleCommand(commandInput.value);
});

commandInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleCommand(commandInput.value);
  }
});

voiceButton.addEventListener('click', () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    assistantOutput.textContent = '"Voice recognition is not available in this browser. You can still use keyboard commands."';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  assistantOutput.textContent = '"Listening for command..."';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    handleCommand(transcript);
  };

  recognition.onerror = () => {
    assistantOutput.textContent = '"Voice recognition failed. Please try again or type a command manually."';
  };
});

scanButton.addEventListener('click', () => {
  const result = 'Environmental scan complete. Updated tactical matrix and sensor lock confirmed.';
  assistantOutput.textContent = `"${result}"`;
  speakResponse(result);
});

document.querySelectorAll('.suggestions button').forEach((button) => {
  button.addEventListener('click', () => {
    handleCommand(button.textContent.trim());
  });
});

updateClock();
setInterval(updateClock, 1000);

assistantOutput.textContent = `"${responses.default}"`;
																																																																																																										