// ✅ 파일 위치: src/screens/Patterns46to55GuestScreen.tsx
// 게스트용 패턴 46-55 화면 - 완전 반응형 + 개별 버튼 위치 조정 가능
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
type GuestStackParamList = {
  GMainHome: undefined;
  Patterns41to45Guest: undefined;
  Patterns46to55Guest: undefined;
  Pattern47Guest: undefined;
  Pattern48Guest: undefined;
  Pattern49Guest: undefined;
  Pattern50Guest: undefined;
  Pattern51Guest: undefined;
  Pattern52Guest: undefined;
  Pattern53Guest: undefined;
  Pattern54Guest: undefined;
  Pattern55Guest: undefined;
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
  46: "최근 트렌드 기반",
  47: "사용자 번호 + 최소 출현 기반",
  48: "사용자 번호 + 최다 출현 기반",
  49: "사용자 번호 + 랜덤 기반",
  50: "사용자 번호 + 최근 제외 번호 기반",
  51: "사용자 번호 + 핸드폰 / 생일 기반",
  52: "사용자 번호 + 주소 / 주민번호 기반",
  53: "사용자 번호 + 사주 / 음양오행 기반",
  54: "사용자 번호 + 이름 (한글한자영문)",
  55: "사용자 번호 + 별자리 / 띠 기반",
};

// 생성된 번호를 저장할 상태 타입
interface GeneratedNumbers {
  [key: number]: number[];
}

type PatternId = 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55;

