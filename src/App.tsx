import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { PasswordDisplay } from './components/PasswordDisplay';
import { LengthSlider } from './components/LengthSlider';
import { CharacterToggles } from './components/CharacterToggles';
import { StrengthIndicator } from './components/StrengthIndicator';

function App() {
  const {
    password,
    options,
    strength,
    copied,
    generate,
    copyToClipboard,
    toggleOption,
    setLength,
  } = usePasswordGenerator();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4 selection:bg-violet-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            Secure Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Password
            </span>{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>
          <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">
            Create strong, unique passwords to keep your accounts safe. Customize length and character types below.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/[0.06] shadow-2xl shadow-black/40 overflow-hidden">
          {/* Password Display Section */}
          <div className="p-6 pb-5">
            <PasswordDisplay
              password={password}
              copied={copied}
              onCopy={copyToClipboard}
              onRegenerate={generate}
            />
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Controls Section */}
          <div className="p-6 space-y-6">
            <LengthSlider length={options.length} onChange={setLength} />

            <CharacterToggles options={options} onToggle={toggleOption} />

            <StrengthIndicator
              level={strength.level}
              score={strength.score}
              label={strength.label}
            />

            {/* Generate Button */}
            <button
              onClick={generate}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-xl shadow-violet-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                Generate Password
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            🔒 All passwords are generated locally in your browser. Nothing is stored or transmitted.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
