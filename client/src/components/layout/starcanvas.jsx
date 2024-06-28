import React, { useRef, useEffect } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    let stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speedX: Math.random() * 0.5 - 0.25, // Horizontal movement speed
      speedY: Math.random() * 0.5 - 0.25, // Vertical movement speed
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#FFF";
      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around the edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animate); // Cleanup animation on component unmount
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0 z-0"></canvas>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-full absolute inset-0 z-auto">
    <StarBackground />
  </div>
);

export default StarsCanvas;
