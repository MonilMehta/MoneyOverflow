import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Lock, Unlock } from 'lucide-react'; // Import lock and unlock icons
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
    { name: 'Budgeting', submodules: ['Why Budgeting Matters', 'Creating a Personal Budget', 'Different Types of Budgets', 'Tools for Budgeting '], id: '66faa0841e549319649a8efc' },
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
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-content">
          {modules.map((module, index) => (
            <div key={module.name} className="module-wrapper">
              <div
                className={`module ${selectedModule === module.name ? 'active' : ''}`}
                onClick={() => checkUnlock(module)}
              >
                <div className="icon-container">
                  {index <= course ? <Unlock className="icon" /> : <Lock className="icon" />} {/* Conditional icon */}
                </div>
                <span>{module.name}</span>
                <button
                  className="expand-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(module.name);
                  }}
                >
                  {expandedModules.includes(module.name) ? <ChevronUp className="arrow" /> : <ChevronDown className="arrow" />}
                </button>
              </div>
              {expandedModules.includes(module.name) && (
                <div className="submodules">
                  {module.submodules.map((submodule, index) => (
                    <div key={index} className="submodule">{submodule}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="content-area">{renderModule()}</div>
    </div>
  );
};

const styles = `
  .app-container {
    display: flex;
    height: 100vh;
  }
  .sidebar {
    background-color: #2563eb;
    color: white;
    width: 250px;
    padding: 16px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }
  .sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .module-wrapper {
    display: flex;
    flex-direction: column;
  }
  .module {
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .module:hover, .module.active {
    background-color: #1e40af;
  }
  .icon-container {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .icon {
    height: 20px; /* Ensure uniform size */
    width: 20px; /* Ensure uniform size */
    color: white;
  }
  .expand-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  .arrow {
    height: 16px;
    width: 16px;
  }
  .submodules {
    margin-top: 4px;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .submodule {
    padding: 4px;
    font-size: 14px;
    background-color: #1e3a8a;
    border-radius: 4px;
  }
  .submodule:hover {
    background-color: #1d4ed8;
  }
  .content-area {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }
`;

export default () => (
  <>
    <style>{styles}</style>
    <SideBar />
  </>
);
