import React, { useState } from "react";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const toastTimeoutMs = 1500;

export default function App() {
  const [colorCount, setColorCount] = useState(5);
  const [colors, setColors] = useState(generateColors(5));
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);

  // Generate random colors
  function generateColors(count) {
    return Array.from({ length: count }, () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
    );
  }

  const regenerateColors = () => {
    setColors(generateColors(colorCount));
  };

  const onColorCountChange = (e) => {
    const val = +e.target.value;
    setColorCount(val);
    setColors(generateColors(val));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleCopy = (color) => {
    copyToClipboard(color);
    setToast(`Copied ${color} to clipboard!`);
    setTimeout(() => setToast(null), toastTimeoutMs);
  };

  const handleCopyAll = () => {
    const allColors = colors.map((c) => c.toUpperCase()).join(", ");
    copyToClipboard(allColors);
    setToast("Copied all colors to clipboard!");
    setTimeout(() => setToast(null), toastTimeoutMs);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } flex flex-col items-center p-6`}
    >
      {/* Header */}
      <header className="w-full max-w-4xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          🎨 Colour Palette Generator
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-md border transition 
            ${
              darkMode
                ? "bg-white text-black hover:bg-gray-400 hover:text-black border-black"
                : "bg-black text-white hover:bg-gray-200 hover:text-black border-white"
            }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Controls */}
      <section
        className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8"
        aria-labelledby="palette-controls-label"
      >
        <label
          htmlFor="color-count"
          className={`block mb-4 font-semibold ${
            darkMode ? "text-black" : "text-black"
          }`}
        >
          <span id="palette-controls-label">
            Number of Colours: {colorCount}
          </span>
          <input
            id="color-count"
            type="range"
            min="3"
            max="9"
            value={colorCount}
            onChange={onColorCountChange}
            className="w-full mt-2 cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-valuemin={3}
            aria-valuemax={9}
            aria-valuenow={colorCount}
          />
        </label>
        <div className="flex gap-4 mt-2">
          <button
            onClick={regenerateColors}
            className="flex-1 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Generate New Palette
          </button>
          <button
            onClick={handleCopyAll}
            className="flex-1 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Copy all colors to clipboard"
          >
            Copy All Colors
          </button>
        </div>
      </section>

      {/* Palette display */}
      <main className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {colors.map((color, idx) => (
          <div
            key={idx}
            onClick={() => handleCopy(color)}
            style={{ backgroundColor: color }}
            className="cursor-pointer rounded-lg shadow-lg h-40 flex flex-col justify-center items-center text-white text-lg font-semibold select-none transition-transform transform hover:scale-105"
            aria-label={`Color swatch ${color}. Click to copy hex code.`}
            title="Click to copy"
          >
            <span className="drop-shadow-md">{color.toUpperCase()}</span>
          </div>
        ))}
      </main>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg animate-fadeInOut z-50">
          {toast}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        Made using React & Tailwind CSS
      </footer>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 1.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
