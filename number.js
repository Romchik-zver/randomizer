let min, max, random, result;
min = $("#min");
max = $("#max");
random = $("#btn");
result = $("#result");

random.on("click", function () {
  let minVal = Number(min.val());
  let maxVal = Number(max.val());
  let resultVal = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
  if (
    isNaN(minVal) ||
    isNaN(maxVal) ||
    minVal > maxVal ||
    minVal < 0 ||
    maxVal < 0 ||
    resultVal <= 0
  ) {
    $("#modal-1-content").text("Please enter valid numbers for min and max.");
    MicroModal.show("modal-1");
  } else {
    $("#modal-1-content").text("Random number: " + resultVal);
    MicroModal.show("modal-1");
  }
});
