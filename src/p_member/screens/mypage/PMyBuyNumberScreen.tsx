// ✅ 파일 위치: src/p_member/screens/mypage/PMyBuyNumberScreen.tsx
// JJIK 프리미엄 회원 내가 구매한 번호 화면

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
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  PMainHome: undefined;
  PMyPage: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

interface BoughtNumber {
  id: string;
  round: number;
  numbers: number[];
  status: '미추첨' | '1등' | '2등' | '3등' | '4등' | '5등' | '낙첨';
  createdAt: string;
  patternName?: string;
  patternId?: number;
}

interface ApiResponse {
  success: boolean;
  data: BoughtNumber[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
  };
}

const DeleteConfirmModal = ({ 
  visible, 
  onConfirm, 
  onCancel,
  round
}: { 
  visible: boolean; 
  onConfirm: () => void;
  onCancel: () => void;
  round: number;
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <TouchableOpacity 
      style={styles.modalOverlay} 
      onPress={onCancel} 
      activeOpacity={1}
    >
      <View style={styles.alertModal}>
        <Text style={styles.alertText}>
          제 {round}회 번호를 구매목록에서 제거하시겠습니까?{'\n'}
          (구매하지 않은 번호로 처리됩니다)
        </Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity 
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modalButton, styles.confirmButton]}
            onPress={onConfirm}
            activeOpacity={0.7}
          >
            <Text style={styles.confirmButtonText}>제거</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const AddBoughtNumberModal = ({ 
  visible, 
  onClose,
  onSave
}: { 
  visible: boolean; 
  onClose: () => void;
  onSave: (round: number, numbers: number[]) => void;
}) => {
  const [round, setRound] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [number5, setNumber5] = useState('');
  const [number6, setNumber6] = useState('');

  const handleSave = () => {
    const roundNum = parseInt(round);
    const nums = [number1, number2, number3, number4, number5, number6]
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n >= 1 && n <= 45);
    
    if (!roundNum || roundNum <= 0) {
      Alert.alert('오류', '올바른 회차를 입력해주세요.');
      return;
    }
    
    if (nums.length !== 6) {
      Alert.alert('오류', '1~45 사이의 숫자 6개를 모두 입력해주세요.');
      return;
    }
    
    if (new Set(nums).size !== 6) {
      Alert.alert('오류', '중복된 번호가 있습니다.');
      return;
    }
    
    onSave(roundNum, nums.sort((a, b) => a - b));
    
    setRound('');
    setNumber1('');
    setNumber2('');
    setNumber3('');
    setNumber4('');
    setNumber5('');
    setNumber6('');
  };

  const handleClose = () => {
    setRound('');
    setNumber1('');
    setNumber2('');
    setNumber3('');
    setNumber4('');
    setNumber5('');
    setNumber6('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.inputModal}>
          <Text style={styles.inputModalTitle}>구매한 번호 입력</Text>
          
          <View style={styles.roundInputContainer}>
            <Text style={styles.inputLabel}>회차</Text>
            <TextInput
              style={styles.roundInput}
              value={round}
              onChangeText={setRound}
              placeholder="예: 1183"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <View style={styles.numbersInputContainer}>
            <Text style={styles.inputLabel}>당첨번호 (1~45)</Text>
            <View style={styles.numbersRow}>
              <TextInput style={styles.numberInput} value={number1} onChangeText={setNumber1} placeholder="01" keyboardType="numeric" maxLength={2} />
              <TextInput style={styles.numberInput} value={number2} onChangeText={setNumber2} placeholder="02" keyboardType="numeric" maxLength={2} />
              <TextInput style={styles.numberInput} value={number3} onChangeText={setNumber3} placeholder="03" keyboardType="numeric" maxLength={2} />
              <TextInput style={styles.numberInput} value={number4} onChangeText={setNumber4} placeholder="04" keyboardType="numeric" maxLength={2} />
              <TextInput style={styles.numberInput} value={number5} onChangeText={setNumber5} placeholder="05" keyboardType="numeric" maxLength={2} />
              <TextInput style={styles.numberInput} value={number6} onChangeText={setNumber6} placeholder="06" keyboardType="numeric" maxLength={2} />
            </View>
          </View>

          <View style={styles.inputModalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleClose} activeOpacity={0.7}>
              <Text style={styles.cancelButtonText}>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave} activeOpacity={0.7}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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

const PMyBuyNumberScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  const [boughtNumbers, setBoughtNumbers] = useState<BoughtNumber[]>([]);
  const [showNoMoreModal, setShowNoMoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string>('');
  const [selectedDeleteRound, setSelectedDeleteRound] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [userToken, setUserToken] = useState<string>('');

  const handleMorePress = () => {
    if (!hasNextPage) {
      setShowNoMoreModal(true);
    } else {
      loadMoreData();
    }
  };

  const handleAddBoughtNumber = () => {
    setShowAddModal(true);
  };

  const handleSaveBoughtNumber = async (round: number, numbers: number[]) => {
    try {
      const response = await fetch('/api/bought-numbers', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ 
          round, 
          numbers,
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const newBoughtNumber: BoughtNumber = {
            id: data.id || Date.now().toString(),
            round,
            numbers,
            status: '미추첨',
            createdAt: new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(/\//g, '.').replace(',', '.'),
            patternName: data.patternName || undefined
          };
          
          setBoughtNumbers(prev => [newBoughtNumber, ...prev]);
          setShowAddModal(false);
          
          Alert.alert('완료', '구매한 번호가 추가되었습니다.');
        } else {
          throw new Error('API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('구매번호 저장 실패:', error);
      Alert.alert('오류', '저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeletePress = (id: string, round: number) => {
    setSelectedDeleteId(id);
    setSelectedDeleteRound(round);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/bought-numbers/${selectedDeleteId}`, { 
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        setBoughtNumbers(prev => prev.filter(item => item.id !== selectedDeleteId));
        setShowDeleteModal(false);
        setSelectedDeleteId('');
        setSelectedDeleteRound(0);
        Alert.alert('알림', '구매목록에서 제거되었습니다.\n구매한 번호들은 계속 누적됩니다.');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('구매번호 제거 실패:', error);
      Alert.alert('오류', '제거 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedDeleteId('');
    setSelectedDeleteRound(0);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bought-numbers?page=1&limit=10', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setBoughtNumbers(data.data);
          setCurrentPage(data.pagination.currentPage);
          setHasNextPage(data.pagination.hasNext);
        } else {
          throw new Error('API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('구매번호 목록 로드 실패:', error);
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
      const response = await fetch(`/api/bought-numbers?page=${nextPage}&limit=10`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setBoughtNumbers(prev => [...prev, ...data.data]);
          setCurrentPage(data.pagination.currentPage);
          setHasNextPage(data.pagination.hasNext);
        } else {
          throw new Error('API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('추가 구매번호 로드 실패:', error);
      Alert.alert('오류', '추가 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderBoughtCard = (item: BoughtNumber, index: number) => (
    <View key={item.id} style={styles.numberCard}>
      <View style={styles.cardHeader}>
        <View style={styles.roundContainer}>
          <Text style={styles.roundText}>제 {item.round}회</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePress(item.id, item.round)}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
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
      <Image
        source={require('../../../../assets/images/p_member/mypage/p_my_buynumbers_ex.png')}
        style={styles.background}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={[styles.transparentButton, styles.logoButton]}
        onPress={() => navigation.navigate('PMainHome')}
        activeOpacity={0.7}
      />

      <TouchableOpacity
        style={[styles.transparentButton, styles.myButton]}
        onPress={() => navigation.navigate('PMyPage')}
        activeOpacity={0.7}
      />

      <TouchableOpacity
        style={styles.addNumberButton}
        onPress={handleAddBoughtNumber}
        activeOpacity={0.7}
      >
        <Text style={styles.addNumberButtonText}>구매한 번호 입력</Text>
      </TouchableOpacity>

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

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {boughtNumbers.length > 0 ? (
          boughtNumbers.map((item, index) => renderBoughtCard(item, index))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isLoading ? '데이터를 불러오는 중...' : '구매한 번호가 없습니다.'}
            </Text>
          </View>
        )}
      </ScrollView>

      <AddBoughtNumberModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveBoughtNumber}
      />

      <DeleteConfirmModal
        visible={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        round={selectedDeleteRound}
      />

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
  logoButton: {
    top: 85 * (height / DESIGN_HEIGHT),
    left: 10 * (width / DESIGN_WIDTH),
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },
  myButton: {
    top: 100 * (height / DESIGN_HEIGHT),
    right: 10 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
  },
  addNumberButton: {
    position: 'absolute',
    top: 260 * (height / DESIGN_HEIGHT),
    right: 60 * (width / DESIGN_WIDTH),
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#f0f5ff',
  },
  addNumberButtonText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  moreButton: {
    position: 'absolute',
    bottom: 247 * (height / DESIGN_HEIGHT),
    left: 55 * (width / DESIGN_WIDTH),
    right: 55 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
    backgroundColor: 'transparent',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#7a88a6',
    zIndex: 100,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  moreButtonText: {
    fontSize: 0.1 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: 'transparent',
  },
  scrollContainer: {
    position: 'absolute',
    top: 320 * (height / DESIGN_HEIGHT),
    left: 50 * (width / DESIGN_WIDTH),
    right: 50 * (width / DESIGN_WIDTH),
    bottom: 200 * (height / DESIGN_HEIGHT),
  },
  scrollContent: {
    paddingBottom: 20,
  },
  numberCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    minHeight: 140 * (height / DESIGN_HEIGHT),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  roundContainer: {
    alignItems: 'flex-start',
  },
  roundText: {
    fontSize: 18 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: 'yellow',
  },
  deleteButtonText: {
    fontSize: 12 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
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
    lineHeight: 28,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  modalButton: {
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#ff4444',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    minWidth: 350,
    maxWidth: '90%',
  },
  inputModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  roundInputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  roundInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'center',
    width: 120,
  },
  numbersInputContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  numbersRow: {
    flexDirection: 'row',
    gap: 8,
  },
  numberInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    width: 45,
  },
  inputModalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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

export default PMyBuyNumberScreen;