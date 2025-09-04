
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CPI, YEARS } from './constants';
import type { Result } from './types';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const maxYear = Math.max(...YEARS);
  const [amount, setAmount] = useState<string>('1.00');
  const [fromYear, setFromYear] = useState<number>(1985);
  const [toYear, setToYear] = useState<number>(maxYear);
  const [autoRecalculate, setAutoRecalculate] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);

  const nf = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }), []);
  const pf = useMemo(() => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }), []);

  const calculate = useCallback(() => {
    setError('');
    const amt = parseFloat(amount);
    const y1 = fromYear;
    const y2 = toYear;

    if (!CPI[y1] || !CPI[y2]) {
      setError("Selected years are outside the available CPI dataset.");
      setResult(null);
      return;
    }
    if (isNaN(amt) || amt < 0) {
      setError("Enter a valid, non-negative dollar amount.");
      setResult(null);
      return;
    }

    const ratio = CPI[y2] / CPI[y1];
    const convertedAmount = amt * ratio;
    const spanYears = Math.abs(y2 - y1);
    const avgAnnualRate = spanYears === 0 ? 0 : Math.pow(ratio, 1 / spanYears) - 1;
    const cumulativeChange = ratio - 1;

    setResult({
      fromAmount: amt,
      fromYear: y1,
      toYear: y2,
      convertedAmount,
      avgAnnualRate,
      cumulativeChange,
    });
  }, [amount, fromYear, toYear]);

  const handleSwapYears = () => {
    setFromYear(toYear);
    setToYear(fromYear);
  };

  const handleReset = () => {
    setAmount('1.00');
    setFromYear(YEARS[0]);
    setToYear(YEARS[YEARS.length - 1]);
    setError('');
    setResult(null);
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial calculation on mount

  useEffect(() => {
    if (autoRecalculate) {
      calculate();
    }
  }, [amount, fromYear, toYear, autoRecalculate, calculate]);

  return (
    <div className="text-[#e8ecf1] font-sans font-medium min-h-screen" style={{ background: 'radial-gradient(1200px 800px at 20% -10%, #172132 0%, transparent 55%), radial-gradient(1100px 700px at 120% 20%, #101a27 0%, transparent 60%), #0b0e12' }}>
      <div className="max-w-4xl mx-auto px-4 py-[clamp(18px,5vw,60px)]">
        <Header />
        <main
          className="bg-gradient-to-b from-white/5 to-transparent bg-[#121821] border border-[#1e2733] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          aria-label="Inflation calculator"
        >
          <CalculatorForm
            amount={amount}
            setAmount={setAmount}
            fromYear={fromYear}
            setFromYear={setFromYear}
            toYear={toYear}
            setToYear={setToYear}
            autoRecalculate={autoRecalculate}
            setAutoRecalculate={setAutoRecalculate}
            onCalculate={calculate}
            onSwap={handleSwapYears}
            onReset={handleReset}
          />

          {error && (
            <div className="text-[#ff6a6a] text-sm mt-4" role="status" aria-live="polite">
              {error}
            </div>
          )}

          {result && !error && (
            <ResultDisplay result={result} nf={nf} pf={pf} />
          )}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;
