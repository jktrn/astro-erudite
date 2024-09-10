// src/scripts/progress-bar.js

export function initializeProgressBar() {
    function updateProgressBar() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      document.getElementById('progress-bar').style.width = `${scrollPercent}%`;
    }
  
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);
  
    // Initialize the progress bar on page load
    updateProgressBar();
  }
  