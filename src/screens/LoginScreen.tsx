/**
 * ================================================================
 * JJIK 로또 번호 생성 앱 - 로그인 화면 (수정됨)
 * ================================================================
 * 
 * 파일 경로: src/screens/LoginScreen.tsx
 * 
 * ✅ 수정사항:
 * 1. API 엔드포인트를 config/api.ts 사용
 * 2. 네비게이션 타입을 any로 임시 해결 (게스트/멤버 둘 다 접근)
 * 3. 로그인 성공시 PMainHome으로 이동
 * 
 * 로그인 화면 (Figma 1092x1920 기준 좌표 정확 반영)
 * 배경 이미지를 contain으로 꽉 채워 표시 (크롭 없음)
 * 카드 위치는 Figma의 '카드 영역' 좌표에 맞춰 정확히 렌더링
 * 투명 입력창으로 배경 이미지의 디자인된 UI와 완벽하게 매칭
 */
// ✅ 파일 위치: src/screens/LoginScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getApiUrl, API_ENDPOINTS } from '../config/api';
import FindIdPasswordModal from '../components/FindIdPasswordModal';
import OpenpageModal from '../components/OpenpageModal';

// ✅ 로그인 화면에서 접근 가능한 화면들만 정의
type LoginStackParamList = {
  PremiumStack: undefined;  // 로그인 성공시
  MainGuest: undefined;  // 게스트 이용시
  SignUp: undefined;     // 회원가입시
};

type LoginNavigationProp = NavigationProp<LoginStackParamList>;

// 이미지 파일
const loginBg = require('../../assets/images/pages/login_bg.png');
const errorModal = require('../../assets/images/modals/login_errormessage_modal.png');

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);

  // ✅ 컴포넌트 마운트시 150ms 후 오픈페이지 모달 자동 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOpenModal(true);
    }, 150);

    // 컴포넌트 언마운트시 타이머 정리 (메모리 누수 방지)
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    try {
      // ✅ 임시 테스트 계정 - 백엔드 연동 전까지 사용
      if (id === 'test' && pw === '1234') {
        // 로그인 성공시 프리미엄 멤버 메인으로 이동
        navigation.navigate('PremiumStack');
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setShowErrorModal(true);
    }
  };

  const handleGuest = () => {
    // ✅ 게스트 이용시 게스트 메인으로 이동
    navigation.navigate('MainGuest');
  };

  const handleSignUp = () => {
    // ✅ 회원가입 페이지로 이동
    navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 로그인 배경 */}
        <ImageBackground source={loginBg} style={styles.bg} resizeMode="contain">
          {/* 아이디 입력창 */}
          <TextInput
            style={styles.idInput}
            placeholder=""
            placeholderTextColor="transparent"
            onChangeText={setId}
            value={id}
            keyboardType="default"
            autoCapitalize="none"
          />
          
          {/* 비밀번호 입력창 */}
          <TextInput
            style={styles.pwInput}
            placeholder=""
            placeholderTextColor="transparent"
            onChangeText={setPw}
            value={pw}
            secureTextEntry
          />

          {/* 로그인 버튼 */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} />
          
          {/* 회원가입 버튼 */}
          <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp} />
          
          {/* 아이디/비밀번호 찾기 버튼 */}
          <TouchableOpacity style={styles.findBtn} onPress={() => setShowFindModal(true)} />
          
          {/* 게스트 이용 버튼 */}
          <TouchableOpacity style={styles.guestBtn} onPress={handleGuest} />

          {/* ✅ 오픈페이지 모달 - 화면 진입시 자동 표시 */}
          {showOpenModal && (
            <OpenpageModal onClose={() => setShowOpenModal(false)} />
          )}

          {/* 로그인 실패 모달 */}
          {showErrorModal && (
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowErrorModal(false)}>
              <ImageBackground source={errorModal} style={styles.modalImage} resizeMode="contain" />
            </TouchableOpacity>
          )}

          {/* 아이디/비번 찾기 모달 (내부 터치 허용) */}
          {showFindModal && (
            <FindIdPasswordModal
              visible={true}
              onClose={() => setShowFindModal(false)}
            />
          )}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

// ✅ 스타일 정의 - Figma 1092x1920 기준 반응형
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // 아이디 입력창
  idInput: {
    position: 'absolute',
    top: '28.2%', // Y: 500 / 1920
    left: '6%',
    width: '88%',
    height: 60,
    backgroundColor: 'transparent',
    color: '#000000',
    fontSize: 18,
    paddingHorizontal: 20,

  },
  // 비밀번호 입력창
  pwInput: {
    position: 'absolute',
    top: '36.5%', // Y: 682
    left: '6%',
    width: '88%',
    height: 60,
    backgroundColor: 'transparent',
    color: '#000000',
    fontSize: 18,
    paddingHorizontal: 20,


  },
  // 로그인 버튼
  loginBtn: {
    position: 'absolute',
    top: '44.5%', // Y: 863
    left: '6%',
    width: '43%',
    height: 60,
    backgroundColor: 'transparent',

  },
  // 회원가입 버튼
  signupBtn: {
    position: 'absolute',
    top: '44.5%',
    right: '6%',
    width: '43%',
    height: 60,
    backgroundColor: 'transparent',

  },
  // 아이디/비밀번호 찾기 버튼
  findBtn: {
    position: 'absolute',
    top: '53%', // Y: 1043
    left: '15%',
    width: '70%',
    height: 50,
    backgroundColor: 'transparent',

  },
  // 게스트 이용 버튼
  guestBtn: {
    position: 'absolute',
    top: '74.6%',
    left: '10%',
    width: '80%',
    height: 70,
    backgroundColor: 'transparent',
    // ✅ 개발용 노란색 외곽선 (배포시 제거)

  },
  // 모달 오버레이
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 모달 이미지
  modalImage: {
    width: '100%',
    height: '40%',
  },
});