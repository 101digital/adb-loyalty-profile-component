import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { colors } from '../assets';
import { fonts } from '../assets/fonts';
import { ThemeContext } from 'react-native-theme-component';
import { WarningIcon, GiftIcon } from '../assets/icons'
import AlertModal from 'adb-loyalty-profile-component/src/components/alert-modal';


const ADBRedemptionHistoryComponent: React.FC<{}> = () => {
  const { i18n } = useContext(ThemeContext);

  const [syncErrorVisible, setSyncErrorVisible] = useState<boolean>(false)

  const redemptionHistoryData = [
    {
      title: 'Redeemed', 
      redemptionDate: '02/03/2022',
      rmValue: '1.00',
      redeemedPoints: '-200 pts'
    },
    {
        title: 'Redeemed', 
        redemptionDate: '02/03/2022',
        rmValue: '1.00',
        redeemedPoints: '-200 pts'
    },
    {
        title: 'Redeemed', 
        redemptionDate: '02/03/2022',
        rmValue: '1.00',
        redeemedPoints: '-200 pts'
    },
    {
        title: 'Redeemed', 
        redemptionDate: '02/03/2022',
        rmValue: '1.00',
        redeemedPoints: '-200 pts'
    },
  ]

  return (
    <>
    <View style={styles.container}>
        <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{i18n.t('member_plus.redemption_history') ?? 'Redemption History'}</Text>
            </View>
        </View>
        <View>
        <FlatList 
            style={styles.flatlist}
            data={redemptionHistoryData}
            renderItem={({ item, index }) => (
                <View style={[styles.historyListWrapper, index == 0 ? styles.borderTopSet : {}]}>
                    <View style={styles.imageProductWrapper}>
                        <GiftIcon size={20} />
                    </View>
                    <View style={styles.historyInfo}>
                        <View>
                            <Text style={styles.historyTitle}>{item.title}</Text>
                            <Text style={styles.historySubTitle}>{item.redemptionDate}</Text>
                        </View>
                        <View>
                            <Text style={styles.historyTitle}>{item.rmValue}</Text>
                            <Text style={styles.historySubTitle}>{item.redeemedPoints}</Text>
                        </View>
                    </View>
                </View>
                )}
            />
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

export default ADBRedemptionHistoryComponent;

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
  flex: { flex: 1 },
  flatlist: {
    marginTop: 38
  },
  historyListWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 12,
    paddingTop: 12
  },
  borderTopSet: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC'
  },
  imageProductWrapper: {
    borderRadius: 50,
    marginRight: 13,
    justifyContent: 'center'
  },
  historyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  historyTitle: {
    color: '#1B1B1B',
    fontFamily: fonts.medium,
    fontSize: 12,
    textAlign: 'right'
  },
  historySubTitle: {
    color: '#3F3F3F',
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  horizontalLine: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  }
});
