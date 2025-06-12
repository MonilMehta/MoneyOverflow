import React, { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  HelpCircle,
  Activity,
  BarChart3,
} from "lucide-react";
import StockChart from "./StockChart";
import axios from "axios";
import { currentUser } from "../../../apis/user.api";
import RedirectPage from "../components/RedirectPage";

const STOCKS = {
  RELIANCE: { name: "Reliance Industries Ltd.", price: 1438.90, volatility: 0.68 },
  HDFCBANK: { name: "Hdfc Bank Ltd.", price: 1940.90, volatility: 0.71 },
  ADANIPORTS: { name: "Adani Port & Sez Ltd.", price: 1448.20, volatility: 0.57 },
  ITC: { name: "Itc Ltd.", price: 421.10, volatility: 1.19 },
  HINDUNILVR: { name: "Hindustan Unilever Ltd.", price: 2333.40, volatility: 1.83 },
  ICICIBANK: { name: "Icici Bank Ltd.", price: 1421.30, volatility: 0.71 },
};

// Sample quiz questions
const QUIZ_QUESTIONS = [
  {
    question: "What does P/E ratio stand for in stock valuation?",
    options: [
      "Price to Earnings",
      "Profit and Expense",
      "Percentage Equity",
      "Public Estimation",
    ],
    correct: 0,
  },
  {
    question: "Which of these is NOT a type of stock market order?",
    options: ["Market Order", "Limit Order", "Stop Order", "Guess Order"],
    correct: 3,
  },
  {
    question: "What is a bull market?",
    options: [
      "A market with falling prices",
      "A market with rising prices",
      "A market with no change",
      "A market for cattle",
    ],
    correct: 1,
  },
  {
    question: "What is a bear market?",
    options: [
      "A market with falling prices",
      "A market with rising prices",
      "A market with no change",
      "A market for bears",
    ],
    correct: 0,
  },
  {
    question: "What is an IPO?",
    options: [
      "Initial Public Offering",
      "International Purchase Order",
      "Internal Price Offering",
      "Initial Price Order",
    ],
    correct: 0,
  },
  {
    question: "What does ETF stand for?",
    options: [
      "Exchange Traded Fund",
      "Equity Traded Fund",
      "Exchange Transfer Fund",
      "Equity Transfer Fund",
    ],
    correct: 0,
  },
  {
    question: "What is a dividend?",
    options: [
      "A portion of a company's earnings distributed to shareholders",
      "A type of bond",
      "A stock market index",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is market capitalization?",
    options: [
      "The total value of a company's outstanding shares",
      "The total revenue of a company",
      "The total profit of a company",
      "The total assets of a company",
    ],
    correct: 0,
  },
  {
    question: "What is a stock split?",
    options: [
      "An increase in the number of shares outstanding",
      "A decrease in the number of shares outstanding",
      "A type of dividend",
      "A type of bond",
    ],
    correct: 0,
  },
  {
    question: "What is a blue-chip stock?",
    options: [
      "A stock of a large, well-established, and financially sound company",
      "A stock of a small company",
      "A stock of a new company",
      "A stock of a technology company",
    ],
    correct: 0,
  },
  {
    question: "What is a mutual fund?",
    options: [
      "An investment vehicle that pools money from many investors to purchase securities",
      "A type of bond",
      "A type of stock",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is a bond?",
    options: [
      "A fixed income instrument that represents a loan made by an investor to a borrower",
      "A type of stock",
      "A financial statement",
      "A type of mutual fund",
    ],
    correct: 0,
  },
  {
    question: "What is a stock market index?",
    options: [
      "A measurement of the performance of a section of the stock market",
      "A type of stock",
      "A type of bond",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is a portfolio?",
    options: [
      "A collection of investments held by an individual or institution",
      "A type of stock",
      "A type of bond",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is diversification?",
    options: [
      "A risk management strategy that mixes a wide variety of investments within a portfolio",
      "A type of stock",
      "A type of bond",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is a hedge fund?",
    options: [
      "An alternative investment vehicle that uses pooled funds to earn active returns for investors",
      "A type of stock",
      "A type of bond",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is a margin account?",
    options: [
      "A brokerage account in which the broker lends the customer cash to purchase securities",
      "A type of stock",
      "A type of bond",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is short selling?",
    options: [
      "The sale of a security that the seller has borrowed",
      "The purchase of a security",
      "A type of bond",
      "A financial statement",
    ],
    correct: 0,
  },
  {
    question: "What is a stock buyback?",
    options: [
      "A company's repurchase of its own shares",
      "A type of bond",
      "A financial statement",
      "A type of mutual fund",
    ],
    correct: 0,
  },
  {
    question: "What is a stock option?",
    options: [
      "A financial derivative that gives the buyer the right to buy or sell a stock at an agreed-upon price and date",
      "A type of bond",
      "A financial statement",
      "A type of mutual fund",
    ],
    correct: 0,
  },
  {
    question: "What is a bull trap?",
    options: [
      "A false signal indicating that a declining trend in a stock or index has reversed and is heading upwards",
      "A type of bond",
      "A financial statement",
      "A type of mutual fund",
    ],
    correct: 0,
  },
  {
    question: "What is a bear trap?",
    options: [
      "A false signal indicating that a rising trend in a stock or index has reversed and is heading downwards",
      "A type of bond",
      "A financial statement",
      "A type of mutual fund",
    ],
    correct: 0,
  },
  {
    question: "What is a penny stock?",
    options: [
      "A stock that trades for less than $5 per share",
      "A type of bond",
      "A financial statement",
      "A type of mutual fund",
    ],
    correct: 0,
  },
];

export default function Simulation() {
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    stocks: Object.keys(STOCKS).reduce(
      (acc, stock) => ({ ...acc, [stock]: { quantity: 0, avgPrice: 0 } }),
      {}
    ),
  });
  const [stockData, setStockData] = useState(
    Object.keys(STOCKS).reduce(
      (acc, stock) => ({
        ...acc,
        [stock]: Array.from({ length: 20 }, (_, i) => ({
          x: Date.now() - (20 - i) * 1000,
          y: STOCKS[stock].price,
        })),
      }),
      {}
    )
  );
  // Changed from "AAPL" to the first stock in the STOCKS object
  const [selectedStock, setSelectedStock] = useState(Object.keys(STOCKS)[0]);
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(100000);

  const [user, setUser] = useState();
  const fetchData = async () => {
    let accessToken = await document.cookie
      .split("accessToken=")[1]
      ?.split(";")[0];
    const res = await axios.get(currentUser, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res?.data?.data);
    setUser(res?.data?.data?.username);
  };
  useEffect(() => {
    fetchData();
  });

  const addAlert = (message, type = "info") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setAlerts((prev) => prev.filter((alert) => alert.id !== id)),
      3000
    );
  };

  const updateStockPrices = useCallback((quizResult) => {
    setStockData((prevData) => {
      const newData = { ...prevData };
      Object.keys(STOCKS).forEach((symbol) => {
        const lastPrice = newData[symbol][newData[symbol].length - 1].y;
        const volatility = STOCKS[symbol].volatility;
        let change;
        if (quizResult === true) {
          change = Math.random() * volatility * 2; // Exponential growth
        } else if (quizResult === false) {
          change = -(Math.random() * volatility * 2); // Significant loss
        } else {
          change = (Math.random() - 0.5) * volatility * 0.1; // Reduced volatility for straighter lines
        }
        const newPrice = Math.max(1, lastPrice * (1 + change / 100));

        newData[symbol] = [
          ...newData[symbol].slice(1),
          { x: Date.now(), y: newPrice },
        ];
      });
      return newData;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateStockPrices();
      updatePortfolioValue();
    }, 2000);
    return () => clearInterval(interval);
  }, [updateStockPrices]);

  const getCurrentPrice = (stock) => {
    const priceData = stockData[stock];
    return priceData[priceData.length - 1].y;
  };

  const updatePortfolioValue = useCallback(() => {
    const stocksValue = Object.entries(portfolio.stocks).reduce((sum, [stock, { quantity }]) => 
      sum + (quantity * getCurrentPrice(stock)), 0);
    const newPortfolioValue = portfolio.cash + stocksValue;
    setPortfolioValue(newPortfolioValue);
  }, [portfolio, stockData]);

  useEffect(() => {
    updatePortfolioValue();
  }, [portfolio, updatePortfolioValue]);

  const handleTrade = (action) => {
    const amount = parseInt(quantity);
    const currentPrice = getCurrentPrice(selectedStock);

    if (action === "buy") {
      if (amount <= 0) {
        addAlert("Please enter a valid quantity", "error");
        return;
      }
      if (amount * currentPrice > portfolio.cash) {
        addAlert("Insufficient funds", "error");
        return;
      }
      setPortfolio((prev) => {
        const newQuantity = (prev.stocks[selectedStock].quantity || 0) + amount;
        const newTotalCost =
          (prev.stocks[selectedStock].quantity || 0) *
            (prev.stocks[selectedStock].avgPrice || 0) +
          amount * currentPrice;
        const newAvgPrice = newTotalCost / newQuantity;
        const newCash = prev.cash - amount * currentPrice;
        return {
          cash: newCash,
          stocks: {
            ...prev.stocks,
            [selectedStock]: { quantity: newQuantity, avgPrice: newAvgPrice },
          },
        };
      });
      addAlert(`Bought ${amount} shares of ${selectedStock}`);
    } else if (action === "sell") {
      if (amount <= 0) {
        addAlert("Please enter a valid quantity", "error");
        return;
      }
      if (amount > portfolio.stocks[selectedStock].quantity) {
        addAlert("Insufficient shares", "error");
        return;
      }
      setPortfolio((prev) => {
        const newQuantity = prev.stocks[selectedStock].quantity - amount;
        const newCash = prev.cash + amount * currentPrice;

        let newStocks;
        if (newQuantity === 0) {
          // If all shares are sold, remove the stock from the portfolio
          newStocks = { ...prev.stocks };
          delete newStocks[selectedStock];
        } else {
          // If some shares remain, keep the average price unchanged
          newStocks = {
            ...prev.stocks,
            [selectedStock]: {
              quantity: newQuantity,
              avgPrice: prev.stocks[selectedStock].avgPrice,
            },
          };
        }

        return {
          cash: newCash,
          stocks: newStocks,
        };
      });
      addAlert(`Sold ${amount} shares of ${selectedStock}`);
    }
    setQuantity('');
    updatePortfolioValue();
  };

  const filteredStocks = Object.keys(STOCKS).filter((stock) =>
    stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchQuiz = () => {
    const randomIndex = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
    setCurrentQuiz(QUIZ_QUESTIONS[randomIndex]);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (selectedIndex) => {
    if (selectedIndex === currentQuiz.correct) {
      addAlert("Correct! Stock prices are rising.", "info");
      updateStockPrices(true);
    } else {
      addAlert("Wrong answer. Stock prices are falling.", "error");
      updateStockPrices(false);
    }
    setShowQuiz(false);
    updatePortfolioValue();
  };

  return (
    <>
      {user ? (
        <div className="bg-[#f6f6f6] min-h-screen py-12 font-sans relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* New background elements */}
          {/* Vertical Lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-dotted border-black"
                style={{ left: `${i * 10}%` }}
              />
            ))}
          </div>

          {/* Horizontal Lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-dotted border-black"
                style={{ top: `${i * 12.5}%` }}
              />
            ))}
          </div>

          {/* Rest of your existing code */}
          <div className="w-full relative z-10">
            {/* Header */}
            <div className="mb-10 text-left px-8">
              <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight flex items-center gap-3">
                <span className="text-black">FIN</span>
                <span className="text-[#ff5722] italic">SIMULATION</span>
              </h2>
              
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 px-8">
              {/* Main Trading Panel */}
              <div className="xl:col-span-3">
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
                  {/* Add the striped background pattern */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                        backgroundSize: '10px 10px',
                        backgroundPosition: '0 0, 0 5px'
                      }}
                    />
                  </div>

                  {/* Controls Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-6 w-6 text-[#ff5722]" />
                      <h2 className="text-xl font-black text-black uppercase">
                        Answer quiz questions to affect market volatility
                      </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search stocks..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-48 pl-10 pr-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#ff5722]"
                        />
                      </div>
                      <button
                        onClick={fetchQuiz}
                        className="px-4 py-2 bg-black text-white rounded-xl flex items-center hover:bg-gray-800 transition-all duration-200 font-bold shadow-lg"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Quiz
                      </button>
                    </div>
                  </div>

                  {/* Stock Selection */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {filteredStocks.map((stock) => (
                        <button
                          key={stock}
                          onClick={() => setSelectedStock(stock)}
                          className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
                            selectedStock === stock
                              ? "bg-[#ff5722] text-white shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {stock}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trading Controls */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                      <div>
                        <h3 className="text-2xl font-black text-black mb-1">
                          {STOCKS[selectedStock].name}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <p className="text-3xl font-black text-[#ff5722]">
                            ₹{getCurrentPrice(selectedStock).toFixed(2)}
                          </p>
                          <div className="flex items-center text-gray-600">
                            <Activity className="h-4 w-4 mr-1" />
                            <span className="text-sm font-bold">Live</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-32 p-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#ff5722]"
                        />
                        <button
                          onClick={() => handleTrade("buy")}
                          className="px-6 py-3 bg-[#ff5722] text-white rounded-xl flex items-center hover:bg-[#e64a19] transition-all duration-200 font-bold shadow-lg"
                        >
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Buy
                        </button>
                        <button
                          onClick={() => handleTrade("sell")}
                          className="px-6 py-3 bg-black text-white rounded-xl flex items-center hover:bg-gray-800 transition-all duration-200 font-bold shadow-lg"
                        >
                          <TrendingDown className="mr-2 h-4 w-4" />
                          Sell
                        </button>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                      <div className="w-full h-96">
                        <StockChart data={stockData[selectedStock]} symbol={selectedStock} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Sidebar */}
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden h-fit sticky top-6">
                {/* Add the striped background pattern */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px'
                    }}
                  />
                </div>

                <div className="flex items-center mb-6">

                  <h2 className="text-2xl font-black text-black uppercase">Portfolio</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                      <p className="text-sm text-gray-600 mb-1 font-bold">Available Cash</p>
                      <p className="text-2xl font-black text-[#ff5722]">
                        ₹{portfolio.cash.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                      <p className="text-sm text-gray-600 mb-1 font-bold">Portfolio Value</p>
                      <p className="text-2xl font-black text-black">
                        ₹{portfolioValue.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-black text-lg uppercase mb-4">Holdings</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {Object.entries(portfolio.stocks).length === 0 ? (
                        <p className="text-gray-500 text-center py-8 font-medium">No holdings yet</p>
                      ) : (
                        Object.entries(portfolio.stocks).map(
                          ([stock, { quantity, avgPrice }]) => (
                            <div key={stock} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-black">{stock}</span>
                                <span className="text-[#ff5722] font-bold">{quantity} shares</span>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between text-gray-600">
                                  <span>Avg Price:</span>
                                  <span>₹{avgPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                  <span>Current:</span>
                                  <span>₹{getCurrentPrice(stock).toFixed(2)}</span>
                                </div>
                                <div className={`flex justify-between font-bold ${
                                  getCurrentPrice(stock) > avgPrice
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}>
                                  <span>P&L:</span>
                                  <span>₹{((getCurrentPrice(stock) - avgPrice) * quantity).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl shadow-lg border-2 ${
                  alert.type === "error"
                    ? "bg-white text-red-600 border-red-500"
                    : "bg-white text-green-600 border-green-500"
                }`}
              >
                {alert.message}
              </div>
            ))}
          </div>

          {/* Quiz Modal */}
          {showQuiz && currentQuiz && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden max-w-2xl w-full">
                {/* Add the striped background pattern */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px'
                    }}
                  />
                </div>

                {/* Quiz Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-black mb-6">
                    {currentQuiz.question}
                  </h3>
                  <div className="space-y-3">
                    {currentQuiz.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full p-4 text-left bg-white hover:bg-[#ff5722] hover:text-white rounded-xl transition-all duration-200 text-gray-700 border-2 border-gray-200 hover:border-[#ff5722] font-medium"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-6 right-6 opacity-20">
                  <div className="w-16 h-16 border-4 border-black rounded-full"></div>
                </div>
                <div className="absolute top-1/4 left-6 opacity-10">
                  <div className="w-8 h-8 border-2 border-black rotate-45"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <RedirectPage />
      )}
    </>
  );
}