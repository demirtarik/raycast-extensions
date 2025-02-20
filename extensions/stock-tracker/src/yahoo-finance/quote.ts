import fetch from "cross-fetch";

interface QuoteResult {
  quoteResponse: QuoteResponse;
}

export interface QuoteResponse {
  result: Quote[];
  error: any;
}

export interface Quote {
  symbol?: string;
  currency?: string;
  shortName?: string;
  displayName?: string;
  marketState?: "POST" | "PRE" | "REGULAR";
  typeDisp?: string;
  regularMarketPrice?: number;
  regularMarketPreviousClose?: number;
  regularMarketOpen?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  preMarketPrice?: number;
  preMarketPreviousClose?: number;
  preMarketOpen?: number;
  preMarketChange?: number;
  preMarketChangePercent?: number;
  postMarketPrice?: number;
  postMarketPreviousClose?: number;
  postMarketOpen?: number;
  postMarketChange?: number;
  postMarketChangePercent?: number;
  marketCap?: number;
  fullExchangeName?: string;
  exchange?: string;
}

export async function quote(symbols: string[], abortSignal: AbortSignal): Promise<QuoteResponse> {
  const url = `https://query1.finance.yahoo.com/v6/finance/quote?symbols=${symbols.join(",")}`;
  return ((await (await fetch(url, { signal: abortSignal })).json()) as QuoteResult).quoteResponse;
}

export interface PriceInfo {
  price?: number;
  change?: number;
  changePercent?: number;
}

export function currentPriceInfo(quote: Quote): PriceInfo {
  switch (quote.marketState) {
    case "POST":
      return {
        price: quote.postMarketPrice,
        change: quote.postMarketChange,
        changePercent: quote.postMarketChangePercent,
      };
    case "PRE":
      return {
        price: quote.preMarketPrice,
        change: quote.preMarketChange,
        changePercent: quote.preMarketChangePercent,
      };
    default:
      return {
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange,
        changePercent: quote.regularMarketChangePercent,
      };
  }
}
