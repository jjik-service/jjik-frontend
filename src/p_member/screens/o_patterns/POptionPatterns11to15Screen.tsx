// ✅ 파일 위치: src/p_member/screens/o_patterns/POptionPatterns11to15Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/o_patterns/p_11_15_op_patterns.png
// ✅ 프리미엄 옵션형 패턴 11-15 화면 (6-10←→광고→16-20 이동)
// ✅ 수정: 설명창 터치시 설명으로 리셋 기능 추가

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
  Alert,
  Modal,
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
  11: "홀짝 균형 패턴",
  12: "최근 당첨 제외 패턴",
  13: "3배수 포함 패턴",
  14: "연속수 2쌍 패턴", 
  15: "띠별 운세 패턴"
};

export default function POptionPatterns11to15Screen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 선택된 옵션들 상태
  const [selectedPattern12Option, setSelectedPattern12Option] = useState<number | null>(null); // 패턴12: 10,20,30,40,50
  const [birthDate, setBirthDate] = useState<string>(""); // 패턴15: 생년월일
  const [koreanName, setKoreanName] = useState<string>(""); // 패턴15: 한글이름
  const [calendarType, setCalendarType] = useState<"solar" | "lunar" | null>(null); // 패턴15: 양력/음력
  
  // ✅ 생성된 번호들 상태
  const [generatedNumbers, setGeneratedNumbers] = useState<{[key: number]: string}>({});
  
  // ✅ 광고 모달 상태
  const [showAdModal, setShowAdModal] = useState<boolean>(false);

  // ✅ 이전 버튼 - POptionPatterns6to10 이동
  const handlePrevPress = useCallback(() => {
    console.log("6-10 패턴으로 이동");
    navigation.navigate("POptionPatterns6to10");
  }, [navigation]);

  // ✅ 다음 버튼 - 보상형 광고 → POptionPatterns16to20 이동
  const handleNextPress = useCallback(() => {
    console.log("보상형 광고 시청 후 16-20 패턴으로 이동");
    setShowAdModal(true);
  }, []);

  // ✅ 광고 완료 처리
  const handleAdComplete = useCallback(() => {
    setShowAdModal(false);
    console.log("광고 시청 완료 - 16-20 패턴 페이지 이동");
    navigation.navigate("POptionPatterns16to20");
  }, [navigation]);

  // ✅ 번호공 버튼 클릭 - 백엔드 API 호출
  const handlePatternPress = useCallback(async (patternNumber: number) => {
    console.log(`패턴 ${patternNumber} 번호 생성`);
    
    // 패턴 15번의 경우 필수 입력 확인
    if (patternNumber === 15) {
      if (birthDate.trim() === "" || birthDate.length !== 8 || !/^\d{8}$/.test(birthDate)) {
        Alert.alert("알림", "생년월일을 8자리 숫자로 입력해주세요. (예: 19901225)");
        return;
      }
      if (koreanName.trim() === "" || koreanName.length < 2) {
        Alert.alert("알림", "이름을 2글자 이상 입력해주세요.");
        return;
      }
      if (!calendarType) {
        Alert.alert("알림", "양력 또는 음력을 선택해주세요.");
        return;
      }
    }
    
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
            ...(patternNumber === 12 && selectedPattern12Option ? {
              [patternNumber]: { recent_count: selectedPattern12Option }
            } : {}),
            ...(patternNumber === 15 ? {
              [patternNumber]: { 
                birth_date: birthDate, 
                korean_name: koreanName, 
                calendar_type: calendarType 
              }
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
  }, [birthDate, koreanName, calendarType, selectedPattern12Option]);

  // ✅ 설명창 터치시 설명으로 리셋
  const handleDescriptionPress = useCallback((patternId: number) => {
    console.log(`패턴 ${patternId} 설명으로 리셋`);
    setGeneratedNumbers(prev => {
      const newNumbers = { ...prev };
      delete newNumbers[patternId];
      return newNumbers;
    });
  }, []);

  // ✅ 패턴별 표시 텍스트 결정
  const getDisplayText = useCallback((patternId: number): string => {
    const numbers = generatedNumbers[patternId];
    if (numbers && numbers.length > 0) {
      return numbers;
    }
    
    return PATTERN_DESCRIPTIONS[patternId as keyof typeof PATTERN_DESCRIPTIONS] || "패턴 설명";
  }, [generatedNumbers]);

  // ✅ 패턴 12 옵션 선택 (10,20,30,40,50)
  const handlePattern12OptionPress = useCallback((option: number) => {
    setSelectedPattern12Option(option);
  }, []);

  // ✅ 패턴 15 양력/음력 선택
  const handleCalendarTypePress = useCallback((type: "solar" | "lunar") => {
    setCalendarType(type);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image
        source={require("../../../../../assets/images/p_member/o_patterns/p_11_15_op_patterns.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 이전 버튼 (x0, y24, w200, h80) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (90 / DESIGN_HEIGHT) * height,
          left: (10 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* ✅ 다음 버튼 (x892, y24, w200, h80) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (90 / DESIGN_HEIGHT) * height,
          left: (890 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleNextPress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 11 번호공 버튼 (x70, y379, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (420 / DESIGN_HEIGHT) * height,
          left: (70 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(11)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 12 번호공 버튼 (x70, y579, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (610 / DESIGN_HEIGHT) * height,
          left: (70 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(12)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 13 번호공 버튼 (x70, y879, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (879 / DESIGN_HEIGHT) * height,
          left: (70 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(13)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 14 번호공 버튼 (x70, y1079, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1050 / DESIGN_HEIGHT) * height,
          left: (70 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(14)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 15 번호공 버튼 (x70, y1239, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1210 / DESIGN_HEIGHT) * height,
          left: (70 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(15)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 12 옵션 버튼들 (x257, y724, gap38) */}
      {[10, 20, 30, 40, 50].map((option, index) => (
        <TouchableOpacity
          key={`pattern12-${option}`}
          style={[
            styles.optionButton,
            {
              top: (735 / DESIGN_HEIGHT) * height,
              left: ((257 + index * 158) / DESIGN_WIDTH) * width,
              backgroundColor: selectedPattern12Option === option ? '#DDFF00' : '#fff',
            }
          ]}
          onPress={() => handlePattern12OptionPress(option)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* ✅ 패턴 15 생년월일 입력창 (x145, y1479, w902, h92) */}
      <TextInput
        style={[styles.textInput, {
          top: (1440 / DESIGN_HEIGHT) * height,
          left: (155 / DESIGN_WIDTH) * width,
          width: (910 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYYMMDD"
        keyboardType="numeric"
        maxLength={8}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      {/* ✅ 패턴 15 이름 입력창 (x145, y1641, w820, h92) */}
      <TextInput
        style={[styles.textInput, {
          top: (1595 / DESIGN_HEIGHT) * height,
          left: (155 / DESIGN_WIDTH) * width,
          width: (910 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        value={koreanName}
        onChangeText={setKoreanName}
        placeholder="홍길동"
        keyboardType="default"
        maxLength={10}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

      {/* ✅ 패턴 15 양력 선택 버튼 (x135, y1803, w420, h100) */}
      <TouchableOpacity
        style={[
          styles.calendarButton,
          {
            top: (1730 / DESIGN_HEIGHT) * height,
            left: (145 / DESIGN_WIDTH) * width,
            width: (420 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
            backgroundColor: calendarType === 'solar' ? '#BFD6FF' : '#E9FF91',
          }
        ]}
        onPress={() => handleCalendarTypePress('solar')}
        activeOpacity={0.7}
      >
        <Text style={[styles.calendarText, {
          color: calendarType === 'solar' ? '#1601FF' : '#1601FF',
        }]}>양력</Text>
        <View style={[styles.checkbox, {
          backgroundColor: calendarType === 'solar' ? '#1601FF' : '#fff',
        }]}>
          {calendarType === 'solar' && (
            <Text style={styles.checkMark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* ✅ 패턴 15 음력 선택 버튼 (x625, y1803, w420, h100) */}
      <TouchableOpacity
        style={[
          styles.calendarButton,
          {
            top: (1730 / DESIGN_HEIGHT) * height,
            left: (645 / DESIGN_WIDTH) * width,
            width: (420 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
            backgroundColor: calendarType === 'lunar' ? '#E9FF91' : '#BFD6FF',
          }
        ]}
        onPress={() => handleCalendarTypePress('lunar')}
        activeOpacity={0.7}
      >
        <Text style={[styles.calendarText, {
          color: calendarType === 'lunar' ? '#FF0000' : '#1601FF',
        }]}>음력</Text>
        <View style={[styles.checkbox, {
          backgroundColor: calendarType === 'lunar' ? '#FF0000' : '#fff',
        }]}>
          {calendarType === 'lunar' && (
            <Text style={styles.checkMark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* ✅ 생성된 번호/설명 표시 영역들 - 터치시 설명으로 리셋 */}
      {[11, 12, 13, 14, 15].map((patternNumber) => {
        const topPositions = {
          11: 445,
          12: 625,
          13: 910,
          14: 1070,
          15: 1239
        };
        const topPosition = topPositions[patternNumber as keyof typeof topPositions] || 379;
        
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

      {/* ✅ 보상형 광고 모달 - AdPlaceholder 사용 */}
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
    borderWidth: 1,
    borderColor: '#000000',
  },

  optionText: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
  },

  textInput: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    fontSize: (64 / DESIGN_HEIGHT) * height,
    color: "#000",
    textAlign: "center",
    textAlignVertical: "bottom",
    paddingBottom: (5 / DESIGN_HEIGHT) * height,
  },

  calendarButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: (40 / DESIGN_WIDTH) * width,
  },

  calendarText: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },

  checkbox: {
    width: (100 / DESIGN_WIDTH) * width,
    height: (100 / DESIGN_HEIGHT) * height,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  checkMark: {
    color: "#FFFFFF",
    fontSize: (70 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
  },

  numbersDisplay: {
    position: "absolute",
    width: (810 / DESIGN_WIDTH) * width,
    height: (100 / DESIGN_HEIGHT) * height,
    backgroundColor: "#ffffff",
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

  // ✅ 광고 모달 스타일
  adModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  adModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: (60 / DESIGN_WIDTH) * width,
    alignItems: "center",
    width: (800 / DESIGN_WIDTH) * width,
  },

  adModalTitle: {
    fontSize: (72 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#1601FF",
    marginBottom: (30 / DESIGN_HEIGHT) * height,
  },

  adModalText: {
    fontSize: (48 / DESIGN_HEIGHT) * height,
    color: "#000",
    textAlign: "center",
    lineHeight: (60 / DESIGN_HEIGHT) * height,
    marginBottom: (40 / DESIGN_HEIGHT) * height,
  },

  adLoadingContainer: {
    padding: (30 / DESIGN_WIDTH) * width,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },

  adLoadingText: {
    fontSize: (36 / DESIGN_HEIGHT) * height,
    color: "#666",
  },

  // ✅ 광고 전면 화면 스타일 - 모든 UI 완전히 덮기
  adFullScreen: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});