import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, NativeSyntheticEvent, TextInputFocusEventData, KeyboardAvoidingView } from 'react-native';
import { colors } from '../assets';
import { fonts } from '../assets/fonts';
import { ThemeContext, InputField, BottomSheet } from 'react-native-theme-component';
import { CloseIcon } from 'react-native-theme-component/src/assets';
import { WarningIcon, InfoBlackIcon } from '../assets/icons'
import { NumberFormatter, thousandSeparator, removeNonNumeric } from '../components/common'
import AlertModal from 'adb-loyalty-profile-component/src/components/alert-modal';
import Button from 'adb-loyalty-profile-component/src/components/button';
import PointsCard from './components/points-card';
import RedeemDetailsCard from './components/redeem-details-card';

interface IRedeemPoints {
  onPressContinue: () => void;
}

const ADBRedeemPointsComponent: React.FC<IRedeemPoints> = (props: IRedeemPoints) => {
  const { i18n } = useContext(ThemeContext);
  const { onPressContinue } = props;

  const conversionPoints = 200;
  const conversionRM = '1.00';
  const myPoints = 1000;
  const incrementOf = 200; 

  const [redeemPointsVisible, setRedeemPointsVisible] = useState<boolean>(false)
  const [redemptionDescVisible, setRedemptionDescVisible] = useState<boolean>(false)
  const [notEnoughPtsErr, setNotEnoughPtsErr] = useState<boolean>(false)
  const [incrementErr, setIncrementErr] = useState<boolean>(false)
  const [redeemPoints, setRedeemPoints] = useState<string>('0');
  const [redeemRM, setRedeemRM] = useState<string>('')
  const [remainingPoints, setRemainingPoints] = useState<string>('')
  const [inputActive, setInputActive] = useState<boolean>(false);

  useEffect(()=> {
    calculatePointsInfo('0');
  }, [])

  const checkIncrement = () => {
    const increment = Number(removeNonNumeric(redeemPoints))/incrementOf;
    return Number.isInteger(increment) ? false : true;
  }

  const checkEnoughPts = () => {
    const amount = myPoints - Number(removeNonNumeric(redeemPoints));
    return amount < 0 ? true : false;
  }

  const nextClick = () => {
    if(checkEnoughPts()){
      setNotEnoughPtsErr(true)
    }else if(checkIncrement()){
      setIncrementErr(true)
    }else{
      onPressContinue();
    }
  }

  const calculatePointsInfo = (redeemAmount: string) => {
    const redeemRMAmount = NumberFormatter((Number(removeNonNumeric(redeemAmount))/incrementOf).toString(), 2)
    setRedeemRM(redeemRMAmount)

    const remPoints = thousandSeparator((myPoints - Number(removeNonNumeric(redeemAmount))).toString())
    setRemainingPoints(remPoints)
  }

  const handleOnFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputActive(true);

  };

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputActive(false);
  };

  const borderColor = inputActive ? '#1B1B1B' : '#C2C2C2'

  const handleOnChangeText = (x: string) => {
    setRedeemPoints(thousandSeparator(removeNonNumeric(x)));
    calculatePointsInfo(x);
  }

  return (
    <>
    <View style={styles.container}>
        <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{i18n.t('member_plus.redeem') ?? 'Redeem'}</Text>
            </View>
        </View>
        <PointsCard myPoints={myPoints}/>
        <View style={styles.myPointsWrapper}>
            <Text style={styles.redeemPtsTxt}>{i18n.t('member_plus.redeem_points') ?? 'Redeem points'}</Text>
            <Button icon={<InfoBlackIcon size={16}/>} background={'#FFFFFF'} onPress={() => setRedeemPointsVisible(true)}/>
        </View>
        <View style={styles.fullWidth}>
            <View style={styles.rowInput}>
               <TextInput style={[styles.inputText, {borderBottomColor: borderColor}]} 
               onChangeText={(x) => handleOnChangeText(x)} defaultValue={redeemPoints}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               keyboardType='number-pad'
               returnKeyType='done'
               />
            </View>
        </View>
        <View style={styles.coversionDetails}>
            <Text style={styles.conversionTxt}>{i18n.t('member_plus.conversion') ?? 'Conversion'}:</Text>
            <Text style={styles.conversionValTxt}> {conversionPoints} pts = RM {conversionRM}.</Text>
        </View>
        <RedeemDetailsCard showRedemptionDesc={() => setRedemptionDescVisible(true)} rmAmount={redeemRM} remainingAmount={remainingPoints}/>
    </View>
    <View style={styles.footer}>
        <Button label={i18n.t('member_plus.continue') ?? 'Continue'} 
          fullButton={true} onPress={nextClick}
          disabled={redeemPoints==='0' || redeemPoints===''}
          />
    </View>
    <AlertModal
        title={i18n.t('member_plus.notEnoughPtsErr') ?? 'You do not have enough points for this redemption!'}
        btnLabel={i18n.t('member_plus.done') ?? 'Done'}
        icon={<WarningIcon size={55.5}/>}
        isVisible={notEnoughPtsErr}
        onConfirmBtnPress={()=>setNotEnoughPtsErr(false)}
        onBackdropPress={() => setNotEnoughPtsErr(false)}
      />
    <AlertModal
        title={i18n.t('member_plus.notIncrementingErr') ?? 'You can only redeem points in increments of 200!'}
        btnLabel={i18n.t('member_plus.done') ?? 'Done'}
        icon={<WarningIcon size={55.5}/>}
        isVisible={incrementErr}
        onConfirmBtnPress={()=>setIncrementErr(false)}
        onBackdropPress={() => setIncrementErr(false)}
      />      
      <BottomSheet isVisible={redeemPointsVisible} onBackdropPress={() => setRedeemPointsVisible(false)} children={
        <View style={styles.bottomSheetInfobsContainer}>
            <>
              <TouchableOpacity onPress={() => setRedeemPointsVisible(false)} style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetCloseBtnWrapper}>
                  <CloseIcon width={8} height={8} />
                </View>
              </TouchableOpacity>
              <View style={styles.verticalSpacing} />
                <Text style={styles.bottomSheetTitle}>{i18n.t('member_plus.redeem_points') ?? 'Redeem points'}</Text>
              <View style={styles.verticalSpacing} />
              <View style={{height: 250}}>
                <Text style={styles.bottomSheetDesc}>{i18n.t('member_plus.redeem_points_desc')}</Text>
              </View>
            </>
        </View>
      }/>
      <BottomSheet isVisible={redemptionDescVisible} onBackdropPress={() => setRedemptionDescVisible(false)} children={
        <View style={styles.bottomSheetInfobsContainer}>
            <>
              <TouchableOpacity onPress={() => setRedemptionDescVisible(false)} style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetCloseBtnWrapper}>
                  <CloseIcon width={8} height={8} />
                </View>
              </TouchableOpacity>
              <View style={styles.verticalSpacing} />
                <Text style={styles.bottomSheetTitle}>{i18n.t('member_plus.redemption_period') ?? 'Redemption period'}</Text>
              <View style={styles.verticalSpacing} />
              <View style={{height: 250}}>
                <Text style={styles.bottomSheetDesc}>{i18n.t('member_plus.redemption_period_desc')}</Text>
              </View>
            </>
        </View>
      }/>
    </>
  );
};

