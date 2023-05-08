// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Set up const vars
  const jsConfetti = new JSConfetti()
  const hornSelect = document.querySelector('#horn-select');
  const hornImage = document.querySelector('img');
  const hornSound = document.querySelector('audio');
  const volumeIcon = document.querySelector('#volume-controls img');
  const volumeControl = document.querySelector('#volume');
  const playButton = document.querySelector('button');

  hornSelect.addEventListener('change', () => {
    const hornValue = hornSelect.value;

    // Update the horn image and audio based on the horn selected from drop down
    if (hornValue == 'air-horn') {
      hornImage.src = 'assets/images/air-horn.svg';
      hornSound.src = 'assets/audio/air-horn.mp3';
    } else if (hornValue == 'car-horn') {
      hornImage.src = 'assets/images/car-horn.svg';
      hornSound.src = 'assets/audio/car-horn.mp3';
    } else if ('party-horn') {
      hornImage.src = 'assets/images/party-horn.svg';
      hornSound.src = 'assets/audio/party-horn.mp3';
    } else {
      hornImage.src = 'assets/images/no-image.png';
    }
  
    // Set initial volume level and icon
    hornSound.volume = volumeControl.value / 100;
    updateVolumeIcon(volumeControl.value);

    // Event listener for volume changes
    volumeControl.addEventListener('input', () => {
      const volume = volumeControl.value;
      hornSound.volume = volume / 100;
      updateVolumeIcon(volume);
    });

    // Event listener for play sound button
    playButton.addEventListener('click', () => {
      hornSound.src = `assets/audio/${hornSelect.value}.mp3`;
      hornSound.play();

      // When Party Horn is selected, add confetti to the screen
      if (hornValue == 'party-horn') {
        jsConfetti.addConfetti()
      }
    });

    // Update volume icon based on volume selected from slider
    function updateVolumeIcon(volume) {
      if (volume == 0) {
        volumeIcon.src = 'assets/icons/volume-level-0.svg';
      } else if (volume < 33) {
        volumeIcon.src = 'assets/icons/volume-level-1.svg';
      } else if (volume < 67) {
        volumeIcon.src = 'assets/icons/volume-level-2.svg';
      } else {
        volumeIcon.src = 'assets/icons/volume-level-3.svg';
      }
    }
  });
}