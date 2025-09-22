// ✅ 파일 위치: src/screens/Patterns1to10GuestScreen.tsx
// 게스트용 패턴 1-10 화면 - 완전 반응형 + 개별 버튼 위치 조정 가능
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
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import AdPlaceholder from "../components/AdPlaceholder";

// 로컬 타입 정의
type RootStackParamList = {
  MainGuest: undefined;
  Patterns1to10Guest: undefined;
  Patterns11to20Guest: undefined;
  PatternGuideModal: undefined;
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
  1: "전체 최다 출현",
  2: "전체 최소 출현", 
  3: "최근 5회차 미출현",
  4: "연속번호 한쌍 포함",
  5: "최근10회 빈도높은",
  6: "번호 합계 120~160 범위",
  7: "최근 20회 미출현+다빈도",
  8: "직전회차 번호 제외",
  9: "끝수 다양성",
  10: "특정 구간에 4개 집중",
};

// 생성된 번호를 저장할 상태 타입
interface GeneratedNumbers {
  [key: number]: number[];
}

type PatternId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export default function Patterns1to10GuestScreen() {
  const navigation = useNavigation<any>();
  
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers>({});
  
  // 광고 관련 상태 추가
  const [showAdModal, setShowAdModal] = useState(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string | null>(null);

  // 화면 진입시 패턴 가이드 모달 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuideModal(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // 다음>> 버튼 클릭 - 광고 시청 후 11-20 패턴으로 이동
  const handleNextPress = () => {
    setAdCompletionAction('navigateToPatterns11_20');
    setShowAdModal(true);
  };

  // 광고 시청 완료 후 액션 실행
  const handleAdComplete = () => {
    setShowAdModal(false);
    
    switch (adCompletionAction) {
      case 'navigateToPatterns11_20':
        navigation.navigate('Patterns11to20Guest');
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
    
    if (patternId >= 1 && patternId <= 10) {
      return PATTERN_DESCRIPTIONS[patternId as PatternId];
    }
    
    return "패턴 설명 없음";
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require("../../assets/images/pages/patterns/patterns_1_10_guest.png")}
        style={styles.background}
        resizeMode="contain"
      />

      {/* ✅ 찍 로고 버튼 */}
      <TouchableOpacity 
        style={styles.logoButton} 
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* ✅ 다음>> 버튼 */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNextPress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 1 버튼 */}
      <TouchableOpacity
        style={styles.patternButton1}
        onPress={() => handlePatternPress(1)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 2 버튼 */}
      <TouchableOpacity
        style={styles.patternButton2}
        onPress={() => handlePatternPress(2)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 3 버튼 */}
      <TouchableOpacity
        style={styles.patternButton3}
        onPress={() => handlePatternPress(3)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 4 버튼 */}
      <TouchableOpacity
        style={styles.patternButton4}
        onPress={() => handlePatternPress(4)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 5 버튼 */}
      <TouchableOpacity
        style={styles.patternButton5}
        onPress={() => handlePatternPress(5)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 6 버튼 */}
      <TouchableOpacity
        style={styles.patternButton6}
        onPress={() => handlePatternPress(6)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 7 버튼 */}
      <TouchableOpacity
        style={styles.patternButton7}
        onPress={() => handlePatternPress(7)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 8 버튼 */}
      <TouchableOpacity
        style={styles.patternButton8}
        onPress={() => handlePatternPress(8)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 9 버튼 */}
      <TouchableOpacity
        style={styles.patternButton9}
        onPress={() => handlePatternPress(9)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 10 버튼 */}
      <TouchableOpacity
        style={styles.patternButton10}
        onPress={() => handlePatternPress(10)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 1 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea1} 
        onPress={() => handleDescriptionPress(1)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(1)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 2 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea2} 
        onPress={() => handleDescriptionPress(2)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(2)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 3 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea3} 
        onPress={() => handleDescriptionPress(3)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(3)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 4 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea4} 
        onPress={() => handleDescriptionPress(4)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(4)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 5 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea5} 
        onPress={() => handleDescriptionPress(5)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(5)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 6 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea6} 
        onPress={() => handleDescriptionPress(6)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(6)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 7 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea7} 
        onPress={() => handleDescriptionPress(7)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(7)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 8 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea8} 
        onPress={() => handleDescriptionPress(8)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(8)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 9 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea9} 
        onPress={() => handleDescriptionPress(9)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(9)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 10 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea10} 
        onPress={() => handleDescriptionPress(10)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(10)}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 가이드 모달 */}
      {showGuideModal && (
        <Modal
          visible={showGuideModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowGuideModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowGuideModal(false)}
          >
            <Image
              source={require("../../assets/images/modals/pattern_guide_modal.png")}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}

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
  
  // ✅ 찍 로고 버튼
  logoButton: {
    position: "absolute",
    top: scaleHeight(90),
    left: scaleWidth(10),
    width: scaleWidth(120),
    height: scaleHeight(120),
    backgroundColor: "transparent",

  },
  
  // ✅ 다음>> 버튼
  nextButton: {
    position: "absolute",
    top: scaleHeight(108),
    left: scaleWidth(907),
    width: scaleWidth(180),
    height: scaleHeight(80),
    backgroundColor: "transparent",

  },
  
  // ✅ 개별 패턴 버튼들
  patternButton1: {
    position: "absolute",
    top: scaleHeight(324),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton2: {
    position: "absolute",
    top: scaleHeight(465),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton3: {
    position: "absolute",
    top: scaleHeight(607),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton4: {
    position: "absolute",
    top: scaleHeight(748),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton5: {
    position: "absolute",
    top: scaleHeight(892),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton6: {
    position: "absolute",
    top: scaleHeight(1042),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton7: {
    position: "absolute",
    top: scaleHeight(1202),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton8: {
    position: "absolute",
    top: scaleHeight(1362),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton9: {
    position: "absolute",
    top: scaleHeight(1522),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  patternButton10: {
    position: "absolute",
    top: scaleHeight(1682),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",

  },
  
  // ✅ 개별 설명창들
  descriptionArea1: {
    position: "absolute",
    top: scaleHeight(317),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea2: {
    position: "absolute",
    top: scaleHeight(460),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea3: {
    position: "absolute",
    top: scaleHeight(602),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea4: {
    position: "absolute",
    top: scaleHeight(742),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea5: {
    position: "absolute",
    top: scaleHeight(888),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea6: {
    position: "absolute",
    top: scaleHeight(1040),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea7: {
    position: "absolute",
    top: scaleHeight(1198),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea8: {
    position: "absolute",
    top: scaleHeight(1356),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea9: {
    position: "absolute",
    top: scaleHeight(1518),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionArea10: {
    position: "absolute",
    top: scaleHeight(1678),
    left: scaleWidth(225),
    width: scaleWidth(792),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderRadius: scaleWidth(36), // 라운드 모서리 추가
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  
  descriptionText: {
    fontSize: scaleFontSize(60),
    color: "#000000",
    fontWeight: "500",

  },
  
  // ✅ 모달 관련 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalImage: {
    width: width * 0.85,
    maxWidth: 300,
    aspectRatio: 1.2,
  },
});