// ✅ 파일 위치: src/p_member/screens/mypage/PMyPageScreen.tsx
// JJIK 프리미엄 회원 마이페이지 메인 화면

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../navigation/p_navigation';
import { getLottoNumberColor } from '../../../utils/LottoColors';

// 화면 크기 및 디자인 기준
const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 1080;
const DESIGN_HEIGHT = 1920;

// 로또 당첨번호 데이터 타입
interface LottoData {
  round: number;
  numbers: number[];
  bonus: number;
  prize: string;
  drawDate: string;
}

// 사용자 통계 데이터 타입
interface UserStats {
  totalGenerated: number;
  totalBought: number;
  savedPatterns: number;
  savedCombinations: number;
  winCount: number;
  lastActivity: string;
}

// API 응답 타입
interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const PMyPageScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // 로또 당첨번호 상태
  const [lottoData, setLottoData] = useState<LottoData>({
    round: 0,
    numbers: [],
    bonus: 0,
    prize: "",
    drawDate: ""
  });

  // 사용자 통계 상태
  const [userStats, setUserStats] = useState<UserStats>({
    totalGenerated: 0,
    totalBought: 0,
    savedPatterns: 0,
    savedCombinations: 0,
    winCount: 0,
    lastActivity: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ 사용자 토큰 (실제 앱에서는 AsyncStorage나 Context에서 가져와야 함)
  const [userToken, setUserToken] = useState<string>(''); // TODO: 실제 토큰으로 교체

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  // 초기 데이터 로드 (로또 당첨번호 + 사용자 통계)
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // 개별적으로 데이터 로드 (하나 실패해도 다른 것은 계속 진행)
      loadLatestLottoData();
      loadUserStatistics();
    } catch (error) {
      console.error('초기 데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 최신 로또 당첨번호 조회
  const loadLatestLottoData = async () => {
    try {
      // ✅ 백엔드 API 호출 - 최신 로또 당첨번호 조회
      const response = await fetch('/api/lotto/latest', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
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
      Alert.alert('알림', '최신 당첨번호를 불러오는데 실패했습니다.');
    }
  };

  // 사용자 통계 정보 조회
  const loadUserStatistics = async () => {
    try {
      // ✅ 백엔드 API 호출 - 사용자 마이페이지 통계 조회
      const response = await fetch('/api/user/mypage-stats', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success && data.data) {
          setUserStats(data.data);
        } else {
          throw new Error(data.message || 'API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('사용자 통계 조회 실패:', error);
      Alert.alert('알림', '사용자 통계를 불러오는데 실패했습니다.');
    }
  };

  // 찍로고 버튼 클릭 - PMainHome으로 이동
  const handleLogoPress = () => {
    navigation.navigate('PMainHome');
  };

  // 당첨번호 확인 버튼 클릭
  const handleWinNumberPress = () => {
    navigation.navigate('PMyWinNumberSearch');
  };

  // 내 개인정보 버튼 클릭  
  const handleProfilePress = () => {
    navigation.navigate('PMyProfile');
  };

  // 내가 생성한 번호 버튼 클릭
  const handleGenNumberPress = () => {
    navigation.navigate('PMyGenNumber');
  };

  // 내가 구매한 번호 버튼 클릭
  const handleBuyNumberPress = () => {
    navigation.navigate('PMyBuyNumber');
  };

  // 나만의 패턴 버튼 클릭
  const handleMyPatternPress = () => {
    navigation.navigate('PMyPatSaveCard');
  };

  // 나만의 조합 버튼 클릭
  const handleMyCombiPress = () => {
    navigation.navigate('PMyCombiSaveCard');
  };

  // ✅ 로또번호 공 렌더링 (실제 로또 색상 적용)
  const renderLottoNumber = (number: number, index: number) => (
    <View 
      key={index} 
      style={[
        styles.lottoNumberCircle, 
        { backgroundColor: getLottoNumberColor(number) } // 실제 로또 색상 적용
      ]}
    >
      <Text style={styles.lottoNumberText}>{number}</Text>
    </View>
  );

  // ✅ 보너스번호 렌더링 (노란색 배경, 검은 테두리)
  const renderBonusNumber = (number: number) => (
    <View style={styles.bonusNumberCircle}>
      <Text style={styles.bonusNumberText}>{number}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require('../../../../assets/images/p_member/mypage/p_mypage.png')}
        style={styles.background}
        resizeMode="contain"
      />

      {/* 찍로고 버튼 (상단 좌측) */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.logoButton]}
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* 로또 당첨번호 박스 */}
      <View style={styles.lottoInfoBox}>
        {/* 회차 제목 */}
        <Text style={styles.lottoRoundTitle}>
          {isLoading ? '로딩 중...' : `제 ${lottoData.round}회 로또당첨번호`}
        </Text>
        
        {/* 당첨번호들 */}
        {!isLoading && lottoData.numbers.length > 0 && (
          <View style={styles.lottoNumbersContainer}>
            {lottoData.numbers.map((num, idx) => renderLottoNumber(num, idx))}
            <Text style={styles.plusText}>+</Text>
            {renderBonusNumber(lottoData.bonus)}
          </View>
        )}
        
        {/* 당첨금액 */}
        <Text style={styles.prizeText}>
          💸 1등 당첨금액 : {isLoading ? '로딩 중...' : `${lottoData.prize}원`}
        </Text>

        {/* 추첨일 */}
        {!isLoading && lottoData.drawDate && (
          <Text style={styles.drawDateText}>추첨일: {lottoData.drawDate}</Text>
        )}
      </View>

      {/* 당첨번호 확인 버튼 - Figma 좌표: x50 y716 w497 h122 */}
      <TouchableOpacity 
        style={[styles.transparentButton, {
          top: '35%',    // 716 / 1920
          left: '4.6%',    // 50 / 1080  
          width: '46%',    // 497 / 1080
          height: '6.4%',  // 122 / 1920
        }]}
        onPress={handleWinNumberPress}
        activeOpacity={0.7}
        disabled={isLoading}
      />

      {/* 내 개인정보 버튼 - Figma 좌표: x50 y855 w497 h122 */}
      <TouchableOpacity 
        style={[styles.transparentButton, {
          top: '44%',    // 855 / 1920
          left: '4.6%',    // 50 / 1080  
          width: '46%',    // 497 / 1080
          height: '6.4%',  // 122 / 1920
        }]}
        onPress={handleProfilePress}
        activeOpacity={0.7}
        disabled={isLoading}
      />

      {/* 내가 생성한 번호 버튼 - Figma 좌표: x50 y994 w497 h122 */}
      <TouchableOpacity 
        style={[styles.transparentButton, {
          top: '52%',    // 994 / 1920
          left: '4.6%',    // 50 / 1080  
          width: '46%',    // 497 / 1080
          height: '6.4%',  // 122 / 1920
        }]}
        onPress={handleGenNumberPress}
        activeOpacity={0.7}
        disabled={isLoading}
      />

      {/* 내가 구매한 번호 버튼 - Figma 좌표: x50 y1133 w497 h122 */}
      <TouchableOpacity 
        style={[styles.transparentButton, {
          top: '61.2%',      // 1133 / 1920
          left: '4.6%',    // 50 / 1080  
          width: '46%',    // 497 / 1080
          height: '6.4%',  // 122 / 1920
        }]}
        onPress={handleBuyNumberPress}
        activeOpacity={0.7}
        disabled={isLoading}
      />

      {/* 나만의 패턴 버튼 - Figma 좌표: x50 y1272 w497 h122 */}
      <TouchableOpacity 
        style={[styles.transparentButton, {
          top: '70%',    // 1272 / 1920
          left: '4.6%',    // 50 / 1080  
          width: '46%',    // 497 / 1080
          height: '6.4%',  // 122 / 1920
        }]}
        onPress={handleMyPatternPress}
        activeOpacity={0.7}
        disabled={isLoading}
      />

      {/* 나만의 조합 버튼 - Figma 좌표: x50 y1411 w497 h122 */}
      <TouchableOpacity 
        style={[styles.transparentButton, {
          top: '78.7%',    // 1411 / 1920
          left: '4.6%',    // 50 / 1080  
          width: '46%',    // 497 / 1080
          height: '6.4%',  // 122 / 1920
        }]}
        onPress={handleMyCombiPress}
        activeOpacity={0.7}
        disabled={isLoading}
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
  transparentButton: {
    position: 'absolute',
    backgroundColor: 'transparent',

  },
  // 찍로고 버튼 (상단 좌측)
  logoButton: {
    top: 90 * (height / DESIGN_HEIGHT),
    left: 10 * (width / DESIGN_WIDTH),
    width: 120.2 * (width / DESIGN_WIDTH),
    height: 121 * (height / DESIGN_HEIGHT),
  },
  // 로또 당첨번호 박스
  lottoInfoBox: {
    position: 'absolute',
    top: 330 * (height / DESIGN_HEIGHT),
    left: 50 * (width / DESIGN_WIDTH),
    width: 987 * (width / DESIGN_WIDTH),
    height: 340 * (height / DESIGN_HEIGHT),
    backgroundColor: '#fffefe',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  lottoRoundTitle: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#000',
    marginBottom: 20,
  },
  lottoNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  // ✅ 실제 로또공 스타일 (색상은 getLottoNumberColor로 적용)
  lottoNumberCircle: {
    width: 50 * (width / DESIGN_WIDTH),
    height: 50 * (height / DESIGN_HEIGHT),
    borderRadius: 25 * (width / DESIGN_WIDTH),
    borderWidth: 1,
    borderColor: '#cedcff', // 연한 파란색 테두리
    alignItems: 'center',
    justifyContent: 'center',
    // 그림자 효과
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  lottoNumberText: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#fff', // 흰색 텍스트 (실제 로또와 동일)
  },
  // ✅ 보너스번호 스타일 (노란색 배경, 검은 테두리)
  bonusNumberCircle: {
    width: 50 * (width / DESIGN_WIDTH),
    height: 50 * (height / DESIGN_HEIGHT),
    borderRadius: 25 * (width / DESIGN_WIDTH),
    backgroundColor: '#eeff00', // 보너스번호 노란색
    borderWidth: 1,
    borderColor: '#000', // 검은 테두리
    alignItems: 'center',
    justifyContent: 'center',
    // 그림자 효과
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  bonusNumberText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#000', // 검은색 텍스트 (노란 배경과 대비)
  },
  plusText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#000',
  },
  prizeText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: 'rgba(17, 17, 17, 0.85)',
    textAlign: 'center',
    marginBottom: 10,
  },
  drawDateText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    color: '#666',
    textAlign: 'center',
  },
});

export default PMyPageScreen;