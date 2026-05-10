import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatIsk = (amount: number): string => {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)}B ISK`;
  if (amount >= 1_000_000)     return `${(amount / 1_000_000).toFixed(2)}M ISK`;
  if (amount >= 1_000)         return `${(amount / 1_000).toFixed(2)}K ISK`;
  return `${amount.toLocaleString()} ISK`;
};

export const formatPct = (value: number): string => `${(value * 100).toFixed(1)}%`;
