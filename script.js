document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    scene.addEventListener('arReady', () => {
      const heart = document.querySelector('#heart');
      const birthdayText = document.querySelector('#birthday-text');
      const button = document.querySelector('#button');
  
      // After 4 seconds, hide heart and show text and button
      setTimeout(() => {
        heart.setAttribute('visible', 'false');
        birthdayText.setAttribute('visible', 'true');
        button.setAttribute('visible', 'true');
      }, 4000);
    });
  
    // Handle button click for photo capture
    const button = document.querySelector('#button');
    button.addEventListener('click', () => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
          const video = document.querySelector('#video');
          video.srcObject = stream;
          video.play();
  
          // Capture photo after a short delay
          setTimeout(() => {
            const canvas = document.querySelector('#canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const photoData = canvas.toDataURL('image/png');
  
            // Stop video stream
            stream.getTracks().forEach(track => track.stop());
  
            // Store photo in localStorage
            localStorage.setItem('capturedPhoto', photoData);
  
            // Redirect to final page
            window.location.href = 'birthday.html';
          }, 1000);
        })
        .catch(err => {
          console.error('Camera access failed:', err);
          alert('Failed to access camera. Redirecting to the birthday page.');
          window.location.href = 'birthday.html';
        });
    });
  
    // Start the AR scene
    scene.querySelector('a-scene').systems['mindar-image'].start();
  });