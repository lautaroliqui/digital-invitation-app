const leavesContainer = document.getElementById("leaves-container");
const leafIcons = ['🍂', '🍃', '🍁'];
const totalLeaves = 15;

for (let i = 0; i < totalLeaves; i++) {
    let leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.innerText = leafIcons[Math.floor(Math.random() * leafIcons.length)];
    leaf.style.left = Math.random() * 100 + "vw";
    
    let fallDuration = Math.random() * 4 + 6;
    let swayDuration = Math.random() * 2 + 2;
    
    leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s, 0s`;
    leaf.style.animationPlayState = "paused, paused";
    leavesContainer.appendChild(leaf);
}

function toggleLeavesAnimation(play) {
    const leaves = document.querySelectorAll(".leaf");
    leaves.forEach(leaf => {
        leaf.style.animationPlayState = play ? "running, running" : "paused, paused";
    });
}

const bgMusic = document.getElementById("bg-music");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnBackward = document.getElementById("btn-backward");
const btnForward = document.getElementById("btn-forward");
const btnStop = document.getElementById("btn-stop");
const btnRestart = document.getElementById("btn-restart");

let isPlaying = false;

const svgPlay = `<svg viewBox="0 0 100 100" class="ctrl-icon"><path d="M 30 25 Q 75 45 80 50 Q 75 55 30 75 Q 25 50 30 25" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/></svg>`;
const svgPause = `<svg viewBox="0 0 100 100" class="ctrl-icon" style="margin-left: 0;"><path d="M 35 25 Q 38 50 34 75 M 65 25 Q 61 50 66 75" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg>`;

btnPlayPause.addEventListener("click", function() {
    if (isPlaying) {
        bgMusic.pause();
        btnPlayPause.innerHTML = svgPlay;
        toggleLeavesAnimation(false); 
    } else {
        bgMusic.play();
        btnPlayPause.innerHTML = svgPause;
        toggleLeavesAnimation(true); 
    }
    isPlaying = !isPlaying;
});

btnBackward.addEventListener("click", function() {
    bgMusic.currentTime = Math.max(0, bgMusic.currentTime - 5);
});

btnForward.addEventListener("click", function() {
    bgMusic.currentTime = Math.min(bgMusic.duration, bgMusic.currentTime + 5);
});

btnStop.addEventListener("click", function() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    isPlaying = false;
    btnPlayPause.innerHTML = svgPlay;
    toggleLeavesAnimation(false); 
});

btnRestart.addEventListener("click", function() {
    bgMusic.currentTime = 0;
    if (!isPlaying) {
        bgMusic.play();
        isPlaying = true;
        btnPlayPause.innerHTML = svgPause;
        toggleLeavesAnimation(true); 
    }
});

const countDownDate = new Date("Jul 25, 2026 13:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h3 style='grid-column: span 4;'>¡Llegó el día!</h3>";
    }
}, 1000);