import React from "react";
import { ThreeCircles } from "react-loader-spinner";
const FullScreenLoader = () => {
  return (
    <div className="absolute w-full bg-white h-screen z-10">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ThreeCircles
          height="100"
          width="100"
          color="#805AD5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
