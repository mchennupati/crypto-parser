function parseFloatEuropean(num) {
    return parseFloat(num.replace(',', '.'));
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  }
  
 export default function parseAndAggregate(csv) {
    const lines = csv.split("\n");
    const balances = {};
    const fees = {};
   
    const lastDates = {};
  
    // Start from index 1 to skip the header line
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split("\t");
  
      if (columns.length < 10) continue;
  
      const date = columns[1];
      const tradePair = columns[2];
      const action = columns[3];
      const baseCurrency = tradePair.split("/")[0];
      const quoteCurrency = tradePair.split("/")[1];
      const baseAmount = parseFloatEuropean(columns[5]);
      const quoteAmount = parseFloatEuropean(columns[7]);
      const feeAmount = parseFloatEuropean(columns[8]);
      const feeCurrency = columns[9];
  
      if (!balances[baseCurrency]) {
        balances[baseCurrency] = 0;
      }
      if (!balances[quoteCurrency]) {
        balances[quoteCurrency] = 0;
      }
      if (!fees[feeCurrency]) {
        fees[feeCurrency] = 0;
      }
  
      if (!lastDates[tradePair]) {
        lastDates[tradePair] = date;
      } else {
        lastDates[tradePair] = lastDates[tradePair] > date ? lastDates[tradePair] : date;
      }
  
      if (action === "buy") {
        balances[baseCurrency] += baseAmount;
        balances[quoteCurrency] -= quoteAmount;
      } else if (action === "sell") {
        balances[baseCurrency] -= baseAmount;
        balances[quoteCurrency] += quoteAmount;
      }
  
      fees[feeCurrency] += feeAmount;


    }
  
    const result = {
        balances: {},
        fees: {},
        lastDates: {},
        finalBalances: {},
      };
      for (const [currency, balance] of Object.entries(balances)) {
        result.balances[currency] = balance.toFixed(4);
      }
      for (const [currency, fee] of Object.entries(fees)) {
        result.fees[currency] = fee.toFixed(4);
      }
      for (const [pair, date] of Object.entries(lastDates)) {
        result.lastDates[pair] = formatDate(date);
      }
    
      for (const currency in result.balances) {
        const balance = parseFloat(result.balances[currency]);
        const fee = parseFloat(result.fees[currency] || '0');
        result.finalBalances[currency] = (balance - fee).toFixed(4);
      }
    
      return result;
    }
  
  