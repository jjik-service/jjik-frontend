// ✅ 파일 위치: src/p_member/screens/mypage/PMyCombiSaveCardScreen.tsx
// ✅ 배경 이미지: assets/images/p_member/mypage/p_my_combination_save_card.png
// ✅ 내가 저장한 조합 관리 페이지 (카드별 이름변경/다시생성/삭제)

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";
import { LottoBall, BonusLottoBall } from "../../../components/LottoBall";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 저장된 조합 데이터 타입 정의 - 통계 정보 추가
interface SavedCombination {
  id: string;
  name: string;
  description: string; // 조합 설명 추가
  memo: string; // 메모 추가
  patternNumbers: number[];
  patternNames: string[];
  generatedNumbers: number[];
  createdAt: string;
  lastUsed: string; // 마지막 사용일 추가
  combinationType: "general" | "option"; // 일반형 vs 옵션형
  patternOptions?: { [key: number]: any }; // 옵션형 패턴의 추가 설정값
  winStats: { // 당첨 통계 추가
    total: number;
    rank1: number;
    rank2: number;
    rank3: number;
    rank4: number;
    rank5: number;
    lose: number;
  };
}

export default function PMyCombinationSaveCard() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 상태 관리
  const [savedCombinations, setSavedCombinations] = useState<SavedCombination[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  
  // ✅ 모달 상태
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showMemoModal, setShowMemoModal] = useState<boolean>(false);
  const [currentCombinationId, setCurrentCombinationId] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newMemo, setNewMemo] = useState<string>("");
  
  // ✅ 컴포넌트 마운트시 저장된 조합 로드
  useEffect(() => {
    loadSavedCombinations();
  }, []);

  // ✅ 저장된 조합 데이터 로드 (백엔드 API 호출) - 통계 정보 포함
  const loadSavedCombinations = useCallback(async () => {
    try {
      const response = await fetch('/api/saved-combinations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // TODO: 실제 구현시 인증 토큰 추가
          // 'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSavedCombinations(data.combinations || []);
      } else {
        console.error("조합 데이터 로드 실패:", response.status);
        // 개발용 임시 데이터 - 더보기 테스트를 위해 5개로 증가
        setSavedCombinations([
          {
            id: "1",
            name: "AI 추천 필터링 조합 1",
            description: "패턴 2 + 패턴 9 + 패턴 15",
            memo: "고성능 번호 생성 알고리즘",
            patternNumbers: [2, 9, 15],
            patternNames: ["패턴 2", "패턴 9", "패턴 15"],
            generatedNumbers: [3, 16, 24, 31, 39, 43],
            createdAt: "2025.09.01",
            lastUsed: "2025.09.09",
            combinationType: "option",
            patternOptions: {},
            winStats: { total: 85, rank1: 0, rank2: 0, rank3: 1, rank4: 2, rank5: 8, lose: 74 }
          },
          {
            id: "2",
            name: "합성 조합 패턴 A",
            description: "패턴 1 + 패턴 5 + 패턴 12",
            memo: "주말 전용 조합",
            patternNumbers: [1, 5, 12],
            patternNames: ["패턴 1", "패턴 5", "패턴 12"],
            generatedNumbers: [7, 14, 21, 28, 35, 42],
            createdAt: "2025.09.05",
            lastUsed: "2025.09.08",
            combinationType: "general",
            patternOptions: {},
            winStats: { total: 42, rank1: 0, rank2: 1, rank3: 0, rank4: 1, rank5: 5, lose: 35 }
          },
          {
            id: "3",
            name: "필터링 조합 B",
            description: "패턴 3 + 패턴 7 + 패턴 18",
            memo: "",
            patternNumbers: [3, 7, 18],
            patternNames: ["패턴 3", "패턴 7", "패턴 18"],
            generatedNumbers: [2, 15, 22, 29, 36, 44],
            createdAt: "2025.09.07",
            lastUsed: "2025.09.07",
            combinationType: "option",
            patternOptions: {},
            winStats: { total: 25, rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 3, lose: 22 }
          },
          {
            id: "4",
            name: "특별 조합 C",
            description: "패턴 6 + 패턴 11 + 패턴 20",
            memo: "생일 기념 조합",
            patternNumbers: [6, 11, 20],
            patternNames: ["패턴 6", "패턴 11", "패턴 20"],
            generatedNumbers: [1, 8, 19, 26, 33, 45],
            createdAt: "2025.09.03",
            lastUsed: "2025.09.06",
            combinationType: "general",
            patternOptions: {},
            winStats: { total: 60, rank1: 1, rank2: 0, rank3: 2, rank4: 1, rank5: 6, lose: 50 }
          },
          {
            id: "5",
            name: "고급 AI 조합",
            description: "패턴 4 + 패턴 8 + 패턴 16",
            memo: "최고 성능 기대",
            patternNumbers: [4, 8, 16],
            patternNames: ["패턴 4", "패턴 8", "패턴 16"],
            generatedNumbers: [5, 12, 18, 25, 32, 41],
            createdAt: "2025.08.28",
            lastUsed: "2025.09.04",
            combinationType: "option",
            patternOptions: {},
            winStats: { total: 95, rank1: 0, rank2: 0, rank3: 3, rank4: 4, rank5: 12, lose: 76 }
          }
        ]);
      }
    } catch (error) {
      console.error("조합 데이터 로드 오류:", error);
      // 개발용 임시 데이터 - 더보기 테스트를 위해 5개로 증가
      setSavedCombinations([
        {
          id: "1",
          name: "AI 추천 필터링 조합 1",
          description: "패턴 2 + 패턴 9 + 패턴 15",
          memo: "고성능 번호 생성 알고리즘",
          patternNumbers: [2, 9, 15],
          patternNames: ["패턴 2", "패턴 9", "패턴 15"],
          generatedNumbers: [3, 16, 24, 31, 39, 43],
          createdAt: "2025.09.01",
          lastUsed: "2025.09.09",
          combinationType: "option",
          patternOptions: {},
          winStats: { total: 85, rank1: 0, rank2: 0, rank3: 1, rank4: 2, rank5: 8, lose: 74 }
        },
        {
          id: "2",
          name: "합성 조합 패턴 A",
          description: "패턴 1 + 패턴 5 + 패턴 12",
          memo: "주말 전용 조합",
          patternNumbers: [1, 5, 12],
          patternNames: ["패턴 1", "패턴 5", "패턴 12"],
          generatedNumbers: [7, 14, 21, 28, 35, 42],
          createdAt: "2025.09.05",
          lastUsed: "2025.09.08",
          combinationType: "general",
          patternOptions: {},
          winStats: { total: 42, rank1: 0, rank2: 1, rank3: 0, rank4: 1, rank5: 5, lose: 35 }
        },
        {
          id: "3",
          name: "필터링 조합 B",
          description: "패턴 3 + 패턴 7 + 패턴 18",
          memo: "",
          patternNumbers: [3, 7, 18],
          patternNames: ["패턴 3", "패턴 7", "패턴 18"],
          generatedNumbers: [2, 15, 22, 29, 36, 44],
          createdAt: "2025.09.07",
          lastUsed: "2025.09.07",
          combinationType: "option",
          patternOptions: {},
          winStats: { total: 25, rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 3, lose: 22 }
        },
        {
          id: "4",
          name: "특별 조합 C",
          description: "패턴 6 + 패턴 11 + 패턴 20",
          memo: "생일 기념 조합",
          patternNumbers: [6, 11, 20],
          patternNames: ["패턴 6", "패턴 11", "패턴 20"],
          generatedNumbers: [1, 8, 19, 26, 33, 45],
          createdAt: "2025.09.03",
          lastUsed: "2025.09.06",
          combinationType: "general",
          patternOptions: {},
          winStats: { total: 60, rank1: 1, rank2: 0, rank3: 2, rank4: 1, rank5: 6, lose: 50 }
        },
        {
          id: "5",
          name: "고급 AI 조합",
          description: "패턴 4 + 패턴 8 + 패턴 16",
          memo: "최고 성능 기대",
          patternNumbers: [4, 8, 16],
          patternNames: ["패턴 4", "패턴 8", "패턴 16"],
          generatedNumbers: [5, 12, 18, 25, 32, 41],
          createdAt: "2025.08.28",
          lastUsed: "2025.09.04",
          combinationType: "option",
          patternOptions: {},
          winStats: { total: 95, rank1: 0, rank2: 0, rank3: 3, rank4: 4, rank5: 12, lose: 76 }
        }
      ]);
    }
  }, []);

  // ✅ 찍로고 버튼 - PMainHome 이동
  const handleHomePress = useCallback(() => {
    console.log("메인 홈으로 이동");
    navigation.navigate("PMainHome");
  }, [navigation]);

  // ✅ my 버튼 - PMyPage 이동
  const handleMyPress = useCallback(() => {
    console.log("마이페이지로 이동");
    navigation.navigate("PMyPage");
  }, [navigation]);

  // ✅ 더보기 버튼 (다음 페이지) - 페이지당 3개씩 로드
  const handleMorePress = useCallback(() => {
    setCurrentPage(prev => prev + 1);
    console.log("더보기 버튼 클릭 - 다음 3개 조합 로드");
  }, []);

  // ✅ 현재 페이지에 표시할 조합들 - 페이지당 3개
  const getCurrentPageCombinations = useCallback(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return savedCombinations.slice(startIndex, endIndex);
  }, [savedCombinations, currentPage, itemsPerPage]);

  // ✅ 더 많은 데이터가 있는지 확인
  const hasMoreData = useCallback(() => {
    return savedCombinations.length > currentPage * itemsPerPage;
  }, [savedCombinations, currentPage, itemsPerPage]);

  // ✅ 이름변경 버튼
  const handleRenamePress = useCallback((combinationId: string, currentName: string) => {
    setCurrentCombinationId(combinationId);
    setNewName(currentName);
    setShowRenameModal(true);
  }, []);

  // ✅ 이름변경 저장
  const handleRenameSave = useCallback(async () => {
    if (newName.trim() === "") {
      Alert.alert("알림", "조합 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`/api/saved-combinations/${currentCombinationId}/rename`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_name: newName.trim(),
        }),
      });

      if (response.ok) {
        setSavedCombinations(prev => 
          prev.map(combination => 
            combination.id === currentCombinationId 
              ? { ...combination, name: newName.trim() }
              : combination
          )
        );
        setShowRenameModal(false);
        setNewName("");
        setCurrentCombinationId("");
        Alert.alert("알림", "이름이 변경되었습니다.");
      } else {
        Alert.alert("오류", "이름 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("이름 변경 오류:", error);
      Alert.alert("오류", "네트워크 연결을 확인해주세요.");
    }
  }, [currentCombinationId, newName]);

  // ✅ 메모 버튼
  const handleMemoPress = useCallback((combinationId: string, currentMemo: string) => {
    setCurrentCombinationId(combinationId);
    setNewMemo(currentMemo);
    setShowMemoModal(true);
  }, []);

  // ✅ 메모 저장
  const handleMemoSave = useCallback(async () => {
    try {
      const response = await fetch(`/api/saved-combinations/${currentCombinationId}/memo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memo: newMemo.trim(),
        }),
      });

      if (response.ok) {
        setSavedCombinations(prev => 
          prev.map(combination => 
            combination.id === currentCombinationId 
              ? { ...combination, memo: newMemo.trim() }
              : combination
          )
        );
        setShowMemoModal(false);
        setNewMemo("");
        setCurrentCombinationId("");
        Alert.alert("알림", "메모가 저장되었습니다.");
      } else {
        Alert.alert("오류", "메모 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("메모 저장 오류:", error);
      Alert.alert("오류", "네트워크 연결을 확인해주세요.");
    }
  }, [currentCombinationId, newMemo]);

  // ✅ 번호생성 버튼 - 조합 메인 페이지로 이동
  const handleRegeneratePress = useCallback(() => {
    console.log("조합 메인 페이지로 이동");
    navigation.navigate("PCombiHome");
  }, [navigation]);

  // ✅ 삭제 버튼
  const handleDeletePress = useCallback((combinationId: string) => {
    setCurrentCombinationId(combinationId);
    setShowDeleteModal(true);
  }, []);

  // ✅ 삭제 확인
  const handleDeleteConfirm = useCallback(async () => {
    try {
      const response = await fetch(`/api/saved-combinations/${currentCombinationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSavedCombinations(prev => 
          prev.filter(combination => combination.id !== currentCombinationId)
        );
        setShowDeleteModal(false);
        setCurrentCombinationId("");
        Alert.alert("알림", "조합이 삭제되었습니다.");
      } else {
        Alert.alert("오류", "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 오류:", error);
      Alert.alert("오류", "네트워크 연결을 확인해주세요.");
    }
  }, [currentCombinationId]);

  // ✅ 새 조합 만들기 버튼 - 조합 메인 페이지로 이동
  const handleCreateNewPress = useCallback(() => {
    console.log("조합 홈으로 이동");
    navigation.navigate("PCombiHome");
  }, [navigation]);

  // ✅ 조합 카드 렌더링 - 나만의 패턴과 동일한 통계 포함
  const renderCombinationCard = (combination: SavedCombination, index: number) => {
    return (
      <View key={combination.id} style={[styles.cardContainer, {
        marginTop: index === 0 ? 0 : (20 / DESIGN_HEIGHT) * height,
      }]}>
        {/* 카드 배경 */}
        <View style={styles.cardBackground}>
          {/* 조합 이름과 설명을 같은 줄에 */}
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardIcon}>📊</Text>
              <Text style={styles.cardTitle}>{combination.name}</Text>
              <Text style={styles.cardDescription}>{combination.description}</Text>
            </View>
          </View>
          
          {/* 생성된 번호 - 더 큰 로또공 */}
          <View style={styles.numbersContainer}>
            {combination.generatedNumbers.map((number, idx) => (
              <LottoBall
                key={idx}
                number={number}
                size={(50 / DESIGN_WIDTH) * width}
                fontSize={(24 / DESIGN_HEIGHT) * height}
              />
            ))}
          </View>
          
          {/* 버튼들 - 번호생성>이름변경>메모>삭제 순서 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cardButton, styles.regenerateButton]}
              onPress={handleRegeneratePress}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>번호생성</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.cardButton, styles.renameButton]}
              onPress={() => handleRenamePress(combination.id, combination.name)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>이름변경</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cardButton, styles.memoButton]}
              onPress={() => handleMemoPress(combination.id, combination.memo)}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>메모</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.cardButton, styles.deleteButton]}
              onPress={() => handleDeletePress(combination.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
          </View>

          {/* 통계 정보 - 나만의 패턴과 동일한 형태 */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              AI 추천 조합 패턴 • 이 사용 {combination.winStats.total}회 • 최근 {combination.lastUsed}
            </Text>
            
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>낙첨</Text>
              <Text style={styles.statsLabel}>5등</Text>
              <Text style={styles.statsLabel}>4등</Text>
              <Text style={styles.statsLabel}>3등</Text>
              <Text style={styles.statsLabel}>2등</Text>
              <Text style={styles.statsLabel}>1등</Text>
            </View>
            
            <View style={styles.statsRow}>
              <Text style={styles.statsValue}>{combination.winStats.lose}</Text>
              <Text style={styles.statsValue}>{combination.winStats.rank5}</Text>
              <Text style={styles.statsValue}>{combination.winStats.rank4}</Text>
              <Text style={styles.statsValue}>{combination.winStats.rank3}</Text>
              <Text style={styles.statsValue}>{combination.winStats.rank2}</Text>
              <Text style={styles.statsValue}>{combination.winStats.rank1}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 */}
      <Image
        source={require("../../../../assets/images/p_member/mypage/p_my_combination_save_card_ex.png")}
        style={styles.background}
        resizeMode="contain"
      />

      {/* ✅ 찍로고 버튼 (x66, y10, w120, h88) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (10 / DESIGN_WIDTH) * width,
          width: (120 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,

        }]}
        onPress={handleHomePress}
        activeOpacity={0.7}
      />

      {/* ✅ my 버튼 (x950, y10, w120, h88) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (880 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,

        }]}
        onPress={handleMyPress}
        activeOpacity={0.7}
      />

      {/* ✅ 더보기 버튼 - 최하단 우측, 외곽선 진하게 */}
      {hasMoreData() && (
        <TouchableOpacity
          style={[styles.moreButton, {
            top: (1680 / DESIGN_HEIGHT) * height,
            left: (840 / DESIGN_WIDTH) * width,
            width: (210 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
            
          }]}
          onPress={handleMorePress}
          activeOpacity={0.7}
        >
          <Text style={styles.moreButtonText}>더보기</Text>
        </TouchableOpacity>
      )}

      {/* 저장된 조합 카드들 (스크롤 가능) - 화면에 3개씩 */}
      <ScrollView 
        style={[styles.scrollContainer, {
          top: (300 / DESIGN_HEIGHT) * height,
          height: (1300 / DESIGN_HEIGHT) * height,
        }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: (50 / DESIGN_HEIGHT) * height }} />
        {getCurrentPageCombinations().map((combination, index) => 
          renderCombinationCard(combination, index)
        )}
        <View style={{ height: (50 / DESIGN_HEIGHT) * height }} />
      </ScrollView>

      {/* ✅ 나만의 새 조합 만들기 버튼 - 투명 버튼으로 수정 */}
      <TouchableOpacity
        style={[styles.createNewButton, {
          top: (1680 / DESIGN_HEIGHT) * height,
          left: (50 / DESIGN_WIDTH) * width,
          width: (770 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleCreateNewPress}
        activeOpacity={0.7}
      />

      {/* ✅ 이름변경 모달 - 나만의 패턴과 동일한 스타일로 수정 */}
      {showRenameModal && (
        <Modal
          visible={showRenameModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowRenameModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.renameModalContainer}>
              <Text style={styles.renameModalTitle}>📄 조합 이름 변경</Text>
              
              <TextInput
                style={styles.renameInput}
                value={newName}
                onChangeText={setNewName}
                placeholder="새로운 조합 이름을 입력하세요"
                placeholderTextColor="#999"
                maxLength={20}
                autoFocus
              />
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelModalButton]} 
                  onPress={() => setShowRenameModal(false)}
                >
                  <Text style={styles.cancelModalButtonText}>취소</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveModalButton]} 
                  onPress={handleRenameSave}
                >
                  <Text style={styles.saveModalButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* ✅ 메모 입력 모달 */}
      {showMemoModal && (
        <Modal
          visible={showMemoModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowMemoModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.memoModalContainer}>
              <Text style={styles.memoModalTitle}>📝 조합 메모</Text>
              
              <TextInput
                style={styles.memoInput}
                value={newMemo}
                onChangeText={setNewMemo}
                placeholder="조합에 대한 메모를 입력하세요"
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                maxLength={100}
              />
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelModalButton]} 
                  onPress={() => setShowMemoModal(false)}
                >
                  <Text style={styles.cancelModalButtonText}>취소</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveModalButton]} 
                  onPress={handleMemoSave}
                >
                  <Text style={styles.saveModalButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* ✅ 삭제 확인 모달 */}
      {showDeleteModal && (
        <Modal
          visible={showDeleteModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModalContainer}>
              <Text style={styles.deleteModalTitle}>조합 삭제</Text>
              <Text style={styles.deleteModalMessage}>
                정말로 이 조합을 삭제하시겠습니까?{"\n"}삭제된 조합은 복구할 수 없습니다.
              </Text>
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelModalButton]} 
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.cancelModalButtonText}>취소</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.deleteModalButton]} 
                  onPress={handleDeleteConfirm}
                >
                  <Text style={styles.deleteModalButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    position: "absolute",
    width: width,
    height: height,
  },

  button: {
    position: "absolute",
    backgroundColor: "transparent",
  },

  // ✅ 더보기 버튼 - 외곽선 훨씬 진하게, 크기 증가
  moreButton: {
    position: "absolute",
    backgroundColor: "#00FF88",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,           // 외곽선 두께 (px)
    borderColor: "#ff8800",   // 외곽선 색상
  },

  moreButtonText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: (50 / DESIGN_WIDTH) * width,
    paddingBottom: (50 / DESIGN_HEIGHT) * height,
  },

  // ✅ 카드 스타일 - 화면에 3개 들어갈 크기로 조정
  cardContainer: {
    width: (992 / DESIGN_WIDTH) * width,
    alignSelf: 'center',
  },

  cardBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: (15 / DESIGN_WIDTH) * width,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },

  // ✅ 카드 헤더 - 이름과 설명을 같은 줄에
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: (10 / DESIGN_HEIGHT) * height,
  },

  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  cardIcon: {
    fontSize: (36 / DESIGN_HEIGHT) * height,
    marginRight: (8 / DESIGN_WIDTH) * width,
  },

  cardTitle: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#8800FF",
    marginRight: (10 / DESIGN_WIDTH) * width,
  },

  cardDescription: {
    fontSize: (32 / DESIGN_HEIGHT) * height,
    color: "#000",
    flex: 1,
  },

  memoViewButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: (8 / DESIGN_WIDTH) * width,
    paddingVertical: (4 / DESIGN_HEIGHT) * height,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ddd",
  },

  memoViewButtonText: {
    fontSize: (24 / DESIGN_HEIGHT) * height,
    color: "#666",
    fontWeight: "bold",
  },

  // ✅ 로또공 컨테이너 - 더 큰 로또공
  numbersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: (12 / DESIGN_WIDTH) * width,
    marginBottom: (20 / DESIGN_HEIGHT) * height,
  },

  lottoBall: {
    backgroundColor: "#5AA1FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#b9c3e1",
  },

  lottoNumberText: {
    color: "#000000",
    fontWeight: "bold",
  },

  // ✅ 버튼 컨테이너 - 4개 버튼
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: (15 / DESIGN_HEIGHT) * height,
  },

  cardButton: {
    borderRadius: 8,
    paddingVertical: (8 / DESIGN_HEIGHT) * height,
    paddingHorizontal: (12 / DESIGN_WIDTH) * width,
    minWidth: (200 / DESIGN_WIDTH) * width,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff8800",
  },

  regenerateButton: {
    backgroundColor: "#8800FF",
  },

  renameButton: {
    backgroundColor: "#BFD6FF",
  },

  memoButton: {
    backgroundColor: "#50608A",
  },

  deleteButton: {
    backgroundColor: "#FFB6B6",
  },

  buttonText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
  },

  // ✅ 통계 정보 - 나만의 패턴과 동일한 스타일
  statsContainer: {
    marginTop: (1 / DESIGN_HEIGHT) * height,
  },

  statsText: {
    fontSize: (32 / DESIGN_HEIGHT) * height,
    color: "#666",
    textAlign: "center",
    marginBottom: (10 / DESIGN_HEIGHT) * height,
    lineHeight: (30 / DESIGN_HEIGHT) * height,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: (10 / DESIGN_HEIGHT) * height,
  },

  statsLabel: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#999",
    flex: 1,
    textAlign: "center",
    lineHeight: (40 / DESIGN_HEIGHT) * height,
  },

  statsValue: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#1565C0",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    lineHeight: (40 / DESIGN_HEIGHT) * height,
  },

  createNewButton: {
    position: "absolute",
    backgroundColor: "transparent",

  },

  // ✅ 모달 오버레이
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ 이름변경 모달
  renameModalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: (50 / DESIGN_WIDTH) * width,
    width: width * 0.9,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  renameModalTitle: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: (40 / DESIGN_HEIGHT) * height,
  },

  renameInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: (20 / DESIGN_WIDTH) * width,
    fontSize: (48 / DESIGN_HEIGHT) * height,
    color: "#000",
    marginBottom: (30 / DESIGN_HEIGHT) * height,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  // ✅ 메모 모달
  memoModalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: (30 / DESIGN_WIDTH) * width,
    width: width * 0.85,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  memoModalTitle: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: (20 / DESIGN_HEIGHT) * height,
  },

  memoInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: (15 / DESIGN_WIDTH) * width,
    fontSize: (48 / DESIGN_HEIGHT) * height,
    color: "#000",
    height: (120 / DESIGN_HEIGHT) * height,
    marginBottom: (30 / DESIGN_HEIGHT) * height,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  // ✅ 삭제 확인 모달
  deleteModalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: (30 / DESIGN_WIDTH) * width,
    width: width * 0.85,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  deleteModalTitle: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#FF0000",
    textAlign: "center",
    marginBottom: (40 / DESIGN_HEIGHT) * height,
  },

  deleteModalMessage: {
    fontSize: (48 / DESIGN_HEIGHT) * height,
    color: "#333",
    textAlign: "center",
    marginBottom: (50 / DESIGN_HEIGHT) * height,
    lineHeight: (50 / DESIGN_HEIGHT) * height,
  },

  // ✅ 모달 버튼 컨테이너
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: (40 / DESIGN_WIDTH) * width,
  },

  modalButton: {
    flex: 1,
    paddingVertical: (12 / DESIGN_HEIGHT) * height,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelModalButton: {
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#ff8800",
  },

  cancelModalButtonText: {
    fontSize: (48 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#666",
  },

  saveModalButton: {
    backgroundColor: "#2196F3",
  },

  saveModalButtonText: {
    fontSize: (48 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#FFF",
  },

  deleteModalButton: {
    backgroundColor: "#d32f2f",
  },

  deleteModalButtonText: {
    fontSize: (48 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#FFF",
  },
});