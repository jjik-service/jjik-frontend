// ✅ 파일 위치: src/p_member/screens/mypage/PMyPatSaveCardScreen.tsx
// JJIK 프리미엄 회원 나만의 패턴 저장하기 화면

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

type PatternType = 'general' | 'option';
type SortType = 'recent' | 'creation' | 'winning';

interface PatternInfo {
  id: number;
  name: string;
  description: string;
  type: PatternType;
}

interface SavedPattern {
  id: string;
  patternId: number;
  patternName: string;
  customName: string;
  description: string;
  memo: string;
  numbers: number[];
  createdAt: string;
  lastUsed: string;
  winStats: {
    total: number;
    rank1: number;
    rank2: number;
    rank3: number;
    rank4: number;
    rank5: number;
    lose: number;
  };
}

// ✅ 패턴 검색 모달 컴포넌트 - 경로: PMyPatSaveCardScreen.tsx 라인 60-180
const PatternSearchModal = ({
  visible,
  onClose,
  activeTab,
  onPatternSelect,
}: {
  visible: boolean;
  onClose: () => void;
  activeTab: PatternType;
  onPatternSelect: (pattern: PatternInfo) => void;
}) => {
  const [selectedPatternId, setSelectedPatternId] = useState<number | null>(null);

// AI 추천 패턴 목록 (1~45번) - 전체 패턴
const generalPatterns: PatternInfo[] = [
  { id: 1, name: 'AI 추천 패턴 01', description: '전체 최다 출현', type: 'general' },
  { id: 2, name: 'AI 추천 패턴 02', description: '전체 최소 출현', type: 'general' },
  { id: 3, name: 'AI 추천 패턴 03', description: '최근 5회차 미출현', type: 'general' },
  { id: 4, name: 'AI 추천 패턴 04', description: '연속번호 한쌍 포함', type: 'general' },
  { id: 5, name: 'AI 추천 패턴 05', description: '최근 10회 최다 출현', type: 'general' },
  { id: 6, name: 'AI 추천 패턴 06', description: '번호 합계 120~160 범위', type: 'general' },
  { id: 7, name: 'AI 추천 패턴 07', description: '최근 20회 미출현+다빈도', type: 'general' },
  { id: 8, name: 'AI 추천 패턴 08', description: '직전회차 번호 제외', type: 'general' },
  { id: 9, name: 'AI 추천 패턴 09', description: '끝수 다양성', type: 'general' },
  { id: 10, name: 'AI 추천 패턴 10', description: '특정 구간에 4개 집중', type: 'general' },
  { id: 11, name: 'AI 추천 패턴 11', description: '중간구간 비중 UP', type: 'general' },
  { id: 12, name: 'AI 추천 패턴 12', description: '한 구간에 3~4개 집중', type: 'general' },
  { id: 13, name: 'AI 추천 패턴 13', description: '직전 2개 회차 각 1개 포함', type: 'general' },
  { id: 14, name: 'AI 추천 패턴 14', description: '직전 5개 회차 번호 제외', type: 'general' },
  { id: 15, name: 'AI 추천 패턴 15', description: '최다 출현 고정 2개 포함', type: 'general' },
  { id: 16, name: 'AI 추천 패턴 16', description: '최다 출현 고정 3개 포함', type: 'general' },
  { id: 17, name: 'AI 추천 패턴 17', description: '직전 50개 회차 미출현 기반', type: 'general' },
  { id: 18, name: 'AI 추천 패턴 18', description: '저번대 고번대 각 2개 포함', type: 'general' },
  { id: 19, name: 'AI 추천 패턴 19', description: '번호합계 130~150 범위', type: 'general' },
  { id: 20, name: 'AI 추천 패턴 20', description: '연속번호 3개이상', type: 'general' },
  { id: 21, name: 'AI 추천 패턴 21', description: '5개 구간 각 1개 분포', type: 'general' },
  { id: 22, name: 'AI 추천 패턴 22', description: '최다 출현 보너스 3~4개 기반', type: 'general' },
  { id: 23, name: 'AI 추천 패턴 23', description: '최다/최소 번호 제외 기반', type: 'general' },
  { id: 24, name: 'AI 추천 패턴 24', description: '6구간 각 1개 균형 분포', type: 'general' },
  { id: 25, name: 'AI 추천 패턴 25', description: '홀수 2개 짝수 4개 비율', type: 'general' },
  { id: 26, name: 'AI 추천 패턴 26', description: '홀수 3개 짝수 3개 비율', type: 'general' },
  { id: 27, name: 'AI 추천 패턴 27', description: '홀수 4개 짝수 2개 비율', type: 'general' },
  { id: 28, name: 'AI 추천 패턴 28', description: '3개 구간 각 2개식 균형 분포포', type: 'general' },
  { id: 29, name: 'AI 추천 패턴 29', description: '저번대 2개 포함', type: 'general' },
  { id: 30, name: 'AI 추천 패턴 30', description: '고번대 2개 포함', type: 'general' },
  { id: 31, name: 'AI 추천 패턴 31', description: '4개이상 겹친 번호 유형 기반', type: 'general' },
  { id: 32, name: 'AI 추천 패턴 32', description: '역대 1등 유사 패턴 기반', type: 'general' },
  { id: 33, name: 'AI 추천 패턴 33', description: '등차수열 합성 기반', type: 'general' },
  { id: 34, name: 'AI 추천 패턴 34', description: '무리수 활용 합성 기반', type: 'general' },
  { id: 35, name: 'AI 추천 패턴 35', description: '6구간 번호 + 홀짝 교차', type: 'general' },
  { id: 36, name: 'AI 추천 패턴 36', description: '최소/최대 번호 홀짝 맞춤', type: 'general' },
  { id: 37, name: 'AI 추천 패턴 37', description: '소수/배수 합성 기반', type: 'general' },
  { id: 38, name: 'AI 추천 패턴 38', description: 'HOT/COLD 균형 합성', type: 'general' },
  { id: 39, name: 'AI 추천 패턴 39', description: 'DELTA 분산 기반', type: 'general' },
  { id: 40, name: 'AI 추천 패턴 40', description: '피보나치 시프트 기반', type: 'general' },
  { id: 41, name: 'AI 추천 패턴 41', description: '삼각수 기반', type: 'general' },
  { id: 42, name: 'AI 추천 패턴 42', description: 'SUM-RANGE 중신 3~4개 기반', type: 'general' },
  { id: 43, name: 'AI 추천 패턴 43', description: '모듈로 (RECIDUE) 가중치 기반', type: 'general' },
  { id: 44, name: 'AI 추천 패턴 44', description: '포아송 (POISSON) 가중치 기반', type: 'general' },
  { id: 45, name: 'AI 추천 패턴 45', description: '최근 출현 (RARE-HOT) 빈도 필터링', type: 'general' },
];

// 옵션형 패턴 목록 (1~20번) - 전체 패턴
const optionPatterns: PatternInfo[] = [
  { id: 1, name: '옵션 01', description: '최근 5~50회 최다 출현 기반(선택)', type: 'option' },
  { id: 2, name: '옵션 02', description: '최근 5~50회 최소 출현 기반(선택)', type: 'option' },
  { id: 3, name: '옵션 03', description: '최근 5~50회 미출현 기반(선택)', type: 'option' },
  { id: 4, name: '옵션 04', description: '2~4개 연속번호 포함 기반(선택)', type: 'option' },
  { id: 5, name: '옵션 05', description: '홀 : 짝 비율 패턴 기반(선택)', type: 'option' },
  { id: 6, name: '옵션 06', description: '고수/저수 포함 기반(선택)', type: 'option' },
  { id: 7, name: '옵션 07', description: '번호 합계 범위 기반(선택)', type: 'option' },
  { id: 8, name: '옵션 08', description: '번호 구간 2~6개 분할 분포(선택)', type: 'option' },
  { id: 9, name: '옵션 09', description: '끝수 다양성 2~6종 기반(선택)', type: 'option' },
  { id: 10, name: '옵션 10', description: '전체 1등 최다패턴 유사성 기반', type: 'option' },
  { id: 11, name: '옵션 11', description: '전체 1등 역최다패턴 유사성 기반', type: 'option' },
  { id: 12, name: '옵션 12', description: '최근 10~50회 1등 유사패턴 기반', type: 'option' },
  { id: 13, name: '옵션 13', description: '번호별 상성 연관번호 포함 기반', type: 'option' },
  { id: 14, name: '옵션 14', description: '번호별 역상성 연관번호 제외 기반', type: 'option' },
  { id: 15, name: '옵션 15', description: '사주 별자리 이름 음양오행 기반', type: 'option' },
  { id: 16, name: '옵션 16', description: '번호별 가중치 기반', type: 'option' },
  { id: 17, name: '옵션 17', description: 'AI 추천번호 포함 기반', type: 'option' },
  { id: 18, name: '옵션 18', description: 'AI 추천 패턴 합성 조합 기반', type: 'option' },
  { id: 19, name: '옵션 19', description: 'AI 추천 패턴 필터링 조합 기반', type: 'option' },
  { id: 20, name: '옵션 20', description: 'AI 분석 추론 예측 기반', type: 'option' },
];

  const currentPatterns = activeTab === 'general' ? generalPatterns : optionPatterns;
  const selectedPattern = currentPatterns.find(p => p.id === selectedPatternId);

  const handleConfirm = () => {
    if (selectedPattern) {
      onPatternSelect(selectedPattern);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedPatternId(null);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.searchModal}>
          <Text style={styles.searchModalTitle}>🔍 패턴 검색</Text>
          
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>
              {activeTab === 'general' ? 'AI 추천 패턴' : '옵션형 패턴'}
            </Text>
            <View style={styles.dropdown}>
              <ScrollView style={styles.dropdownScroll}>
                {currentPatterns.map((pattern) => (
                  <TouchableOpacity
                    key={pattern.id}
                    style={[
                      styles.dropdownItem,
                      selectedPatternId === pattern.id && styles.dropdownItemSelected
                    ]}
                    onPress={() => setSelectedPatternId(pattern.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      selectedPatternId === pattern.id && styles.dropdownItemTextSelected
                    ]}>
                      {pattern.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {selectedPattern && (
            <View style={styles.patternDescription}>
              <Text style={styles.descriptionTitle}>{selectedPattern.name}</Text>
              <Text style={styles.descriptionText}>{selectedPattern.description}</Text>
            </View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleClose} activeOpacity={0.7}>
              <Text style={styles.cancelButtonText}>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.confirmButton, !selectedPattern && styles.disabledButton]} 
              onPress={handleConfirm} 
              activeOpacity={0.7}
              disabled={!selectedPattern}
            >
              <Text style={[styles.confirmButtonText, !selectedPattern && styles.disabledButtonText]}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ✅ 패턴 삭제 모달 컴포넌트 - 경로: PMyPatSaveCardScreen.tsx 라인 180-280
const PatternDeleteModal = ({
  visible,
  onClose,
  savedPatterns,
  onDeletePattern,
}: {
  visible: boolean;
  onClose: () => void;
  savedPatterns: SavedPattern[];
  onDeletePattern: (patternId: string) => void;
}) => {
  const [selectedPatternId, setSelectedPatternId] = useState<string | null>(null);

  const selectedPattern = savedPatterns.find(p => p.id === selectedPatternId);

  const handleDelete = () => {
    if (selectedPatternId) {
      Alert.alert(
        '패턴 삭제',
        `"${selectedPattern?.customName}"을(를) 정말 삭제하시겠습니까?\n\n삭제된 패턴은 복구할 수 없습니다.`,
        [
          {
            text: '취소',
            style: 'cancel'
          },
          {
            text: '삭제',
            style: 'destructive',
            onPress: () => {
              onDeletePattern(selectedPatternId);
              setSelectedPatternId(null);
              onClose();
            }
          }
        ]
      );
    }
  };

  const handleClose = () => {
    setSelectedPatternId(null);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.deleteModal}>
          <Text style={styles.deleteModalTitle}>🗑️ 패턴 삭제</Text>
          
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>⚠️ 삭제할 패턴을 선택하세요</Text>
            <View style={styles.dropdown}>
              <ScrollView style={styles.dropdownScroll}>
                {savedPatterns.length === 0 ? (
                  <View style={styles.emptyPatternContainer}>
                    <Text style={styles.emptyPatternText}>저장된 패턴이 없습니다.</Text>
                  </View>
                ) : (
                  savedPatterns.map((pattern) => (
                    <TouchableOpacity
                      key={pattern.id}
                      style={[
                        styles.dropdownItem,
                        selectedPatternId === pattern.id && styles.dropdownItemSelected
                      ]}
                      onPress={() => setSelectedPatternId(pattern.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.deletePatternItem}>
                        <View style={styles.deletePatternInfo}>
                          <Text style={[
                            styles.dropdownItemText,
                            selectedPatternId === pattern.id && styles.dropdownItemTextSelected
                          ]}>
                            {pattern.customName}
                          </Text>
                          <Text style={styles.deletePatternDesc}>
                            {pattern.description} • {pattern.createdAt}
                          </Text>
                        </View>
                 
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleClose} activeOpacity={0.7}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.deleteConfirmButton, !selectedPattern && styles.disabledButton]} 
              onPress={handleDelete} 
              activeOpacity={0.7}
              disabled={!selectedPattern}
            >
              <Text style={[styles.deleteConfirmButtonText, !selectedPattern && styles.disabledButtonText]}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ✅ 메인 컴포넌트 - 경로: PMyPatSaveCardScreen.tsx 라인 180-400
const PMyPatSaveCardScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // ✅ 상태 관리 변수들 - 경로: PMyPatSaveCardScreen.tsx 라인 185-195
  const [activeTab, setActiveTab] = useState<PatternType>('general');
  const [showPatternSearch, setShowPatternSearch] = useState(false);
  const [showPatternDelete, setShowPatternDelete] = useState(false); // ✅ 새로 추가된 삭제 모달 상태
  const [showSortModal, setShowSortModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortType>('recent');
  const [currentPattern, setCurrentPattern] = useState<PatternInfo | null>(null);
  const [currentPatternName, setCurrentPatternName] = useState('');
  const [currentPatternMemo, setCurrentPatternMemo] = useState('');
  const [currentPatternNumbers, setCurrentPatternNumbers] = useState<number[]>([]);
  const [userToken, setUserToken] = useState<string>('');

  // ✅ 더미 데이터 - 저장된 패턴들 - 경로: PMyPatSaveCardScreen.tsx 라인 195-210
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([
    {
      id: '1',
      patternId: 1,
      patternName: 'AI 추천 패턴 01',
      customName: 'my AI 1',
      description: 'AI 추천 패턴 1번 - 고성능 번호 생성 알고리즘',
      memo: '한 개 구간 3~4개 번호 집중',
      numbers: [3, 10, 21, 26, 33, 41],
      createdAt: '2025.09.09',
      lastUsed: '2025.09.09',
      winStats: { total: 108, rank1: 0, rank2: 1, rank3: 2, rank4: 3, rank5: 12, lose: 90 }
    }
  ]);

  // ✅ 정렬된 패턴 목록 반환 함수 - 경로: PMyPatSaveCardScreen.tsx 라인 210-235
  const getSortedPatterns = () => {
    const patterns = [...savedPatterns];
    switch (currentSort) {
      case 'recent':
        return patterns.sort((a, b) => {
          const dateA = new Date(a.lastUsed.replace(/\./g, '/'));
          const dateB = new Date(b.lastUsed.replace(/\./g, '/'));
          return dateB.getTime() - dateA.getTime();
        });
      case 'creation':
        return patterns.sort((a, b) => {
          const dateA = new Date(a.createdAt.replace(/\./g, '/'));
          const dateB = new Date(b.createdAt.replace(/\./g, '/'));
          return dateB.getTime() - dateA.getTime();
        });
      case 'winning':
        return patterns.sort((a, b) => (b.winStats.rank1 + b.winStats.rank2) - (a.winStats.rank1 + a.winStats.rank2));
      default:
        return patterns;
    }
  };

  // ✅ 정렬 방식 텍스트 반환 함수 - 경로: PMyPatSaveCardScreen.tsx 라인 235-245
  const getSortText = () => {
    switch (currentSort) {
      case 'recent': return '최신 사용 ▼';
      case 'creation': return '번호생성순서 ▼';
      case 'winning': return '당첨많은순서 ▼';
      default: return '최신 사용 ▼';
    }
  };

  // ✅ 패턴 선택 핸들러 - 경로: PMyPatSaveCardScreen.tsx 라인 245-250
  const handlePatternSelect = (pattern: PatternInfo) => {
    setCurrentPattern(pattern);
    setCurrentPatternName(pattern.name);
    setCurrentPatternMemo('');
    setCurrentPatternNumbers([]);
  };

  // ✅ 패턴 삭제 핸들러 - 경로: PMyPatSaveCardScreen.tsx 라인 420-425
  const handleDeletePattern = (patternId: string) => {
    setSavedPatterns(prev => prev.filter(p => p.id !== patternId));
    Alert.alert('완료', '패턴이 삭제되었습니다.');
  };

  // ✅ 번호 생성 API 호출 함수 - 경로: PMyPatSaveCardScreen.tsx 라인 425-455
  const handleGenerateNumbers = async () => {
    if (!currentPattern) {
      Alert.alert('알림', '먼저 패턴을 선택해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          patterns: [currentPattern.id],
          pattern_type: activeTab,
          user_numbers: [],
          user_excludes: [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.numbers && data.numbers.length === 6) {
          setCurrentPatternNumbers(data.numbers.sort((a: number, b: number) => a - b));
        } else {
          throw new Error('Invalid response data');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('번호 생성 API 오류:', error);
      Alert.alert('오류', '번호 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // ✅ 패턴 저장 함수 - 경로: PMyPatSaveCardScreen.tsx 라인 280-305
  const handleSavePattern = () => {
    if (!currentPattern) {
      Alert.alert('알림', '먼저 패턴을 선택해주세요.');
      return;
    }
    
    if (currentPatternNumbers.length === 0) {
      Alert.alert('알림', '먼저 번호를 생성해주세요.');
      return;
    }

    const newSavedPattern: SavedPattern = {
      id: Date.now().toString(),
      patternId: currentPattern.id,
      patternName: currentPattern.name,
      customName: currentPatternName || currentPattern.name,
      description: currentPattern.description,
      memo: currentPatternMemo,
      numbers: currentPatternNumbers,
      createdAt: new Date().toLocaleDateString('ko-KR').replace(/\//g, '.'),
      lastUsed: new Date().toLocaleDateString('ko-KR').replace(/\//g, '.'),
      winStats: { total: 0, rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 0, lose: 0 }
    };

    // ✅ 첫 저장시에만 예시 데이터 제거, 이후부터는 앞에 추가
    setSavedPatterns(prev => 
      prev.length === 1 && prev[0].id === '1' 
        ? [newSavedPattern] 
        : [newSavedPattern, ...prev]
    );
    
    // 저장 후 초기화
    setCurrentPattern(null);
    setCurrentPatternName('');
    setCurrentPatternMemo('');
    setCurrentPatternNumbers([]);

    Alert.alert('완료', '패턴이 저장되었습니다.');
  };

  // ✅ 저장된 패턴 번호 재생성 함수 - 경로: PMyPatSaveCardScreen.tsx 라인 305-340
  const handleSavedPatternGenerate = async (patternId: string) => {
    const pattern = savedPatterns.find(p => p.id === patternId);
    if (!pattern) return;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          patterns: [pattern.patternId],
          pattern_type: activeTab,
          user_numbers: [],
          user_excludes: [],
          saved_pattern_id: patternId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.numbers && data.numbers.length === 6) {
          setSavedPatterns(prev => prev.map(p => 
            p.id === patternId 
              ? { 
                  ...p, 
                  numbers: data.numbers.sort((a: number, b: number) => a - b), 
                  lastUsed: new Date().toLocaleDateString('ko-KR').replace(/\//g, '.'),
                  winStats: { ...p.winStats, total: p.winStats.total + 1 }
                }
              : p
          ));
        } else {
          throw new Error('Invalid response data');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('저장된 패턴 번호 생성 API 오류:', error);
      Alert.alert('오류', '번호 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // ✅ 저장된 패턴의 메모 보기 함수
  const handleViewMemo = (pattern: SavedPattern) => {
    Alert.alert(
      '메모',
      pattern.memo || '메모가 없습니다.',
      [{ text: '확인' }]
    );
  };

  // ✅ 메인 렌더링 부분 - 경로: PMyPatSaveCardScreen.tsx 라인 340-480
  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 - 탭에 따라 스왑 - 경로: PMyPatSaveCardScreen.tsx 라인 345-355 
      <Image
        source={
          activeTab === 'general' 
            ? require('../../../../../assets/images/p_member/mypage/p_my_general_save_card_ex.png')
            : require('../../../../../assets/images/p_member/mypage/p_my_option_save_card_ex.png')
        }
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 투명 버튼: 찍로고 홈 이동 (좌측 상단) - 경로: PMyPatSaveCardScreen.tsx 라인 355-365 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.logoButton]}
        onPress={() => navigation.navigate('PMainHome')}
        activeOpacity={0.7}
      />

      {/* ✅ 투명 버튼: my 마이페이지 이동 (우측 상단) - 경로: PMyPatSaveCardScreen.tsx 라인 365-375 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.myButton]}
        onPress={() => navigation.navigate('PMyPage')}
        activeOpacity={0.7}
      />

      {/* ✅ 투명 버튼: 1~45 패턴 탭 - 경로: PMyPatSaveCardScreen.tsx 라인 375-385 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.tab1Button]}
        onPress={() => setActiveTab('general')}
        activeOpacity={0.7}
      />

      {/* ✅ 투명 버튼: 옵션형 20 탭 - 경로: PMyPatSaveCardScreen.tsx 라인 385-395 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.tab2Button]}
        onPress={() => setActiveTab('option')}
        activeOpacity={0.7}
      />

      {/* ✅ 투명 버튼: 선택한 패턴 삭제 (우측) - 경로: PMyPatSaveCardScreen.tsx 라인 395-405 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.deleteButton]}
        onPress={() => setShowPatternDelete(true)}
        activeOpacity={0.7}
      />

      {/* ✅ 실제 정렬 드롭다운 버튼 (좌측) - 경로: PMyPatSaveCardScreen.tsx 라인 405-415 */}
      <TouchableOpacity
        style={styles.sortDropdownButton}
        onPress={() => setShowSortModal(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.sortDropdownText}>{getSortText()}</Text>
      </TouchableOpacity>

      {/* ✅ ScrollView로 나만의 패턴 저장하기 카드 + 저장된 패턴 카드들 표시 - 경로: PMyPatSaveCardScreen.tsx 라인 415-550 */}
      <ScrollView 
        style={styles.contentScrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ✅ 나만의 패턴 저장하기 카드 (맨 위에 실제 카드로 구현) - 경로: PMyPatSaveCardScreen.tsx 라인 420-500 */}
        <View style={styles.patternSaveCard}>
          <View style={styles.saveCardHeader}>
            <Text style={styles.saveCardIcon}>🎯</Text>
            <Text style={styles.saveCardTitle}>나만의 패턴 저장하기</Text>
          </View>

          {/* 패턴 선택 드롭다운 */}
          <TouchableOpacity
            style={styles.patternSelectDropdown}
            onPress={() => setShowPatternSearch(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.patternSelectText}>
              {currentPattern ? currentPattern.name : 'AI 추천 패턴 01 ▼'}
            </Text>
          </TouchableOpacity>

          {/* 선택한 패턴 설명 표시 */}
          {currentPattern && (
            <View style={styles.selectedPatternDescription}>
              <Text style={styles.selectedPatternDescText}>{currentPattern.description}</Text>
            </View>
          )}

          {/* 생성된 번호 표시 */}
          <View style={styles.generatedNumbersRow}>
            {currentPatternNumbers.length > 0 ? (
              currentPatternNumbers.map((num, idx) => (
                <View key={idx} style={styles.numberBall}>
                  <Text style={styles.numberBallText}>{num}</Text>
                </View>
              ))
            ) : (
              // 기본 표시 번호들
              [7, 11, 23, 34, 38, 40].map((num, idx) => (
                <View key={idx} style={styles.numberBall}>
                  <Text style={styles.numberBallText}>{num}</Text>
                </View>
              ))
            )}
          </View>

          {/* 액션 버튼들 */}
          <View style={styles.saveCardButtons}>
            <TouchableOpacity
              style={[styles.saveCardButton, styles.generateBtn]}
              onPress={handleGenerateNumbers}
              activeOpacity={0.7}
            >
              <Text style={styles.saveCardButtonText}>지금 생성</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.saveCardButton, styles.editBtn]}
              onPress={() => setShowNameModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.saveCardButtonText}>이름 변경</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveCardButton, styles.memoBtn]}
              onPress={() => setShowMemoModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.saveCardButtonText}>메모</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveCardButton, styles.saveBtn]}
              onPress={handleSavePattern}
              activeOpacity={0.7}
            >
              <Text style={styles.saveCardButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ 저장된 패턴 카드들 (정렬된 순서로) - 경로: PMyPatSaveCardScreen.tsx 라인 500-580 */}
        {getSortedPatterns().map((pattern, index) => (
          <View key={pattern.id} style={styles.savedPatternCard}>
            {/* 카드 헤더 - 통계아이콘/패턴이름/패턴설명 한줄 + 우측 메모버튼 */}
            <View style={styles.savedCardHeader}>
              <View style={styles.savedCardTitleRow}>
                <Text style={styles.savedCardIcon}>📊</Text>
                <Text style={styles.savedCardTitle}>{pattern.customName}</Text>
                <Text style={styles.savedCardDescription}>{pattern.description}</Text>
              </View>
              {pattern.memo && (
                <TouchableOpacity
                  style={styles.memoViewButton}
                  onPress={() => handleViewMemo(pattern)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.memoViewButtonText}>메모</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* 메인 컨텐츠 영역 - 번호생성 버튼 + 로또공들 */}
            <View style={styles.savedCardMainContent}>
              {/* 좌측 번호생성 버튼 */}
              <TouchableOpacity
                style={styles.generateOnlyBtn}
                onPress={() => handleSavedPatternGenerate(pattern.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.generateOnlyBtnText}>번호생성</Text>
              </TouchableOpacity>

              {/* 우측 로또공 6개 */}
              <View style={styles.savedNumbersRow}>
                {pattern.numbers.map((num, idx) => (
                  <View key={idx} style={styles.savedNumberBall}>
                    <Text style={styles.savedNumberBallText}>{num}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 통계 정보 */}
            <View style={styles.savedStatsContainer}>
              <Text style={styles.savedStatsText}>
                AI 추천 패턴 12 • 총 사용 {pattern.winStats.total}회 • 최근 {pattern.lastUsed}
              </Text>
              
              <View style={styles.savedStatsRow}>
                <Text style={styles.statsLabel}>낙첨</Text>
                <Text style={styles.statsLabel}>5등</Text>
                <Text style={styles.statsLabel}>4등</Text>
                <Text style={styles.statsLabel}>3등</Text>
                <Text style={styles.statsLabel}>2등</Text>
                <Text style={styles.statsLabel}>1등</Text>
              </View>
              
              <View style={styles.savedStatsRow}>
                <Text style={styles.statsValue}>{pattern.winStats.lose}</Text>
                <Text style={styles.statsValue}>{pattern.winStats.rank5}</Text>
                <Text style={styles.statsValue}>{pattern.winStats.rank4}</Text>
                <Text style={styles.statsValue}>{pattern.winStats.rank3}</Text>
                <Text style={styles.statsValue}>{pattern.winStats.rank2}</Text>
                <Text style={styles.statsValue}>{pattern.winStats.rank1}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* ✅ 더보기 버튼 - 경로: PMyPatSaveCardScreen.tsx 라인 580-590 */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => Alert.alert('알림', '더 이상 불러올 패턴이 없습니다.')}
          activeOpacity={0.7}
        >
          <Text style={styles.moreButtonText}>더보기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ 패턴 검색 모달 - 경로: PMyPatSaveCardScreen.tsx 라인 590-600 */}
      <PatternSearchModal
        visible={showPatternSearch}
        onClose={() => setShowPatternSearch(false)}
        activeTab={activeTab}
        onPatternSelect={handlePatternSelect}
      />

      {/* ✅ 패턴 삭제 모달 - 경로: PMyPatSaveCardScreen.tsx 라인 600-610 */}
      <PatternDeleteModal
        visible={showPatternDelete}
        onClose={() => setShowPatternDelete(false)}
        savedPatterns={savedPatterns}
        onDeletePattern={handleDeletePattern}
      />

      {/* ✅ 정렬 선택 모달 - 경로: PMyPatSaveCardScreen.tsx 라인 600-650 */}
      <Modal visible={showSortModal} transparent animationType="fade" onRequestClose={() => setShowSortModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.sortModal}>
            <Text style={styles.sortModalTitle}>정렬 방식 선택</Text>
            
            <TouchableOpacity
              style={[styles.sortOption, currentSort === 'recent' && styles.sortOptionSelected]}
              onPress={() => {setCurrentSort('recent'); setShowSortModal(false);}}
              activeOpacity={0.7}
            >
              <Text style={[styles.sortOptionText, currentSort === 'recent' && styles.sortOptionTextSelected]}>
                최신 사용 순서
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sortOption, currentSort === 'creation' && styles.sortOptionSelected]}
              onPress={() => {setCurrentSort('creation'); setShowSortModal(false);}}
              activeOpacity={0.7}
            >
              <Text style={[styles.sortOptionText, currentSort === 'creation' && styles.sortOptionTextSelected]}>
                번호 생성 순서
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sortOption, currentSort === 'winning' && styles.sortOptionSelected]}
              onPress={() => {setCurrentSort('winning'); setShowSortModal(false);}}
              activeOpacity={0.7}
            >
              <Text style={[styles.sortOptionText, currentSort === 'winning' && styles.sortOptionTextSelected]}>
                당첨 많은 순서
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sortCloseButton} 
              onPress={() => setShowSortModal(false)} 
              activeOpacity={0.7}
            >
              <Text style={styles.sortCloseButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ✅ 이름 변경 모달 */}
      <Modal visible={showNameModal} transparent animationType="fade" onRequestClose={() => setShowNameModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.nameModal}>
            <Text style={styles.nameModalTitle}>🔄 패턴 이름 변경</Text>
            
            <TextInput
              style={styles.nameInput}
              value={currentPatternName}
              onChangeText={setCurrentPatternName}
              placeholder={currentPattern?.name || "패턴 이름을 입력하세요"}
              placeholderTextColor="#999"
              maxLength={20}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowNameModal(false)} 
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={() => setShowNameModal(false)} 
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✅ 메모 입력 모달 */}
      <Modal visible={showMemoModal} transparent animationType="fade" onRequestClose={() => setShowMemoModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.memoModal}>
            <Text style={styles.memoModalTitle}>📝 패턴 메모</Text>
            
            <TextInput
              style={styles.memoInput}
              value={currentPatternMemo}
              onChangeText={setCurrentPatternMemo}
              placeholder="패턴에 대한 메모를 입력하세요"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              maxLength={100}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowMemoModal(false)} 
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={() => setShowMemoModal(false)} 
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// ✅ 스타일 정의 - 경로: PMyPatSaveCardScreen.tsx 라인 650-950
const styles = StyleSheet.create({
  // ✅ 기본 컨테이너 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 655-665
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

  // ✅ 상단 네비게이션 버튼들 - 경로: PMyPatSaveCardScreen.tsx 라인 665-685
  logoButton: {
    top: 85 * (height / DESIGN_HEIGHT),
    left: 10 * (width / DESIGN_WIDTH),
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },
  myButton: {
    top: 90 * (height / DESIGN_HEIGHT),
    right: 10 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
  },

  // ✅ 탭 버튼들 - 경로: PMyPatSaveCardScreen.tsx 라인 685-705
  tab1Button: {
    top: 303 * (height / DESIGN_HEIGHT),
    left: 185 * (width / DESIGN_WIDTH),
    width: 320 * (width / DESIGN_WIDTH),
    height: 90 * (height / DESIGN_HEIGHT),
  },
  tab2Button: {
    top: 303 * (height / DESIGN_HEIGHT),
    right: 185 * (width / DESIGN_WIDTH),
    width: 320 * (width / DESIGN_WIDTH),
    height: 90 * (height / DESIGN_HEIGHT),
  },

  // ✅ 삭제 버튼 - 경로: PMyPatSaveCardScreen.tsx 라인 705-715
  deleteButton: {
    top: 432 * (height / DESIGN_HEIGHT),
    right: 68 * (width / DESIGN_WIDTH),
    width: 476 * (width / DESIGN_WIDTH),
    height: 85 * (height / DESIGN_HEIGHT),
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  
  // ✅ 정렬 드롭다운 버튼 - 경로: PMyPatSaveCardScreen.tsx 라인 715-730
  sortDropdownButton: {
    position: 'absolute',
    top: 430 * (height / DESIGN_HEIGHT),
    left: 68 * (width / DESIGN_WIDTH),
    width: 420 * (width / DESIGN_WIDTH),
    height: 90 * (height / DESIGN_HEIGHT),
    backgroundColor: '#E9FF91',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C4E0C4',
  },
  sortDropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  // ✅ ScrollView 및 실제 카드 스타일들 - 경로: PMyPatSaveCardScreen.tsx 라인 735-755
  contentScrollView: {
    flex: 1,
    marginTop: 540 * (height / DESIGN_HEIGHT),
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  // ✅ 나만의 패턴 저장하기 카드 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 755-850
  patternSaveCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10, // 15 → 12로 더 줄임
    marginBottom: 8, // 15 → 8로 더 줄임
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,

  },
  saveCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // 10 → 8로 더 줄임
  },
  saveCardIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  saveCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8800FF',
  },
  patternSelectDropdown: {
    backgroundColor: '#E6EDFF',
    borderRadius: 15,
    padding: 4, // 12 → 10으로 더 줄임
    marginBottom: 6, // 8 → 6으로 더 줄임
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  patternSelectText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },

  // ✅ 선택한 패턴 설명 스타일
  selectedPatternDescription: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 6, // 8 → 6으로 더 줄임
    marginBottom: 6, // 8 → 6으로 더 줄임
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  selectedPatternDescText: {
    fontSize: 14, // 13 → 12로 더 줄임
    color: '#555',
    lineHeight: 14, // 16 → 14로 더 줄임
  },

  generatedNumbersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8, // 12 → 8로 더 줄임
    paddingVertical: 4, // 6 → 4로 더 줄임
  },
  numberBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5AA1FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#b9c3e1',
  },
  numberBallText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveCardButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  saveCardButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveCardButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  generateBtn: {
    backgroundColor: '#8800FF',
  },
  editBtn: {
    backgroundColor: '#2196f3',
  },
  memoBtn: {
    backgroundColor: '#50608A',
  },
  saveBtn: {
    backgroundColor: '#FF0011',
  },

  // ✅ 저장된 패턴 카드들 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 850-920
  savedPatternCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6, // 패딩 줄임
    marginBottom: 5, // 카드 간격 더 줄임
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  savedCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 좌측 타이틀과 우측 메모버튼 분리
    alignItems: 'center',
    marginBottom: 5,
  },
  savedCardIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 0.5,
  },
  savedCardTitleRow: {
    flexDirection: 'row', // 아이콘/제목/설명을 한줄로
    alignItems: 'center',
    flex: 1,
  },
  savedCardTitleSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  savedCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8800FF',
    marginRight: 8, // 제목과 설명 사이 간격
  },
  savedCardDescription: {
    fontSize: 14, // 패턴 설명 크기
    color: '#000',
    flex: 1,
  },
  savedCardPatternDesc: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
    lineHeight: 14,
  },
  memoViewButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  memoViewButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
  },
  savedCardMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // 간격 줄임
    gap: 8, // 간격 줄임
  },
  generateOnlyBtn: {
    backgroundColor: '#8800FF',
    paddingVertical: 5, // 버튼 높이 줄임
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 90, // 버튼 너비 줄임
    alignItems: 'center',
  },
  generateOnlyBtnText: {
    color: '#fff',
    fontSize: 16, // 텍스트 크기 줄임
    fontWeight: 'bold',
  },
  savedNumbersRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  savedNumberBall: {
    width: 30, // 크기 더 줄임
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E9FF91',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b9c3e1',
  },
  savedNumberBallText: {
    color: '#000000',
    fontSize: 16, // 텍스트 크기 줄임
    fontWeight: 'bold',
  },

  // ✅ 통계 정보 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 920-950
  savedStatsContainer: {
    marginTop: 3, // 간격 줄임
  },
  savedStatsText: {
    fontSize: 14, // 텍스트 크기 증가
    color: '#666',
    textAlign: 'center',
    marginBottom: 6, // 간격 줄임
    lineHeight: 16, // 줄간격 줄임
  },
  savedStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2, // 간격 줄임
  },
  statsLabel: {
    fontSize: 13, // 텍스트 크기 증가
    color: '#999',
    flex: 1,
    textAlign: 'center',
    lineHeight: 14, // 줄간격 줄임
  },
  statsValue: {
    fontSize: 14, // 텍스트 크기 증가
    color: '#1565C0', // 진한 파란색으로 변경
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    lineHeight: 16, // 줄간격 줄임
  },

  // ✅ 이름 변경 모달 스타일
  nameModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    minWidth: 310,
    maxWidth: '85%',
  },
  nameModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  nameInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
  },

  // ✅ 메모 모달 스타일
  memoModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    minWidth: 300,
    maxWidth: '90%',
  },
  memoModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  memoInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    height: 120,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
  },

  // ✅ 더보기 버튼 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 950-965
  moreButton: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  moreButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },

  // ✅ 패턴 삭제 모달 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 965-1065
  deleteModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    maxWidth: '85%',
    maxHeight: '80%',
    minWidth: 280,
  },
  deleteModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 25,
  },
  emptyPatternContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyPatternText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  deletePatternItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deletePatternInfo: {
    flex: 1,
    marginRight: 5,
  },
  deletePatternDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  deletePatternNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  deletePatternNumber: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deletePatternEtc: {
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
  },
  deleteConfirmButton: {
    backgroundColor: '#d32f2f',
  },
  deleteConfirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  // ✅ 모달 오버레이 및 패턴 검색 모달 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 1065-1150
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    maxWidth: '90%',
    maxHeight: '80%',
    minWidth: 350,
  },
  searchModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    maxHeight: 200,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemSelected: {
    backgroundColor: '#e3f2fd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  patternDescription: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  modalButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  disabledButtonText: {
    color: '#999',
  },

  // ✅ 정렬 모달 스타일 - 경로: PMyPatSaveCardScreen.tsx 라인 1150-1200
  sortModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    minWidth: 280,
    maxWidth: '80%',
  },
  sortModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  sortOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sortOptionSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  sortOptionTextSelected: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  sortCloseButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  sortCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default PMyPatSaveCardScreen;