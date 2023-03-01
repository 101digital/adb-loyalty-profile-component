import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, NativeSyntheticEvent, TextInputFocusEventData, KeyboardAvoidingView } from 'react-native';
import { colors } from '../assets';
import { fonts } from '../assets/fonts';
import { ThemeContext, InputField, BottomSheet } from 'react-native-theme-component';
import { CloseIcon } from 'react-native-theme-component/src/assets';
import { WarningIcon, InfoBlackIcon, ErrorIcon } from '../assets/icons'
import { NumberFormatter, thousandSeparator, removeNonNumeric } from '../components/common'
import AlertModal from 'adb-loyalty-profile-component/src/components/alert-modal';
import Button from 'adb-loyalty-profile-component/src/components/button';
import PointsCard from './components/points-card';
import RedeemDetailsCard from './components/redeem-details-card';
import { LoyaltyPointsContext } from '../contexts'

interface IRedeemPoints {
  onPressContinue: () => void;
}

const ADBRedeemPointsComponent: React.FC<IRedeemPoints> = (props: IRedeemPoints) => {
  const { i18n } = useContext(ThemeContext);
  const { onPressContinue } = props;

  const { redeemablePts, expiringPts, expireDate, redeemingPts, setRedeemPointsValue, setConversionValues, redeemingRealValue, remainingPts } = useContext(LoyaltyPointsContext)

  const conversionPoints = 200;
  const conversionRM = '1.00';
  const incrementOf = 200; 

  const [redeemPointsVisible, setRedeemPointsVisible] = useState<boolean>(false)
  const [redemptionDescVisible, setRedemptionDescVisible] = useState<boolean>(false)
  const [notEnoughPtsErr, setNotEnoughPtsErr] = useState<boolean>(false)
  const [incrementErr, setIncrementErr] = useState<boolean>(false)
  const [inputActive, setInputActive] = useState<boolean>(false);

  const shortRedeemTerms = ["200", "400", "600", "Half", "Max"]

  useEffect(()=> {
    calculatePointsInfo('0');
  }, [])

  const checkIncrement = () => {
    const increment = Number(removeNonNumeric(redeemingPts))/incrementOf;
    return Number.isInteger(increment) ? false : true;
  }

  const checkEnoughPts = () => {
    const amount = Number(redeemablePts) - Number(removeNonNumeric(redeemingPts));
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
    const remPoints = thousandSeparator((Number(redeemablePts) - Number(removeNonNumeric(redeemAmount))).toString())

    setConversionValues(redeemRMAmount, remPoints)
  }

  const handleOnFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputActive(true);
  };

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputActive(false);
    setNotEnoughPtsErr(false)
    setIncrementErr(false)
    if(checkEnoughPts()){
      setNotEnoughPtsErr(true)
    }else if(checkIncrement()){
      setIncrementErr(true)
    }
  };

  const borderColor = inputActive ? '#1B1B1B' : '#C2C2C2'

  const handleOnChangeText = (x: string) => {
    setRedeemPointsValue(thousandSeparator(removeNonNumeric(x)))
    calculatePointsInfo(x);
  }

  const setShortTermsRedeems = async(term: string) => {
    switch(term){
      case '200':
        setRedeemPointsValue(thousandSeparator(removeNonNumeric("200")))
        calculatePointsInfo("200");
        if(Number(removeNonNumeric(redeemablePts)) < 200){
          setNotEnoughPtsErr(true)
        }else{
          setNotEnoughPtsErr(false)
        }
        break;
      case '400':
        setRedeemPointsValue(thousandSeparator(removeNonNumeric("400")))
        calculatePointsInfo("400");
        if(Number(removeNonNumeric(redeemablePts)) < 400){
          setNotEnoughPtsErr(true)
        }else{
          setNotEnoughPtsErr(false)
        }
        break;
      case '600':
        setRedeemPointsValue(thousandSeparator(removeNonNumeric("600")))
        calculatePointsInfo("600");
        if(Number(removeNonNumeric(redeemablePts)) < 600){
          setNotEnoughPtsErr(true)
        }else{
          setNotEnoughPtsErr(false)
        }
        break;
      case 'Half':
        setNotEnoughPtsErr(false)
        const half =  Math.round(Number(removeNonNumeric(redeemablePts))/2);
        const increment = half/incrementOf;
        const isIncrement = Number.isInteger(increment) ? false : true;
        let i = 0;
        if(isIncrement){
          while(i < half){
            i = i+200;
          }
        }
        const halfValue = isIncrement ? i : half
        setRedeemPointsValue(thousandSeparator(removeNonNumeric(halfValue.toString())))
        calculatePointsInfo(halfValue.toString());
        break;
      case 'Max':
        setNotEnoughPtsErr(false)
        const max = Number(removeNonNumeric(redeemablePts))/incrementOf;
        const isMaxIncrement = Number.isInteger(max) ? false : true;
        let n = 0;
        if(isMaxIncrement){
          while(n <= Number(removeNonNumeric(redeemablePts))){
            n = n+200;
          }
        }
        const maxValue = isMaxIncrement ? n - incrementOf : redeemablePts
        setRedeemPointsValue(thousandSeparator(removeNonNumeric(maxValue.toString())))
        calculatePointsInfo(maxValue.toString());
        break;      
    }
  }

  return (
    <>
    <View style={styles.container}>
        <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{i18n.t('member_plus.redeem') ?? 'Redeem'}</Text>
            </View>
        </View>
        <PointsCard myPoints={redeemablePts} expirePoints={expiringPts} expireDate={expireDate}/>
        <View style={styles.myPointsWrapper}>
            <Text style={styles.redeemPtsTxt}>{i18n.t('member_plus.redeem_points') ?? 'Redeem points'}</Text>
            <Button icon={<InfoBlackIcon size={16}/>} background={'#FFFFFF'} onPress={() => setRedeemPointsVisible(true)}/>
        </View>
        <View style={styles.fullWidth}>
            <View style={styles.rowInput}>
               <TextInput style={[styles.inputText, {borderBottomColor: borderColor}]} 
               onChangeText={(x) => handleOnChangeText(x)} defaultValue={redeemingPts}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               keyboardType='number-pad'
               returnKeyType='done'
               />
            </View>
        </View>
      {(notEnoughPtsErr || incrementErr) &&
        <View style={styles.flexDirectionRow}>
          <View style={styles.errIcon}>
            <ErrorIcon size={13}/>
          </View>
          {notEnoughPtsErr && 
            <View style={styles.textWrap}>
              <Text style={styles.errMessageText}>{i18n.t('member_plus.notEnoughPtsErr')}</Text>
            </View>
          }
          {incrementErr && 
            <View style={styles.textWrap}>
              <Text style={styles.errMessageText}>{i18n.t('member_plus.notIncrementingErr')}</Text>
            </View>
          }
          </View>
      }
        {Number(removeNonNumeric(redeemablePts)) >= incrementOf &&
        <View style={styles.shortRedeemContainer}>
          {shortRedeemTerms.map((terms, index) => {
            return (          
            <TouchableOpacity onPress={()=> setShortTermsRedeems(terms) }>
              <View style={[styles.shortRedeemBtn, index != 0 ? styles.gap : {}]}>
                <Text>{terms}</Text>
              </View>
            </TouchableOpacity>);
          })} 
        </View>
        }
        <View style={styles.coversionDetails}>
            <Text style={styles.conversionTxt}>{i18n.t('member_plus.conversion') ?? 'Conversion'}:</Text>
            <Text style={styles.conversionValTxt}> {conversionPoints} pts = RM {conversionRM}.</Text>
        </View>
        <RedeemDetailsCard showRedemptionDesc={() => setRedemptionDescVisible(true)} rmAmount={redeemingRealValue} remainingAmount={remainingPts}/>
    </View>
    <View style={styles.footer}>
        <Button label={i18n.t('member_plus.continue') ?? 'Continue'} 
          fullButton={true} onPress={nextClick}
          disabled={redeemingPts==='0' || redeemingPts==='' || notEnoughPtsErr || incrementErr}
          />
    </View>
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
  shortRedeemContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  shortRedeemBtn: {
    borderRadius: 46,
    borderWidth: 1,
    borderColor: '#1B1B1B',
    width: 60,
    height: 33,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gap:{
    marginLeft: 10
  },
  flexDirectionRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: -2,
  },
  errMessageText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#858585',
    
  },
  textWrap: {
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
  },
  errIcon: {
    alignContent: 'center',
    alignSelf: 'center',
    margin: 8
  }
});
