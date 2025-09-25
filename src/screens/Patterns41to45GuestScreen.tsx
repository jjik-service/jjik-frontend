// ✅ 파일 위치: src/screens/Patterns41to45GuestScreen.tsx
// 게스트용 패턴 41-45 화면 - 완전 반응형 + 개별 버튼 위치 조정 가능
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
import AdPlaceholder from "../components/AdPlaceholder";

// 로컬 타입 정의
type RootStackParamList = {
  MainGuest: undefined;
  Patterns31to40Guest: undefined;
  Patterns41to45Guest: undefined;
  Patterns46to55Guest: undefined; // 나중에 만들 페이지
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

// 패턴별 설명 데이터 (이미지 기준 정확한 설명)
const PATTERN_DESCRIPTIONS = {
  41: "삼각수 기반",
  42: "sum-range 중심 3~4개",
  43: "모듈로 (residue) 분산 분포",
  44: "포아송 (poisson) 가중치",
  45: "최근 (rare-hot) 빈도 필터링",
};

// 생성된 번호를 저장할 상태 타입
interface GeneratedNumbers {
  [key: number]: number[];
}

type PatternId = 41 | 42 | 43 | 44 | 45;

export default function Patterns41to45GuestScreen() {
  const navigation = useNavigation<any>();
  
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers>({});
  
  // 광고 관련 상태 추가
  const [showAdModal, setShowAdModal] = useState(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string | null>(null);

  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // <<이전 버튼 클릭 - 31-40 패턴으로 이동
  const handlePrevPress = () => {
    navigation.navigate("Patterns31to40Guest");
  };

  // 다음>> 버튼 클릭 - 광고 시청 후 46-55 패턴으로 이동 (임시로 홈으로)
  const handleNextPress = () => {
    setAdCompletionAction('navigateToPatterns46to55');
    setShowAdModal(true);
  };

  // 나만의 맞춤번호 생성하기 버튼 클릭
  const handleCustomPatternPress = () => {
    setAdCompletionAction('navigateToPatterns46to55');
    setShowAdModal(true);
  };

  // 광고 시청 완료 후 액션 실행
  const handleAdComplete = () => {
    setShowAdModal(false);
    
    switch (adCompletionAction) {
      case 'navigateToPatterns41_45':
        navigation.navigate('Patterns41to45Guest'); 
        break;
      case 'navigateToPatterns46_55':
        // 46-55 페이지가 없으므로 임시로 홈으로 이동
        navigation.navigate('Patterns46to55Guest');
        break;
      default:
        break;
    }
    
    setAdCompletionAction(null);
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
    
    if (patternId >= 41 && patternId <= 45) {
      return PATTERN_DESCRIPTIONS[patternId as PatternId];
    }
    
    return "패턴 설명 없음";
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../assets/images/pages/patterns/patterns_41_45_guest.png")}
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

      {/* ✅ 패턴 41 버튼 */}
      <TouchableOpacity
        style={styles.patternButton41}
        onPress={() => handlePatternPress(41)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 42 버튼 */}
      <TouchableOpacity
        style={styles.patternButton42}
        onPress={() => handlePatternPress(42)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 43 버튼 */}
      <TouchableOpacity
        style={styles.patternButton43}
        onPress={() => handlePatternPress(43)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 44 버튼 */}
      <TouchableOpacity
        style={styles.patternButton44}
        onPress={() => handlePatternPress(44)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 45 버튼 */}
      <TouchableOpacity
        style={styles.patternButton45}
        onPress={() => handlePatternPress(45)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 41 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea41} 
        onPress={() => handleDescriptionPress(41)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(41)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 42 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea42} 
        onPress={() => handleDescriptionPress(42)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(42)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 43 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea43} 
        onPress={() => handleDescriptionPress(43)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(43)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 44 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea44} 
        onPress={() => handleDescriptionPress(44)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(44)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 45 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea45} 
        onPress={() => handleDescriptionPress(45)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(45)}
        </Text>
      </TouchableOpacity>

      {/* ✅ 나만의 맞춤번호 생성하기 버튼 */}
      <TouchableOpacity 
        style={styles.customPatternButton} 
        onPress={handleCustomPatternPress}
        activeOpacity={0.7}
      />

      {/* 보상형 광고 모달 */}
      {showAdModal && (
        <AdPlaceholder 
          onComplete={handleAdComplete}
          duration={15000}
          type="rewarded"
        />
      )}
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
    top: scaleHeight(96),
    left: scaleWidth(0),
    width: scaleWidth(180),
    height: scaleHeight(80),
    backgroundColor: "transparent",

  },
  
  // ✅ 다음>> 버튼
  nextButton: {
    position: "absolute",
    top: scaleHeight(96),
    left: scaleWidth(907),
    width: scaleWidth(180),
    height: scaleHeight(80),
    backgroundColor: "transparent",

  },
  
  // ✅ 개별 패턴 버튼들 + 초록색 외곽선 (이미지 기준)
  patternButton41: {
    position: "absolute",
    top: scaleHeight(324),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton42: {
    position: "absolute",
    top: scaleHeight(478),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton43: {
    position: "absolute",
    top: scaleHeight(635),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton44: {
    position: "absolute",
    top: scaleHeight(790),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton45: {
    position: "absolute",
    top: scaleHeight(947),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  // ✅ 개별 설명창들 + 초록색 외곽선
  descriptionArea41: {
    position: "absolute",
    top: scaleHeight(320),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea42: {
    position: "absolute",
    top: scaleHeight(475),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea43: {
    position: "absolute",
    top: scaleHeight(635),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea44: {
    position: "absolute",
    top: scaleHeight(785),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea45: {
    position: "absolute",
    top: scaleHeight(940),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },

  // ✅ 나만의 맞춤번호 생성하기 버튼 (이미지 하단 위치 추정)
  customPatternButton: {
    position: "absolute",
    top: scaleHeight(1595),
    left: scaleWidth(175),
    width: scaleWidth(740),
    height: scaleHeight(140),
    backgroundColor: "transparent",

  },
  
  descriptionText: {
    fontSize: scaleFontSize(60),
    color: "#000000",
    fontWeight: "500",
  },
});