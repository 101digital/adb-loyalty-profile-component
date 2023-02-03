import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../assets';
import { fonts } from '../assets/fonts';
import { ThemeContext } from 'react-native-theme-component';
import { WarningIcon } from '../assets/icons'
import MembershipDetailsCard from './components/membership-details-card'
import AlertModal from 'adb-loyalty-profile-component/src/components/alert-modal';

interface IMembershipDetails {
  navigateToRedeem?: () => void;
}

const ADBMembershipDetailsComponent: React.FC<IMembershipDetails> = (props: IMembershipDetails) => {
  const { i18n } = useContext(ThemeContext);

  const [syncErrorVisible, setSyncErrorVisible] = useState<boolean>(true)
  const [accountCreationError, setAccountCreationError] = useState<boolean>(false)

  return (
    <>
    <View style={styles.container}>
        <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{i18n.t('member_plus.member_plus') ?? 'AEON Member Plus'}</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>{i18n.t('member_plus.good_morning') ?? 'Hi, Good Morning!'}</Text>
                <Text style={styles.loggedUsername}>{'{Aeolanda}'}</Text>
            </View>
            <MembershipDetailsCard onPressRedeem={props.navigateToRedeem}/>
        </View>
    </View>
    <AlertModal
        title={i18n.t('member_plus.no_info_found_err') ?? 'No information found!'}
        message={i18n.t('member_plus.acc_sync_err_msg') ?? 'Sorry, there was an error in syncing your membership account, please feel free to contact ACSM customer service for additional information.'}
        btnLabel={i18n.t('member_plus.contact_cstm_care') ?? 'Contact Customer Care'}
        subBtnLabel={i18n.t('member_plus.done') ?? 'Done'}
        icon={<WarningIcon size={55.5}/>}
        isVisible={syncErrorVisible}
        onConfirmBtnPress={()=>{}}
        onBackdropPress={() => setSyncErrorVisible(false)}
      />
    </>
  );
};

export default ADBMembershipDetailsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  rowInput: {
    marginTop: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  fullWidth: { width: '100%' },
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
  lowerContainer: {
    flexDirection: 'row',
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
    marginTop: 32,
    fontFamily: fonts.regular
  },
  loggedUsername: {
    color: '#1B1B1B',
    fontSize: 16,
    fontFamily: fonts.semiBold
  },
  flex: { flex: 1 },
});
