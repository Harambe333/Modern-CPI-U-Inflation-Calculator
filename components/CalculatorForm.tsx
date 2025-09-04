
import React from 'react';
import type { CalculatorFormProps } from '../types';
import { YEARS } from '../constants';

const baseInputStyles = "w-full bg-[#0f141d] text-[#e8ecf1] border border-[#1e2733] rounded-xl px-4 py-3.5 text-base outline-none transition-all duration-150 focus:border-[#2b3a4e] focus:ring-2 focus:ring-[#588cff]/20";
const focusRingStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6aa7ff] focus-visible:ring-offset-[#121821]";

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  amount, setAmount, fromYear, setFromYear, toYear, setToYear,
  autoRecalculate, setAutoRecalculate,
  onCalculate, onSwap, onReset,
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.8fr_0.8fr] gap-4 items-end">
      <div>
        <label htmlFor="amount" className="block text-sm text-[#9aa6b2] mb-2 ml-1 tracking-wide">
          Dollar amount
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#9aa6b2] pointer-events-none">
            $
          </span>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="1.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            className={`${baseInputStyles} pl-7`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="fromYear" className="block text-sm text-[#9aa6b2] mb-2 ml-1 tracking-wide">
          in (year)
        </label>
        <select
          id="fromYear"
          aria-label="From year"
          value={fromYear}
          onChange={(e) => setFromYear(parseInt(e.target.value, 10))}
          className={`${baseInputStyles} ${focusRingStyles} rounded-xl`}
        >
          {YEARS.map(y => <option key={`from-${y}`} value={y}>{y}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="toYear" className="block text-sm text-[#9aa6b2] mb-2 ml-1 tracking-wide">
          compared to (year)
        </label>
        <select
          id="toYear"
          aria-label="To year"
          value={toYear}
          onChange={(e) => setToYear(parseInt(e.target.value, 10))}
          className={`${baseInputStyles} ${focusRingStyles} rounded-xl`}
        >
          {YEARS.map(y => <option key={`to-${y}`} value={y}>{y}</option>)}
        </select>
      </div>
    </div>

    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onCalculate}
          title="Calculate inflation"
          className={`px-4 py-3 rounded-xl bg-gradient-to-b from-[#2a3242] to-[#222a37] text-[#eaf1ff] font-bold tracking-wide cursor-pointer transition-all duration-75 hover:brightness-105 active:translate-y-px ${focusRingStyles}`}
        >
          Calculate
        </button>
        <button
          onClick={onSwap}
          title="Swap years"
          className={`px-4 py-3 rounded-xl bg-transparent border border-[#1e2733] text-white transition-all duration-150 hover:border-[#2b3a4e] ${focusRingStyles}`}
        >
          Swap years ↔
        </button>
        <button
          onClick={onReset}
          title="Reset"
          className={`px-4 py-3 rounded-xl bg-transparent border border-transparent text-[#9aa6b2] font-semibold hover:text-white ${focusRingStyles}`}
        >
          Reset
        </button>
      </div>
      <label
        htmlFor="auto"
        className={`flex items-center gap-2 text-[#9aa6b2] cursor-pointer rounded-lg p-2 border border-transparent hover:border-[#2b3a4e] hover:text-white transition-colors ${focusRingStyles}`}
      >
        <input
          type="checkbox"
          id="auto"
          checked={autoRecalculate}
          onChange={(e) => setAutoRecalculate(e.target.checked)}
          className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#6aa7ff] focus:ring-0 focus:ring-offset-0"
          style={{ accentColor: '#6aa7ff' }}
        />
        Auto-recalculate
      </label>
    </div>
  </>
);
