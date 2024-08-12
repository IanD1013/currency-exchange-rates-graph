import { apiUrl } from "./config.js";

export class CurrencyService {
  async getTimeSeries(baseCurrency, date) {
    try {
      const requestUrl = `${apiUrl}/${date}..?from=${baseCurrency}`;
      const response = await fetch(requestUrl, { method: "GET" });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
}
