import React, { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  HelpCircle,
} from "lucide-react";
import StockChart from "./StockChart";
import axios from "axios";
import { currentUser } from "../../../apis/user.api";
import RedirectPage from "../components/RedirectPage";

const STOCKS = {
  AAPL: { name: "Apple Inc.", price: 175.25, volatility: 0.8 },
  GOOGL: { name: "Alphabet Inc.", price: 140.5, volatility: 1.0 },
  MSFT: { name: "Microsoft Corporation", price: 380.75, volatility: 0.9 },
  AMZN: { name: "Amazon.com Inc.", price: 175.25, volatility: 1.2 },
  TSLA: { name: "Tesla Inc.", price: 205.8, volatility: 1.5 },
  META: { name: "Meta Platforms Inc.", price: 480.2, volatility: 1.1 },
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
  const [selectedStock, setSelectedStock] = useState("AAPL");
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
        <div className="p-4 max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold mb-4">Stock Market Simulation</h1>

          <div className="fixed top-4 right-4 z-50 space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg ${
                  alert.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {alert.message}
              </div>
            ))}
          </div>
          <div className="mb-10 ml-24 flex align-center justify-between">
          <h2 className=" font-semibold" style={{fontSize:'4rem'}}>Stock Market <span className="text-blue-500">Simulation</span></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
             
                <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Answer the quiz to affect stock prices</h2>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search stocks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={fetchQuiz}
                      className="p-2 bg-yellow-500 text-white rounded-lg flex items-center"
                    >
                      <HelpCircle className="h-4 w-4 mr-1" /> Quiz
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex overflow-x-auto space-x-2">
                    {filteredStocks.map((stock) => (
                      <button
                        key={stock}
                        onClick={() => setSelectedStock(stock)}
                        className={`px-4 py-2 rounded-lg ${
                          selectedStock === stock
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
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
                      <h3 className="font-semibold">
                        {STOCKS[selectedStock].name}
                      </h3>
                      <p className="text-2xl font-bold">
                        ${getCurrentPrice(selectedStock).toFixed(2)}
                      </p>
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
                        onClick={() => handleTrade("buy")}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
                      >
                        <TrendingUp className="mr-2 h-4 w-4" /> Buy
                      </button>
                      <button
                        onClick={() => handleTrade("sell")}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center"
                      >
                        <TrendingDown className="mr-2 h-4 w-4" /> Sell
                      </button>
                    </div>
                  </div>

                  <StockChart
                    data={stockData[selectedStock]}
                    symbol={selectedStock}
                  />
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
                  <p className="text-2xl font-bold">
                    ${portfolio.cash.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Portfolio Value</p>
                  <p className="text-2xl font-bold">
                    ${portfolioValue.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Holdings</h3>
                  {Object.entries(portfolio.stocks).map(
                    ([stock, { quantity, avgPrice }]) => (
                      <div key={stock} className="flex justify-between py-1">
                        <span className="font-medium">{stock}</span>
                        <div className="text-right">
                          <div>{quantity} shares</div>
                          <div className="text-sm text-gray-500">
                            Avg: ${avgPrice.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Current: ${getCurrentPrice(stock).toFixed(2)}
                          </div>
                          <div
                            className={`text-sm ${
                              getCurrentPrice(stock) > avgPrice
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            Profit: $
                            {(
                              (getCurrentPrice(stock) - avgPrice) *
                              quantity
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {showQuiz && currentQuiz && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">
                  {currentQuiz.question}
                </h3>
                <div className="space-y-2">
                  {currentQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className="w-full p-2 text-left hover:bg-blue-100 rounded"
                    >
                      {option}
                    </button>
                  ))}
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
