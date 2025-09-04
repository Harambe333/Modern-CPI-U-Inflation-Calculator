
export interface Result {
  fromAmount: number;
  fromYear: number;
  toYear: number;
  convertedAmount: number;
  avgAnnualRate: number;
  cumulativeChange: number;
}

export interface CalculatorFormProps {
  amount: string;
  setAmount: (value: string) => void;
  fromYear: number;
  setFromYear: (value: number) => void;
  toYear: number;
  setToYear: (value: number) => void;
  autoRecalculate: boolean;
  setAutoRecalculate: (value: boolean) => void;
  onCalculate: () => void;
  onSwap: () => void;
  onReset: () => void;
}

export interface ResultDisplayProps {
    result: Result;
    nf: Intl.NumberFormat;
    pf: Intl.NumberFormat;
}