export default function Patterns46to55GuestScreen() {
  const navigation = useNavigation<any>();
  
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers>({});
  
  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // <<이전 버튼 클릭 - 41-45 패턴으로 이동
  const handlePrevPress = () => {
    navigation.navigate("Patterns41to45Guest");
  };


  // 로또공 버튼 클릭 - 번호 생성 (패턴 46은 일반, 47-55는 개별 페이지로 이동)
  const handlePatternPress = async (patternId: number) => {
    try {
      // 47-55번은 개별 패턴 페이지로 이동
      if (patternId >= 47 && patternId <= 55) {
        navigation.navigate(`Pattern${patternId}Guest` as any);
        return;
      }

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
      
      // 패턴 46만 랜덤 생성 허용
      if (patternId === 46) {
        const randomNumbers = Array.from({length: 6}, () => 
          Math.floor(Math.random() * 45) + 1
        ).sort((a, b) => a - b);
        
        setGeneratedNumbers(prev => ({
          ...prev,
          [patternId]: randomNumbers
        }));
      }
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
    
    if (patternId >= 46 && patternId <= 55) {
      return PATTERN_DESCRIPTIONS[patternId as PatternId];
    }
    
    return "패턴 설명 없음";
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/guest/patterns/patterns_46_55_guest.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 찍 로고 버튼 */}
      <TouchableOpacity 
        style={styles.logoButton} 
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* ✅ <<이전 버튼 */}
      <TouchableOpacity 
        style={styles.prevButton} 
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />


      {/* ✅ 패턴 46 버튼 */}
      <TouchableOpacity
        style={styles.patternButton46}
        onPress={() => handlePatternPress(46)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 47 버튼 */}
      <TouchableOpacity
        style={styles.patternButton47}
        onPress={() => handlePatternPress(47)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 48 버튼 */}
      <TouchableOpacity
        style={styles.patternButton48}
        onPress={() => handlePatternPress(48)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 49 버튼 */}
      <TouchableOpacity
        style={styles.patternButton49}
        onPress={() => handlePatternPress(49)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 50 버튼 */}
      <TouchableOpacity
        style={styles.patternButton50}
        onPress={() => handlePatternPress(50)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 51 버튼 */}
      <TouchableOpacity
        style={styles.patternButton51}
        onPress={() => handlePatternPress(51)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 52 버튼 */}
      <TouchableOpacity
        style={styles.patternButton52}
        onPress={() => handlePatternPress(52)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 53 버튼 */}
      <TouchableOpacity
        style={styles.patternButton53}
        onPress={() => handlePatternPress(53)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 54 버튼 */}
      <TouchableOpacity
        style={styles.patternButton54}
        onPress={() => handlePatternPress(54)}
        activeOpacity={0.7}
      />
      
      {/* ✅ 패턴 55 버튼 */}
      <TouchableOpacity
        style={styles.patternButton55}
        onPress={() => handlePatternPress(55)}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 46 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea46} 
        onPress={() => handleDescriptionPress(46)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(46)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 47 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea47} 
        onPress={() => handleDescriptionPress(47)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(47)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 48 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea48} 
        onPress={() => handleDescriptionPress(48)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(48)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 49 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea49} 
        onPress={() => handleDescriptionPress(49)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(49)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 50 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea50} 
        onPress={() => handleDescriptionPress(50)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(50)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 51 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea51} 
        onPress={() => handleDescriptionPress(51)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(51)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 52 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea52} 
        onPress={() => handleDescriptionPress(52)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(52)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 53 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea53} 
        onPress={() => handleDescriptionPress(53)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(53)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 54 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea54} 
        onPress={() => handleDescriptionPress(54)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(54)}
        </Text>
      </TouchableOpacity>
      
      {/* ✅ 패턴 55 설명 - 터치 가능 */}
      <TouchableOpacity 
        style={styles.descriptionArea55} 
        onPress={() => handleDescriptionPress(55)}
        activeOpacity={0.7}
      >
        <Text style={styles.descriptionText}>
          {getDisplayText(55)}
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
  
  // ✅ 찍 로고 버튼
  logoButton: {
    position: "absolute",
    top: scaleHeight(85),
    left: scaleWidth(10),
    width: scaleWidth(120),
    height: scaleHeight(120),
    backgroundColor: "transparent",

  },

  // ✅ <<이전 버튼
  prevButton: {
    position: "absolute",
    top: scaleHeight(106),
    left: scaleWidth(900),
    width: scaleWidth(180),
    height: scaleHeight(80),
    backgroundColor: "transparent",

  },
  
  
  // ✅ 개별 패턴 버튼들 + 분홍색 외곽선 (이미지 기준)
  patternButton46: {
    position: "absolute",
    top: scaleHeight(325),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton47: {
    position: "absolute",
    top: scaleHeight(465),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton48: {
    position: "absolute",
    top: scaleHeight(610),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton49: {
    position: "absolute",
    top: scaleHeight(748),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton50: {
    position: "absolute",
    top: scaleHeight(892),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton51: {
    position: "absolute",
    top: scaleHeight(1042),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton52: {
    position: "absolute",
    top: scaleHeight(1202),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton53: {
    position: "absolute",
    top: scaleHeight(1365),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton54: {
    position: "absolute",
    top: scaleHeight(1525),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  patternButton55: {
    position: "absolute",
    top: scaleHeight(1683),
    left: scaleWidth(75),
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF1493",
    borderRadius: scaleWidth(50),
  },
  
  // ✅ 개별 설명창들 + 분홍색 외곽선
  descriptionArea46: {
    position: "absolute",
    top: scaleHeight(315),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea47: {
    position: "absolute",
    top: scaleHeight(460),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea48: {
    position: "absolute",
    top: scaleHeight(608),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea49: {
    position: "absolute",
    top: scaleHeight(750),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea50: {
    position: "absolute",
    top: scaleHeight(888),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea51: {
    position: "absolute",
    top: scaleHeight(1037),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea52: {
    position: "absolute",
    top: scaleHeight(1200),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea53: {
    position: "absolute",
    top: scaleHeight(1352),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea54: {
    position: "absolute",
    top: scaleHeight(1515),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionArea55: {
    position: "absolute",
    top: scaleHeight(1678),
    left: scaleWidth(222),
    width: scaleWidth(795),
    height: scaleHeight(110),
    justifyContent: "center",
    paddingLeft: scaleWidth(20),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(36),
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  descriptionText: {
    fontSize: scaleFontSize(48),
    color: "#000000",
    fontWeight: "bold",
  },
});