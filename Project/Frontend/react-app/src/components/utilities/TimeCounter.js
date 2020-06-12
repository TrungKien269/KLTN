import React, { useState, useEffect, useMemo } from "react";
import ProductSlidePromotion from "../products/ProductSlidePromotion";
import { useTranslation } from 'react-i18next';

function TimeCounting(props) {
  const [countDownDate, setCountDownDate] = 
  useState(new Date(props.endedDate).getTime());
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { t, i18n } = useTranslation();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      setDays("EXPIRED");
      setHours("EXPIRED");
      setMinutes("EXPIRED");
      setSeconds("EXPIRED");
    }
  }, 1000);

  return (
    <div className="counting">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="counting-box">
            <div className="counting__number" id="count-days">
              {days}
            </div>
            <div className="counting__text">{t('days')}</div>
          </div>
          <div className="counting-box">
            <div className="counting__number" id="count-hours">
              {hours}
            </div>
            <div className="counting__text">{t('hours')}</div>
          </div>
          <div className="counting-box">
            <div className="counting__number" id="count-minutes">
              {minutes}
            </div>
            <div className="counting__text">{t('minutes')}</div>
          </div>
          <div className="counting-box">
            <div className="counting__number" id="count-seconds">
              {seconds}
            </div>
            <div className="counting__text">{t('seconds')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeCounting;
