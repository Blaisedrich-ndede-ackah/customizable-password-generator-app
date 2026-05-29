import React from 'react';
import { cn } from '../utils/cn';
import type { PasswordOptions } from '../hooks/usePasswordGenerator';

interface CharacterTogglesProps {
  options: PasswordOptions;
  onToggle: (key: keyof Omit<PasswordOptions, 'length'>) => void;
}

const toggleItems: { key: keyof Omit<PasswordOptions, 'length'>; label: string; example: string; icon: string }[] = [
  { key: 'uppercase', label: 'Uppercase', example: 'A-Z', icon: 'A' },
  { key: 'lowercase', label: 'Lowercase', example: 'a-z', icon: 'a' },
  { key: 'numbers', label: 'Numbers', example: '0-9', icon: '#' },
  { key: 'symbols', label: 'Symbols', example: '!@#$', icon: '&' },
];

export const CharacterToggles: React.FC<CharacterTogglesProps> = ({ options, onToggle }) => {
  const activeCount = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
        Character Types
      </label>
      <div className="grid grid-cols-2 gap-3">
        {toggleItems.map(({ key, label, example, icon }) => {
          const isActive = options[key];
          const isLastActive = isActive && activeCount <= 1;

          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={cn(
                "relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left group",
                isActive
                  ? "bg-violet-500/10 border-violet-500/30 hover:border-violet-500/50"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]",
                isLastActive && "cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold font-mono transition-all duration-200",
                  isActive
                    ? "bg-violet-500/20 text-violet-400"
                    : "bg-white/5 text-gray-600"
                )}
              >
                {icon}
              </div>
              <div className="flex-1">
                <div className={cn(
                  "font-semibold text-sm transition-colors",
                  isActive ? "text-white" : "text-gray-500"
                )}>
                  {label}
                </div>
                <div className={cn(
                  "text-xs font-mono transition-colors",
                  isActive ? "text-gray-400" : "text-gray-600"
                )}>
                  {example}
                </div>
              </div>
              {/* Toggle indicator */}
              <div
                className={cn(
                  "w-10 h-6 rounded-full p-0.5 transition-all duration-200",
                  isActive ? "bg-violet-600" : "bg-gray-700"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                    isActive ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
