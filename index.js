/* references:
    https://middleearmedia.com/controlling-web-audio-api-oscillators/
    https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/
*/

var audioContext = new AudioContext();
var oscillatorLeft;
var oscillatorRight;
var gainLeft, gainRight;
const panLeft = new StereoPannerNode(audioContext, { pan: -1 });
const panRight = new StereoPannerNode(audioContext, { pan: 1 });
var frequency = 440;
var offset = 40;
var volume = 20;

const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');
var frequencyLeftDisplay = document.querySelector('#frequencyLeftDisplay');
var frequencyRightDisplay = document.querySelector('#frequencyRightDisplay');
var offsetDisplay = document.querySelector('#offsetDisplay');
var volumeDisplay = document.querySelector('#volumeDisplay');
updateFrequencyDisplay();
updateOffsetDisplay();
updateVolumeDisplay();

function startOsc() {
    // Create OscillatorNode
    oscillatorLeft = audioContext.createOscillator();
    oscillatorRight = audioContext.createOscillator();

    // Sine wave
    oscillatorLeft.type = 0;
    oscillatorRight.type = 0;

    oscillatorLeft.frequency.value = frequency;
    oscillatorRight.frequency.value = frequency + offset;

    oscillatorLeft.start();
    oscillatorRight.start();

    // Create GainNodes
    gainLeft = audioContext.createGain();
    gainRight = audioContext.createGain();
    gainLeft.gain.value = volume / 100;
    gainRight.gain.value = volume / 100;

    // Connect the Nodes
    oscillatorLeft.connect(gainLeft).connect(panLeft).connect(audioContext.destination);
    oscillatorRight.connect(gainRight).connect(panRight).connect(audioContext.destination);
    startButton.style.display = "none";
    stopButton.style.display = "inline-block";
};

function off() {
    oscillatorLeft.stop();
    oscillatorRight.stop();
    gainLeft.disconnect();
    gainRight.disconnect();
    oscillatorLeft.disconnect();
    oscillatorRight.disconnect();
    startButton.style.display = "inline-block";
    stopButton.style.display = "none";
}

function changeFrequency(newFrequency) {
    frequency = parseInt(newFrequency);
    if (oscillatorLeft)
        oscillatorLeft.frequency.value = parseInt(frequency);
    if (oscillatorRight)
        oscillatorRight.frequency.value = parseInt(frequency) + offset;
    updateFrequencyDisplay()
}

function updateFrequencyDisplay() {
    frequencyLeftDisplay.innerHTML = parseInt(frequency);
    frequencyRightDisplay.innerHTML = parseInt(frequency) + offset;
}

function changeOffset(newOffset) {
    offset = parseInt(newOffset);
    updateOffsetDisplay();
    changeFrequency(frequency);
}

function updateOffsetDisplay() {
    offsetDisplay.innerHTML = parseInt(offset);
}

function changeVolume(newVolume) {
    volume = parseInt(newVolume);
    if (gainLeft)
        gainLeft.gain.value = volume / 100;
    if (gainRight)
        gainRight.gain.value = volume / 100;
    updateVolumeDisplay();
}

function updateVolumeDisplay() {
    volumeDisplay.innerHTML = parseInt(volume);
}