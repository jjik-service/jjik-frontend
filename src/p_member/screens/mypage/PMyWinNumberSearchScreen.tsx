// ✅ 파일 위치: src/p_member/screens/mypage/PMyWinNumberSearchScreen.tsx
// JJIK 프리미엄 회원 당첨번호 확인 화면

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { LottoBall, BonusLottoBall } from '../../../components/LottoBall';

// 네비게이션 타입 정의
type RootStackParamList = {
  PMainHome: undefined;
  PMyPage: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

// 화면 크기 및 디자인 기준
const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// 로또 당첨번호 데이터 타입
interface LottoData {
  round: number;
  numbers: number[];
  bonus: number;
  prize: string;
  drawDate: string;
}

// API 응답 타입
interface LottoApiResponse {
  success: boolean;
  data: LottoData;
  message?: string;
}

// 업데이트 예정 모달 컴포넌트
const UpdateModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity 
      style={styles.modalOverlay} 
      onPress={onClose} 
      activeOpacity={1}
    >
      <TouchableOpacity 
        style={styles.modalContent} 
        onPress={onClose} 
        activeOpacity={1}
      >
        {/*
        <Image
          source={require('../../../../../assets/images/modals/update_message_modal.png')}
          style={styles.modalImage}
          resizeMode="contain"
        /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const PMyWinNumberSearchScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // 로또 당첨번호 상태
  const [lottoData, setLottoData] = useState<LottoData>({
    round: 0,
    numbers: [],
    bonus: 0,
    prize: "",
    drawDate: ""
  });

  // 검색 관련 상태
  const [searchRound, setSearchRound] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ 사용자 토큰 (실제 앱에서는 AsyncStorage나 Context에서 가져와야 함)
  const [userToken, setUserToken] = useState<string>(''); // TODO: 실제 토큰으로 교체

  // 찍로고 버튼 클릭 - PMainHome으로 이동
  const handleLogoPress = () => {
    navigation.navigate('PMainHome');
  };

  // my 버튼 클릭 - 마이페이지로 이동
  const handleMyPagePress = () => {
    navigation.navigate('PMyPage');
  };

  // QR코드 당첨확인 버튼 클릭 - 업데이트 예정 모달
  const handleQRPress = () => {
    setShowUpdateModal(true);
  };

  // 당첨회차 검색 버튼 클릭
  const handleSearchPress = () => {
    if (searchRound.trim()) {
      const roundNum = parseInt(searchRound.trim());
      if (roundNum > 0) {
        fetchLottoData(roundNum);
      } else {
        Alert.alert('오류', '올바른 회차를 입력해주세요.');
      }
    } else {
      Alert.alert('알림', '검색할 회차를 입력해주세요.');
    }
  };

  // 초기 데이터 로드 (최신 회차)
  useEffect(() => {
    fetchLatestLottoData();
  }, []);

  // 최신 로또 당첨번호 조회
  const fetchLatestLottoData = async () => {
    setIsLoading(true);
    try {
      // ✅ 백엔드 API 호출 - 최신 로또 당첨번호 조회
      const response = await fetch('/api/lotto/latest', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // 사용자 토큰 필요
        },
      });

      if (response.ok) {
        const data: LottoApiResponse = await response.json();
        if (data.success && data.data) {
          setLottoData(data.data);
        } else {
          throw new Error(data.message || 'API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('최신 로또 데이터 조회 실패:', error);
      Alert.alert('오류', '최신 당첨번호를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 특정 회차 로또 데이터 조회 함수
  const fetchLottoData = async (round: number) => {
    setIsLoading(true);
    try {
      // ✅ 백엔드 API 호출 - 특정 회차 로또 당첨번호 조회
      const response = await fetch(`/api/lotto/${round}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: LottoApiResponse = await response.json();
        if (data.success && data.data) {
          setLottoData(data.data);
          setSearchRound(''); // 검색 성공 시 입력창 초기화
        } else {
          throw new Error(data.message || 'API response unsuccessful');
        }
      } else if (response.status === 404) {
        Alert.alert('알림', `제 ${round}회 당첨번호를 찾을 수 없습니다.`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('로또 데이터 조회 실패:', error);
      Alert.alert('오류', '당첨번호를 조회하는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require('../../../../assets/images/p_member/mypage/p_my_winnumber_search.png')}
        style={styles.background}
        resizeMode="contain"
      /> */}
      
      {/* 어두운 오버레이 */}
      <View style={styles.darkOverlay} />

        {/* 찍로고 버튼 */}
        <TouchableOpacity
          style={[styles.transparentButton, styles.logoButton]}
          onPress={handleLogoPress}
          activeOpacity={0.7}
        />

        {/* my 버튼 */}
        <TouchableOpacity
          style={[styles.transparentButton, styles.myButton]}
          onPress={handleMyPagePress}
          activeOpacity={0.7}
        />

      {/* 회차 표시 박스 */}
      <View style={styles.roundBox}>
        <Text style={styles.roundText}>
          {isLoading ? '로딩 중...' : `제 ${lottoData.round}회`}
        </Text>
      </View>

      {/* 로또 당첨번호 메인 박스 */}
      <View style={styles.lottoMainBox}>
        {/* 회차 제목 */}
        <Text style={styles.lottoRoundTitle}>
          {isLoading ? '데이터를 불러오는 중...' : `제 ${lottoData.round}회 로또당첨번호`}
        </Text>
        
        {/* 당첨번호들 - 수정된 부분 */}
        {!isLoading && lottoData.numbers.length > 0 && (
          <View style={styles.lottoNumbersContainer}>
            {lottoData.numbers.map((num, idx) => (
              <LottoBall key={idx} number={num} />
            ))}
            <Text style={styles.plusText}>+</Text>
            <BonusLottoBall number={lottoData.bonus} />
          </View>
        )}

        {/* 추첨일 표시 */}
        {!isLoading && lottoData.drawDate && (
          <Text style={styles.drawDateText}>추첨일: {lottoData.drawDate}</Text>
        )}
        
        {/* QR코드 당첨확인 버튼 */}
        <TouchableOpacity 
          style={[styles.qrButton, isLoading && styles.disabledButton]}
          onPress={handleQRPress}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <Text style={styles.qrButtonText}>QR코드 당첨확인</Text>
        </TouchableOpacity>

        {/* 설명 텍스트 */}
        <Text style={styles.descriptionText}>
          동행복권 QR코드 인식 → 자동 당첨확인{"\n"}
          "내가 구매한 번호" 자동 저장
        </Text>
      </View>

      {/* 당첨회차 검색 섹션 */}
      <Text style={styles.searchTitle}>🏆 로또회차 검색</Text>
      
      <View style={styles.searchContainer}>
        {/* 검색 입력창 */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="숫자만 입력"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={searchRound}
            onChangeText={setSearchRound}
            keyboardType="numeric"
            maxLength={4}
            editable={!isLoading}
          />
        </View>

        {/* 검색 버튼 */}
        <TouchableOpacity
          style={[styles.searchButton, isLoading && styles.disabledButton]}
          onPress={handleSearchPress}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* 업데이트 예정 모달 */}
      <UpdateModal
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(7, 18, 34, 0)',
  },
  transparentButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  // 상단 네비게이션
  logoButton: {
    top: 25,
    left: 10 * (width / DESIGN_WIDTH),
    width: 130 * (width / DESIGN_WIDTH),
    height: 130 * (height / DESIGN_HEIGHT),
  },
  myButton: {
    top: 80 * (height / DESIGN_HEIGHT),
    right: 15 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
  },
  // 회차 표시 박스
  roundBox: {
    position: 'absolute',
    top: 420 * (height / DESIGN_HEIGHT),
    left: (width - 500 * (width / DESIGN_WIDTH)) / 2,
    width: 500 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
    backgroundColor: 'rgb(239, 250, 183)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.22)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#cedcff',
  },
  roundText: {
    fontSize: 64 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
  },
  // 로또 당첨번호 메인 박스
  lottoMainBox: {
    position: 'absolute',
    top: 600 * (height / DESIGN_HEIGHT),
    left: (width - 987 * (width / DESIGN_WIDTH)) / 2,
    width: 987 * (width / DESIGN_WIDTH),
    height: 838 * (height / DESIGN_HEIGHT),
    backgroundColor: '#fffefe',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    shadowColor: 'rgba(0, 0, 0, 0.22)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#cedcff',
  },
  lottoRoundTitle: {
    fontSize: 64 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  lottoNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 64 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#000',
  },
  drawDateText: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  // QR 버튼
  qrButton: {
    width: 854 * (width / DESIGN_WIDTH),
    height: 174 * (height / DESIGN_HEIGHT),
    backgroundColor: '#4800ff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  qrButtonText: {
    fontSize: 88 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  descriptionText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
  },
  // 당첨회차 검색
  searchTitle: {
    position: 'absolute',
    top: 1530 * (height / DESIGN_HEIGHT),
    left: 0,
    right: 0,
    fontSize: 64 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#e9ff91',
    textAlign: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: 1600 * (height / DESIGN_HEIGHT),
    left: (width - 550 * (width / DESIGN_WIDTH)) / 2,
    width: 620 * (width / DESIGN_WIDTH),
    height: 160 * (height / DESIGN_HEIGHT),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    height: 120 * (height / DESIGN_HEIGHT),
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#cedcff',
  },
  searchInput: {
    fontSize: 64 * (width / DESIGN_WIDTH),
    color: '#000',
    textAlign: 'center',
    paddingVertical: 10, // 세로 패딩 추가
  },
  searchButton: {
    width: 150 * (width / DESIGN_WIDTH),
    height: 150 * (height / DESIGN_HEIGHT),
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 110 * (width / DESIGN_WIDTH),
    textAlign: 'center',
  },
  // 모달 관련
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalImage: {
    width: width * 0.9,
    maxWidth: 400,
    height: undefined,
    aspectRatio: 1,
  },
});

export default PMyWinNumberSearchScreen;