import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Lock, Unlock } from 'lucide-react';
import FinancialBasic from './modules/FinancialBasic';
import Budgeting from './modules/Budgeting';
import Saving from './modules/Saving';
import DebtManagement from './modules/DebtManagement';
import Investing from './modules/Investing';
import RetirementPlanning from './modules/RetirementPlanning';
import InsuranceAndProtection from './modules/InsuranceAndProtection';
import TaxesAndLegalConsideration from './modules/TaxesAndLegalConsideration';
import FinancialToolsAndResources from './modules/FinancialToolsAndResources';
import WealthBuilding from './modules/WealthBuilding';
import axios from 'axios';
import { currentUser } from '../../../apis/user.api';
import { isUnlock, mark } from '../../../apis/learning.api';

const SideBar = () => {
  const [selectedModule, setSelectedModule] = useState('Financial Basics');
  const [expandedModules, setExpandedModules] = useState([]);
  const [course, setCourse] = useState();
  const [user, setUser] = useState();

  const cardColors = {
    default: { bg: "bg-gray-900", text: "text-white", button: "bg-gray-700", icon: "text-white" },
    active: { bg: "bg-green-300", text: "text-black", button: "bg-gray-800", icon: "text-black" }
  };

  const fetchData = async () => {
    let accessToken = await document.cookie.split("accessToken=")[1]?.split(";")[0];
    const res = await axios.get(currentUser, { headers: { Authorization: `Bearer ${accessToken}` } })
    console.log(res?.data?.data)
    setCourse(res?.data?.data?.highestCompletedIndex);
    setUser(res?.data?.data?._id);
  }

  useEffect(() => {
    fetchData();
  });

  const checkUnlock = async (module) => {
    try{
      const res = await axios.post(isUnlock, {id: module.id, userId: user});
      console.log(res);
      setSelectedModule(module.name);
    } catch(error){
      console.error(error);
    }
  }

  const checkMark = async (id) => {
    try{
      const res = await axios.post(mark, {id: id, userId: user});
      console.log(res);
      fetchData();
    } catch(error){
      console.error(error);
    }
  }

  const toggleExpand = (module) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter((m) => m !== module));
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const handleNextModule = () => {
    const currentIndex = modules.findIndex(module => module.name === selectedModule);
    if (currentIndex < modules.length - 1) {
      setSelectedModule(modules[currentIndex + 1].name);
      checkMark(modules[currentIndex + 1].id);
    }
  };

  const renderModule = () => {
    switch (selectedModule) {
      case 'Financial Basics':
        return <FinancialBasic onNextModule={handleNextModule} />;
      case 'Budgeting':
        return <Budgeting onNextModule={handleNextModule} />;
      case 'Saving':
        return <Saving onNextModule={handleNextModule} />;
      case 'Debt Management':
        return <DebtManagement onNextModule={handleNextModule} />;
      case 'Investing':
        return <Investing onNextModule={handleNextModule} />;
      case 'Retirement Planning':
        return <RetirementPlanning onNextModule={handleNextModule} />;
      case 'Insurance and Protection':
        return <InsuranceAndProtection onNextModule={handleNextModule} />;
      case 'Taxes and Legal Considerations':
        return <TaxesAndLegalConsideration onNextModule={handleNextModule} />;
      case 'Financial Tools and Resources':
        return <FinancialToolsAndResources onNextModule={handleNextModule} />;
      case 'Wealth Building':
        return <WealthBuilding />;
      default:
        return <FinancialBasic onNextModule={handleNextModule} />;
    }
  };

  const modules = [
    { name: 'Financial Basics', submodules: ['Understanding Money', 'Income vs. Expenses', 'Financial Terminology', 'Importance of Financial Literacy'], id: '66faae800e014d17ed7a0d8e' },
    { name: 'Budgeting', submodules: ['Why Budgeting Matters', 'Creating a Personal Budget', 'Different Types of Budgets', 'Tools for Budgeting'], id: '66faa0841e549319649a8efc' },
    { name: 'Saving', submodules: ['Importance of Saving', 'Short-Term vs. Long-Term Savings', 'Emergency Funds', 'Automated Saving Techniques'], id: '66faa07b1e549319649a8efa' },
    { name: 'Debt Management', submodules: ['Good vs. Bad Debt', 'Strategies for Paying Off Debt', 'Understanding Credit Scores', 'Avoiding Debt Traps'], id: '66faf8377fde7cf93c2ba6e4' },
    { name: 'Investing', submodules: ['Basics of Investing', 'Types of Investments', 'Risk and Return', 'Diversification'], id: '66faa0ba1e549319649a8f00' },
    { name: 'Retirement Planning', submodules: ['Importance of Early Planning', 'Retirement Accounts', 'Estimating Retirement Needs', 'Social Security'], id: '66faa0b21e549319649a8efe' },
    { name: 'Insurance and Protection', submodules: ['Life and Health Insurance', 'Home and Auto Insurance', 'Disability Coverage', 'Protecting Assets'], id: '66faf9c77fde7cf93c2ba6f8' },
    { name: 'Taxes and Legal Considerations', submodules: ['Basics of Income Tax', 'Tax-Advantaged Accounts', 'Estate Planning', 'Legal Structures for Businesses'], id: '66faf9d17fde7cf93c2ba6fa' },
    { name: 'Financial Tools and Resources', submodules: ['Financial Apps and Platforms', 'Calculators', 'How to Read Financial Statements', 'Finding Financial Advisors'], id: '66faf9dc7fde7cf93c2ba6fc' },
    { name: 'Wealth Building', submodules: ['Passive Income Strategies', 'Real Estate Investment', 'Entrepreneurship and Startups', 'Wealth Preservation'], id: '66fafd517fde7cf93c2ba72e' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 p-4 sticky top-0 h-screen overflow-y-auto bg-gray-900">
        <div className="flex flex-col gap-2">
          {modules.map((module, index) => {
            const isUnlocked = index <= course;
            const isActive = selectedModule === module.name;
            const colors = isActive ? cardColors.active : cardColors.default;
            
            return (
              <div key={module.name} className="flex flex-col">
                <div
                  className={`p-3 cursor-pointer rounded-lg flex justify-between items-center transition-all duration-200 border border-transparent hover:bg-gray-800 ${
                    isActive 
                      ? `${colors.bg} ${colors.text}` 
                      : `${colors.bg} ${colors.text}`
                  }`}
                  onClick={() => checkUnlock(module)}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="flex items-center mr-3 flex-shrink-0">
                      {isUnlocked ? (
                        <Unlock className={`h-5 w-5 ${colors.icon}`} />
                      ) : (
                        <Lock className={`h-5 w-5 ${colors.icon}`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium leading-tight text-left flex-1 ${
                      isActive ? 'font-semibold' : ''
                    }`}>
                      {module.name}
                    </span>
                  </div>
                  <button
                    className={`${colors.button} p-2 rounded-lg transition-all duration-200 hover:opacity-80 flex items-center justify-center flex-shrink-0 ml-2`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(module.name);
                    }}
                  >
                    {expandedModules.includes(module.name) ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
                {expandedModules.includes(module.name) && (
                  <div className="mt-2 ml-8 flex flex-col gap-1">
                    {module.submodules.map((submodule, subIndex) => (
                      <div
                        key={subIndex}
                        className="p-2 text-xs bg-gray-900 text-white rounded-md transition-all duration-200 cursor-pointer text-left leading-tight border border-transparent hover:bg-gray-800"
                      >
                        {submodule}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-grow overflow-y-auto bg-gray-50">
        {renderModule()}
      </div>
    </div>
  );
};

export default SideBar;