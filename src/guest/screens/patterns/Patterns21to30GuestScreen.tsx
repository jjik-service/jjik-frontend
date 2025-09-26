// ✅ 파일 위치: src/screens/Patterns21to30GuestScreen.tsx
// 게스트용 패턴 21-30 화면 - 완전 반응형 + 개별 버튼 위치 조정 가능
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
import AdPlaceholder from "../../../components/AdPlaceholder";

// 로컬 타입 정의
type GuestStackParamList = {
  MainGuest: undefined;
  Patterns11to20Guest: undefined;
  Patterns21to30Guest: undefined;
  Patterns31to40Guest: undefined;
};

type GuestStackNavigationProp = NavigationProp<GuestStackParamList>;

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
  21: "5개 구간 각 1개 분포",
  22: "최다 출현 보너스 3~4개",
  23: "최다/최소 번호 제외 기반",
  24: "6구간 각 1개 균형 분포",
  25: "홀수 2개 짝수 4개 비율",
  26: "홀수 3개 짝수 3개 비율",
  27: "홀수 4개 짝수 2개 비율",
  28: "3개 구간 각 2개씩 균형 분포",
  29: "저번대 2개 포함",
  30: "고번대 2개 포함",
};

// 생성된 번호를 저장할 상태 타입
interface GeneratedNumbers {
  [key: number]: number[];
}

type PatternId = 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;

export default function Patterns21to30GuestScreen() {
  const navigation = useNavigation<any>();
  
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers>({});
  
  // 광고 관련 상태 추가
  const [showAdModal, setShowAdModal] = useState(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string | null>(null);

  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // <<이전 버튼 클릭 - 11-20 패턴으로 이동
  const handlePrevPress = () => {
    navigation.navigate("Patterns11to20Guest");
  };

  // 다음>> 버튼 클릭 - 광고 시청 후 31-40 패턴으로 이동
  const handleNextPress = () => {
    setAdCompletionAction('navigateToPatterns31_40');
    setShowAdModal(true);
  };

  // 광고 시청 완료 후 액션 실행
  const handleAdComplete = () => {
    setShowAdModal(false);
    
    switch (adCompletionAction) {
      case 'navigateToPatterns31_40':
        navigation.navigate('Patterns31to40Guest');
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
    
    if (patternId >= 21 && patternId <= 30) {
      return PATTERN_DESCRIPTIONS[patternId as PatternId];
    }
    
    return "패턴 설명 없음";
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/guest/patterns/patterns_21_30_guest.png")}
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

      {/* ✅ 패턴 21 버튼 */}
      <TouchableOpacity
        style={styles.patternButton21}
        onPress={() => handlePatternPress(21)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 22 버튼 */}
      <TouchableOpacity
        style={styles.patternButton22}
        onPress={() => handlePatternPress(22)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 23 버튼 */}
      <TouchableOpacity
        style={styles.patternButton23}
        onPress={() => handlePatternPress(23)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 24 버튼 */}
      <TouchableOpacity
        style={styles.patternButton24}
        onPress={() => handlePatternPress(24)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 25 버튼 */}
      <TouchableOpacity
        style={styles.patternButton25}
        onPress={() => handlePatternPress(25)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 26 버튼 */}
      <TouchableOpacity
        style={styles.patternButton26}
        onPress={() => handlePatternPress(26)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 27 버튼 */}
      <TouchableOpacity
        style={styles.patternButton27}
        onPress={() => handlePatternPress(27)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 28 버튼 */}
      <TouchableOpacity
        style={styles.patternButton28}
        onPress={() => handlePatternPress(28)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 29 버튼 */}
      <TouchableOpacity
        style={styles.patternButton29}
        onPress={() => handlePatternPress(29)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 30 버튼 */}
      <TouchableOpacity
        style={styles.patternButton30}
        onPress={() => handlePatternPress(30)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 21 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea21} 
        onPress={() => handleDescriptionPress(21)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(21)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 22 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea22} 
        onPress={() => handleDescriptionPress(22)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(22)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 23 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea23} 
        onPress={() => handleDescriptionPress(23)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(23)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 24 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea24} 
        onPress={() => handleDescriptionPress(24)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(24)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 25 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea25} 
        onPress={() => handleDescriptionPress(25)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(25)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 26 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea26} 
        onPress={() => handleDescriptionPress(26)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(26)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 27 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea27} 
        onPress={() => handleDescriptionPress(27)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(27)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 28 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea28} 
        onPress={() => handleDescriptionPress(28)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(28)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 29 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea29} 
        onPress={() => handleDescriptionPress(29)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(29)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 30 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea30} 
        onPress={() => handleDescriptionPress(30)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(30)}
        </Text>
      </TouchableOpacity>

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
  patternButton21: {
    position: "absolute",
    top: scaleHeight(324),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton22: {
    position: "absolute",
    top: scaleHeight(465),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton23: {
    position: "absolute",
    top: scaleHeight(607),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

 
  },
  
  patternButton24: {
    position: "absolute",
    top: scaleHeight(748),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  
  },
  
  patternButton25: {
    position: "absolute",
    top: scaleHeight(892),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton26: {
    position: "absolute",
    top: scaleHeight(1042),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton27: {
    position: "absolute",
    top: scaleHeight(1202),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton28: {
    position: "absolute",
    top: scaleHeight(1362),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton29: {
    position: "absolute",
    top: scaleHeight(1522),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  patternButton30: {
    position: "absolute",
    top: scaleHeight(1682),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",


  },
  
  // ✅ 개별 설명창들 + 노란색 외곽선
  descriptionArea21: {
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
  
  descriptionArea22: {
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
  
  descriptionArea23: {
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
  
  descriptionArea24: {
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
  
  descriptionArea25: {
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
  
  descriptionArea26: {
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
  
  descriptionArea27: {
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
  
  descriptionArea28: {
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
  
  descriptionArea29: {
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
  
  descriptionArea30: {
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