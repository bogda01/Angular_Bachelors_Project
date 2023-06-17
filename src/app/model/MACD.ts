export interface MACDData {
  [date: string]: {
    'MACD': number;
    'Signal': number;
  };
}
