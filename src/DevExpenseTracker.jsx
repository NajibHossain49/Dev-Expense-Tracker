import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Wallet, 
  BookOpen, 
  Globe, 
  Computer, 
  Save, 
  PlusCircle, 
  Clock, 
  RefreshCw 
} from 'lucide-react';

const DevExpenseTracker = () => {
  // State management
  const [income, setIncome] = useState('');
  const [software, setSoftware] = useState('');
  const [courses, setCourses] = useState('');
  const [internet, setInternet] = useState('');
  const [savingsPercentage, setSavingsPercentage] = useState('');
  const [results, setResults] = useState({
    totalExpenses: 0,
    balance: 0,
    savingsAmount: 0,
    remainingBalance: 0
  });
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('assistant');
  const [errors, setErrors] = useState({
    income: false,
    software: false,
    courses: false,
    internet: false,
    logicError: false
  });

  // Validation functions
  const validateInput = (value) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0;
  };

  // Calculation functions
  const calculateExpenses = () => {
    // Reset errors
    setErrors(prev => ({
      ...prev,
      income: !validateInput(income),
      software: !validateInput(software),
      courses: !validateInput(courses),
      internet: !validateInput(internet),
      logicError: false
    }));

    // Validate inputs
    if (!validateInput(income) || !validateInput(software) || 
        !validateInput(courses) || !validateInput(internet)) {
      return;
    }

    const numIncome = parseFloat(income);
    const numSoftware = parseFloat(software);
    const numCourses = parseFloat(courses);
    const numInternet = parseFloat(internet);

    const totalExpenses = numSoftware + numCourses + numInternet;
    const balance = numIncome - totalExpenses;

    // Check if expenses exceed income
    if (totalExpenses > numIncome) {
      setErrors(prev => ({ ...prev, logicError: true }));
      return;
    }

    const newResults = {
      totalExpenses,
      balance,
      savingsAmount: 0,
      remainingBalance: balance
    };

    setResults(newResults);

    // Add to history
    const historyItem = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      income: numIncome,
      totalExpenses,
      balance
    };

    setHistory(prev => [historyItem, ...prev]);
  };

  const calculateSavings = () => {
    if (!validateInput(savingsPercentage)) {
      return;
    }

    const savingsRate = parseFloat(savingsPercentage);
    const savingsAmount = (savingsRate * results.balance) / 100;
    const remainingBalance = results.balance - savingsAmount;

    setResults(prev => ({
      ...prev,
      savingsAmount,
      remainingBalance
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Computer className="text-white" /> 
            Dev Expense Tracker
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('assistant')}
            className={`w-1/2 py-4 transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'assistant' 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <PlusCircle /> Assistant
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-1/2 py-4 transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'history' 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Clock /> History
          </button>
        </div>

        {/* Assistant Tab Content */}
        {activeTab === 'assistant' && (
          <div className="p-6 space-y-4">
            {/* Income Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Wallet className="text-blue-500" /> Income
              </label>
              <input 
                type="number" 
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.income ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your income"
              />
              {errors.income && (
                <p className="text-red-500 text-xs mt-1">Invalid income amount!</p>
              )}
            </div>

            {/* Expenses Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Computer className="text-blue-500" /> Software
                </label>
                <input 
                  type="number" 
                  value={software}
                  onChange={(e) => setSoftware(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.software ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Software cost"
                />
                {errors.software && (
                  <p className="text-red-500 text-xs mt-1">Invalid amount!</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <BookOpen className="text-blue-500" /> Courses
                </label>
                <input 
                  type="number" 
                  value={courses}
                  onChange={(e) => setCourses(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.courses ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Course cost"
                />
                {errors.courses && (
                  <p className="text-red-500 text-xs mt-1">Invalid amount!</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Globe className="text-blue-500" /> Internet
                </label>
                <input 
                  type="number" 
                  value={internet}
                  onChange={(e) => setInternet(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.internet ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Internet cost"
                />
                {errors.internet && (
                  <p className="text-red-500 text-xs mt-1">Invalid amount!</p>
                )}
              </div>
            </div>

            {/* Calculate Buttons */}
            <div className="space-y-4">
              <button 
                onClick={calculateExpenses}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <TrendingUp /> Calculate Expenses
              </button>

              {/* Savings Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Save className="text-green-500" /> Savings Percentage
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="number" 
                    value={savingsPercentage}
                    onChange={(e) => setSavingsPercentage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Savings %"
                  />
                  <button 
                    onClick={calculateSavings}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                  >
                    <RefreshCw />
                  </button>
                </div>
              </div>

              {/* Logic Error */}
              {errors.logicError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center">
                  Total expenses cannot exceed your income!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {results.totalExpenses > 0 && (
          <div className="bg-blue-50 p-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <CreditCard className="text-blue-500" /> Total Expenses
              </p>
              <p className="text-lg font-bold text-gray-800">
                ৳{results.totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Wallet className="text-green-500" /> Balance
              </p>
              <p className="text-lg font-bold text-gray-800">
                ৳{results.balance.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Save className="text-purple-500" /> Savings Amount
              </p>
              <p className="text-lg font-bold text-gray-800">
                ৳{results.savingsAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <TrendingUp className="text-yellow-500" /> Remaining Balance
              </p>
              <p className="text-lg font-bold text-gray-800">
                ৳{results.remainingBalance.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* History Tab Content */}
        {activeTab === 'history' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <Clock className="text-blue-500" /> Expense History
            </h2>
            {history.length === 0 ? (
              <div className="text-center text-gray-500">
                No history available
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">
                        {item.date}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Income</p>
                        <p className="font-semibold text-gray-700">
                          ৳{item.income.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Expenses</p>
                        <p className="font-semibold text-gray-700">
                          ৳{item.totalExpenses.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Balance</p>
                        <p className="font-semibold text-gray-700">
                          ৳{item.balance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevExpenseTracker;