// ✅ 파일 위치: src/screens/Patterns31to40GuestScreen.tsx
// 게스트용 패턴 31-40 화면 - 완전 반응형 + 개별 버튼 위치 조정 가능
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
  Patterns21to30Guest: undefined;
  Patterns31to40Guest: undefined;
  Patterns41to45Guest: undefined;
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

// 패턴별 설명 데이터 (백엔드 기준 정확한 설명)
const PATTERN_DESCRIPTIONS = {
  31: "패턴 반복 조합",
  32: "역대 1등 유사 패턴 기반",
  33: "등차수열 합성 패턴",
  34: "무리수 기반 패턴",
  35: "짝홀 교차 + 6구간 균형",
  36: "양끝 번호 동일 짝홀 여부",
  37: "소수 & 배수 결합",
  38: "HOT & COLD 균형 합성",
  39: "DELTA 분산 기반",
  40: "피보나치 시프트 기반",
};

// 생성된 번호를 저장할 상태 타입
interface GeneratedNumbers {
  [key: number]: number[];
}

type PatternId = 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;

export default function Patterns31to40GuestScreen() {
  const navigation = useNavigation<any>();
  
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers>({});
  

  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // <<이전 버튼 클릭 - 21-30 패턴으로 이동
  const handlePrevPress = () => {
    navigation.navigate("Patterns21to30Guest");
  };

  // 다음>> 버튼 클릭 - 41-45 패턴으로 이동
  const handleNextPress = () => {
    navigation.navigate('Patterns41to45Guest');
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
    
    if (patternId >= 31 && patternId <= 40) {
      return PATTERN_DESCRIPTIONS[patternId as PatternId];
    }
    
    return "패턴 설명 없음";
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/pages/patterns/patterns_31_40_guest.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

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

      {/* ✅ 패턴 31 버튼 */}
      <TouchableOpacity
        style={styles.patternButton31}
        onPress={() => handlePatternPress(31)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 32 버튼 */}
      <TouchableOpacity
        style={styles.patternButton32}
        onPress={() => handlePatternPress(32)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 33 버튼 */}
      <TouchableOpacity
        style={styles.patternButton33}
        onPress={() => handlePatternPress(33)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 34 버튼 */}
      <TouchableOpacity
        style={styles.patternButton34}
        onPress={() => handlePatternPress(34)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 35 버튼 */}
      <TouchableOpacity
        style={styles.patternButton35}
        onPress={() => handlePatternPress(35)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 36 버튼 */}
      <TouchableOpacity
        style={styles.patternButton36}
        onPress={() => handlePatternPress(36)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 37 버튼 */}
      <TouchableOpacity
        style={styles.patternButton37}
        onPress={() => handlePatternPress(37)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 38 버튼 */}
      <TouchableOpacity
        style={styles.patternButton38}
        onPress={() => handlePatternPress(38)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 39 버튼 */}
      <TouchableOpacity
        style={styles.patternButton39}
        onPress={() => handlePatternPress(39)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 40 버튼 */}
      <TouchableOpacity
        style={styles.patternButton40}
        onPress={() => handlePatternPress(40)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 31 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea31} 
        onPress={() => handleDescriptionPress(31)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(31)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 32 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea32} 
        onPress={() => handleDescriptionPress(32)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(32)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 33 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea33} 
        onPress={() => handleDescriptionPress(33)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(33)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 34 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea34} 
        onPress={() => handleDescriptionPress(34)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(34)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 35 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea35} 
        onPress={() => handleDescriptionPress(35)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(35)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 36 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea36} 
        onPress={() => handleDescriptionPress(36)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(36)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 37 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea37} 
        onPress={() => handleDescriptionPress(37)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(37)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 38 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea38} 
        onPress={() => handleDescriptionPress(38)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(38)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 39 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea39} 
        onPress={() => handleDescriptionPress(39)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(39)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 40 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea40} 
        onPress={() => handleDescriptionPress(40)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(40)}
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
  
  // ✅ 개별 패턴 버튼들 + 노란색 외곽선
  patternButton31: {
    position: "absolute",
    top: scaleHeight(324),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton32: {
    position: "absolute",
    top: scaleHeight(465),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton33: {
    position: "absolute",
    top: scaleHeight(607),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton34: {
    position: "absolute",
    top: scaleHeight(748),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton35: {
    position: "absolute",
    top: scaleHeight(892),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton36: {
    position: "absolute",
    top: scaleHeight(1042),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton37: {
    position: "absolute",
    top: scaleHeight(1202),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton38: {
    position: "absolute",
    top: scaleHeight(1362),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton39: {
    position: "absolute",
    top: scaleHeight(1522),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  patternButton40: {
    position: "absolute",
    top: scaleHeight(1682),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: scaleWidth(50),
  },
  
  // ✅ 개별 설명창들 + 노란색 외곽선
  descriptionArea31: {
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
  
  descriptionArea32: {
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
  
  descriptionArea33: {
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
  
  descriptionArea34: {
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
  
  descriptionArea35: {
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
  
  descriptionArea36: {
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
  
  descriptionArea37: {
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
  
  descriptionArea38: {
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
  
  descriptionArea39: {
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
  
  descriptionArea40: {
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