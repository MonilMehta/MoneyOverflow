import React, { useState, useEffect, useCallback } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Search } from 'lucide-react';
import StockChart from './StockChart';

const STOCKS = {
  AAPL: { name: 'Apple Inc.', price: 175.25, volatility: 0.8 },
  GOOGL: { name: 'Alphabet Inc.', price: 140.50, volatility: 1.0 },
  MSFT: { name: 'Microsoft Corporation', price: 380.75, volatility: 0.9 },
  AMZN: { name: 'Amazon.com Inc.', price: 175.25, volatility: 1.2 },
  TSLA: { name: 'Tesla Inc.', price: 205.80, volatility: 1.5 },
  META: { name: 'Meta Platforms Inc.', price: 480.20, volatility: 1.1 }
};

export default function Simulation() {
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    stocks: Object.keys(STOCKS).reduce((acc, stock) => ({...acc, [stock]: 0}), {})
  });
  const [stockData, setStockData] = useState(
    Object.keys(STOCKS).reduce((acc, stock) => ({
      ...acc,
      [stock]: Array.from({ length: 20 }, (_, i) => ({
        x: Date.now() - (20 - i) * 1000,
        y: STOCKS[stock].price * (1 + (Math.random() - 0.5) * 0.02)
      }))
    }), {})
  );
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [quantity, setQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type = 'info') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setAlerts(prev => prev.filter(alert => alert.id !== id)), 3000);
  };

  const updateStockPrices = useCallback(() => {
    setStockData(prevData => {
      const newData = { ...prevData };
      Object.keys(STOCKS).forEach(symbol => {
        const lastPrice = newData[symbol][newData[symbol].length - 1].y;
        const volatility = STOCKS[symbol].volatility;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = Math.max(1, lastPrice * (1 + change / 100));
        
        newData[symbol] = [
          ...newData[symbol].slice(1),
          { x: Date.now(), y: newPrice }
        ];
      });
      return newData;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateStockPrices, 1000);
    return () => clearInterval(interval);
  }, [updateStockPrices]);

  const getCurrentPrice = (stock) => {
    const priceData = stockData[stock];
    return priceData[priceData.length - 1].y;
  };

  const handleTrade = (action) => {
    const amount = parseInt(quantity);
    const currentPrice = getCurrentPrice(selectedStock);
    
    if (action === 'buy') {
      if (amount <= 0) {
        addAlert('Please enter a valid quantity', 'error');
        return;
      }
      if (amount * currentPrice > portfolio.cash) {
        addAlert('Insufficient funds', 'error');
        return;
      }
      setPortfolio(prev => ({
        cash: prev.cash - amount * currentPrice,
        stocks: {
          ...prev.stocks,
          [selectedStock]: (prev.stocks[selectedStock] || 0) + amount
        }
      }));
      addAlert(`Bought ${amount} shares of ${selectedStock}`);
    } else if (action === 'sell') {
      if (amount <= 0) {
        addAlert('Please enter a valid quantity', 'error');
        return;
      }
      if (amount > portfolio.stocks[selectedStock]) {
        addAlert('Insufficient shares', 'error');
        return;
      }
      setPortfolio(prev => ({
        cash: prev.cash + amount * currentPrice,
        stocks: {
          ...prev.stocks,
          [selectedStock]: prev.stocks[selectedStock] - amount
        }
      }));
      addAlert(`Sold ${amount} shares of ${selectedStock}`);
    }
    setQuantity('');
  };

  const portfolioValue = portfolio.cash + 
    Object.entries(portfolio.stocks).reduce((sum, [stock, quantity]) => 
      sum + (quantity * getCurrentPrice(stock)), 0);

  const filteredStocks = Object.keys(STOCKS).filter(stock =>
    stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stock Market Simulator</h1>
      
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {alerts.map(alert => (
          <div key={alert.id} className={`p-4 rounded-lg ${
            alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {alert.message}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Live Trading</h2>
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex overflow-x-auto space-x-2">
                {filteredStocks.map(stock => (
                  <button
                    key={stock}
                    onClick={() => setSelectedStock(stock)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedStock === stock ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {stock}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">{STOCKS[selectedStock].name}</h3>
                  <p className="text-2xl font-bold">${getCurrentPrice(selectedStock).toFixed(2)}</p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleTrade('buy')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" /> Buy
                  </button>
                  <button
                    onClick={() => handleTrade('sell')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center"
                  >
                    <TrendingDown className="mr-2 h-4 w-4" /> Sell
                  </button>
                </div>
              </div>
              
              <StockChart data={stockData[selectedStock]} symbol={selectedStock} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
            <h2 className="text-lg font-semibold">Portfolio</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Available Cash</p>
              <p className="text-2xl font-bold">${portfolio.cash.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Portfolio Value</p>
              <p className="text-2xl font-bold">${portfolioValue.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Holdings</h3>
              {Object.entries(portfolio.stocks).map(([stock, quantity]) => 
                quantity > 0 && (
                  <div key={stock} className="flex justify-between py-1">
                    <span className="font-medium">{stock}</span>
                    <div className="text-right">
                      <div>{quantity} shares</div>
                      <div className="text-sm text-gray-500">
                        ${(quantity * getCurrentPrice(stock)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}