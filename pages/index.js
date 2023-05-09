import { useState } from 'react';
import parseAndAggregate from 'utils/parseAndAggregate.js'

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const inputStyles = {
  flexGrow: 1,
  marginRight: '20px',
};

const resultStyles = {
  flexGrow: 1,
};
const tableStyles = {
  borderCollapse: 'collapse',
  width: '100%',
  fontSize: '16px',
};

const thStyles = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tdStyles = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

function Home() {

  const [csvText, setCsvText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(parseAndAggregate(csvText));
  };

  const toEuropeanFormat = (number) => {
    if (number === undefined || number === null) {
      return '0';
    }
    return number.toString().replace('.', ',');
  };

  const downloadCSV = () => {
    const headers = [
      'Deposit/Withdraw',
      'Pair',
      'Last Transaction Date',
      'Base Currency',
      'Balance',
      'Fee',
      'Final Balance',
      'Loss/Gain',
    ];

    const rows = Object.entries(result.balances).map(([currency, balance]) => {
      const tradePair = Object.keys(result.lastDates).find((pair) =>
        pair.includes(currency)
      );
      const finalBalance = parseFloat(result.finalBalances[currency]);
      const depositWithdraw = finalBalance >= 0 ? 'deposit' : 'withdraw';
      const lossGain = finalBalance >= 0 ? 'margin_gain' : 'margin_loss';
      const fee = result.fees[currency] !== undefined ? result.fees[currency] : 0;

      return [
        depositWithdraw,
        tradePair,
        `"${result.lastDates[tradePair]}"`,
        currency,
        `"${toEuropeanFormat(balance)}"`,
        `"${toEuropeanFormat(fee)}"`,
        `"${toEuropeanFormat(result.finalBalances[currency])}"`,
        lossGain,
      ];
    });

    let csvContent = headers.join(',') + '\n';
    csvContent += rows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'table.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div>
      <h1>CSV Aggregator</h1>
      <div style={containerStyles}>
        <div style={inputStyles}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="csvText">Paste your CSV data:</label>
            <br />
            <textarea
              id="csvText"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              rows="20"
              style={{ width: '100%' }}
            />
          </form>
        </div>
        <div style={resultStyles}>
          <button onClick={handleSubmit}>Aggregate</button>
          <button onClick={downloadCSV} style={{ marginLeft: '10px' }}>
            Download CSV
          </button>
          {result && (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Deposit/Withdraw</th>
              <th style={thStyles}>Pair</th>
              <th style={thStyles}>Last Transaction Date</th>
              <th style={thStyles}>Base Currency</th>
              <th style={thStyles}>Balance</th>
              <th style={thStyles}>Fee</th>
              <th style={thStyles}>Final Balance</th>
              <th style={thStyles}>Loss/Gain</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result.balances).map(([currency, balance], index) => {
              const tradePair = Object.keys(result.lastDates).find((pair) =>
                pair.includes(currency)
              );
              const finalBalance = parseFloat(result.finalBalances[currency]);
              const depositWithdraw = finalBalance >= 0 ? 'deposit' : 'withdraw';
              const lossGain = finalBalance >= 0 ? 'margin_gain' : 'margin_loss';

              return (
                <tr key={index}>
                  <td style={tdStyles}>{depositWithdraw}</td>
                  <td style={tdStyles}>{tradePair}</td>
                  <td style={tdStyles}>{result.lastDates[tradePair]}</td>
                  <td style={tdStyles}>{currency}</td>
                  <td style={tdStyles}>{balance}</td>
                  <td style={tdStyles}>{result.fees[currency]}</td>
                  <td style={tdStyles}>{result.finalBalances[currency]}</td>
                  <td style={tdStyles}>{lossGain}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
      </div>
      </div>
  );
}

export default Home;
