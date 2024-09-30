import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

const SideBar = () => {
  const [selectedModule, setSelectedModule] = useState('Financial Basics');
  const [expandedModules, setExpandedModules] = useState([]);

  useEffect(() => {
    setSelectedModule('Financial Basics');
  }, []);

  const toggleExpand = (module) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const renderModule = () => {
    switch (selectedModule) {
      case 'Financial Basics':
        return <FinancialBasic />;
      case 'Budgeting':
        return <Budgeting />;
      case 'Saving':
        return <Saving />;
      case 'Debt Management':
        return <DebtManagement />;
      case 'Investing':
        return <Investing />;
      case 'Retirement Planning':
        return <RetirementPlanning />;
      case 'Insurance and Protection':
        return <InsuranceAndProtection />;
      case 'Taxes and Legal Considerations':
        return <TaxesAndLegalConsideration />;
      case 'Financial Tools and Resources':
        return <FinancialToolsAndResources />;
      case 'Wealth Building':
        return <WealthBuilding />;
      default:
        return <FinancialBasic />;
    }
  };

  const modules = [
    {
      name: 'Financial Basics',
      submodules: ['Intro to Finance', 'Money Management', 'Financial Goals', 'Personal Finance Tips'],
    },
    {
      name: 'Budgeting',
      submodules: ['Types of Budgets', 'Creating a Budget', 'Tracking Expenses', 'Adjusting Budgets'],
    },
    {
      name: 'Saving',
      submodules: ['Importance of Saving', 'Saving Methods', 'Emergency Funds', 'Saving Accounts'],
    },
    {
      name: 'Debt Management',
      submodules: ['Types of Debt', 'Debt Repayment Strategies', 'Debt Consolidation', 'Credit Score Management'],
    },
    {
      name: 'Investing',
      submodules: ['Intro to Investing', 'Investment Types', 'Risk Management', 'Investment Accounts'],
    },
    {
      name: 'Retirement Planning',
      submodules: ['Retirement Accounts', 'Pension Plans', 'Investment for Retirement', 'Retirement Withdrawal'],
    },
    {
      name: 'Insurance and Protection',
      submodules: ['Types of Insurance', 'Health Insurance', 'Life Insurance', 'Insurance Planning'],
    },
    {
      name: 'Taxes and Legal Considerations',
      submodules: ['Understanding Taxes', 'Tax Filing', 'Tax Deductions', 'Estate Planning'],
    },
    {
      name: 'Financial Tools and Resources',
      submodules: ['Budgeting Tools', 'Investment Platforms', 'Tax Calculators', 'Financial Advisors'],
    },
    {
      name: 'Wealth Building',
      submodules: ['Wealth Creation', 'Long-Term Wealth', 'Passive Income', 'Generational Wealth'],
    },
  ];

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-content">
          {modules.map((module) => (
            <div key={module.name} className="module-wrapper">
              <div
                className={`module ${selectedModule === module.name ? 'active' : ''}`}
                onClick={() => setSelectedModule(module.name)}
              >
                <span>{module.name}</span>
                <button className="expand-btn" onClick={() => toggleExpand(module.name)}>
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
    background-color: #1f2937;
    color: white;
    width: 250px;
    padding: 16px;
    overflow-y: auto; /* Add scroll bar */
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
    background-color: #374151;
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
    background-color: #2d3748;
    border-radius: 4px;
  }
  .submodule:hover {
    background-color: #4a5568;
  }
  .content-area {
    flex-grow: 1;
    padding: 20px;
  }
`;

export default () => (
  <>
    <style>{styles}</style>
    <SideBar />
  </>
);
