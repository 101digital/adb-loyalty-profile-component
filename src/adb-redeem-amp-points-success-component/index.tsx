import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../assets';
import { fonts } from '../assets/fonts';
import { ThemeContext } from 'react-native-theme-component';
import { WarningIcon, CorrectIcon } from '../assets/icons'
import AlertModal from 'adb-loyalty-profile-component/src/components/alert-modal';
import Button from 'adb-loyalty-profile-component/src/components/button';

interface IRedeemPointsSuccess {
  navigateMembershipHome: () => void;
}

const ADBRedeemAMPPointsSuccessComponent: React.FC<IRedeemPointsSuccess> = (props: IRedeemPointsSuccess) => {
  const { i18n } = useContext(ThemeContext);
  const { navigateMembershipHome } = props

  const [redemptionSuccessAlert, setRedemptionSuccessAlert] = useState<boolean>(false)
  const [redemptionErrorAlert, setredemptionErrorAlert] = useState<boolean>(false)

    const onPressConfirm = () => {
        setRedemptionSuccessAlert(true)
        // setredemptionErrorAlert(true)
    }

    const onSuccessDone = () => {
        setRedemptionSuccessAlert(false)
        navigateMembershipHome()
    }

    const onErrorDone = () => {
        setredemptionErrorAlert(false)
        //navigate member plus home
    }

  return (
    <>
    <View style={styles.container}>
        <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{i18n.t('member_plus.confirm_redemption') ?? 'Confirm redemption'}</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>{i18n.t('member_plus.confirm_redemption_subtitle')}</Text>
            </View>
        </View>
        <View style={styles.historyContainer}>
            <View style={styles.redeemHistoryDetRow}>
                <Text style={styles.historyTitletxt}>{i18n.t('member_plus.csh_redemption_amt') ?? 'Cash redemption amount'}</Text>
                <Text style={styles.historyValTxt}>RM 2.00</Text>
            </View>
            <View style={styles.redeemHistoryDetRow}>
                <Text style={styles.historyTitletxt}>{i18n.t('member_plus.pts_used') ?? 'Points used'}</Text>
                <Text style={styles.historyValTxt}>400 pts</Text>
            </View>
            <View style={styles.redeemHistoryDetRow}>
                <Text style={styles.historyTitletxt}>{i18n.t('member_plus.pts_balance') ?? 'Points balance'}</Text>
                <Text style={styles.historyValTxt}>600 pts</Text>
            </View>
        </View>
        <View style={styles.coversionDetails}>
            <Text style={styles.conversionTxt}>{i18n.t('member_plus.note') ?? 'Note'}{': '}
                <Text style={styles.conversionValTxt}>{i18n.t('member_plus.redemption_note')}</Text>
            </Text>
        </View>        
    </View>
    <View style={styles.footer}>
        <Button label={i18n.t('member_plus.confirm') ?? 'Confirm'} 
          fullButton={true} onPress={()=>{onPressConfirm()}}
          />
    </View>
    <AlertModal
        title={i18n.t('member_plus.redemption_success') ?? 'Redemption is successful!'}
        message={i18n.t('member_plus.redemption_success_desc') ?? 'Cash will only be credited into your account after 1 day.'}
        btnLabel={i18n.t('member_plus.done') ?? 'Done'}
        icon={<CorrectIcon size={55.5}/>}
        isVisible={redemptionSuccessAlert}
        onConfirmBtnPress={()=>{onSuccessDone()}}
        onBackdropPress={() => onSuccessDone()}
      />
    <AlertModal
        title={i18n.t('member_plus.redemption_unsuccess') ?? 'Redemption is unsuccessful!'}
        message={i18n.t('member_plus.redemption_unsuccess_err')}
        btnLabel={i18n.t('member_plus.contact_cstm_care') ?? 'Contact Customer Care'}
        subBtnLabel={i18n.t('member_plus.done') ?? 'Done'}
        icon={<WarningIcon size={55.5}/>}
        isVisible={redemptionErrorAlert}
        onConfirmBtnPress={()=>{}}
        onSubBtnPress={()=> onErrorDone()}
        onBackdropPress={() => onErrorDone()}
      />
    </>
  );
};

export default ADBRedeemAMPPointsSuccessComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 24,
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
  subtitle:{
    color: '#1B1B1B',
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.regular
  },
  flex: { flex: 1 },
  coversionDetails: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  conversionTxt: {
    fontFamily: fonts.medium,
    fontSize: 12
  },
  conversionValTxt: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  footer: {
    paddingHorizontal: 24,
    marginBottom: 5
  },
  historyContainer: {
    marginTop: 34
  },
  redeemHistoryDetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  historyTitletxt: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#858585'
  },
  historyValTxt: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#333333'
  }
});
