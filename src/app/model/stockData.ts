export interface StockData {
  [date: string]: {
    'Adj Close': number;
    'Volume': number;
  };
}
