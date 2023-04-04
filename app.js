// variable yang diperlukan
var button_click = document.getElementById("button_click");
var scoreDisplay = document.getElementById("score");
var buy_auto = document.getElementById("buy_auto");
var buy_multiplier = document.getElementById("buy_multiplier");
var multiplierDisplay = document.getElementById("multiplier");
var multiplierGifs = ["/data/multiplier1.gif",
                    "/data/multiplier2.gif",
                    "/data/multiplier3.gif",
                    "/data/multiplier4.gif",
                    "/data/multiplier5.gif"];
var score = 1, auto = 0, multiplier = 1;

// fitur Auto Click
buy_auto.addEventListener("click", function() {
    //setel harga disini, makin tinggi harga makin cepat rusak mousemu.
    var autoPrice = 25;
    // kalau mampu beli
    if (score >= autoPrice) {
        score = score - autoPrice;
        updateScore();
        auto = 1;

        buy_auto.innerHTML = `Already Purchased`;

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
        alert("Selamat, poin anda tidak cukup! Semangat Nguly!");
    }
});


// fitur multiplier
buy_multiplier.addEventListener("click", function() {
    var multiplierPrices = [5, 10, 20, 40, 80];
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
        buy_multiplier.innerHTML = `Buy Upgrade (${multiplierPrices[multiplier-1]} points)`;
      }
    } else {
      alert("Maaf, poin anda tidak cukup untuk membeli upgrade!");
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
