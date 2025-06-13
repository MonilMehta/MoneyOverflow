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
// import axios from 'axios'; // Note: axios import removed for artifact display
import { currentUser } from '../../../apis/user.api';
import { isUnlock, mark } from '../../../apis/learning.api';
import axios from 'axios';

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
    <div className="flex h-screen bg-[#f6f6f6] relative overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white rounded-r-[24px] shadow-2xl border-r-4 border-[#ff5722] sticky top-0 h-screen overflow-y-auto relative z-10">
        {/* Header */}
        <div className="p-6 border-b-2 border-[#ff5722] bg-white rounded-tr-[24px] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px'
              }}
            />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight text-[#000000] leading-tight mb-2">
              <span className="block italic">FIN</span>
              <span className="block text-[#ff5722] italic">LEARN</span>
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Master your finances step by step
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="w-6 h-6 border-2 border-[#ff5722] rounded-full"></div>
          </div>
        </div>

        {/* Modules List */}
        <div className="p-4">
          <div className="flex flex-col gap-3">
            {modules.map((module, index) => {
              const isUnlocked = index <= course;
              const isActive = selectedModule === module.name;
              
              return (
                <div key={module.name} className="flex flex-col">
                  <div
                    className={`rounded-[16px] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer relative border-2 ${
                      isActive 
                        ? 'bg-[#ff5722] text-white border-[#e64a19] shadow-2xl transform -translate-y-1' 
                        : isUnlocked
                        ? 'bg-white text-black border-gray-200 hover:border-[#ff5722]'
                        : 'bg-gray-100 text-gray-500 border-gray-300'
                    }`}
                    onClick={() => checkUnlock(module)}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 0 4px'
                        }}
                      />
                    </div>

                    <div className="p-4 relative z-10">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="flex items-center mr-3 flex-shrink-0">
                            {isUnlocked ? (
                              <Unlock className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#ff5722]'}`} />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <span className={`text-sm font-black leading-tight text-left flex-1 uppercase tracking-wide ${
                            isActive ? 'text-white' : isUnlocked ? 'text-black' : 'text-gray-500'
                          }`}>
                            {module.name}
                          </span>
                        </div>
                        <button
                          className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center flex-shrink-0 ml-2 border-2 ${
                            isActive 
                              ? 'bg-white text-[#ff5722] border-white hover:bg-gray-100' 
                              : isUnlocked
                              ? 'bg-[#ff5722] text-white border-[#ff5722] hover:bg-[#e64a19]'
                              : 'bg-gray-300 text-gray-500 border-gray-300'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(module.name);
                          }}
                        >
                          {expandedModules.includes(module.name) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Decorative Elements */}
                      {isActive && (
                        <div className="absolute top-2 right-2 opacity-20">
                          <div className="w-4 h-4 border border-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submodules */}
                  {expandedModules.includes(module.name) && (
                    <div className="mt-3 ml-6 flex flex-col gap-2 relative">
                      {/* Connecting Line */}
                      <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-[#ff5722] opacity-30"></div>
                      
                      {module.submodules.map((submodule, subIndex) => (
                        <div
                          key={subIndex}
                          className="bg-white p-4 text-sm font-bold text-gray-900 rounded-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-[#ff5722] hover:bg-[#fff5f5] hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden shadow-md"
                        >
                          {/* Removed background pattern for better text visibility */}
                          
                          <div className="relative z-10 flex items-center">
                            <div className="w-3 h-3 bg-[#ff5722] rounded-full mr-3 flex-shrink-0"></div>
                            <span className="font-bold uppercase tracking-wide text-gray-900 leading-relaxed">{submodule}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Footer */}
        <div className="p-4 border-t-2 border-[#ff5722] bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px'
              }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="bg-[#ff5722] text-white px-4 py-3 rounded-xl">
              <p className="text-sm font-black uppercase tracking-wide text-center">
                Progress: {course + 1 || 0}/{modules.length}
              </p>
              <div className="mt-2 bg-white bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${((course + 1 || 0) / modules.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-grow overflow-y-auto bg-[#f6f6f6] relative z-10">
        <div className="bg-whitemin-h-full shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-3">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px'
              }}
            />
          </div>
          
          <div className="relative z-10">
            {renderModule()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;