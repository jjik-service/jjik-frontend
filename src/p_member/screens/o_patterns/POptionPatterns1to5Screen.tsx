// ✅ 파일 위치: src/p_member/screens/o_patterns/POptionPatterns1to5Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/o_patterns/p_1_5_op_patterns.png
// ✅ 진입 모달: assets/images/modals/pattern_guide_modal.png
// ✅ 프리미엄 옵션형 패턴 1-5 화면 (보상형 광고 → 6-10 이동)
// ✅ 수정: 설명창 터치시 설명으로 리셋 기능 추가

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";
import AdPlaceholder from "../../../components/AdPlaceholder";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 패턴별 설명 데이터
const PATTERN_DESCRIPTIONS = {
  1: "최근 당첨번호 제외 패턴",
  2: "고빈도 번호 제외 패턴", 
  3: "저빈도 번호 포함 패턴",
  4: "연속수 쌍 포함 패턴",
  5: "홀짝 비율 조정 패턴"
};

// ✅ 패턴 가이드 모달 컴포넌트
const PatternGuideModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <TouchableOpacity style={styles.modalContent} onPress={onClose} activeOpacity={1}>
        <Image
          source={require("../../../../assets/images/modals/pattern_guide_modal.png")}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

export default function POptionPatterns1to5Screen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 상태 관리
  const [showGuideModal, setShowGuideModal] = useState(true);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string>("");
  
  // ✅ 선택된 옵션들 상태
  const [selectedPattern1Option, setSelectedPattern1Option] = useState<number | null>(null);
  const [selectedPattern2Option, setSelectedPattern2Option] = useState<number | null>(null);
  const [selectedPattern3Option, setSelectedPattern3Option] = useState<number | null>(null);
  const [selectedPattern4Option, setSelectedPattern4Option] = useState<number | null>(null);
  const [selectedPattern5Option, setSelectedPattern5Option] = useState<string | null>(null);
  
  // ✅ 생성된 번호들 상태
  const [generatedNumbers, setGeneratedNumbers] = useState<{[key: number]: string}>({});

  // ✅ 홈 버튼 (찍로고) - PMainHome 이동
  const handleHomePress = useCallback(() => {
    if (showAdModal) return; // 광고 중이면 비활성화
    console.log("홈으로 이동");
    navigation.navigate("PMainHome");
  }, [navigation, showAdModal]);

  // ✅ 다음>> 버튼 - 보상형 광고 후 POptionPatterns6to10 이동
  const handleNextPress = useCallback(() => {
    if (showAdModal) return; // 광고 중이면 비활성화
    console.log("보상형 광고 시청 후 6-10 패턴으로 이동");
    setAdCompletionAction('navigateToOptionPatterns6to10');
    setShowAdModal(true);
  }, [showAdModal]);

  // ✅ 광고 완료 처리
  const handleAdComplete = useCallback(() => {
    setShowAdModal(false);
    if (adCompletionAction === 'navigateToOptionPatterns6to10') {
      console.log("광고 시청 완료 - 6-10 패턴 페이지 이동");
      navigation.navigate("POptionPatterns6to10");
    }
  }, [adCompletionAction, navigation]);

  // ✅ 번호공 버튼 클릭 - 백엔드 API 호출
  const handlePatternPress = useCallback(async (patternNumber: number) => {
    if (showAdModal) return; // 광고 중이면 비활성화
    console.log(`패턴 ${patternNumber} 번호 생성`);
    
    try {
      // 백엔드 API 호출
      const response = await fetch('/api/option-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pattern_ids: [patternNumber],
          filter_ids: [],
          generator_ids: [],
          user_numbers: [],
          user_excludes: [],
          filter_kwargs: {
            ...(patternNumber === 1 && selectedPattern1Option ? {
              [patternNumber]: { recent_count: selectedPattern1Option }
            } : {}),
            ...(patternNumber === 2 && selectedPattern2Option ? {
              [patternNumber]: { recent_count: selectedPattern2Option }
            } : {}),
            ...(patternNumber === 3 && selectedPattern3Option ? {
              [patternNumber]: { recent_count: selectedPattern3Option }
            } : {}),
            ...(patternNumber === 4 && selectedPattern4Option ? {
              [patternNumber]: { min_consecutive_pairs: selectedPattern4Option }
            } : {}),
            ...(patternNumber === 5 && selectedPattern5Option ? {
              [patternNumber]: { odd_even_ratio: selectedPattern5Option }
            } : {})
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const numbers = data.numbers || [];
        const numbersString = numbers.join(", ");
        
        setGeneratedNumbers(prev => ({
          ...prev,
          [patternNumber]: numbersString
        }));
      } else {
        console.error("API 호출 실패:", response.status);
        Alert.alert("오류", "번호 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("번호 생성 오류:", error);
      Alert.alert("오류", "네트워크 연결을 확인하고 다시 시도해주세요.");
    }
  }, [selectedPattern1Option, selectedPattern2Option, selectedPattern3Option, selectedPattern4Option, selectedPattern5Option, showAdModal]);

  // ✅ 설명창 터치시 설명으로 리셋
  const handleDescriptionPress = useCallback((patternId: number) => {
    if (showAdModal) return;
    console.log(`패턴 ${patternId} 설명으로 리셋`);
    setGeneratedNumbers(prev => {
      const newNumbers = { ...prev };
      delete newNumbers[patternId];
      return newNumbers;
    });
  }, [showAdModal]);

  // ✅ 패턴별 표시 텍스트 결정
  const getDisplayText = useCallback((patternId: number): string => {
    const numbers = generatedNumbers[patternId];
    if (numbers && numbers.length > 0) {
      return numbers;
    }
    
    return PATTERN_DESCRIPTIONS[patternId as keyof typeof PATTERN_DESCRIPTIONS] || "패턴 설명";
  }, [generatedNumbers]);

  // ✅ 패턴 옵션 선택 함수들에도 광고 상태 체크 추가
  const handlePattern1OptionPress = useCallback((option: number) => {
    if (showAdModal) return;
    setSelectedPattern1Option(option);
  }, [showAdModal]);

  const handlePattern2OptionPress = useCallback((option: number) => {
    if (showAdModal) return;
    setSelectedPattern2Option(option);
  }, [showAdModal]);

  const handlePattern3OptionPress = useCallback((option: number) => {
    if (showAdModal) return;
    setSelectedPattern3Option(option);
  }, [showAdModal]);

  const handlePattern4OptionPress = useCallback((option: number) => {
    if (showAdModal) return;
    setSelectedPattern4Option(option);
  }, [showAdModal]);

  const handlePattern5OptionPress = useCallback((option: string) => {
    if (showAdModal) return;
    setSelectedPattern5Option(option);
  }, [showAdModal]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image
        source={require("../../../../../assets/images/p_member/o_patterns/p_1_5_op_patterns.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 광고 중이 아닐 때만 모든 UI 요소들 렌더링 */}
      {!showAdModal && (
        <>
          {/* ✅ 찍로고 버튼 - 홈 이동 */}
          <TouchableOpacity
            style={[styles.button, {
              top: (90 / DESIGN_HEIGHT) * height,
              left: (15 / DESIGN_WIDTH) * width,
              width: (120 / DESIGN_WIDTH) * width,
              height: (120 / DESIGN_HEIGHT) * height,
            }]}
            onPress={handleHomePress}
            activeOpacity={0.7}
          />

          {/* ✅ 다음>> 버튼 */}
          <TouchableOpacity
            style={[styles.button, {
              top: (100 / DESIGN_HEIGHT) * height,
              left: (880 / DESIGN_WIDTH) * width,
              width: (200 / DESIGN_WIDTH) * width,
              height: (100 / DESIGN_HEIGHT) * height,
            }]}
            onPress={handleNextPress}
            activeOpacity={0.7}
          />

          {/* ✅ 패턴 번호공 버튼들 */}
          <TouchableOpacity
            style={[styles.button, {
              top: (420 / DESIGN_HEIGHT) * height,
              left: (65 / DESIGN_WIDTH) * width,
              width: (160 / DESIGN_WIDTH) * width,
              height: (160 / DESIGN_HEIGHT) * height,
            }]}
            onPress={() => handlePatternPress(1)}
            activeOpacity={0.7}
          />

          <TouchableOpacity
            style={[styles.button, {
              top: (695 / DESIGN_HEIGHT) * height,
              left: (65 / DESIGN_WIDTH) * width,
              width: (160 / DESIGN_WIDTH) * width,
              height: (160 / DESIGN_HEIGHT) * height,
            }]}
            onPress={() => handlePatternPress(2)}
            activeOpacity={0.7}
          />

          <TouchableOpacity
            style={[styles.button, {
              top: (970 / DESIGN_HEIGHT) * height,
              left: (65 / DESIGN_WIDTH) * width,
              width: (160 / DESIGN_WIDTH) * width,
              height: (160 / DESIGN_HEIGHT) * height,
            }]}
            onPress={() => handlePatternPress(3)}
            activeOpacity={0.7}
          />

          <TouchableOpacity
            style={[styles.button, {
              top: (1250 / DESIGN_HEIGHT) * height,
              left: (65 / DESIGN_WIDTH) * width,
              width: (160 / DESIGN_WIDTH) * width,
              height: (160 / DESIGN_HEIGHT) * height,
            }]}
            onPress={() => handlePatternPress(4)}
            activeOpacity={0.7}
          />

          <TouchableOpacity
            style={[styles.button, {
              top: (1520 / DESIGN_HEIGHT) * height,
              left: (65 / DESIGN_WIDTH) * width,
              width: (160 / DESIGN_WIDTH) * width,
              height: (160 / DESIGN_HEIGHT) * height,

            }]}
            onPress={() => handlePatternPress(5)}
            activeOpacity={0.7}
          />

          {/* ✅ 패턴 1 옵션 버튼들 */}
          {[5, 10, 20, 30, 40, 50].map((option, index) => (
            <TouchableOpacity
              key={`pattern1-${option}`}
              style={[
                styles.optionButton,
                {
                  top: (555 / DESIGN_HEIGHT) * height,
                  left: ((206 + index * 145) / DESIGN_WIDTH) * width,
                  backgroundColor: selectedPattern1Option === option ? '#DDFF00' : '#fff',
                }
              ]}
              onPress={() => handlePattern1OptionPress(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* ✅ 패턴 2 옵션 버튼들 */}
          {[5, 10, 20, 30, 40, 50].map((option, index) => (
            <TouchableOpacity
              key={`pattern2-${option}`}
              style={[
                styles.optionButton,
                {
                  top: (835 / DESIGN_HEIGHT) * height,
                  left: ((206 + index * 145) / DESIGN_WIDTH) * width,
                  backgroundColor: selectedPattern2Option === option ? '#DDFF00' : '#fff',
                }
              ]}
              onPress={() => handlePattern2OptionPress(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* ✅ 패턴 3 옵션 버튼들 */}
          {[5, 10, 20, 30, 40, 50].map((option, index) => (
            <TouchableOpacity
              key={`pattern3-${option}`}
              style={[
                styles.optionButton,
                {
                  top: (1115 / DESIGN_HEIGHT) * height,
                  left: ((206 + index * 145) / DESIGN_WIDTH) * width,
                  backgroundColor: selectedPattern3Option === option ? '#DDFF00' : '#fff',
                }
              ]}
              onPress={() => handlePattern3OptionPress(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* ✅ 패턴 4 옵션 버튼들 */}
          {[2, 3, 4].map((option, index) => (
            <TouchableOpacity
              key={`pattern4-${option}`}
              style={[
                styles.optionButton,
                {
                  top: (1382 / DESIGN_HEIGHT) * height,
                  left: ((311 + index * 251) / DESIGN_WIDTH) * width,
                  backgroundColor: selectedPattern4Option === option ? '#DDFF00' : '#fff',
                }
              ]}
              onPress={() => handlePattern4OptionPress(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* ✅ 패턴 5 옵션 버튼들 */}
          {['1:5', '2:4', '3:3', '4:2', '5:1'].map((option, index) => (
            <TouchableOpacity
              key={`pattern5-${option}`}
              style={[
                styles.optionButton,
                {
                  top: (1660 / DESIGN_HEIGHT) * height,
                  left: ((219 + index * 175) / DESIGN_WIDTH) * width,
                  backgroundColor: selectedPattern5Option === option ? '#DDFF00' : '#fff',
                }
              ]}
              onPress={() => handlePattern5OptionPress(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* ✅ 생성된 번호/설명 표시 영역들 - 터치시 설명으로 리셋 */}
          {[1, 2, 3, 4, 5].map((patternNumber) => {
            const topPosition = 445 + (patternNumber - 1) * 275;
            return (
              <TouchableOpacity
                key={`display-${patternNumber}`}
                style={[
                  styles.numbersDisplay,
                  {
                    top: (topPosition / DESIGN_HEIGHT) * height,
                    left: (225 / DESIGN_WIDTH) * width,
                  }
                ]}
                onPress={() => handleDescriptionPress(patternNumber)}
                activeOpacity={0.7}
              >
                <Text style={styles.numbersText}>
                  {getDisplayText(patternNumber)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}

      {/* ✅ 패턴 가이드 모달 - 진입시 표시 (광고 중이 아닐 때만) */}
      {!showAdModal && (
        <PatternGuideModal
          visible={showGuideModal}
          onClose={() => setShowGuideModal(false)}
        />
      )}

      {/* ✅ 보상형 광고 모달 - 최상위 zIndex, 모든 UI 완전히 덮기 */}
      {showAdModal && (
        <Modal
          visible={showAdModal}
          transparent={false}
          animationType="fade"
          onRequestClose={() => {}} // 뒤로 가기 막기
        >
          <View style={styles.adFullScreen}>
            <AdPlaceholder
              onComplete={handleAdComplete}
              duration={15000}
              type="rewarded"
              canSkip={false}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

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

  optionButton: {
    position: "absolute",
    width: (120 / DESIGN_WIDTH) * width,
    height: (120 / DESIGN_HEIGHT) * height,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1, // 개발용 노란색 외곽선
    borderColor: '#000000',
  },

  optionText: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
  },

  numbersDisplay: {
    position: "absolute",
    width: (820 / DESIGN_WIDTH) * width,
    height: (100 / DESIGN_HEIGHT) * height,
    backgroundColor: "#ffffff",  // 완전 불투명
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: '#fe7ef1',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  numbersText: {
    fontSize: (48 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: width * 0.85,
    maxWidth: 500,
    aspectRatio: 0.9,
  },

  modalImage: {
    width: "100%",
    height: "100%",
  },

  // ✅ 광고 전면 화면 스타일 - 모든 UI 완전히 덮기
  adFullScreen: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});