import React, {useState, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NativeModules, LayoutAnimation, SafeAreaView, FlatList } from 'react-native';
import { colors, fonts, images } from '../../assets';
import Button from 'adb-loyalty-profile-component/src/components/button'
import { RedeemArrowIcon, EyeSlashIcon, EyeIcon, InfoIcon, ImagePlaceHolderIcon } from '../../assets/icons'
import { Image, BottomSheet, ThemeContext } from 'react-native-theme-component';
import { CloseIcon } from 'react-native-theme-component/src/assets';

interface ICardDetails {
  onPressRedeem?: () => void;
}

const MembershipDetailsCard: React.FC<ICardDetails> = (props: ICardDetails) => {

  const { i18n } = useContext(ThemeContext);

  const {UIManager} = NativeModules;
  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

  const [membershipDetailsVisible, setMembershipDetailsVisible] = useState<boolean>(false)
  const [showBottomSheetVisible, setShowBottomSheetVisible] = useState<boolean>(false)
  const [myPointsVisible, setMyPointsVisible] = useState<boolean>(false)

  const pointsData = [
    {
      title: i18n.t('member_plus.my_amp_pts') ?? 'My AMP points', 
      description: i18n.t('member_plus.amp_pts_desc') ?? 'Please slide down to refresh the application to view the latest point balance.'
    },
    {
      title: i18n.t('member_plus.faq') ?? 'FAQ', 
      description: i18n.t('member_plus.faq_desc') ?? 'For any queries, please contact ACSM customer service or visit the nearest Aeon branch.'
    }
  ]

  const toggleView = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 1},
      delete: {type: 'linear', property: 'opacity'},
    });

    if(membershipDetailsVisible){
      setMembershipDetailsVisible(false)
    }else{
      setMembershipDetailsVisible(true)
    }
  }

  return (
    <View style={styles.cardContainer}>
        <View style={styles.membershipDetailsContainer}>
            <Text style={styles.title}>{i18n.t('member_plus.membership_dtls') ?? 'Membership Details'}</Text>
            {membershipDetailsVisible ? 
                (   <Button icon={<EyeIcon size={24}/>} onPress={toggleView}/>) :
                     (<Button icon={<EyeSlashIcon size={24}/>} onPress={toggleView}/>)}
        </View>
        <View style={styles.myPointsWrapper}>
            <Text style={styles.subtitle}>My points</Text>
            <Button icon={<InfoIcon size={16}/>} onPress={()=> setMyPointsVisible(true)}/>
        </View>
        <View>
            <Text style={styles.pointsText}>{membershipDetailsVisible ? ('1000') : ('••••')}</Text>
        </View>
        <View>
            <Text style={styles.pointsExpireText}>
              {`{${membershipDetailsVisible ? ('200') : ('•••')} pts} ${i18n.t('member_plus.membership_expired') ?? 'will be expired on'} {${membershipDetailsVisible ? ('Mar 2023') : ('••• ••••')}}`}
            </Text>
        </View>
        <View style={styles.redeemBtn}>
            <Button onPress={props.onPressRedeem} label= {i18n.t('member_plus.redeem_now') ?? 'Redeem Now'} icon={<RedeemArrowIcon size={15}/>}/>
        </View>
        {membershipDetailsVisible &&
          <TouchableOpacity onPress={() => setShowBottomSheetVisible(true)}>
            <View style={styles.barcodeContainer}>
              <Image source={images.barcode} fallbackImage={images.barcode} style={styles.barcode}/>
            </View>
          </TouchableOpacity>
        }

        <BottomSheet isVisible={showBottomSheetVisible} children={
          <View style={styles.bsContainer}>
            <View style={styles.verticalSpacing} />
            <>
              <TouchableOpacity onPress={() => setShowBottomSheetVisible(false)} style={styles.header}>
                  <View style={styles.bsCloseBtnWrapper}>
                    <CloseIcon width={8} height={8} />
                  </View>
              </TouchableOpacity>
              <View style={styles.verticalSpacing} />
              <View style={styles.barcodeVerticalContainer}>
                <View style={styles.left} />
                <View style={styles.center}>
                  <Image source={images.barcode} fallbackImage={images.barcode} style={styles.barcodeVertical}/>
                </View>
                <View style={styles.right} />
              </View>
            </>
          </View>
        }/>

        <BottomSheet isVisible={myPointsVisible} children={
          <View style={styles.pointsInfobsContainer}>
            <View style={styles.verticalSpacing} />
              <>
                <TouchableOpacity onPress={() => setMyPointsVisible(false)} style={styles.header}>
                  <View style={styles.bsCloseBtnWrapper}>
                    <CloseIcon width={8} height={8} />
                  </View>
                </TouchableOpacity>
                <View style={styles.verticalSpacing} />
                <Text style={styles.bsTitle}>{i18n.t('member_plus.points_info') ?? 'Points Info'}</Text>
                <View style={styles.verticalSpacing} />
                <FlatList 
                  style={styles.flatlist}
                  data={pointsData}
                  renderItem={({ item }) => (
                    <View style={styles.pointsWrapper}>
                      <View style={styles.imageProductWrapper}>
                        <ImagePlaceHolderIcon color={'#FFFFFF'} size={20} />
                      </View>
                      <View style={styles.productInfoSection}>
                        <Text style={styles.pointsTitle}>{item.title}</Text>
                        <Text style={styles.pointsSubTitle}>{item.description}</Text>
                      </View>
                    </View>
                 
                  )}
                  />
              </>
              <View style={styles.pointsFooter}>
                <Button label={i18n.t('member_plus.contact_cstm_care') ?? 'Contact Customer Care'} fullButton={true}/>
              </View>
            </View>
        }/>

    </View>
  );
};

export default MembershipDetailsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#1B1B1B',
    marginTop: 32,
  },
  barcodeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    padding: 5,
  },
  barcode: {
    resizeMode: 'cover',
    width: '100%',
    height: 150,
  },
  myPointsWrapper: {
    flexDirection: 'row',
    marginTop: 14
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
    fontSize: 10,
    marginTop: 4,
    color: '#FFFFFF',
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
