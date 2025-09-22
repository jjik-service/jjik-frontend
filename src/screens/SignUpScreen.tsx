// ✅ 파일 위치: src/screens/SignUpScreen.tsx
// ✅ 배경 이미지: assets/images/pages/join_bg.png
// ✅ 모달 이미지들: assets/images/modals/terms_modal.png, privacy_modal.png, marketing_modal.png
// 회원가입 화면 - 완전 반응형 + 체크박스/모달 문제 해결

import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Modal,
  Image,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../types/navigation';

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// 반응형 계산 함수
const scaleWidth = (size: number) => (size / DESIGN_WIDTH) * width;
const scaleHeight = (size: number) => (size / DESIGN_HEIGHT) * height;
const scaleFontSize = (size: number) => (size / DESIGN_HEIGHT) * height;

// ✅ 약관 모달 컴포넌트들 - 내부/외부 터치 모두 닫기
const TermsModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <Image
        source={require('../../assets/images/modals/terms_modal.png')}
        style={styles.modalImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </Modal>
);

const PrivacyModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <Image
        source={require('../../assets/images/modals/privacy_modal.png')}
        style={styles.modalImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </Modal>
);

const MarketingModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <Image
        source={require('../../assets/images/modals/marketing_modal.png')}
        style={styles.modalImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </Modal>
);

const SignUpScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 회원가입 폼 상태 관리
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referrer, setReferrer] = useState(''); // 추천인

  // ✅ 체크박스 상태 관리
  const [isChecked1, setIsChecked1] = useState(false); // 서비스 이용약관 (필수)
  const [isChecked2, setIsChecked2] = useState(false); // 개인정보 수집/이용 (필수)
  const [isChecked3, setIsChecked3] = useState(false); // JJIK 서비스 알림받기 (선택)
  const [isChecked4, setIsChecked4] = useState(false); // 추천인 입력 자동 체크 (선택)

  // ✅ 모달 상태 관리
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);

  // ✅ 중복체크 버튼 핸들러
  const handleDuplicateCheck = () => {
    if (!userId.trim()) {
      Alert.alert('알림', '아이디를 입력해주세요.');
      return;
    }
    Alert.alert('중복체크', '사용 가능한 아이디입니다.');
  };

  // ✅ 추천인 확인 버튼 핸들러
  const handleReferrerCheck = () => {
    if (!referrer.trim()) {
      Alert.alert('알림', '추천인을 입력해주세요.');
      return;
    }
    Alert.alert('추천인 확인', '추천인이 확인되었습니다.');
  };

  // ✅ 체크박스 토글 핸들러들
  const handleCheck1 = () => {
    console.log('체크박스1 클릭됨', !isChecked1);
    setIsChecked1(!isChecked1);
  };
  const handleCheck2 = () => {
    console.log('체크박스2 클릭됨', !isChecked2);
    setIsChecked2(!isChecked2);
  };
  const handleCheck3 = () => {
    console.log('체크박스3 클릭됨', !isChecked3);
    setIsChecked3(!isChecked3);
  };
  const handleCheck4 = () => {
    console.log('체크박스4 클릭됨', !isChecked4);
    setIsChecked4(!isChecked4);
  };

  // ✅ 약관 보기 버튼 핸들러들
  const handleViewTerms = () => setShowTermsModal(true);
  const handleViewPrivacy = () => setShowPrivacyModal(true);
  const handleViewMarketing = () => setShowMarketingModal(true);

  // ✅ 무료가입하기 버튼 핸들러
  const handleSignUp = async () => {
    // 폼 유효성 검사
    if (!userId.trim()) {
      Alert.alert('알림', '아이디를 입력해주세요.');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('알림', '비밀번호를 입력해주세요.');
      return;
    }
    
    if (password !== passwordConfirm) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!phoneNumber.trim()) {
      Alert.alert('알림', '핸드폰번호를 입력해주세요.');
      return;
    }

    // 필수 약관 동의 확인
    if (!isChecked1 || !isChecked2) {
      Alert.alert('알림', '필수 약관에 동의해주세요.');
      return;
    }

    try {
      // TODO: 실제 회원가입 API 호출
      Alert.alert('회원가입 완료', '회원가입이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('Login')
        }
      ]);
    } catch (error) {
      console.error('회원가입 에러:', error);
      Alert.alert('오류', '네트워크 연결을 확인해주세요.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 회원가입 배경 */}
        <ImageBackground 
          source={require('../../assets/images/pages/join_bg.png')} 
          style={styles.bg} 
          resizeMode="contain"
        >
          {/* ✅ 아이디 입력창 */}
          <TextInput
            style={styles.userIdInput}
            placeholder=""
            placeholderTextColor="transparent"
            value={userId}
            onChangeText={setUserId}
            keyboardType="default"
            autoCapitalize="none"
          />

          {/* ✅ 중복체크 버튼 */}
          <TouchableOpacity 
            style={styles.duplicateCheckBtn} 
            onPress={handleDuplicateCheck}
          />

          {/* ✅ 비밀번호 입력창 */}
          <TextInput
            style={styles.passwordInput}
            placeholder=""
            placeholderTextColor="transparent"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* ✅ 비밀번호 확인 입력창 */}
          <TextInput
            style={styles.passwordConfirmInput}
            placeholder=""
            placeholderTextColor="transparent"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />

          {/* ✅ 핸드폰번호 입력창 */}
          <TextInput
            style={styles.phoneInput}
            placeholder=""
            placeholderTextColor="transparent"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
            maxLength={11}
          />

          {/* ✅ 추천인 입력창 */}
          <TextInput
            style={styles.referrerInput}
            placeholder=""
            placeholderTextColor="transparent"
            value={referrer}
            onChangeText={setReferrer}
            keyboardType="default"
            autoCapitalize="none"
          />

          {/* ✅ 추천인 확인 버튼 */}
          <TouchableOpacity 
            style={styles.referrerCheckBtn} 
            onPress={handleReferrerCheck}
          />

          {/* ✅ 약관 체크박스들 - 체크 표시 중앙 정렬 */}
          <View style={styles.checkboxContainer1}>
            <TouchableOpacity style={styles.checkboxBtn} onPress={handleCheck1}>
              {isChecked1 && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </View>
          
          <View style={styles.checkboxContainer2}>
            <TouchableOpacity style={styles.checkboxBtn} onPress={handleCheck2}>
              {isChecked2 && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </View>
          
          <View style={styles.checkboxContainer3}>
            <TouchableOpacity style={styles.checkboxBtn} onPress={handleCheck3}>
              {isChecked3 && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </View>
          
          <View style={styles.checkboxContainer4}>
            <TouchableOpacity style={styles.checkboxBtn} onPress={handleCheck4}>
              {isChecked4 && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </View>

          {/* ✅ 약관 보기 버튼들 */}
          <TouchableOpacity style={styles.viewBtn1} onPress={handleViewTerms} />
          <TouchableOpacity style={styles.viewBtn2} onPress={handleViewPrivacy} />
          <TouchableOpacity style={styles.viewBtn3} onPress={handleViewMarketing} />

          {/* ✅ 무료가입하기 버튼 */}
          <TouchableOpacity 
            style={styles.signupBtn} 
            onPress={handleSignUp}
          />

        </ImageBackground>

        {/* ✅ 약관 모달들 */}
        <TermsModal 
          visible={showTermsModal} 
          onClose={() => setShowTermsModal(false)} 
        />
        <PrivacyModal 
          visible={showPrivacyModal} 
          onClose={() => setShowPrivacyModal(false)} 
        />
        <MarketingModal 
          visible={showMarketingModal} 
          onClose={() => setShowMarketingModal(false)} 
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

// ✅ 완전 반응형 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // ✅ 입력창들 - 텍스트 아래 정렬
  userIdInput: {
    position: 'absolute',
    top: scaleHeight(390),
    left: scaleWidth(140),
    width: scaleWidth(565),
    height: scaleHeight(80),
    backgroundColor: 'transparent',

    color: '#000000',
    fontSize: scaleFontSize(48),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(15),
    paddingBottom: scaleHeight(10),
  },

  duplicateCheckBtn: {
    position: 'absolute',
    top: scaleHeight(390),
    left: scaleWidth(720),
    width: scaleWidth(240),
    height: scaleHeight(80),
    backgroundColor: 'transparent',

  },

  passwordInput: {
    position: 'absolute',
    top: scaleHeight(510),
    left: scaleWidth(140),
    width: scaleWidth(810),
    height: scaleHeight(80),
    backgroundColor: 'transparent',

    color: '#000000',
    fontSize: scaleFontSize(48),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(15),
    paddingBottom: scaleHeight(10),
  },

  passwordConfirmInput: {
    position: 'absolute',
    top: scaleHeight(620),
    left: scaleWidth(140),
    width: scaleWidth(810),
    height: scaleHeight(80),
    backgroundColor: 'transparent',

    color: '#000000',
    fontSize: scaleFontSize(48),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(15),
    paddingBottom: scaleHeight(10),
  },

  phoneInput: {
    position: 'absolute',
    top: scaleHeight(735),
    left: scaleWidth(140),
    width: scaleWidth(810),
    height: scaleHeight(80),
    backgroundColor: 'transparent',

    color: '#000000',
    fontSize: scaleFontSize(48),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(15),
    paddingBottom: scaleHeight(10),
  },

  referrerInput: {
    position: 'absolute',
    top: scaleHeight(1730),
    left: scaleWidth(320),
    width: scaleWidth(650),
    height: scaleHeight(100),
    backgroundColor: '#ffffff',

    color: '#000000',
    fontSize: scaleFontSize(64),
    paddingHorizontal: scaleWidth(30),
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(10),
  },

  referrerCheckBtn: {
    position: 'absolute',
    top: scaleHeight(1730),
    left: scaleWidth(115),
    width: scaleWidth(180),
    height: scaleHeight(100),
    backgroundColor: 'transparent',

  },

  // ✅ 체크박스 컨테이너들 - 완전 중앙정렬
  checkboxContainer1: {
    position: 'absolute',
    top: scaleHeight(850),
    left: scaleWidth(614),
    width: scaleWidth(100),
    height: scaleHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxContainer2: {
    position: 'absolute',
    top: scaleHeight(1284),
    left: scaleWidth(70),
    width: scaleWidth(100),
    height: scaleHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxContainer3: {
    position: 'absolute',
    top: scaleHeight(1430),
    left: scaleWidth(70),
    width: scaleWidth(100),
    height: scaleHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxContainer4: {
    position: 'absolute',
    top: scaleHeight(1576),
    left: scaleWidth(70),
    width: scaleWidth(100),
    height: scaleHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ✅ 약관 보기 버튼들
  viewBtn1: {
    position: 'absolute',
    top: scaleHeight(1290),
    left: scaleWidth(905),
    width: scaleWidth(130),
    height: scaleHeight(80),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },

  viewBtn2: {
    position: 'absolute',
    top: scaleHeight(1436),
    left: scaleWidth(905),
    width: scaleWidth(130),
    height: scaleHeight(80),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },

  viewBtn3: {
    position: 'absolute',
    top: scaleHeight(1582),
    left: scaleWidth(905),
    width: scaleWidth(130),
    height: scaleHeight(80),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },

  signupBtn: {
    position: 'absolute',
    top: scaleHeight(830),
    left: scaleWidth(87),
    width: scaleWidth(480),
    height: scaleHeight(125),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },

  // ✅ 모달 관련 스타일 - 작은 크기
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalImage: {
    width: width * 0.9,
    height: height * 0.9,
  },

  // ✅ 체크마크 스타일 - 80 크기, 검은색
  checkMark: {
    fontSize: scaleFontSize(80),
    color: '#000000',
    fontWeight: 'bold',
  },
});