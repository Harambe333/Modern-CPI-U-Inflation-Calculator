
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center mb-8">
    <div className="inline-flex gap-2 items-center py-1.5 px-3 rounded-full border border-[#1e2733] text-[#9aa6b2] text-sm">
      Modern CPI-U Inflation Calculator
    </div>
    <h1 className="font-bold tracking-wide leading-tight text-[clamp(22px,2.6vw,34px)] mt-4 mb-2 text-white">
      Compare the value of money across years
    </h1>
    <p className="text-[#9aa6b2]">Enter an amount and pick two years to see how prices changed.</p>
  </header>
);