export default ADBRedeemPointsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  footer: {
    paddingHorizontal: 24,
    marginBottom: 5
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
  },
  fullWidth: { width: '100%' },
  rowInput: {
    marginTop: 15,
  },
  titleWrapper:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  title: {
    color: '#1B1B1B',
    fontSize: 24,
    marginTop: 24,
    fontFamily: fonts.semiBold,
  },
  myPointsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  redeemPtsTxt: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#858585',
    textAlign: 'center'
  },
  inputText: {
    fontFamily: fonts.semiBold,
    fontSize: 32,
    marginBottom: 14,
    paddingBottom: 6,
    // borderBottomColor: '#1B1B1B',
    borderBottomWidth: 2,
    textAlign: 'center'
  },
  coversionDetails: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row'
  },
  conversionTxt: {
    fontFamily: fonts.medium,
    fontSize: 12
  },
  conversionValTxt: {
    fontFamily: fonts.regular,
    fontSize: 12
  },
  bottomSheetTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    color: '#1B1B1B'
  },
  bottomSheetDesc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#1B1B1B'
  },
  verticalSpacing: {
    height: 10,
  },
  bottomSheetHeader: {
    alignItems: 'flex-end',
  },
  bottomSheetCloseBtnWrapper: {
    backgroundColor: '#EBEBEB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32
  },
  bottomSheetInfobsContainer: {
    padding: 24,
  },
});
