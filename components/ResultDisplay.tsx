
import React from 'react';
import type { ResultDisplayProps } from '../types';

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, nf, pf }) => {
  const { fromAmount, fromYear, toYear, convertedAmount, avgAnnualRate, cumulativeChange } = result;

  const spanYears = Math.abs(toYear - fromYear);
  const direction = convertedAmount >= fromAmount ? "increase" : "decrease";
  
  const purchasingPowerText = convertedAmount >= fromAmount
    ? `The value of ${nf.format(fromAmount)} in ${fromYear} has decreased in purchasing power, meaning it would now require this larger amount to buy the same goods and services.`
    : `Prices fell over this period, so ${nf.format(fromAmount)} in ${fromYear} would buy more than the equivalent value in ${toYear}.`;

  return (
    <div className="mt-5 border-t border-dashed border-[#1e2733] pt-5">
      <div 
        className="text-[clamp(26px,4.5vw,40px)] font-extrabold tracking-wide"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {nf.format(convertedAmount)}
      </div>
      <div className="text-[#9aa6b2] mt-1">
        is worth in {toYear} dollars.
      </div>
      
      <div className="mt-4 text-[#d3dae3] leading-relaxed space-y-4">
        <p>
          An amount of <span className="font-semibold text-white">{nf.format(fromAmount)}</span> in {fromYear} has the same purchasing power as <span className="text-[#7ef0c7] font-semibold">{nf.format(convertedAmount)}</span> in {toYear}.
        </p>

        {spanYears > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm p-4 bg-[#0f141d] border border-[#1e2733] rounded-lg">
            <div>
              <div className="text-[#9aa6b2]">Total Change</div>
              <div className="font-semibold text-base text-white">{pf.format(Math.abs(cumulativeChange))} {direction}</div>
            </div>
            <div>
              <div className="text-[#9aa6b2]">Avg. Annual Inflation</div>
              <div className="font-semibold text-base text-white">{pf.format(Math.abs(avgAnnualRate))}</div>
            </div>
          </div>
        )}

        <p className="text-sm text-[#9aa6b2]">
          {purchasingPowerText}
        </p>
      </div>
    </div>
  );
};
