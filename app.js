// Siapkan variable
var button_click = document.getElementById("button_click");
var scoreDisplay = document.getElementById("score");
var buy_auto = document.getElementById("buy_auto");
var buy_multiplier = document.getElementById("buy_multiplier");
var multiplierDisplay = document.getElementById("multiplier");
var score = 1, auto = 0, multiplier = 1;

// Fitur Auto Click
buy_auto.addEventListener("click", function() {
    //setel harga disini, makin tinggi harga makin cepat rusak mousemu.
    var autoPrice = 25;
    // kalau mampu beli
    if (score >= autoPrice) {
        score = score - autoPrice;
        updateScore();
        auto = 1;

        buy_auto.innerHTML = `Buy Auto-Click (${autoPrice} points)`;

        if (auto == 1) {
            buy_auto.disabled = true;
            buy_auto.style.pointerEvents = "none";
        }
        
        // Fungsi auto click
        setInterval(function() {
            score = score + (auto * multiplier);
            updateScore();
        }, 1000);
    } else {
    // kalau ndak mampu beli
        alert("Selamat, poin anda tidak cukup! Semangat Nguly!");
    }
});

// Fitur Multiplier
buy_multiplier.addEventListener("click", function() {
    //setel harga disini, makin tinggi harga makin cepat rusak mousemu.
    var multiplierPrice = 50;
    // kalau mampu beli
    if (score >= multiplierPrice) {
        score = score - multiplierPrice;
        updateScore();

        multiplier++;

        // Ubah display
        multiplierDisplay.innerHTML = `${multiplier}x`;
        buy_multiplier.innerHTML = `Buy Upgrade (${multiplierPrice} points)`;
    } else {
    // kalau ndak mampu beli
        alert("Selamat, poin anda tidak cukup! Semangat Nguly!");
    }
});

// Fungsi click
button_click.addEventListener("click", function() {
    // Tambah score setiap kali player melakukan click
    score = score + multiplier;
    updateScore();
});

// Update tampilan score
function updateScore() {
    scoreDisplay.innerHTML = `${score}`;
}
