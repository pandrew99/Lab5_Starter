// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // const vars for getting and setting voices
  const voices = window.speechSynthesis.getVoices();
  const voiceSelect = document.querySelector('#voice-select');

  // adding all available voices to the "Select Voice" dropdown
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // Listen to "voiceschanged" event to detect when voices are loaded
  window.speechSynthesis.addEventListener('voiceschanged', init);

  // Declare const variables
  const synth = window.speechSynthesis;
  const textToSpeakInput = document.querySelector("#text-to-speak");
  const pressToTalkButton = document.querySelector("button");
  const faceImage = document.querySelector("img");

  // On page load, load voices and populate the "Select Voice" dropdown
  window.addEventListener("load", () => {
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  });

  // Speak the text added using the selected voice
  function speakText() {
    // Get the selected voice
    const selectedVoiceName = voiceSelect.value;
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);

    // Create the utterance and speak it
    const utterance = new SpeechSynthesisUtterance(textToSpeakInput.value);
    utterance.voice = selectedVoice;
    synth.speak(utterance);

    // Change the face image while speaking the text
    faceImage.src = "assets/images/smiling-open.png";
    utterance.onend = () => {
      faceImage.src = "assets/images/smiling.png";
    };
  }

  // Add event listener to the press to talk button
  pressToTalkButton.addEventListener("click", speakText);
}