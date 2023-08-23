import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle, Line, G } from "react-native-svg";

const ClockCircle = ({ startHourVariable, finishHourVariable }) => {
  const [startHourAngle, setStartHourAngle] = useState(0); // Angle in degrees for hour hand
  const [finishHourAngle, setFinishHourAngle] = useState(0); // Angle in degrees for minute hand
  const radius = 100;
  const dashedCircleRadius = radius + 10; // Slightly bigger radius than the main circle
  const center = dashedCircleRadius + 10; // Center of the circle
 
  useEffect(() => {
    // Calculate angles based on the variable values (0 to 23)

    const newStartHourAngle = (startHourVariable / 24) * 360; // Convert to degrees
    const newFinishAngle = (finishHourVariable / 24) * 360; // Convert to degrees

    setStartHourAngle(newStartHourAngle);
    setFinishHourAngle(newFinishAngle);
  }, [startHourVariable, finishHourVariable]);

  return (
    <View>
      <Svg width={center * 2} height={center * 2}>
        {/* Dashed Circle */}
        <Circle
          cx={center}
          cy={center}
          r={dashedCircleRadius}
          stroke="black"
          strokeDasharray="4" // This creates a dashed line
          strokeWidth="2"
          fill="transparent"
        />
        {/* Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#d0dde8"
          strokeWidth="5"
          fill="transparent"
        />

        {/* Hands */}
        <G>
          <Line
            x1={center}
            y1={center}
            x2={
              center +
              radius * 0.9 * Math.cos((startHourAngle - 90) * (Math.PI / 180))
            }
            y2={
              center +
              radius * 0.9 * Math.sin((startHourAngle - 90) * (Math.PI / 180))
            }
            stroke="black"
            strokeWidth="3"
          />

          <Line
            x1={center}
            y1={center}
            x2={
              center +
              radius * 0.9 * Math.cos((finishHourAngle - 90) * (Math.PI / 180))
            }
            y2={
              center +
              radius * 0.9 * Math.sin((finishHourAngle - 90) * (Math.PI / 180))
            }
            stroke="black"
            strokeWidth="3"
          />
        </G>

        {/* Center Dot */}
        <Circle cx={center} cy={center} r="3" fill="green" />
      </Svg>
    </View>
  );
};

export default ClockCircle;
