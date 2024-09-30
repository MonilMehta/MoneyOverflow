import React, { useState } from 'react';
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

  const toggleExpand = (module) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter((m) => m !== module));
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
      submodules: [
        'Understanding Money',
        'Income vs. Expenses',
        'Financial Terminology',
        'Importance of Financial Literacy',
      ],
    },
    {
      name: 'Budgeting',
      submodules: [
        'Why Budgeting Matters',
        'Creating a Personal Budget',
        'Different Types of Budgets',
        'Managing Cash Flow',
      ],
    },
    {
      name: 'Saving',
      submodules: [
        'Importance of Saving',
        'Short-Term vs. Long-Term Savings',
        'Emergency Funds',
        'Automated Saving Techniques',
      ],
    },
    {
      name: 'Debt Management',
      submodules: [
        'Good vs. Bad Debt',
        'Strategies for Paying Off Debt',
        'Understanding Credit Scores',
        'Avoiding Debt Traps',
      ],
    },
    {
      name: 'Investing',
      submodules: [
        'Basics of Investing',
        'Types of Investments',
        'Risk and Return',
        'Diversification',
      ],
    },
    {
      name: 'Retirement Planning',
      submodules: [
        'Importance of Early Planning',
        'Retirement Accounts',
        'Estimating Retirement Needs',
        'Social Security',
      ],
    },
    {
      name: 'Insurance and Protection',
      submodules: [
        'Life and Health Insurance',
        'Home and Auto Insurance',
        'Disability Coverage',
        'Protecting Assets',
      ],
    },
    {
      name: 'Taxes and Legal Considerations',
      submodules: [
        'Basics of Income Tax',
        'Tax-Advantaged Accounts',
        'Estate Planning',
        'Legal Structures for Businesses',
      ],
    },
    {
      name: 'Financial Tools and Resources',
      submodules: [
        'Financial Apps and Platforms',
        'Calculators',
        'How to Read Financial Statements',
        'Finding Financial Advisors',
      ],
    },
    {
      name: 'Wealth Building',
      submodules: [
        'Passive Income Strategies',
        'Real Estate Investment',
        'Entrepreneurship and Startups',
        'Wealth Preservation',
      ],
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
                <button
                  className="expand-btn"
                  onClick={() => toggleExpand(module.name)}
                >
                  {expandedModules.includes(module.name) ? (
                    <ChevronUp className="arrow" />
                  ) : (
                    <ChevronDown className="arrow" />
                  )}
                </button>
              </div>
              {expandedModules.includes(module.name) && (
                <div className="submodules">
                  {module.submodules.map((submodule, index) => (
                    <div key={index} className="submodule">
                      {submodule}
                    </div>
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

// Add sticky sidebar styles
const styles = `
  .app-container {
    display: flex;
    height: 100vh;
    postition:sticky;
  }
  .sidebar {
    background-color: #1f2937;
    color: white;
    width: 250px;
    padding: 16px;
    position: -webkit-sticky; /* For Safari */
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
    overflow-y: auto;
  }
`;

export default () => (
  <>
    <style>{styles}</style>
    <SideBar />
  </>
);
