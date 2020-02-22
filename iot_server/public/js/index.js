var isSwitchedOn = true;
var brightness = 100;

$(function() {
  $("#brightness").val(brightness);

  $("#switcher").on("click", () => {
    if (isSwitchedOn) {
      $("#switcher").css({
        "margin-left": "7px",
        background: "#e74a40"
      });

      $("#switcher").text("OFF");

      $(".on").css({
        opacity: "0"
      });

      isSwitchedOn = false;
      sendSwitchRequest();
      return;
    }

    $("#switcher").css({
      "margin-left": "calc(100% - 45% - 7px)",
      background: "#37b960"
    });

    $("#switcher").text("ON");

    let value = brightness / 60;

    $(".on").css({
      opacity: value
    });

    isSwitchedOn = true;
    sendSwitchRequest();
    if (brightness == 0) $("#up").click();
    changeBrightness();
  });

  $("#up").on("click", () => {
    if (brightness == 100) {
      return;
    }

    if (brightness > 95 && brightness < 100) {
      brightness = 100;
    } else {
      brightness += 10;
    }

    $("#brightness").val(brightness);

    let opacity = brightness / 60;

    $(".on").css({
      opacity: opacity
    });

    changeBrightness();
  });

  $("#down").on("click", () => {
    if (brightness == 0) {
      return;
    }

    brightness -= 10;

    let opacity = brightness / 60;

    $(".on").css({
      opacity: opacity
    });

    $("#brightness").val(brightness);
    changeBrightness();
    if (brightness == 0 && isSwitchedOn) {
      $("#switcher").click();
      return;
    }
  });

  $("#brightness").on("input", () => {
    let input = $("#brightness").val();
    let parse = parseInt(input);

    brightness = parse;

    if (brightness < 0 || brightness > 100) {
      brightness = 100;
    }

    let opacity = brightness / 60;

    $(".on").css({
      opacity: opacity
    });

    if (parse == NaN) {
      $("#brightness").val("0");
    }

    changeBrightness();
  });
});

function sendSwitchRequest() {
  if (isSwitchedOn) {
    fetch("/api/on", {
      method: "post"
    })
      .then(console.log)
      .catch(console.error);
  } else {
    fetch("/api/off", {
      method: "post"
    })
      .then(console.log)
      .catch(console.error);
  }
}

function changeBrightness() {
  if (!isSwitchedOn) $("#switcher").click();
  fetch(`/api/set_brightness/${parseInt(brightness * 2.54)}`, {
    method: "post"
  })
    .then(console.log)
    .catch(console.error);
}
