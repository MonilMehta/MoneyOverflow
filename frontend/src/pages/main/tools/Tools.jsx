import React, { useState } from 'react';
import SIPCalculator from './components/SIPCalculator';
import SWPCalculator from './components/SWPCalculator';
import FDCalculator from './components/FDCalculator';
import SavingsGoalCalculator from './components/SavingsGoalCalculator';
import EMICalculator from './components/EMICalculator';
import BillSplitCalculator from './components/BillSplitCalculator';

const Tools = () => {

  return (
    <div>
      <SIPCalculator/>
      <SWPCalculator/>
      <FDCalculator/>
      <SavingsGoalCalculator/>
      <EMICalculator/>
      <BillSplitCalculator/>
    </div>
  );
};

export default Tools;
