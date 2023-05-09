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
          {result && (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Pair</th>
              <th style={thStyles}>Last Transaction Date</th>
              <th style={thStyles}>Base Currency</th>
              <th style={thStyles}>Balance</th>
              <th style={thStyles}>Fee</th>
              <th style={thStyles}>Final Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result.balances).map(([currency, balance], index) => {
              const tradePair = Object.keys(result.lastDates).find((pair) =>
                pair.includes(currency)
              );
              return (
                <tr key={index}>
                  <td style={tdStyles}>{tradePair}</td>
                  <td style={tdStyles}>{result.lastDates[tradePair]}</td>
                  <td style={tdStyles}>{currency}</td>
                  <td style={tdStyles}>{balance}</td>
                  <td style={tdStyles}>{result.fees[currency]}</td>
                  <td style={tdStyles}>{result.finalBalances[currency]}</td>
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
