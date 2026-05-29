import { useState, useCallback, useEffect } from 'react';

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export type StrengthLevel = 'empty' | 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

function generatePassword(options: PasswordOptions): string {
  let charset = '';
  const guaranteedChars: string[] = [];

  if (options.uppercase) {
    charset += UPPERCASE;
    guaranteedChars.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (options.lowercase) {
    charset += LOWERCASE;
    guaranteedChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }
  if (options.numbers) {
    charset += NUMBERS;
    guaranteedChars.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  }
  if (options.symbols) {
    charset += SYMBOLS;
    guaranteedChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  if (charset === '') return '';

  const remainingLength = Math.max(0, options.length - guaranteedChars.length);
  const remainingChars: string[] = [];

  for (let i = 0; i < remainingLength; i++) {
    remainingChars.push(charset[Math.floor(Math.random() * charset.length)]);
  }

  // Combine guaranteed + remaining and shuffle
  const allChars = [...guaranteedChars, ...remainingChars];
  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.slice(0, options.length).join('');
}

export function calculateStrength(password: string, options: PasswordOptions): { level: StrengthLevel; score: number; label: string } {
  if (!password) return { level: 'empty', score: 0, label: '' };

  let score = 0;
  const len = password.length;

  // Length scoring
  if (len >= 8) score += 1;
  if (len >= 12) score += 1;
  if (len >= 16) score += 1;
  if (len >= 20) score += 1;

  // Character variety scoring
  const activeTypes = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;
  score += activeTypes;

  // Bonus for long + diverse
  if (len >= 16 && activeTypes >= 3) score += 1;
  if (len >= 20 && activeTypes >= 4) score += 1;

  if (score <= 2) return { level: 'very-weak', score: 1, label: 'Very Weak' };
  if (score <= 3) return { level: 'weak', score: 2, label: 'Weak' };
  if (score <= 5) return { level: 'fair', score: 3, label: 'Fair' };
  if (score <= 7) return { level: 'strong', score: 4, label: 'Strong' };
  return { level: 'very-strong', score: 5, label: 'Very Strong' };
}

export function usePasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pwd = generatePassword(options);
    setPassword(pwd);
    setCopied(false);
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);

  const toggleOption = useCallback((key: keyof Omit<PasswordOptions, 'length'>) => {
    setOptions(prev => {
      const activeCount = [prev.uppercase, prev.lowercase, prev.numbers, prev.symbols].filter(Boolean).length;
      // Prevent disabling the last active option
      if (prev[key] && activeCount <= 1) return prev;
      return { ...prev, [key]: !prev[key] };
    });
  }, []);

  const setLength = useCallback((length: number) => {
    setOptions(prev => ({ ...prev, length }));
  }, []);

  const strength = calculateStrength(password, options);

  return {
    password,
    options,
    strength,
    copied,
    generate,
    copyToClipboard,
    toggleOption,
    setLength,
  };
}
