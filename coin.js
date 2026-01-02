let btn = $("#flipButton");
let coin = $("#coin");
let resultText = $("#result");
let cY = $("#counterYes");
let cN = $("#counterNo");

btn.on("click", function () {
  coin.removeClass("flip");
  void coin[0].offsetWidth;
  coin.addClass("flip");
  setTimeout(function () {
    let result = Math.random() < 0.5 ? "YES" : "NO";
    switch (result) {
      case "YES":
        let yesCount = parseInt(cY.text().replace(/\D/g, "")) || 0;
        cY.text("YES: " + (yesCount + 1));
        break;
      case "NO":
        let noCount = parseInt(cN.text().replace(/\D/g, "")) || 0;
        cN.text("NO: " + (noCount + 1));
        break;
      default:
        break;
    }
    coin.text(result);
    resultText.text("Result: " + result);
    coin.css("background", result === "YES" ? "gold" : "silver");
  }, 1000);
});
