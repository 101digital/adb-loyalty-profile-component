import React, {useState, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NativeModules, LayoutAnimation, SafeAreaView, FlatList } from 'react-native';
import { colors, fonts, images } from '../../assets';
import Button from 'adb-loyalty-profile-component/src/components/button'
import { InfoBlackIcon } from '../../assets/icons'
import { Image, BottomSheet, ThemeContext } from 'react-native-theme-component';
import { CloseIcon } from 'react-native-theme-component/src/assets';

interface IRedeemDetails {
  showRedemptionDesc: () => void;
  rmAmount: string,
  remainingAmount: string
}

const RedeemDetailsCard: React.FC<IRedeemDetails> = (props: IRedeemDetails) => {

  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.cardContainer}>
        <View style={[styles.redeemDetRow, styles.marginBottom16]}>
            <Text style={styles.redeemDetText}>{i18n.t('member_plus.redeem') ?? 'Redeem'}</Text>
            <Text style={styles.redeemValText}>RM {props.rmAmount}</Text>
        </View>
        <View style={[styles.redeemDetRow, styles.marginBottom16]}>
            <View style={styles.myRedemptionWrapper}>
              <Text style={styles.redeemDetText}>{i18n.t('member_plus.redemption_period') ?? 'Redemption period'}</Text>
              <Button icon={<InfoBlackIcon size={16}/>} background={'#FFFFFF'} onPress={props.showRedemptionDesc}/>
            </View>
            <Text style={styles.redeemValText}>1 day</Text>
        </View>
        <View style={styles.redeemDetRow}>
            <Text style={styles.redeemDetText}>{i18n.t('member_plus.remaining_points') ?? 'Remaining points'}</Text>
            <Text style={styles.redeemValText}>{props.remainingAmount} pts</Text>
        </View>
    </View>
  );
};

export default RedeemDetailsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderColor: '#1B1B1B',
    borderWidth: 1
  },
  redeemDetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redeemDetText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#858585'
  },
  redeemValText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#333333'
  },
  marginBottom16:{
    marginBottom: 16
  },
  myRedemptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
