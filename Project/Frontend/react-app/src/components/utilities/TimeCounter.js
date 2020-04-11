import React from "react";

function TimeCounting() {
  var countDownDate = new Date("Jul 5, 2020 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("count-days").innerHTML = days + "d";
    document.getElementById("count-hours").innerHTML = hours + "h";
    document.getElementById("count-minutes").innerHTML = minutes + "m";
    document.getElementById("count-seconds").innerHTML = seconds + "s";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("count-days").innerHTML = "EXPIRED";
      document.getElementById("count-hours").innerHTML = "EXPIRED";
      document.getElementById("count-minutes").innerHTML = "EXPIRED";
      document.getElementById("count-seconds").innerHTML = "EXPIRED";
    }
  }, 1000);
  return (
    <div className="counting">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="counting-box">
            <div className="counting__number" id="count-days">
              90
            </div>
            <div className="counting__text">days</div>
          </div>
          <div className="counting-box">
            <div className="counting__number" id="count-hours">
              90
            </div>
            <div className="counting__text">hours</div>
          </div>
          <div className="counting-box">
            <div className="counting__number" id="count-minutes">
              90
            </div>
            <div className="counting__text">minutes</div>
          </div>
          <div className="counting-box">
            <div className="counting__number" id="count-seconds">
              90
            </div>
            <div className="counting__text">seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeCounting;
