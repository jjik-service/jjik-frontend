// ✅ 파일 위치: src/p_member/screens/o_patterns/POptionPatterns6to10Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/o_patterns/p_6_10_op_patterns.png
// ✅ 프리미엄 옵션형 패턴 6-10 화면 (1-5←→11-15 이동)
// ✅ 수정: API 호출, 번호창 진하게, 7번 슬라이더 위로 이동

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
  6: "고수 저수 균형 패턴",
  7: "합계 구간 설정 패턴", 
  8: "연속수 개수 패턴",
  9: "같은 끝자리 개수 패턴",
  10: "복합 조건 패턴"
};

export default function POptionPatterns6to10Screen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 선택된 옵션들 상태
  const [selectedHighCount, setSelectedHighCount] = useState<number | null>(null); // 패턴6 고수 개수 1,2,3
  const [selectedLowCount, setSelectedLowCount] = useState<number | null>(null); // 패턴6 저수 개수 1,2,3
  const [selectedRange, setSelectedRange] = useState({ start: 120, end: 170 }); // 패턴7 구간 설정
  const [selectedPattern8Option, setSelectedPattern8Option] = useState<number | null>(null); // 패턴8 2,3,4,5,6
  const [selectedPattern9Option, setSelectedPattern9Option] = useState<number | null>(null); // 패턴9 2,3,4,5,6
  
  // ✅ 생성된 번호들 상태
  const [generatedNumbers, setGeneratedNumbers] = useState<{[key: number]: string}>({});

  // ✅ 이전 버튼 - POptionPatterns1to5 이동
  const handlePrevPress = useCallback(() => {
    console.log("1-5 패턴으로 이동");
    navigation.navigate("POptionPatterns1to5");
  }, [navigation]);

  // ✅ 다음 버튼 - POptionPatterns11to15 이동
  const handleNextPress = useCallback(() => {
    console.log("11-15 패턴으로 이동");
    navigation.navigate("POptionPatterns11to15");
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
          filter_kwargs: {
            ...(patternNumber === 6 && selectedHighCount && selectedLowCount ? {
              [patternNumber]: { 
                high_count: selectedHighCount,
                low_count: selectedLowCount 
              }
            } : {}),
            ...(patternNumber === 7 ? {
              [patternNumber]: { 
                sum_min: selectedRange.start,
                sum_max: selectedRange.end 
              }
            } : {}),
            ...(patternNumber === 8 && selectedPattern8Option ? {
              [patternNumber]: { consecutive_count: selectedPattern8Option }
            } : {}),
            ...(patternNumber === 9 && selectedPattern9Option ? {
              [patternNumber]: { same_ending_count: selectedPattern9Option }
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
  }, [selectedHighCount, selectedLowCount, selectedRange, selectedPattern8Option, selectedPattern9Option]);

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

  // ✅ 패턴 6 고수 개수 선택
  const handleHighCountPress = useCallback((count: number) => {
    setSelectedHighCount(count);
  }, []);

  // ✅ 패턴 6 저수 개수 선택
  const handleLowCountPress = useCallback((count: number) => {
    setSelectedLowCount(count);
  }, []);

  // ✅ 패턴 7 구간 점 선택
  const handleRangePointPress = useCallback((value: number) => {
    setSelectedRange(prev => {
      // 첫 번째 클릭이거나 같은 값 클릭시 시작점으로 설정
      if (prev.start === 120 && prev.end === 170) {
        return { start: value, end: value };
      }
      
      // 이미 시작점이 설정된 경우
      if (prev.start === prev.end) {
        if (value < prev.start) {
          return { start: value, end: prev.start };
        } else {
          return { start: prev.start, end: value };
        }
      }
      
      // 시작점과 끝점이 모두 설정된 경우 새로 시작
      return { start: value, end: value };
    });
  }, []);

  // ✅ 패턴 8 옵션 선택 (2,3,4,5,6)
  const handlePattern8OptionPress = useCallback((option: number) => {
    setSelectedPattern8Option(option);
  }, []);

  // ✅ 패턴 9 옵션 선택 (2,3,4,5,6)
  const handlePattern9OptionPress = useCallback((option: number) => {
    setSelectedPattern9Option(option);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image
        source={require("../../../../../assets/images/p_member/o_patterns/p_6_10_op_patterns.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 이전 버튼 (x0, y24, w200, h80) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (95 / DESIGN_HEIGHT) * height,
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
          top: (95 / DESIGN_HEIGHT) * height,
          left: (892 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleNextPress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 6 번호공 버튼 (x70, y330, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (385 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (160 / DESIGN_WIDTH) * width,
          height: (160 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(6)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 7 번호공 버튼 (x70, y660, w150, h110) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (675 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (160 / DESIGN_WIDTH) * width,
          height: (160 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(7)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 8 번호공 버튼 (x70, y1079, w150, h150) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1060 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (160 / DESIGN_WIDTH) * width,
          height: (160 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(8)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 9 번호공 버튼 (x70, y1379, w150, h150) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1340 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (160 / DESIGN_WIDTH) * width,
          height: (160 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(9)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 10 번호공 버튼 (x70, y1679, w150, h150) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1615 / DESIGN_HEIGHT) * height,
          left: (65 / DESIGN_WIDTH) * width,
          width: (160 / DESIGN_WIDTH) * width,
          height: (160 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => handlePatternPress(10)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 6 고수 개수 버튼들 (x231, y584, gap50) */}
      {[1, 2, 3].map((count, index) => (
        <TouchableOpacity
          key={`high-${count}`}
          style={[
            styles.optionButton,
            {
              top: (575 / DESIGN_HEIGHT) * height,
              left: ((192 + index * 150) / DESIGN_WIDTH) * width,
              backgroundColor: selectedHighCount === count ? '#DDFF00' : '#fff',
            }
          ]}
          onPress={() => handleHighCountPress(count)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{count}</Text>
        </TouchableOpacity>
      ))}

      {/* ✅ 패턴 6 저수 개수 버튼들 (x647, y584, gap50) */}
      {[1, 2, 3].map((count, index) => (
        <TouchableOpacity
          key={`low-${count}`}
          style={[
            styles.optionButton,
            {
              top: (575 / DESIGN_HEIGHT) * height,
              left: ((668 + index * 150) / DESIGN_WIDTH) * width,
              backgroundColor: selectedLowCount === count ? '#DDFF00' : '#fff',
            }
          ]}
          onPress={() => handleLowCountPress(count)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{count}</Text>
        </TouchableOpacity>
      ))}

      {/* ✅ 패턴 8 옵션 버튼들 (x253, y1227, gap38) */}
      {[2, 3, 4, 5, 6].map((option, index) => (
        <TouchableOpacity
          key={`pattern8-${option}`}
          style={[
            styles.optionButton,
            {
              top: (1200 / DESIGN_HEIGHT) * height,
              left: ((255 + index * 158) / DESIGN_WIDTH) * width,
              backgroundColor: selectedPattern8Option === option ? '#DDFF00' : '#fff',
            }
          ]}
          onPress={() => handlePattern8OptionPress(option)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* ✅ 패턴 9 옵션 버튼들 (x253, y1529, gap38) */}
      {[2, 3, 4, 5, 6].map((option, index) => (
        <TouchableOpacity
          key={`pattern9-${option}`}
          style={[
            styles.optionButton,
            {
              top: (1477 / DESIGN_HEIGHT) * height,
              left: ((255 + index * 158) / DESIGN_WIDTH) * width,
              backgroundColor: selectedPattern9Option === option ? '#DDFF00' : '#fff',
            }
          ]}
          onPress={() => handlePattern9OptionPress(option)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* ✅ 패턴 7 구간 설정 영역 - 위로 30px 이동 */}
      <View style={[styles.rangeContainer, {
        top: (780 / DESIGN_HEIGHT) * height,  // 810 → 780으로 위로 이동
        left: (233 / DESIGN_WIDTH) * width,
        width: (792 / DESIGN_WIDTH) * width,
        height: (220 / DESIGN_HEIGHT) * height,  // 250 → 220으로 높이 축소
      }]}>
        {/* 구간 슬라이더 */}
        <View style={styles.sliderContainer}>
          {/* 슬라이더 배경선 */}
          <View style={styles.sliderTrack} />
          
          {/* 선택된 구간 강조선 */}
          <View style={[styles.selectedRange, {
            left: ((selectedRange.start - 100) / 80) * (600 / DESIGN_WIDTH) * width,
            width: ((selectedRange.end - selectedRange.start) / 80) * (600 / DESIGN_WIDTH) * width,
          }]} />
          
          {/* 9개 고정 점들 */}
          {[100, 110, 120, 130, 140, 150, 160, 170, 180].map((value, index) => (
            <View key={value} style={styles.pointContainer}>
              {/* 점 */}
              <TouchableOpacity
                style={[
                  styles.sliderPoint,
                  {
                    left: (index * (600 / DESIGN_WIDTH) * width / 8),
                    backgroundColor: selectedRange.start === value ? '#0066FF' : 
                                   selectedRange.end === value ? '#FF0000' : '#666',
                  }
                ]}
                onPress={() => handleRangePointPress(value)}
              />
              {/* 값 표시 */}
              <Text style={[styles.pointValue, {
                left: (index * (600 / DESIGN_WIDTH) * width / 8) - 15,
              }]}>
                {value}
              </Text>
            </View>
          ))}
        </View>
        
        {/* 현재 선택 표시 */}
        <Text style={styles.currentRange}>현재선택: {selectedRange.start} ~ {selectedRange.end}</Text>
      </View>

      {/* ✅ 생성된 번호/설명 표시 영역들 - 터치시 설명으로 리셋 */}
      {[6, 7, 8, 9, 10].map((patternNumber) => {
        const topPositions = {
          6: 390,
          7: 700,
          8: 1079,
          9: 1350,
          10: 1630
        };
        const topPosition = topPositions[patternNumber as keyof typeof topPositions] || 330;
        
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
    width: (115 / DESIGN_WIDTH) * width,
    height: (115 / DESIGN_HEIGHT) * height,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2, // 개발용 노란색 외곽선
    borderColor: '#000000',
  },

  optionText: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
  },

  rangeContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 5,  // 15 → 10으로 줄임

  },

  sliderContainer: {
    position: "relative",
    height: (130 / DESIGN_HEIGHT) * height,  // 110 → 90으로 줄임
    marginBottom: 10,  // 20 → 10으로 줄임
  },

  sliderTrack: {
    position: "absolute",
    top: 25,  // 30 → 25로 위로 이동
    left: 0,
    width: (600 / DESIGN_WIDTH) * width,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },

  selectedRange: {
    position: "absolute",
    top: 25,  // 30 → 25로 위로 이동
    height: 4,
    backgroundColor: "#0066FF",
    borderRadius: 2,
  },

  pointContainer: {
    position: "relative",
  },

  sliderPoint: {
    position: "absolute",
    top: 15,  // 15 → 15 유지
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  pointValue: {
    position: "absolute",
    top: 40,  // 45 → 40으로 위로 이동
    fontSize: (30 / DESIGN_HEIGHT) * height,  // 24 → 22로 줄임
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    width: 52,
  },

  currentRange: {
    fontSize: (36 / DESIGN_HEIGHT) * height,  // 24 → 22로 줄임
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },

  numbersDisplay: {
    position: "absolute",
    width: (800 / DESIGN_WIDTH) * width,
    height: (110 / DESIGN_HEIGHT) * height,
    backgroundColor: "#ffffff",  // 완전 불투명한 흰색
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: '#fe7ef1',
    paddingHorizontal: (20 / DESIGN_WIDTH) * width,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  numbersText: {
    fontSize: (64 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});