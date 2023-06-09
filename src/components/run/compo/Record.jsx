import { useEffect, useState } from "react";
import BtnStop from "../../ui/BtnStop.jsx";
import classes from "../StartPlogging.module.css";
import { useNavigate } from "react-router-dom";

export default function Record({ isStart }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [walk, setWalk] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (isStart) {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      const walk = setInterval(() => {
        let add = (Math.random() * 10).toFixed(0);
        setWalk((prev) => prev + Number(add));
      }, 5000);

      const distance = setInterval(() => {
        setDistance((prev) => {
          const distance = (prev + 0.01).toFixed(2);
          return Number(distance);
        });
      }, 13000);

      return () => {
        clearInterval(timer);
        clearInterval(walk);
        clearInterval(distance);
      };
    }
  }, [isStart]);

  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor((time % 3600) % 60);
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  return (
    <section className={`pddSide20 ${classes.recodeBox}`}>
      <ul className={`dsFlex ${classes.listMeasure}`}>
        <li>
          <strong className={classes.value}>{timeString}</strong>
          <span className={classes.unit}>시간</span>
        </li>
        <li>
          <strong className={classes.value}>{walk}</strong>
          <span className={classes.unit}>걸음</span>
        </li>
        <li>
          <strong className={classes.value}>{distance}</strong>
          <span className={classes.unit}>거리(km)</span>
        </li>
      </ul>
      <div className={`dsFlex btnBox`}>
        <button
          type="button"
          className={`btnCircle`}
          onClick={() => {
            console.log("일시정지");
            navigate("/TechnomadFront/result");
          }}
        >
          <span className="hide">일시정지</span>
          <BtnStop />
        </button>
      </div>
    </section>
  );
}
