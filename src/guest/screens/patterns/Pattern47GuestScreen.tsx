// ✅ 파일 위치: src/screens/guest/screens/Pattern47GuestScreen.tsx
// 47번 패턴: 사용자 번호 + 최소 출현 기반 - 게스트용
// 고정번호/제외번호 입력창 4개씩 + 번호생성 기능

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

const scaleWidth = (size: number) => (size / DESIGN_WIDTH) * width;
const scaleHeight = (size: number) => (size / DESIGN_HEIGHT) * height;
const scaleFontSize = (size: number) => (size / DESIGN_HEIGHT) * height;

export default function Pattern47GuestScreen() {
  const navigation = useNavigation<any>();
  
  // ✅ 상태 관리 - 고정번호 4개, 제외번호 4개
  const [fixedNumbers, setFixedNumbers] = useState<string[]>(["", "", "", ""]);
  const [excludeNumbers, setExcludeNumbers] = useState<string[]>(["", "", "", ""]);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [showGenerated, setShowGenerated] = useState<boolean>(false);

  // ✅ 고정번호 입력 핸들러
  const handleFixedNumberChange = (index: number, value: string) => {
    const newFixedNumbers = [...fixedNumbers];
    newFixedNumbers[index] = value;
    setFixedNumbers(newFixedNumbers);
  };

  // ✅ 제외번호 입력 핸들러
  const handleExcludeNumberChange = (index: number, value: string) => {
    const newExcludeNumbers = [...excludeNumbers];
    newExcludeNumbers[index] = value;
    setExcludeNumbers(newExcludeNumbers);
  };

  // ✅ 번호 생성 함수 (백엔드 API 연동)
  const generateNumbers = async () => {
    try {
      // 고정번호 파싱
      const fixedArray = fixedNumbers
        .filter(num => num.trim() !== "")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num) && num >= 1 && num <= 45);
    
      // 제외번호 파싱
      const excludeArray = excludeNumbers
        .filter(num => num.trim() !== "")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num) && num >= 1 && num <= 45);

      // 고정번호가 6개를 초과하는 경우
      if (fixedArray.length > 6) {
        Alert.alert("알림", "고정번호는 최대 6개까지 입력 가능합니다.");
        return;
      }

      // 고정번호와 제외번호가 겹치는 경우
      const overlap = fixedArray.filter(num => excludeArray.includes(num));
      if (overlap.length > 0) {
        Alert.alert("알림", "고정번호와 제외번호가 겹칠 수 없습니다.");
        return;
      }

      // 백엔드 API 호출
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patterns: [47], // 패턴 47번
          user_numbers: fixedArray,
          user_excludes: excludeArray,
          calendar_type: "solar"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const numbers = data.numbers || [];
        setGeneratedNumbers(numbers);
        setShowGenerated(true);
      } else {
        Alert.alert("오류", "번호 생성에 실패했습니다.");
      }

    } catch (error) {
      console.error("패턴 생성 오류:", error);
      Alert.alert("오류", "번호 생성 중 오류가 발생했습니다.");
    }
  };

  // ✅ 설명/생성번호 토글 함수
  const toggleDisplay = () => {
    setShowGenerated(!showGenerated);
  };

  return (
    <View style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image 
        source={require('../../../../assets/images/guest/patterns/pattern47_guest.png')} 
        style={styles.backgroundImage}
        resizeMode="contain"
      /> */}

      {/* ✅ 이전 버튼 */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Patterns46to55Guest')}
      />

      {/* ✅ 고정번호 입력창 4개 */}
      {fixedNumbers.map((value, index) => (
        <TextInput
          key={`fixed-${index}`}
          style={[styles.numberInput, styles[`fixedInput${index + 1}` as keyof typeof styles]]}
          value={value}
          onChangeText={(text) => handleFixedNumberChange(index, text)}
          placeholder=""
          keyboardType="numeric"
          maxLength={2}
          textAlignVertical="top"
        />
      ))}

      {/* ✅ 제외번호 입력창 4개 */}
      {excludeNumbers.map((value, index) => (
        <TextInput
          key={`exclude-${index}`}
          style={[styles.numberInput, styles[`excludeInput${index + 1}` as keyof typeof styles]]}
          value={value}
          onChangeText={(text) => handleExcludeNumberChange(index, text)}
          placeholder=""
          keyboardType="numeric"
          maxLength={2}
          textAlignVertical="top"
        />
      ))}

      {/* ✅ 설명/생성번호 표시 영역 */}
      <TouchableOpacity 
        style={styles.displayArea}
        onPress={toggleDisplay}
      >
        <Text style={styles.displayText}>
          {showGenerated 
            ? generatedNumbers.join(', ')
            : "사용자 번호 + 최소 출현 기반"
          }
        </Text>
      </TouchableOpacity>

      {/* ✅ 번호생성 버튼 */}
      <TouchableOpacity 
        style={styles.generateButton}
        onPress={generateNumbers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  // ✅ 이전 버튼 (사용자가 조정한 위치 유지)
  backButton: {
    position: 'absolute',
    top: scaleHeight(1725),
    right: scaleWidth(60),
    width: scaleWidth(200),
    height: scaleHeight(100),
    backgroundColor: 'transparent',

  },

  // ✅ 공통 입력창 스타일
  numberInput: {
    position: 'absolute',
    width: scaleWidth(220),
    height: scaleHeight(100),
    backgroundColor: 'transparent',
    fontSize: scaleFontSize(64),
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'bottom', // 텍스트를 입력창 하단에 배치
    paddingBottom: scaleHeight(10), // 하단 여백 추가

  },

  // ✅ 고정번호 입력창 4개 위치
  fixedInput1: {
    top: scaleHeight(1107),
    left: scaleWidth(65),
  },
  fixedInput2: {
    top: scaleHeight(1107),
    left: scaleWidth(313),
  },
  fixedInput3: {
    top: scaleHeight(1107),
    left: scaleWidth(560),
  },
  fixedInput4: {
    top: scaleHeight(1107),
    left: scaleWidth(805),
  },

  // ✅ 제외번호 입력창 4개 위치
  excludeInput1: {
    top: scaleHeight(1382),
    left: scaleWidth(65),
  },
  excludeInput2: {
    top: scaleHeight(1382),
    left: scaleWidth(313),
  },
  excludeInput3: {
    top: scaleHeight(1382),
    left: scaleWidth(560),
  },
  excludeInput4: {
    top: scaleHeight(1382),
    left: scaleWidth(805),
  },

  // ✅ 설명/생성번호 표시 영역
  displayArea: {
    position: 'absolute',
    top: scaleHeight(595),
    left: scaleWidth(213),
    width: scaleWidth(820),
    height: scaleHeight(120),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fe7ef1',
    borderRadius: scaleWidth(36),
  },

  displayText: {
    fontSize: scaleFontSize(60),
    color: '#1601ff',
    textAlign: 'center',
    fontWeight: '500',
  },

  // ✅ 번호생성 버튼 (사용자가 조정한 위치 유지)
  generateButton: {
    position: 'absolute',
    top: scaleHeight(1700),
    left: scaleWidth(60),
    width: scaleWidth(730),
    height: scaleHeight(160),
    backgroundColor: 'transparent',

  },
});