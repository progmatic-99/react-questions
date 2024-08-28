import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  useEffect(() => {
    let delay;
    switch (color) {
      case "red":
        delay = 4000;
        break;
      case "yellow":
        delay = 500;
        break;
      case "green":
        delay = 3000;
        break;
    }
    const timer = setTimeout(() => {
      let nextColor;
      if (color === "red") {
        nextColor = "yellow";
      } else if (color === "green") {
        nextColor = "red";
      } else if (color === "yellow") {
        nextColor = "green";
      }
      console.log(color, nextColor);
      setColor(nextColor);
    }, delay);
    return () => {
      console.log(color);
      clearTimeout(timer);
    };
  }, [color]);

  return (
    <div className="traffic-light-parent">
      {
        ["red", "yellow", "green"].map((lightColor, _) => {
          return (
            <div
        className="traffic-light-div"
        key={lightColor}
        style={{ backgroundColor: color === lightColor ? lightColor : "" }}
      ></div>
          )
        })
      }
      {/* <div
        className="traffic-light-div"
        style={{ backgroundColor: color === "red" ? "red" : "" }}
      ></div>
      <div
        className="traffic-light-div"
        style={{ backgroundColor: color === "yellow" ? "yellow" : "" }}
      ></div>
      <div
        className="traffic-light-div"
        style={{ backgroundColor: color === "green" ? "green" : "" }}
      ></div> */}
    </div>
  );
};

export default TrafficLight