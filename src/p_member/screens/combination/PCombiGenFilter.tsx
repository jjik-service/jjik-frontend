// ✅ 파일 위치: src/p_member/screens/combination/PCombiGenFilter.tsx
// ✅ 배경 이미지: assets/images/p_member/combination/p_my_combination_general_filter.png
// ✅ 프리미엄 일반 패턴 필터링 조합 화면

import React, { useState, useCallback } from "react";
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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";
import AdPlaceholder from "../../../components/AdPlaceholder";
import { LottoBall, BonusLottoBall } from "../../../components/LottoBall";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 일반 패턴 데이터 (1-45번) - 이미지 내용대로 수정
const PATTERN_DATA = {
  1: "전체 최다 출현",
  2: "전체 최소 출현", 
  3: "최근 5회차 미출현",
  4: "연속번호 한쌍 포함",
  5: "최근 10회 최다 출현",
  6: "번호 합계 120~160 범위",
  7: "최근 20회 미출현+다빈도",
  8: "직전회차 번호 제외",
  9: "끝수 다양성",
  10: "특정 구간에 4개 집중",
  11: "중간구간 비중 UP",
  12: "한 구간에 3~4개 집중",
  13: "직전 2개 회차 각 1개 포함",
  14: "직전 5개 회차 번호 제외",
  15: "최다 출현 고정 2개 포함",
  16: "최다 출현 고정 3개 포함",
  17: "직전 50개 회차 미출현 기반",
  18: "저번대 고번대 각 2개 포함",
  19: "번호합계 130~150 범위",
  20: "연속번호 3개이상",
  21: "5개 구간 각 1개 분포",
  22: "최다 출현 보너스 3~4개 기반",
  23: "최다/최소 번호 제외 기반",
  24: "6구간 각 1개 균형 분포",
  25: "홀수 2개 짝수 4개 비율",
  26: "홀수 3개 짝수 3개 비율",
  27: "홀수 4개 짝수 2개 비율",
  28: "3개 구간 각 2개씩 균형 분포",
  29: "저번대 2개 포함",
  30: "고번대 2개 포함",
  31: "4개이상 겹친 번호 유형 기반",
  32: "역대 1등 유사 패턴 기반",
  33: "등차수열 합성 기반",
  34: "무리수 활용 합성 기반",
  35: "6구간 번호 + 홀짝 교차",
  36: "최소/최대 번호 홀짝 맞춤",
  37: "소수/배수 합성 기반",
  38: "HOT/COLD 균형 합성",
  39: "DELTA 분산 기반",
  40: "피보나치 시프트 기반",
  41: "삼각수 기반",
  42: "sum-range 중심 3~4개 기반",
  43: "모듈로 (residue) 분산 분포",
  44: "포아송 (poisson) 가중치 기반",
  45: "최근 출현 (rare-hot) 빈도 필터링",
};

