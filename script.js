// Basic interactivity: play a music file if present, and trigger confetti
document.getElementById('playMusic')?.addEventListener('click', ()=>{
  const audio = new Audio('assets/music/song.mp3');
  audio.play().catch(()=>console.log('No music file found or playback blocked.'));
  if(window.launchConfetti) window.launchConfetti();
});

console.log('script.js loaded');