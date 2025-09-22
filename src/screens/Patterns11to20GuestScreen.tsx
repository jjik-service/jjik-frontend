// ✅ 파일 위치: src/screens/Patterns11to20GuestScreen.tsx
// 게스트용 패턴 11-20 화면 - 완전 반응형 + 개별 버튼 위치 조정 가능
// 1092x1920 피그마 디자인 기준 반응형 구현

import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";


// 로컬 타입 정의
type RootStackParamList = {
  MainGuest: undefined;
  Patterns1to10Guest: undefined;
  Patterns11to20Guest: undefined;
  Patterns21to30Guest: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// 반응형 계산 함수
const scaleWidth = (size: number) => (size / DESIGN_WIDTH) * width;
const scaleHeight = (size: number) => (size / DESIGN_HEIGHT) * height;
const scaleFontSize = (size: number) => (size / DESIGN_HEIGHT) * height;

// 패턴별 설명 데이터
const PATTERN_DESCRIPTIONS = {
  11: "홀짝 균형 패턴",
  12: "고저 균형 패턴",
  13: "3배수 포함 패턴",
  14: "연속수 2쌍 패턴",
  15: "끝자리 분산 패턴",
  16: "구간별 고른 분포",
  17: "소수 포함 패턴",
  18: "합계 140-180 범위",
  19: "최근 당첨번호 유사",
  20: "회차별 빈도 분석",
};

// 생성된 번호를 저장할 상태 타입
interface GeneratedNumbers {
  [key: number]: number[];
}

type PatternId = 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export default function Patterns11to20GuestScreen() {
  const navigation = useNavigation<any>();
  
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers>({});
  
  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // <<이전 버튼 클릭 - 1-10 패턴으로 이동
  const handlePrevPress = () => {
    navigation.navigate("Patterns1to10Guest");
  };

  // 다음>> 버튼 클릭 - 21-30 패턴으로 이동
  const handleNextPress = () => {
    navigation.navigate('Patterns21to30Guest');
  };


  // 로또공 버튼 클릭 - 번호 생성
  const handlePatternPress = async (patternId: number) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patterns: [patternId],
          user_numbers: [],
          filter_patterns: [],
          calendar_type: "solar"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const numbers = data.numbers || [];
        
        setGeneratedNumbers(prev => ({
          ...prev,
          [patternId]: numbers
        }));
      } else {
        Alert.alert("오류", "번호 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("패턴 생성 오류:", error);
      
      const randomNumbers = Array.from({length: 6}, () => 
        Math.floor(Math.random() * 45) + 1
      ).sort((a, b) => a - b);
      
      setGeneratedNumbers(prev => ({
        ...prev,
        [patternId]: randomNumbers
      }));
    }
  };

  // 설명창 터치 핸들러 - 패턴 설명으로 리셋
  const handleDescriptionPress = (patternId: number) => {
    setGeneratedNumbers(prev => {
      const newNumbers = { ...prev };
      delete newNumbers[patternId];
      return newNumbers;
    });
  };

  // 패턴별 표시 텍스트 결정
  const getDisplayText = (patternId: number): string => {
    const numbers = generatedNumbers[patternId];
    if (numbers && numbers.length > 0) {
      return numbers.join(", ");
    }
    
    if (patternId >= 11 && patternId <= 20) {
      return PATTERN_DESCRIPTIONS[patternId as PatternId];
    }
    
    return "패턴 설명 없음";
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require("../../assets/images/pages/patterns/patterns_11_20_guest.png")}
        style={styles.background}
        resizeMode="contain"
      />


      {/* ✅ <<이전 버튼 */}
      <TouchableOpacity 
        style={styles.prevButton} 
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* ✅ 다음>> 버튼 */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNextPress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 11 버튼 */}
      <TouchableOpacity
        style={styles.patternButton11}
        onPress={() => handlePatternPress(11)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 12 버튼 */}
      <TouchableOpacity
        style={styles.patternButton12}
        onPress={() => handlePatternPress(12)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 13 버튼 */}
      <TouchableOpacity
        style={styles.patternButton13}
        onPress={() => handlePatternPress(13)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 14 버튼 */}
      <TouchableOpacity
        style={styles.patternButton14}
        onPress={() => handlePatternPress(14)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 15 버튼 */}
      <TouchableOpacity
        style={styles.patternButton15}
        onPress={() => handlePatternPress(15)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 16 버튼 */}
      <TouchableOpacity
        style={styles.patternButton16}
        onPress={() => handlePatternPress(16)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 17 버튼 */}
      <TouchableOpacity
        style={styles.patternButton17}
        onPress={() => handlePatternPress(17)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 18 버튼 */}
      <TouchableOpacity
        style={styles.patternButton18}
        onPress={() => handlePatternPress(18)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 19 버튼 */}
      <TouchableOpacity
        style={styles.patternButton19}
        onPress={() => handlePatternPress(19)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 20 버튼 */}
      <TouchableOpacity
        style={styles.patternButton20}
        onPress={() => handlePatternPress(20)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 11 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea11} 
        onPress={() => handleDescriptionPress(11)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(11)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 12 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea12} 
        onPress={() => handleDescriptionPress(12)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(12)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 13 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea13} 
        onPress={() => handleDescriptionPress(13)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(13)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 14 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea14} 
        onPress={() => handleDescriptionPress(14)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(14)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 15 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea15} 
        onPress={() => handleDescriptionPress(15)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(15)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 16 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea16} 
        onPress={() => handleDescriptionPress(16)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(16)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 17 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea17} 
        onPress={() => handleDescriptionPress(17)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(17)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 18 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea18} 
        onPress={() => handleDescriptionPress(18)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(18)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 19 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea19} 
        onPress={() => handleDescriptionPress(19)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(19)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 20 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea20} 
        onPress={() => handleDescriptionPress(20)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(20)}
        </Text>
      </TouchableOpacity>

    </View>
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
  
  
  // ✅ <<이전 버튼
  prevButton: {
    position: "absolute",
    top: scaleHeight(106),
    left: scaleWidth(0),
    width: scaleWidth(175),
    height: scaleHeight(80),
    backgroundColor: "transparent",

  },
  
  // ✅ 다음>> 버튼
  nextButton: {
    position: "absolute",
    top: scaleHeight(106),
    left: scaleWidth(907),
    width: scaleWidth(180),
    height: scaleHeight(80),
    backgroundColor: "transparent",

  },
  
  // ✅ 개별 패턴 버튼들 (1-10과 동일한 좌표)
  patternButton11: {
    position: "absolute",
    top: scaleHeight(324),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton12: {
    position: "absolute",
    top: scaleHeight(465),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton13: {
    position: "absolute",
    top: scaleHeight(607),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton14: {
    position: "absolute",
    top: scaleHeight(748),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton15: {
    position: "absolute",
    top: scaleHeight(892),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton16: {
    position: "absolute",
    top: scaleHeight(1042),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton17: {
    position: "absolute",
    top: scaleHeight(1202),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton18: {
    position: "absolute",
    top: scaleHeight(1362),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton19: {
    position: "absolute",
    top: scaleHeight(1522),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
 
  },
  
  patternButton20: {
    position: "absolute",
    top: scaleHeight(1682),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  // ✅ 개별 설명창들 (1-10과 동일한 좌표 + 노란색 외곽선)
  descriptionArea11: {
    position: "absolute",
    top: scaleHeight(317),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea12: {
    position: "absolute",
    top: scaleHeight(460),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea13: {
    position: "absolute",
    top: scaleHeight(602),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea14: {
    position: "absolute",
    top: scaleHeight(742),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea15: {
    position: "absolute",
    top: scaleHeight(888),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea16: {
    position: "absolute",
    top: scaleHeight(1040),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea17: {
    position: "absolute",
    top: scaleHeight(1198),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea18: {
    position: "absolute",
    top: scaleHeight(1356),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea19: {
    position: "absolute",
    top: scaleHeight(1518),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea20: {
    position: "absolute",
    top: scaleHeight(1678),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionText: {
    fontSize: scaleFontSize(60),
    color: "#000000",
    fontWeight: "500",
 
  },
});