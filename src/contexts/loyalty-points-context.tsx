import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ILoyaltyPoints } from './types';

export const loyaltyPointsDefaultValue: ILoyaltyPoints = {
    redeemablePts: '0',
    expiringPts: '0',
    expireDate: '',
    redeemingPts: '0',
    redeemingRealValue: '0',
    remainingPts: '0',
    clearLoyaltyData: () => undefined,
    setInitialValues: () => undefined,
    setRedeemPointsValue: () => undefined,
    setConversionValues: () => undefined
}

export const LoyaltyPointsContext = React.createContext<ILoyaltyPoints>(loyaltyPointsDefaultValue);

export const useLoyaltyPointsContextValue = (): ILoyaltyPoints => {

    const [_redeemablePts, setRedeemablePts] = useState<string>('0');
    const [_expiringPts, setExpiringPts] = useState<string>('0');
    const [_expiringDate, setExpiringDate] = useState<string>('');
    const [_redeemingPts, setRedeemingPts] = useState<string>('0');
    const [_redeemingRealValue, setRedeemingRealValue] = useState<string>('0')
    const [_remainingPts, setRemainingPts] = useState<string>('0')

    const clearLoyaltyData = useCallback(() => {
        setRedeemablePts('0');
        setExpiringPts('0')
        setExpiringDate('');
        setRedeemingPts('0')
        setRedeemingRealValue('0')
        setRemainingPts('0')        
      }, []);

    const setInitialValues = useCallback((redeemPts: string, expirePts: string, expireDate: string) => {
        setRedeemablePts(redeemPts);
        setExpiringPts(expirePts);
        setExpiringDate(expireDate)
    }, []) 

    const setRedeemPointsValue = useCallback((redeemPts: string) => {
        setRedeemingPts(redeemPts)
    }, [])

    const setConversionValues = useCallback((realValue: string, remainingPts: string) => {
        setRedeemingRealValue(realValue)
        setRemainingPts(remainingPts)
    }, [])

    return useMemo(() => ({
        redeemablePts: _redeemablePts,
        expiringPts: _expiringPts,
        expireDate: _expiringDate,
        redeemingPts: _redeemingPts,
        redeemingRealValue: _redeemingRealValue,
        remainingPts: _remainingPts,
        clearLoyaltyData,
        setInitialValues,
        setRedeemPointsValue,
        setConversionValues
        }),
        [
            _redeemablePts,
            _expiringPts,
            _expiringDate,
            _redeemingPts,
            _redeemingRealValue,
            _remainingPts
        ]
    );
}