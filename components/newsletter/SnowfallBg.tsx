"use client";
import React from "react";
import Snowfall from "react-snowfall";

type Props = {};

const SnowfallBg = (props: Props) => {
  return (
    <Snowfall
      // Changes the snowflake color
      color="#fff"
      //   Mange the radius of the snow dit
      radius={[0.5, 0.8]}
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={200}
    />
  );
};

export default SnowfallBg;
