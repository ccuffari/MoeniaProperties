import React from "react";

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-center text-white font-sans">
      {/* Animazione testo */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
        Under Maintenance
      </h1>
      <p className="text-lg md:text-xl">
        We're working hard to improve your experience. Please check back soon!
      </p>
    </div>
  );
}
