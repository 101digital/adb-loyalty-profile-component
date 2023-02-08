import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NativeModules, LayoutAnimation, SafeAreaView, FlatList } from 'react-native';
import { fonts } from '../../assets';
import { ThemeContext } from 'react-native-theme-component';
import { thousandSeparator } from '../../components/common'

interface IPointsCard {
  myPoints: number
}

const PointsCard: React.FC<IPointsCard> = (props: IPointsCard) => {

  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.cardContainer}>
        <View style={styles.myPointsWrapper}>
            <Text style={styles.subtitle}>{i18n.t('member_plus.my_points') ?? 'My points'}</Text>
        </View>
        <View>
            <Text style={styles.pointsText}>{thousandSeparator(props.myPoints.toString())}</Text>
        </View>
        <View style={styles.flexRow}>
            <Text style={[styles.pointsExpireText, styles.fontMedium]}>{'{200 pts}'}</Text>
            <Text style={[styles.pointsExpireText, styles.fontRegular]}>
              {i18n.t('member_plus.membership_expired') ?? 'will be expired on'}
            </Text>
            <Text style={[styles.pointsExpireText, styles.fontMedium]}>{'{Mar 2023}'}</Text>
        </View>
    </View>
  );
};

export default PointsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#1B1B1B',
    marginTop: 32,
  },
  flexRow: {
    flexDirection: 'row'
  },
  myPointsWrapper: {
    flexDirection: 'row',
  },
  membershipDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hideIconWrapper: {
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: '#FFFFFF'
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: '#FFFFFF',
  },
  pointsText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 4,
  },
  pointsExpireText: {
    marginLeft: 1,
    fontSize: 10,
    marginTop: 8,
    color: '#FFFFFF',
  },
  fontRegular: {
    fontFamily: fonts.regular
  },
  fontMedium: {
    fontFamily: fonts.medium
  },
  redeemBtn: {
    marginTop: 30
  },
  bsContainer: {
    // height: '90%',
    padding: 24,
  },
  verticalSpacing: {
    height: 10,
  },
  header: {
    alignItems: 'flex-end',
  },
  barcodeVerticalContainer: {
    flexDirection: 'row',
    paddingTop: 140,
    paddingBottom: 140,
    justifyContent: 'space-between',
    width: '100%',
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'

  },
  barcodeVertical:{
    resizeMode: 'cover',
    transform: [{rotate: '-90deg'}],
  },
  pointsInfobsContainer: {
    padding: 24,
  },
  bsCloseBtnWrapper: {
    backgroundColor: '#EBEBEB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32
  },
  bsTitle: {
    color: '#1B1B1B',
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
  pointsTitle: {
    color: '#1B1B1B',
    fontFamily: fonts.regular,
    fontSize: 14
  },
  pointsSubTitle: {
    color: '#1B1B1B',
    fontFamily: fonts.regular,
    fontSize: 12,
    flexWrap: 'wrap',
    marginTop: 5,
  },
  horizontalSpacing: { width: 12 },
  pointsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  imageProductWrapper: {
    borderRadius: 50,
    marginRight: 13,
  },
  productInfoSection: {
    flex: 1,
  },
  pointsFooter: {
    marginTop: 45
  },
  flatlist: {
    marginTop: 38
  }
});
