// variable yang diperlukan
var button_click = document.getElementById("button_click");
var scoreDisplay = document.getElementById("score");
var buy_auto = document.getElementById("buy_auto");
var buy_multiplier = document.getElementById("buy_multiplier");
var multiplierDisplay = document.getElementById("multiplier");
var multiplierGifs = ["data/LumineCat1.gif",
                    "data/LumineCat2.gif",
                    "data/LumineCat3.gif",
                    "data/LumineCat4.gif",
                    "data/LumineCat6.gif"];
var score = 1, auto = 0, multiplier = 1;
var muteBtn = document.getElementById("mute-btn");
var bgmBtn = document.getElementById("bgm-btn");
var bgm = document.getElementById('bgm');
var volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', function() {
  bgm.volume = volumeSlider.value;
  document.getElementById("volume-value").innerHTML = volumeSlider.value;
});

// play bgm
window.addEventListener("load", function() {
  var bgm = document.getElementById("bgm");
  bgm.play();
});

// on/off bgm
bgmBtn.addEventListener("click", function() {
  var bgm = document.getElementById("bgm");
  bgmBtn.classList.toggle("muted");

  bgm.muted = !bgm.muted;
});

// sfx gif
function playSFX() {
  var sfx = document.getElementById("sfx");
  sfx.currentTime = 0;
  sfx.play();
}

// sfx buy
function playBuy() {
  var sfx = document.getElementById("buy");
  sfx.currentTime = 0;
  sfx.play();
}

// on/off sfx
muteBtn.addEventListener("click", function() {
  var sfxAudio = document.getElementById("sfx");
  var buyAudio = document.getElementById("buy");
  muteBtn.classList.toggle("muted");

  sfxAudio.muted = !sfxAudio.muted;
  buyAudio.muted = !buyAudio.muted;
});

// fitur Auto Click
buy_auto.addEventListener("click", function() {
    //setel harga disini, makin tinggi harga makin cepat rusak mousemu.
    var autoPrice = 30;
    // kalau mampu beli
    if (score >= autoPrice) {
        score = score - autoPrice;
        updateScore();
        auto = 1;

        if (auto == 1) {
            buy_auto.disabled = true;
            buy_auto.style.pointerEvents = "none";
        }

        buy_auto.remove();
        
        // fungsi auto click
        setInterval(function() {
            score = score + (auto * multiplier);
            updateScore();
        }, 1000);
    } else {
    // kalau ndak mampu beli
        alert("Waduh Bro!, Anda masih tidak cukup kaya untuk ini...");
    }
});

// fitur multiplier
buy_multiplier.addEventListener("click", function() {
    var multiplierPrices = [50, 100, 200, 300];
    var maxMultiplier = 5;

    if (score >= multiplierPrices[multiplier-1]) {
      score = score - multiplierPrices[multiplier-1];
      updateScore();

      multiplier++;
      // nanti kalo upgrade ganti gif
      document.getElementById("multiplier_gif").src = multiplierGifs[multiplier-1];
      multiplierDisplay.innerHTML = `${multiplier}x`;

      if (multiplier === maxMultiplier) {
        buy_multiplier.style.display = "none";
      } else {
        buy_multiplier.innerHTML = `Upgrade Sword (${multiplierPrices[multiplier-1]} points)`;
      }
    } else {
      alert("Waduh Bro!, Anda masih tidak cukup kaya untuk ini...");
    }
});

// fungsi click
button_click.addEventListener("click", function() {
    // nambah score setiap click
    score = score + multiplier;
    updateScore();
});

// update tampilan score
function updateScore() {
    scoreDisplay.innerHTML = `${score}`;
}
