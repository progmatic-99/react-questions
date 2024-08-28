import { useEffect, useState } from "react";
import "./styles.css";

/*
Play, Pause, reset, stop
mm:ss:ms
*/
export default function App() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [ms, setMS] = useState(0);
  const [play, setPlay] = useState(false);
  const [resume, setResume] = useState(false);
  let timer;
  useEffect(() => {
    if (resume || play) {
      timer = setTimeout(() => {
        setMS((prevVal) => prevVal + 100);
      }, 100);
      if (ms === 1000) {
        setSecond((prevValue) => prevValue + 1);
        setMS(0);
      }
      if (second === 5) {
        setMinute((prevVal) => prevVal + 1);
        setSecond(0);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [ms, second, minute, play, resume]);

  const onPlay = () => {
    setPlay(!play);
  };
  const onPause = () => {
    clearTimeout(timer);
  };
  const onResume = () => {
    setResume(!resume);
  };
  const onReset = () => {
    clearTimeout(timer);
    setMS(0);
    setSecond(0);
    setMinute(0);
    setPlay(false);
    setResume(false);
  };
  return (
    <div className="App">
      <h2>
        {minute}:{second}:{ms}
      </h2>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onResume}>Resume</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
