import React, { ReactNode } from 'react';
import { LoyaltyPointsContext, useLoyaltyPointsContextValue } from './loyalty-points-context';

export type BankingProviderProps = {
  children: ReactNode;
};

const LoyaltyPointsProvider = (props: BankingProviderProps) => {
  const { children } = props;
  const loyaltyPointsContextData = useLoyaltyPointsContextValue();

  return (
    <LoyaltyPointsContext.Provider value={loyaltyPointsContextData}>
      {children}
    </LoyaltyPointsContext.Provider>
  );
};

export default LoyaltyPointsProvider;
