// ✅ 파일 위치: src/p_member/screens/o_patterns/POptionPatterns16to20Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/o_patterns/p_16_20_op_patterns.png
// ✅ 프리미엄 옵션형 패턴 16-20 화면 (11-15←→완료)

import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 패턴별 설명 데이터
const PATTERN_DESCRIPTIONS = {
  16: "번호별 가중치 기반",
  17: "AI 추천번호 포함 기반",
  18: "AI 추천패턴 합성 조합 기반",
  19: "AI 추천패턴 필터링 조합 기반", 
  20: "AI 분석 추론 예측 기반"
};

export default function POptionPatterns16to20Screen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 생성된 번호들 상태
  const [generatedNumbers, setGeneratedNumbers] = useState<{[key: number]: string}>({});

  // ✅ 이전 버튼 - POptionPatterns11to15 이동
  const handlePrevPress = useCallback(() => {
    console.log("11-15 패턴으로 이동");
    navigation.navigate("POptionPatterns11to15");
  }, [navigation]);

  // ✅ 홈 버튼 - PMainHome 이동
  const handleHomePress = useCallback(() => {
    console.log("홈으로 이동");
    navigation.navigate("PMainHome");
  }, [navigation]);

  // ✅ 번호공 버튼 클릭 - 백엔드 API 호출
  const handlePatternPress = useCallback(async (patternNumber: number) => {
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
          filter_kwargs: {}
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
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image
        source={require("../../../../../assets/images/p_member/o_patterns/p_16_20_op_patterns.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 이전 버튼 (x15, y60, w150, h80) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (100 / DESIGN_HEIGHT) * height,
          left: (10 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,

        }]}
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* ✅ 홈 버튼 (찍로고) (x927, y37, w130, h130) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (80 / DESIGN_HEIGHT) * height,
          left: (955 / DESIGN_WIDTH) * width,
          width: (130 / DESIGN_WIDTH) * width,
          height: (130 / DESIGN_HEIGHT) * height,

        }]}
        onPress={handleHomePress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 16 번호공 버튼 (x58, y340, w120, h120) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (420 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,

        }]}
        onPress={() => handlePatternPress(16)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 17 번호공 버튼 (x58, y570, w120, h120) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (700 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,

        }]}
        onPress={() => handlePatternPress(17)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 18 번호공 버튼 (x58, y800, w120, h120) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (975 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,
 
        }]}
        onPress={() => handlePatternPress(18)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 19 번호공 버튼 (x58, y1030, w120, h120) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1250 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,

        }]}
        onPress={() => handlePatternPress(19)}
        activeOpacity={0.7}
      />


      {/* ✅ 패턴 20 번호공 버튼 (x58, y1400, w120, h120) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1520 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (150 / DESIGN_WIDTH) * width,
          height: (150 / DESIGN_HEIGHT) * height,


        }]}
        onPress={() => handlePatternPress(20)}
        activeOpacity={0.7}
      />

      {/* ✅ 생성된 번호/설명 표시 영역들 - 터치시 설명으로 리셋 */}
      {[16, 17, 18, 19, 20].map((patternNumber) => {
        const topPositions = {
          16: 425,
          17: 710,
          18: 990,
          19: 1270,
          20: 1550
        };
        const topPosition = topPositions[patternNumber as keyof typeof topPositions] || 340;
        
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
    height: (120 / DESIGN_HEIGHT) * width,
    backgroundColor: "#0066FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  optionText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  numbersDisplay: {
    position: "absolute",
    width: (810 / DESIGN_WIDTH) * width,
    height: (120 / DESIGN_HEIGHT) * height,
    backgroundColor: "#ffffff",
    borderRadius: 60,
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
});