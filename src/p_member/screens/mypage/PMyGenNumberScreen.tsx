// ✅ 파일 위치: src/p_member/screens/mypage/PMyGenNumberScreen.tsx
// JJIK 프리미엄 회원 내가 생성한 번호 화면

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

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

// 생성된 번호 데이터 타입
interface GeneratedNumber {
  id: string;
  round: number;
  numbers: number[];
  status: '미추첨' | '1등' | '2등' | '3등' | '4등' | '5등' | '낙첨';
  createdAt: string;
  patternName?: string;
  patternId?: number;
}

// API 응답 타입
interface ApiResponse {
  success: boolean;
  data: GeneratedNumber[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
  };
}

// 더보기 불가 알림 모달
const NoMoreDataModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity 
      style={styles.modalOverlay} 
      onPress={onClose} 
      activeOpacity={1}
    >
      <View style={styles.alertModal}>
        <Text style={styles.alertText}>더 이상 불러올 데이터가 없습니다.</Text>
        <TouchableOpacity 
          style={styles.alertButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Text style={styles.alertButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const PMyGenNumberScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // 상태 관리
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumber[]>([]);
  const [showNoMoreModal, setShowNoMoreModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [userToken, setUserToken] = useState<string>('');

  // 더보기 버튼 클릭
  const handleMorePress = () => {
    if (!hasNextPage) {
      setShowNoMoreModal(true);
    } else {
      loadMoreData();
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/my-generated-numbers?page=1&limit=10', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setGeneratedNumbers(data.data);
          setCurrentPage(data.pagination.currentPage);
          setHasNextPage(data.pagination.hasNext);
        } else {
          throw new Error('API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('생성번호 목록 로드 실패:', error);
      Alert.alert('오류', '데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreData = async () => {
    if (isLoading || !hasNextPage) return;
    
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/my-generated-numbers?page=${nextPage}&limit=10`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setGeneratedNumbers(prev => [...prev, ...data.data]);
          setCurrentPage(data.pagination.currentPage);
          setHasNextPage(data.pagination.hasNext);
        } else {
          throw new Error('API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('추가 데이터 로드 실패:', error);
      Alert.alert('오류', '추가 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 생성번호 카드 렌더링
  const renderNumberCard = (item: GeneratedNumber, index: number) => (
    <View key={item.id} style={styles.numberCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.roundText}>제 {item.round}회</Text>
        <Text style={[
          styles.statusText,
          item.status === '1등' && styles.rank1Text,
          item.status === '2등' && styles.rank2Text,
          item.status === '3등' && styles.rank3Text,
          (item.status === '4등' || item.status === '5등') && styles.rank45Text,
        ]}>{item.status}</Text>
      </View>

      <View style={styles.lottoNumbersContainer}>
        {item.numbers.map((num, idx) => (
          <View key={idx} style={[styles.lottoNumberCircle, idx < item.numbers.length - 1 && { marginRight: 8 }]}>
            <Text style={styles.lottoNumberText}>{num}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.dateText}>{item.createdAt}</Text>
        {item.patternName && (
          <Text style={styles.patternText}>{item.patternName}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require('../../../../../assets/images/p_member/mypage/p_my_generate_number_ex.png')}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* my 버튼 영역 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.myButton]}
        onPress={() => navigation.navigate('PMyPage')}
        activeOpacity={0.7}
      />

      {/* 찍로고 버튼 영역 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.logoButton]}
        onPress={() => navigation.navigate('PMainHome')}
        activeOpacity={0.7}
      />

      {/* 더보기 버튼 - 상단 배치 */}
      <TouchableOpacity
        style={[styles.moreButton, isLoading && styles.disabledButton]}
        onPress={handleMorePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <Text style={styles.moreButtonText}>
          {isLoading ? '로딩 중...' : '더 보 기'}
        </Text>
      </TouchableOpacity>

      {/* 생성번호 목록 */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {generatedNumbers.length > 0 ? (
          generatedNumbers.map((item, index) => renderNumberCard(item, index))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isLoading ? '데이터를 불러오는 중...' : '아직 생성한 번호가 없습니다.'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 더보기 불가 모달 */}
      <NoMoreDataModal
        visible={showNoMoreModal}
        onClose={() => setShowNoMoreModal(false)}
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
  myButton: {
    top: 100 * (height / DESIGN_HEIGHT),
    left: 882 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
  },
  logoButton: {
    top: 90 * (height / DESIGN_HEIGHT),
    left: (width - 1080 * (width / DESIGN_WIDTH)) / 2,
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },
  moreButton: {
    position: 'absolute',
    top: 410 * (height / DESIGN_HEIGHT),
    left: 30 * (width / DESIGN_WIDTH),
    right: 30 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
    backgroundColor: '#666',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    zIndex: 100,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  moreButtonText: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: 'yellow',
  },
  scrollContainer: {
    position: 'absolute',
    top: 320 * (height / DESIGN_HEIGHT),
    left: 50 * (width / DESIGN_WIDTH),
    right: 50 * (width / DESIGN_WIDTH),
    bottom: 100 * (height / DESIGN_HEIGHT),
  },
  scrollContent: {
    paddingBottom: 20,
  },
  numberCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    minHeight: 120 * (height / DESIGN_HEIGHT),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roundText: {
    fontSize: 18 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
  },
  statusText: {
    fontSize: 16 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#666',
  },
  rank1Text: {
    color: '#FFD700',
  },
  rank2Text: {
    color: '#C0C0C0',
  },
  rank3Text: {
    color: '#CD7F32',
  },
  rank45Text: {
    color: '#4A90E2',
  },
  lottoNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  lottoNumberCircle: {
    width: 40 * (width / DESIGN_WIDTH),
    height: 40 * (height / DESIGN_HEIGHT),
    borderRadius: 20 * (width / DESIGN_WIDTH),
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottoNumberText: {
    fontSize: 14 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12 * (width / DESIGN_WIDTH),
    color: '#999',
  },
  patternText: {
    fontSize: 12 * (width / DESIGN_WIDTH),
    color: '#666',
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18 * (width / DESIGN_WIDTH),
    color: '#ccc',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    minWidth: 300,
  },
  alertText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  alertButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PMyGenNumberScreen;