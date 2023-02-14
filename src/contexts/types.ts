export interface ILoyaltyPoints{
    redeemablePts: string;
    expiringPts: string;
    expireDate: string;
    redeemingPts: string;
    redeemingRealValue: string;
    remainingPts: string;
    clearLoyaltyData: () => void;
    setInitialValues: (redeemPts: string, expirePts: string, expireDate: string) => void;
    setRedeemPointsValue: (redeemPts: string) => void;
    setConversionValues: (realValue: string, remainingPts: string) => void;
}