export default function PCombiGenFilter() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 배경 이미지 로딩 상태 추가
  const [backgroundLoaded, setBackgroundLoaded] = useState<boolean>(false);
  
  // ✅ 패턴 선택 상태
  const [selectedPattern1, setSelectedPattern1] = useState<number | null>(null);
  const [selectedPattern2, setSelectedPattern2] = useState<number | null>(null);
  const [selectedPattern3, setSelectedPattern3] = useState<number | null>(null);
  const [pattern3Excluded, setPattern3Excluded] = useState<boolean>(false);
  
  // ✅ 드롭다운 표시 상태
  const [showDropdown1, setShowDropdown1] = useState<boolean>(false);
  const [showDropdown2, setShowDropdown2] = useState<boolean>(false);
  const [showDropdown3, setShowDropdown3] = useState<boolean>(false);
  
  // ✅ 포함/제외 번호 상태
  const [includeNumbers, setIncludeNumbers] = useState<string[]>(["", "", ""]);
  const [excludeNumbers, setExcludeNumbers] = useState<string[]>(["", "", ""]);
  
  // ✅ 생성된 번호 상태
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  
  // ✅ 광고 모달 상태
  const [showAdModal, setShowAdModal] = useState<boolean>(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string>("");
  
  // ✅ 번호 생성 완료 모달 상태
  const [showGenerationModal, setShowGenerationModal] = useState<boolean>(false);

  // ✅ 배경 이미지 로딩 완료 처리
  const handleBackgroundLoad = useCallback(() => {
    setBackgroundLoaded(true);
  }, []);

  // ✅ 선택된 패턴 개수 확인
  const getSelectedPatternCount = useCallback(() => {
    const patterns = [selectedPattern1, selectedPattern2, selectedPattern3].filter(p => p !== null);
    return pattern3Excluded && selectedPattern3 ? patterns.length - 1 : patterns.length;
  }, [selectedPattern1, selectedPattern2, selectedPattern3, pattern3Excluded]);

  // ✅ my 버튼 - 보상형 광고 후 PMyPage 이동
  const handleMyPress = useCallback(() => {
    console.log("보상형 광고 시청 후 마이페이지로 이동");
    setAdCompletionAction('navigateToMyPage');
    setShowAdModal(true);
  }, []);

  // ✅ 이전 버튼 - PCombiHome 이동
  const handlePrevPress = useCallback(() => {
    console.log("조합 홈으로 이동");
    navigation.navigate("PCombiHome");
  }, [navigation]);

  // ✅ 보상형 광고 완료 처리
  const handleAdComplete = useCallback(() => {
    setShowAdModal(false);
    
    switch (adCompletionAction) {
      case 'navigateToMyPage':
        console.log("광고 시청 완료 - 마이페이지로 이동");
        navigation.navigate("PMyPage");
        break;
      default:
        break;
    }
    
    setAdCompletionAction("");
  }, [adCompletionAction, navigation]);

  // ✅ 패턴 선택 처리
  const handlePatternSelect = useCallback((patternId: number, dropdownIndex: number) => {
    switch (dropdownIndex) {
      case 1:
        setSelectedPattern1(patternId);
        setShowDropdown1(false);
        break;
      case 2:
        setSelectedPattern2(patternId);
        setShowDropdown2(false);
        break;
      case 3:
        setSelectedPattern3(patternId);
        setShowDropdown3(false);
        break;
    }
  }, []);

  // ✅ 패턴 3 제외 체크박스 토글
  const handlePattern3ExcludeToggle = useCallback(() => {
    setPattern3Excluded(prev => !prev);
  }, []);

  // ✅ 포함번호 입력 처리 (1-45 범위 검증)
  const handleIncludeNumberChange = useCallback((text: string, index: number) => {
    const number = parseInt(text);
    if (text === "" || (number >= 1 && number <= 45)) {
      const newNumbers = [...includeNumbers];
      newNumbers[index] = text;
      setIncludeNumbers(newNumbers);
    }
  }, [includeNumbers]);

  // ✅ 제외번호 입력 처리 (1-45 범위 검증)
  const handleExcludeNumberChange = useCallback((text: string, index: number) => {
    const number = parseInt(text);
    if (text === "" || (number >= 1 && number <= 45)) {
      const newNumbers = [...excludeNumbers];
      newNumbers[index] = text;
      setExcludeNumbers(newNumbers);
    }
  }, [excludeNumbers]);

  // ✅ 필터링 조합 번호 생성 버튼
  const handleGenerateNumbers = useCallback(async () => {
    // 최소 2개 패턴 선택 확인
    const selectedPatterns = [selectedPattern1, selectedPattern2, selectedPattern3].filter(p => p !== null);
    if (selectedPatterns.length < 2) {
      Alert.alert("알림", "최소 2개 이상의 패턴을 선택해주세요.");
      return;
    }

    // 먼저 생성 완료 모달 표시
    setShowGenerationModal(true);
  }, [selectedPattern1, selectedPattern2, selectedPattern3]);

  // ✅ 생성 완료 모달 확인 후 실제 번호 생성
  const handleGenerationConfirm = useCallback(async () => {
    setShowGenerationModal(false);

    // 패턴 3이 제외되었다면 제거
    const selectedPatterns = [selectedPattern1, selectedPattern2, selectedPattern3].filter(p => p !== null);
    const finalPatterns = pattern3Excluded && selectedPattern3 ? 
      [selectedPattern1, selectedPattern2].filter(p => p !== null) : 
      selectedPatterns;

    // 포함/제외 번호 처리
    const includeNums = includeNumbers.filter(n => n.trim() !== "").map(n => parseInt(n));
    const excludeNums = excludeNumbers.filter(n => n.trim() !== "").map(n => parseInt(n));

    try {
      // ✅ 백엔드 API 호출 - 일반 패턴 필터링 조합
      const response = await fetch('/api/general-patterns/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pattern_ids: finalPatterns,
          include_numbers: includeNums,
          exclude_numbers: excludeNums,
          user_id: null, // 임시로 null, 추후 로그인 정보 연동
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedNums = data.numbers || [];
        
        if (generatedNums.length === 6) {
          setGeneratedNumbers(generatedNums);
          console.log("생성된 번호:", generatedNums);
          console.log("사용된 패턴:", finalPatterns);
          console.log("포함번호:", includeNums);
          console.log("제외번호:", excludeNums);
        } else {
          Alert.alert("알림", "조건에 맞는 번호를 생성할 수 없습니다. 다른 조건을 시도해보세요.");
        }
      } else {
        const errorData = await response.json();
        Alert.alert("오류", errorData.detail || "번호 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("번호 생성 오류:", error);
      Alert.alert("오류", "서버와의 연결에 문제가 발생했습니다.");
    }
  }, [selectedPattern1, selectedPattern2, selectedPattern3, pattern3Excluded, includeNumbers, excludeNumbers]);

  // ✅ 이동 버튼 (조합합 홈으로)
  const handleMovePress = useCallback(() => {
    console.log("저장된 조합 페이지로 이동");
    // TODO: 실제 저장된 조합 페이지로 이동
    navigation.navigate("PCombiHome");
  }, [navigation]);

  // ✅ 드롭다운 렌더링
  const renderDropdown = (dropdownIndex: number, selectedPattern: number | null, showDropdown: boolean) => {
    if (!showDropdown) return null;

    return (
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          switch (dropdownIndex) {
            case 1: setShowDropdown1(false); break;
            case 2: setShowDropdown2(false); break;
            case 3: setShowDropdown3(false); break;
          }
        }}
      >
        <TouchableOpacity 
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => {
            switch (dropdownIndex) {
              case 1: setShowDropdown1(false); break;
              case 2: setShowDropdown2(false); break;
              case 3: setShowDropdown3(false); break;
            }
          }}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScrollView}>
              {Object.entries(PATTERN_DATA).map(([id, name]) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.dropdownItem,
                    selectedPattern === parseInt(id) && styles.selectedDropdownItem
                  ]}
                  onPress={() => handlePatternSelect(parseInt(id), dropdownIndex)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedPattern === parseInt(id) && styles.selectedDropdownItemText
                  ]}>
                    {id}. {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  // ✅ 로딩 화면 렌더링
  if (!backgroundLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009DFF" />
        {/* ✅ 배경 이미지를 숨겨서 미리 로드 */}
        <Image
          source={require("../../../../assets/images/p_member/combination/p_my_combination_general_filter.png")}
          style={styles.hiddenImage}
          onLoad={handleBackgroundLoad}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 */}
      <Image
        source={require("../../../../assets/images/p_member/combination/p_my_combination_general_filter.png")}
        style={styles.background}
        resizeMode="contain"
      />

      {/* ✅ my 버튼 (x10, y85, w200, h100) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (10 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleMyPress}
        activeOpacity={0.7}
      />

      {/* ✅ 이전 버튼 (x878, y85, w200, h100) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (878 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 선택 1 드롭다운 (x65, y455, w655, h110) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.dropdownButton, {
          top: (450 / DESIGN_HEIGHT) * height,
          left: (63 / DESIGN_WIDTH) * width,
          width: (655 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => setShowDropdown1(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPattern1 ? `${selectedPattern1}. ${PATTERN_DATA[selectedPattern1 as keyof typeof PATTERN_DATA]}` : "패턴 선택            🔽"}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 1 설명 (x70, y555, w946, h56) - 옵션형과 동일 */}
      <View style={[styles.descriptionArea, {
        top: (555 / DESIGN_HEIGHT) * height,
        left: (70 / DESIGN_WIDTH) * width,
        width: (946 / DESIGN_WIDTH) * width,
        height: (56 / DESIGN_HEIGHT) * height,
      }]}>
        <Text style={styles.descriptionText}>
          {selectedPattern1 ? PATTERN_DATA[selectedPattern1 as keyof typeof PATTERN_DATA] : "패턴 설명 1"}
        </Text>
      </View>

      {/* ✅ 패턴 선택 2 드롭다운 (x65, y635, w655, h110) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.dropdownButton, {
          top: (630 / DESIGN_HEIGHT) * height,
          left: (63 / DESIGN_WIDTH) * width,
          width: (655 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => setShowDropdown2(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPattern2 ? `${selectedPattern2}. ${PATTERN_DATA[selectedPattern2 as keyof typeof PATTERN_DATA]}` : "패턴 선택            🔽"}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 2 설명 (x70, y735, w946, h56) - 옵션형과 동일 */}
      <View style={[styles.descriptionArea, {
        top: (735 / DESIGN_HEIGHT) * height,
        left: (70 / DESIGN_WIDTH) * width,
        width: (946 / DESIGN_WIDTH) * width,
        height: (56 / DESIGN_HEIGHT) * height,
      }]}>
        <Text style={styles.descriptionText}>
          {selectedPattern2 ? PATTERN_DATA[selectedPattern2 as keyof typeof PATTERN_DATA] : "패턴 설명 2"}
        </Text>
      </View>

      {/* ✅ 패턴 선택 3 드롭다운 (x65, y820, w655, h110) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.dropdownButton, {
          top: (820 / DESIGN_HEIGHT) * height,
          left: (63 / DESIGN_WIDTH) * width,
          width: (655 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => setShowDropdown3(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPattern3 ? `${selectedPattern3}. ${PATTERN_DATA[selectedPattern3 as keyof typeof PATTERN_DATA]}` : "패턴 선택            🔽"}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 3 제외 체크박스 (x787, y835, w80, h80) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.button, {
          top: (835 / DESIGN_HEIGHT) * height,
          left: (787 / DESIGN_WIDTH) * width,
          width: (80 / DESIGN_WIDTH) * width,
          height: (80 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handlePattern3ExcludeToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, pattern3Excluded && styles.checkedCheckbox]}>
          {pattern3Excluded && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* ✅ 패턴 3 설명 (x70, y929, w946, h56) - 옵션형과 동일 */}
      <View style={[styles.descriptionArea, {
        top: (929 / DESIGN_HEIGHT) * height,
        left: (70 / DESIGN_WIDTH) * width,
        width: (946 / DESIGN_WIDTH) * width,
        height: (56 / DESIGN_HEIGHT) * height,
      }]}>
        <Text style={styles.descriptionText}>
          {selectedPattern3 ? PATTERN_DATA[selectedPattern3 as keyof typeof PATTERN_DATA] : "패턴 설명 3"}
        </Text>
      </View>


      {/* ✅ 포함번호 입력창들 (x24, y1150, 3개) - 옵션형과 동일 */}
      {[0, 1, 2].map((index) => (
        <TextInput
          key={`include-${index}`}
          style={[styles.numberInput, {
            top: (1150 / DESIGN_HEIGHT) * height,
            left: ((24 + index * 170) / DESIGN_WIDTH) * width,
            width: (160 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
          }]}
          value={includeNumbers[index]}
          onChangeText={(text) => handleIncludeNumberChange(text, index)}
          placeholder="입력"
          keyboardType="numeric"
          maxLength={2}
          textAlign="center"
        />
      ))}

      {/* ✅ 제외번호 입력창들 (x560, y1150, 3개) - 옵션형과 동일 */}
      {[0, 1, 2].map((index) => (
        <TextInput
          key={`exclude-${index}`}
          style={[styles.numberInput, {
            top: (1150 / DESIGN_HEIGHT) * height,
            left: ((570 + index * 170) / DESIGN_WIDTH) * width,
            width: (160 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
          }]}
          value={excludeNumbers[index]}
          onChangeText={(text) => handleExcludeNumberChange(text, index)}
          placeholder="입력"
          keyboardType="numeric"
          maxLength={2}
          textAlign="center"
        />
      ))}

      {/* ✅ 필터링 조합 번호 생성 버튼 (x62, y1325, w968, h164) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.generateButton, {
          top: (1325 / DESIGN_HEIGHT) * height,
          left: (62 / DESIGN_WIDTH) * width,
          width: (968 / DESIGN_WIDTH) * width,
          height: (164 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleGenerateNumbers}
        activeOpacity={0.7}
      />

      {/* ✅ 생성된 로또공 6개 표시 (x55, y1573) - LottoBall 컴포넌트 사용 */}
      {generatedNumbers.length > 0 && (
        <View style={[styles.lottoNumbersContainer, {
          top: (1573 / DESIGN_HEIGHT) * height,
          left: (55 / DESIGN_WIDTH) * width,
        }]}>
          {generatedNumbers.map((number, index) => (
            <LottoBall key={index} number={number} />
          ))}
        </View>
      )}

      {/* ✅ 이동 버튼 (x780, y1670, w260, h120) - 옵션형과 동일 */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1670 / DESIGN_HEIGHT) * height,
          left: (780 / DESIGN_WIDTH) * width,
          width: (260 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleMovePress}
        activeOpacity={0.7}
      />

      {/* ✅ 드롭다운 모달들 */}
      {renderDropdown(1, selectedPattern1, showDropdown1)}
      {renderDropdown(2, selectedPattern2, showDropdown2)}
      {renderDropdown(3, selectedPattern3, showDropdown3)}

      {/* ✅ 번호 생성 완료 모달 */}
      {showGenerationModal && (
        <Modal
          visible={showGenerationModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowGenerationModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleGenerationConfirm}
          >
            <Image
              source={require("../../../../assets/images/p_member/modals/compose_retry_message_modal.png")}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}

      {/* ✅ 보상형 광고 모달 */}
      {showAdModal && (
        <AdPlaceholder
          onComplete={handleAdComplete}
          duration={15000}
          type="rewarded"
          canSkip={false}
        />
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

  // ✅ 로딩 화면 스타일
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ 숨겨진 이미지 (미리 로드용)
  hiddenImage: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  background: {
    position: "absolute",
    width: width,
    height: height,
  },

  button: {
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownButton: {
    position: "absolute",
    backgroundColor: "#E6EDFF",
    borderRadius: (16 / DESIGN_WIDTH) * width,
    borderWidth: 3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#009DFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },

  dropdownButtonText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
  },

  descriptionArea: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: (12 / DESIGN_WIDTH) * width,
    justifyContent: "center",
    paddingLeft: (52 / DESIGN_WIDTH) * width,
  },

  descriptionText: {
    fontSize: (36 / DESIGN_HEIGHT) * height,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
  },

  warningArea: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  warningText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#F0F5FF",
    fontWeight: "bold",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
  },

  checkbox: {
    width: (100 / DESIGN_WIDTH) * width,
    height: (100 / DESIGN_HEIGHT) * height,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  checkedCheckbox: {
    backgroundColor: "#FF0000",
  },

  checkmark: {
    color: "#FFF",
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
  },

  numberInput: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: (12 / DESIGN_WIDTH) * width,
    fontSize: (48 / DESIGN_HEIGHT) * height,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
    paddingVertical: (20 / DESIGN_HEIGHT) * height,
  },

  generateButton: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: (24 / DESIGN_WIDTH) * width,
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ 생성된 로또공 컨테이너 - LottoBall 컴포넌트 사용으로 스타일 간소화
  lottoNumbersContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: (30 / DESIGN_WIDTH) * width,
  },

  // ✅ 드롭다운 모달 스타일
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(113, 113, 113, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownContainer: {
    backgroundColor: "#FFF",
    borderRadius: (16 / DESIGN_WIDTH) * width,
    margin: (20 / DESIGN_WIDTH) * width,
    maxHeight: height * 0.6,
    width: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  dropdownScrollView: {
    maxHeight: height * 0.5,
  },

  dropdownItem: {
    padding: (15 / DESIGN_HEIGHT) * height,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  selectedDropdownItem: {
    backgroundColor: "#E6EDFF",
  },

  dropdownItemText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#000",
    fontWeight: "500",
  },

  selectedDropdownItemText: {
    color: "#009DFF",
    fontWeight: "bold",
  },

  // ✅ 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(113, 113, 113, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalImage: {
    width: width * 0.85,
    maxWidth: 400,
    aspectRatio: 1,
  },
});