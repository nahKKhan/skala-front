const stageCards = document.querySelectorAll(".stage-card");

stageCards.forEach(function (card) {
    card.addEventListener("click", function () {
        stageCards.forEach(function (otherCard) {
            otherCard.classList.remove("active");
        });

        card.classList.add("active");
    });
});