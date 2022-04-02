import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Timer } from "../../Timer/Timer";
import brownNoise from "../../assets/sounds/brown-noise-1-hour.mp3";
import './Home.scss';

type Props = {};

export const HomePage = (props: Props) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState(0);
  const [meditationFormOpen, setMeditationFormOpen] = useState(true);

  return (
    <div>
      <h2>Welcome To Simple Meditate</h2>
      {meditationFormOpen ? (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            setMeditationFormOpen(false);
          }}
        >
          Time:{" "}
          <input
            onChange={(ev) => {
              setMinutes(+ev.target.value);
            }}
            type="number"
            value={minutes}
          />
          <button disabled={!minutes}>Start</button>
        </form>
      ) : (
        <Meditation minutes={minutes} />
      )}
    </div>
  );
};
interface MeditationProps {
  minutes: number;
}
const Meditation = ({ minutes }: MeditationProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [startingIn, setStartingIn] = useState(3);
  const [intervalId, setIntervalId] = useState<number | undefined>();
  const [started, setStarted] = useState(false);
  const [end, setEnd] = useState(false);

  const onStart = () => {
    audio?.play();
  };

  useEffect(() => {
    var audio = new Audio(brownNoise);
    setAudio(audio);
    const _intervalId = window.setInterval(
      () => setStartingIn((prev) => prev - 1),
      1000
    );
    setIntervalId(_intervalId as number);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (startingIn !== 0) return;

    clearTimeout(intervalId);
    setStarted(true);
    onStart();
  }, [startingIn]);
  const onEnd = () => {
    setEnd(true);
    if (!audio) return;

    var fadeout = setInterval(function () {
      let vol = audio.volume;
      if (vol > 0) {
        vol -= 0.05;
        if (vol < 0) vol = 0;
        audio.volume = vol;
      } else clearInterval(fadeout);
    }, 50);
  };
  return (
    <div>
      {!started && <h2>Starting in {startingIn}</h2>}
      {started && !end && (
        <div className="timer-window">
          <Timer onEnd={onEnd} initialMinutes={minutes} />
          <button onClick={() => onEnd()}>Stop</button>
        </div>
      )}
      {end && (
        <div>
          <h2>Good Job!</h2>
          <span className={"mute"}>Maybe save that preset?</span>
        </div>
      )}
    </div>
  );
};
