import { useState, useRef, useEffect } from "react";

/*
Multi-Timer:

Input: time in ms (5)
Button: 'Create Timer' - onClick it will create new timer

Timer:
	- Displays the time (0 - 5s)
  - Actions:
  	- Stop: stops the timer
    - Pause: pause the timer
    - Play: resumes the timer
----------------
Apporach:
- Multi timer parent component
	- input text bar
  - Timer Child component
  - timerArrays [{}]
- Timer child
	- unique id, timer id
*/
export default function MultiTimer() {
  const [timerInfo, setTimerInfo] = useState([]);
  const timerValueRef = useRef(null);
  const handleInput = () => {
    const time = parseInt(timerValueRef.current.value);
    // console.log(time);
    if (time === "") return;
    setTimerInfo((prevValue) => {
      return [
        ...prevValue,
        {
          id: Date.now(),
          time: time,
          startTime: 0,
          state: "start",
        },
      ];
    });
    timerValueRef.current.value = "";
  };

  const playTimer = (timer, stoppedAtTime) => {
    // console.log(timer);
    if (timer.state === "stop") return;
    const newTimer = timerInfo.map((t) => {
      if (t.id === timer.id) {
        t.state = "start";
        t.id = Date.now();
        t.startTime = stoppedAtTime;
      }
      return t;
    });
    console.log(newTimer);
    setTimerInfo(newTimer);
  };

  const pauseTimer = (timer) => {
    if (timer.state === "stop") return;
    if (timer.state === "start") {
      const newTimer = timerInfo.map((t) => {
        if (t.id === timer.id) {
          t.state = "pause";
        }
        return t;
      });
      setTimerInfo(newTimer);
    }
  };

  const stopTimer = (timer) => {
    const newTimer = timerInfo.map((t) => {
      if (t.id === timer.id) {
        t.state = "stop";
      }
      return t;
    });
    setTimerInfo(newTimer);
    // console.log(timerInfo);
  };

  return (
    <main>
      <div className="timer-input">
        <input
          type="text"
          placeholder="Enter time in seconds"
          ref={timerValueRef}
        />
        <button onClick={handleInput}>Create Timer</button>
      </div>
      {timerInfo.map((timer) => {
        return (
          <Timer
            key={timer.id}
            timer={timer}
            playTimer={playTimer}
            pauseTimer={pauseTimer}
            stopTimer={stopTimer}
          />
        );
      })}
    </main>
  );
}


function Timer({ timer, playTimer, pauseTimer, stopTimer }) {
  const [second, setSecond] = useState(timer.startTime);
  const timerIntervalRef = useRef(null);
  useEffect(() => {
    // console.log(timerIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (second === timer.time) {
      stopTimer(timer);
    }
    if (timer.state === "start") {
      //   console.log(timerIntervalRef.current);

      timerIntervalRef.current = setInterval(() => {
        setSecond((prevVal) => prevVal + 1);
      }, 1000);
      //   console.log(timerIntervalRef.current);
    }
    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, [second, timer]);
  // useEffect(() => {
  //   if (timer.state === "stop" || timer.state === "pause") {
  //     clearInterval(timerIntervalRef.current);
  //   }
  // }, [timer]);
  return (
    <div className="timer">
      <p>{second}</p>
      <button onClick={() => playTimer(timer, second)}>Play</button>
      <button onClick={() => pauseTimer(timer)}>Pause</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
