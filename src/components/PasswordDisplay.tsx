import React from 'react';
import { cn } from '../utils/cn';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, copied, onCopy, onRegenerate }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-300" />
      <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            <p
              className={cn(
                "font-mono text-xl md:text-2xl tracking-wider whitespace-nowrap select-all transition-colors duration-200",
                password ? "text-white" : "text-gray-500"
              )}
            >
              {password || 'Select options to generate'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRegenerate}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-200 hover:rotate-180"
              title="Regenerate"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
            </button>
            <button
              onClick={onCopy}
              disabled={!password}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
                copied
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
                !password && "opacity-50 cursor-not-allowed"
              )}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
