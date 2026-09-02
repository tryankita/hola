
const ADJ = ["sunny", "quiet", "warm", "little", "lazy", "golden", "soft", "misty", "cozy", "dusty"];
const NOUN = ["fox", "river", "porch", "maple", "kettle", "harbor", "meadow", "lantern", "willow", "cabin"];


function makeRoomCode() {
  const a = ADJ[Math.floor(Math.random() * ADJ.length)];
  const n = NOUN[Math.floor(Math.random() * NOUN.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${a}-${n}-${num}`;
}

const statusEl = document.getElementById("status");
const lobbyEl = document.getElementById("lobby");
const callEl = document.getElementById("call");
const shareBox = document.getElemen;
const linkInput = document.getElementById("link-input");
const copyBtn = document.getElementById("copy-btn");
const copiedMsg = document.getElementById("copied-msg");
const localVideo = document.getElementById("local-video");
const remoteVideo = document.getElementById("remote-video");
const micBtn = document.getElementById("mic-btn");
const camBtn = document.getElementById("cam-btn");
const hangupBtn = document.getElementById("hangup-btn");

const params = new URLSearchParams(window.location.search);
const joiningRoom = params.get("room");

let localStream = null;
let peer = null;
let activeCall = null;
let waitingTimer = null;

function setStatus(text) {
  clearInterval(waitingTimer);
  statusEl.textContent = text;
}

function setWaitingStatus(baseText) {
  clearInterval(waitingTimer);
  let dots = 0;
  statusEl.textContent = baseText;
  waitingTimer = setInterval(() => {
    dots = (dots + 1) % 4;
    statusEl.textContent = baseText + ".".repeat(dots);
  }, 450);
}

async function start() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch (err) {
    setStatus("couldn't get your camera/mic : check permissions and reload");    
    return;
  }
  localVideo.srcObject = localStream;

  if (joiningRoom) {
    joinRoom(joiningRoom);
  } else {
    hostRoom();
  }
}

function hostRoom() {
  const roomCode = makeRoomCode();
  peer = new Peer(roomCode);

  peer.on("open", () => {
    const link = `${window.location.origin}${window.location.pathname}/room=${roomCode}`;
    linkInput.value = link;
    shareBox.hidden = false;
    setWaitingStatus("waiting for the other person to join");
  });

  peer.on("call", (call) => {
    call.answer(localStream);
    wireUpCall(call);
  });

  peer.on("error", (err) => {
    setStatus("something went wrong: " + err.type);
  });
}

function joinRoom(roomCode) {
  setWaitingStatus("connecting");
  peer = new Peer();

  peer.on("open", () => {
    const call = peer.call(roomCode, localStream);
    wireUpCall(call);
  });

  peer.on("error", (err) => {
    setStatus("something went wrong: " + err.type);
  });
}

function wireUpCall(call) {
  activeCall = call;
  call.on("stream", (remoteStream) => {
    remoteVideo.srcObject = remoteStream;
    lobbyEl.hidden = true;
    callEl.hidden = false;
  });
  call.on("close", endCall);
}

copyBtn.addEventListener("click", () => {
  linkInput.select();
  navigator.clipboard.writeText(linkInput.value).then(() => {
    copiedMsg.hidden = false;
    setTimeout(() => (copiedMsg.hidden = true), 1500);
  });
});

micBtn.addEventListener("click", () => {
  const track = localStream.getAudioTracks()[0];
  track.enabled = !track.enabled;
  micBtn.classList.toggle("off", !track.enabled);
});

camBtn.addEventListener("click", () => {
  const track = localStream.getVideoTracks()[0];
  track.enabled = !track.enabled;
  camBtn.classList.toggle("off", !track.enabled);
});

hangupBtn.addEventListener("click", endCall);

function endCall() {
  if (activeCall) activeCall.close();
  if (peer) peer.destroy();
  if (localStream) localStream.getTracks().forEach((t) => t.stop());
  callEl.hidden = true;
  lobbyEl.hidden = false;
  shareBox.hidden = true;
  setStatus("call ended : reload to start a new one");
}

start();
