import React from 'react';

interface LengthSliderProps {
  length: number;
  onChange: (length: number) => void;
}

export const LengthSlider: React.FC<LengthSliderProps> = ({ length, onChange }) => {
  const min = 4;
  const max = 64;
  const percentage = ((length - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Password Length
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(min, length - 1))}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all text-sm font-bold"
          >
            −
          </button>
          <span className="text-2xl font-bold text-white tabular-nums min-w-[3ch] text-center font-mono">
            {length}
          </span>
          <button
            onClick={() => onChange(Math.min(max, length + 1))}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all text-sm font-bold"
          >
            +
          </button>
        </div>
      </div>
      <div className="relative py-2">
        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={length}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-lg shadow-violet-500/30 border-2 border-violet-500 pointer-events-none transition-all duration-150"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
