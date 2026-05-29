import React from 'react';
import { cn } from '../utils/cn';
import type { StrengthLevel } from '../hooks/usePasswordGenerator';

interface StrengthIndicatorProps {
  level: StrengthLevel;
  score: number;
  label: string;
}

const strengthConfig: Record<string, { color: string; barColor: string; bgColor: string; textColor: string }> = {
  'empty': { color: 'text-gray-600', barColor: 'bg-gray-700', bgColor: 'bg-gray-800/50', textColor: 'text-gray-600' },
  'very-weak': { color: 'text-red-500', barColor: 'bg-red-500', bgColor: 'bg-red-500/5', textColor: 'text-red-400' },
  'weak': { color: 'text-orange-500', barColor: 'bg-orange-500', bgColor: 'bg-orange-500/5', textColor: 'text-orange-400' },
  'fair': { color: 'text-yellow-500', barColor: 'bg-yellow-500', bgColor: 'bg-yellow-500/5', textColor: 'text-yellow-400' },
  'strong': { color: 'text-emerald-500', barColor: 'bg-emerald-500', bgColor: 'bg-emerald-500/5', textColor: 'text-emerald-400' },
  'very-strong': { color: 'text-cyan-400', barColor: 'bg-gradient-to-r from-emerald-500 to-cyan-400', bgColor: 'bg-cyan-500/5', textColor: 'text-cyan-400' },
};

export const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ level, score, label }) => {
  const config = strengthConfig[level] || strengthConfig['empty'];
  const totalBars = 5;

  return (
    <div className={cn("rounded-xl border border-white/5 p-4 transition-colors duration-300", config.bgColor)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Strength
        </span>
        <span className={cn("text-sm font-bold uppercase tracking-wider transition-colors duration-300", config.textColor)}>
          {label || '—'}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: totalBars }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              i < score ? config.barColor : "bg-gray-800"
            )}
          />
        ))}
      </div>
      {level !== 'empty' && (
        <div className="mt-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-colors", config.color)}
          >
            {score >= 4 ? (
              <>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </>
            ) : (
              <>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
              </>
            )}
          </svg>
          <span className="text-xs text-gray-500">
            {score <= 2 && "Add more character types and increase length"}
            {score === 3 && "Consider adding more character types or increasing length"}
            {score === 4 && "Good password — consider adding symbols for extra security"}
            {score >= 5 && "Excellent! This password is very secure"}
          </span>
        </div>
      )}
    </div>
  );
};
