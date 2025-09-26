// ✅ 파일 위치: src/screens/guest/screens/Pattern55GuestScreen.tsx
// 55번 패턴: 사용자 번호 + 별자리/띠 기반 - 게스트용
// 53번 구조를 완전히 복사하여 양력/음력을 체크박스로 변경 + 백엔드 API 연동

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
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

const scaleWidth = (size: number) => (size / DESIGN_WIDTH) * width;
const scaleHeight = (size: number) => (size / DESIGN_HEIGHT) * height;
const scaleFontSize = (size: number) => (size / DESIGN_HEIGHT) * height;

export default function Pattern55GuestScreen() {
  const navigation = useNavigation<any>();
  
  // ✅ 상태 관리 - 53번과 완전히 동일
  const [fixedNumbers, setFixedNumbers] = useState<string[]>(["", "", "", ""]);
  const [excludeNumbers, setExcludeNumbers] = useState<string[]>(["", "", "", ""]);
  const [birthDate, setBirthDate] = useState<string>(""); // 생년월일 입력
  const [calendarType, setCalendarType] = useState<"solar" | "lunar" | null>(null); // 양력/음력 선택
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [showGenerated, setShowGenerated] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  // ✅ 고정번호 입력 핸들러 (53번과 동일)
  const handleFixedNumberChange = (index: number, value: string) => {
    const newFixedNumbers = [...fixedNumbers];
    newFixedNumbers[index] = value;
    setFixedNumbers(newFixedNumbers);
  };

  // ✅ 제외번호 입력 핸들러 (53번과 동일)
  const handleExcludeNumberChange = (index: number, value: string) => {
    const newExcludeNumbers = [...excludeNumbers];
    newExcludeNumbers[index] = value;
    setExcludeNumbers(newExcludeNumbers);
  };

  // ✅ 양력/음력 체크박스 선택 함수
  const selectCalendarType = (type: "solar" | "lunar") => {
    setCalendarType(type);
  };

  // ✅ 번호 생성 함수 (백엔드 API 연동)
  const generateNumbers = async () => {
    try {
      // 고정번호 파싱 (53번과 동일)
      const fixedArray = fixedNumbers
        .filter(num => num.trim() !== "")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num) && num >= 1 && num <= 45);
      
      // 제외번호 파싱 (53번과 동일)
      const excludeArray = excludeNumbers
        .filter(num => num.trim() !== "")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num) && num >= 1 && num <= 45);

      // 고정번호가 6개를 초과하는 경우 (53번과 동일)
      if (fixedArray.length > 6) {
        Alert.alert("알림", "고정번호는 최대 6개까지 입력 가능합니다.");
        return;
      }

      // 고정번호와 제외번호가 겹치는 경우 (53번과 동일)
      const overlap = fixedArray.filter(num => excludeArray.includes(num));
      if (overlap.length > 0) {
        Alert.alert("알림", "고정번호와 제외번호가 겹칠 수 없습니다.");
        return;
      }

      // 양력/음력 선택 확인 (53번과 동일)
      if (!calendarType) {
        Alert.alert("알림", "양력 또는 음력을 선택해주세요.");
        return;
      }

      // 개인정보 보호 모달 표시 (53번과 동일)
      setShowPrivacyModal(true);

      // 백엔드 API 호출 (패턴 55번 - 별자리/띠 기반)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patterns: [55], // 패턴 55번 - 별자리/띠 기반
          user_numbers: fixedArray,
          user_excludes: excludeArray,
          birth_date: birthDate,
          calendar_type: calendarType
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

      // 개인정보 삭제 (53번과 동일)
      setTimeout(() => {
        setBirthDate("");
        setCalendarType(null);
        setShowPrivacyModal(false);
      }, 2000);

    } catch (error) {
      console.error("패턴 생성 오류:", error);
      Alert.alert("오류", "번호 생성 중 오류가 발생했습니다.");
    }
  };

  // ✅ 설명/생성번호 토글 함수 (53번과 동일)
  const toggleDisplay = () => {
    setShowGenerated(!showGenerated);
  };

  return (
    <View style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image 
        source={require('../../../../assets/images/guest/patterns/pattern55_guest.png')} 
        style={styles.backgroundImage}
        resizeMode="contain"
      /> */}

      {/* ✅ 이전 버튼 (53번과 완전히 동일) */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Patterns46to55Guest')}
      />

      {/* ✅ 고정번호 입력창 4개 (53번과 완전히 동일) */}
      {fixedNumbers.map((value, index) => (
        <TextInput
          key={`fixed-${index}`}
          style={[styles.numberInput, styles[`fixedInput${index + 1}` as keyof typeof styles]]}
          value={value}
          onChangeText={(text) => handleFixedNumberChange(index, text)}
          placeholder=""
          keyboardType="numeric"
          maxLength={2}
          textAlignVertical="bottom"
        />
      ))}

      {/* ✅ 제외번호 입력창 4개 (53번과 완전히 동일) */}
      {excludeNumbers.map((value, index) => (
        <TextInput
          key={`exclude-${index}`}
          style={[styles.numberInput, styles[`excludeInput${index + 1}` as keyof typeof styles]]}
          value={value}
          onChangeText={(text) => handleExcludeNumberChange(index, text)}
          placeholder=""
          keyboardType="numeric"
          maxLength={2}
          textAlignVertical="bottom"
        />
      ))}

      {/* ✅ 생년월일 입력창 (53번과 완전히 동일) */}
      <TextInput
        style={styles.birthDateInput}
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYYMMDD"
        keyboardType="numeric"
        maxLength={8}
        multiline={false}
      />

      {/* ✅ 양력 체크박스 (53번의 양력 버튼 위치를 체크박스로) */}
      <TouchableOpacity
        style={styles.solarCheckbox}
        onPress={() => selectCalendarType('solar')}
      >
        <View style={[
          styles.checkboxContainer,
          { backgroundColor: '#FFB6C1' } // 연분홍
        ]}>
          <Text style={styles.checkboxLabel}>양력</Text>
          <View style={[
            styles.checkboxBox,
            { backgroundColor: calendarType === 'solar' ? '#E74C3C' : '#FFFFFF' }
          ]}>
            {calendarType === 'solar' && <Text style={styles.checkMark}>✓</Text>}
          </View>
        </View>
      </TouchableOpacity>

      {/* ✅ 음력 체크박스 (53번의 음력 버튼 위치를 체크박스로) */}
      <TouchableOpacity
        style={styles.lunarCheckbox}
        onPress={() => selectCalendarType('lunar')}
      >
        <View style={[
          styles.checkboxContainer,
          { backgroundColor: '#FFFF99' } // 연노랑
        ]}>
          <Text style={styles.checkboxLabel}>음력</Text>
          <View style={[
            styles.checkboxBox,
            { backgroundColor: calendarType === 'lunar' ? '#E74C3C' : '#FFFFFF' }
          ]}>
            {calendarType === 'lunar' && <Text style={styles.checkMark}>✓</Text>}
          </View>
        </View>
      </TouchableOpacity>

      {/* ✅ 설명/생성번호 표시 영역 (53번과 완전히 동일) */}
      <TouchableOpacity 
        style={styles.displayArea}
        onPress={toggleDisplay}
      >
        <Text style={styles.displayText}>
          {showGenerated 
            ? generatedNumbers.join(', ')
            : "사용자 번호 + 별자리 / 띠"
          }
        </Text>
      </TouchableOpacity>

      {/* ✅ 번호생성 버튼 (53번과 완전히 동일) */}
      <TouchableOpacity 
        style={styles.generateButton}
        onPress={generateNumbers}
      />

      {/* ✅ 개인정보 보호 모달 (53번과 완전히 동일) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPrivacyModal}
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              개인정보 보호를 위해{'\n'}생성 후 모든 정보가 삭제됩니다!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPrivacyModal(false)}
            >
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  // ✅ 이전 버튼 (53번과 완전히 동일)
  backButton: {
    position: 'absolute',
    top: scaleHeight(1775),
    right: scaleWidth(60),
    width: scaleWidth(200),
    height: scaleHeight(100),
    backgroundColor: 'transparent',

  },

  // ✅ 공통 입력창 스타일 (53번과 완전히 동일)
  numberInput: {
    position: 'absolute',
    width: scaleWidth(220),
    height: scaleHeight(100),
    backgroundColor: 'transparent',
    fontSize: scaleFontSize(64),
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: scaleHeight(10),

  },

  // ✅ 고정번호 입력창 4개 위치 (53번과 완전히 동일)
  fixedInput1: {
    top: scaleHeight(870),
    left: scaleWidth(65),
  },
  fixedInput2: {
    top: scaleHeight(870),
    left: scaleWidth(313),
  },
  fixedInput3: {
    top: scaleHeight(870),
    left: scaleWidth(560),
  },
  fixedInput4: {
    top: scaleHeight(870),
    left: scaleWidth(805),
  },

  // ✅ 제외번호 입력창 4개 위치 (53번과 완전히 동일)
  excludeInput1: {
    top: scaleHeight(1075),
    left: scaleWidth(65),
  },
  excludeInput2: {
    top: scaleHeight(1075),
    left: scaleWidth(313),
  },
  excludeInput3: {
    top: scaleHeight(1075),
    left: scaleWidth(560),
  },
  excludeInput4: {
    top: scaleHeight(1075),
    left: scaleWidth(805),
  },

  // ✅ 생년월일 입력창 (53번과 완전히 동일)
  birthDateInput: {
    position: 'absolute',
    top: scaleHeight(1280),
    left: scaleWidth(55),
    width: scaleWidth(990),
    height: scaleHeight(110),
    backgroundColor: '#FFFFFF',
    fontSize: scaleFontSize(64),
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: scaleHeight(10),
    borderWidth: 1,
    borderColor: '#000000',
  },

  // ✅ 양력 체크박스 (53번의 양력 버튼 위치)
  solarCheckbox: {
    position: 'absolute',
    top: scaleHeight(1480),
    left: scaleWidth(55),
    width: scaleWidth(470),
    height: scaleHeight(130),

  },

  // ✅ 음력 체크박스 (53번의 음력 버튼 위치)
  lunarCheckbox: {
    position: 'absolute',
    top: scaleHeight(1480),
    right: scaleWidth(55),
    width: scaleWidth(470),
    height: scaleHeight(130),

  },

  // ✅ 체크박스 컨테이너
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(10),
    borderWidth: 1,
    borderColor: '#000000',
    height: '100%',

  },

  // ✅ 체크박스 라벨
  checkboxLabel: {
    fontSize: scaleFontSize(64),
    color: '#000000',
    fontWeight: 'bold',
  },

  // ✅ 체크박스 박스
  checkboxBox: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: scaleWidth(8),
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',

  },

  // ✅ 체크 마크
  checkMark: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(64),
    fontWeight: 'bold',

  },

  // ✅ 설명/생성번호 표시 영역 (53번과 완전히 동일)
  displayArea: {
    position: 'absolute',
    top: scaleHeight(485),
    left: scaleWidth(213),
    width: scaleWidth(820),
    height: scaleHeight(130),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fe7ef1',
    borderRadius: scaleWidth(36),
  },

  displayText: {
    fontSize: scaleFontSize(64),
    color: '#1601ff',
    textAlign: 'center',
    fontWeight: '500',
  },

  // ✅ 번호생성 버튼 (53번과 완전히 동일)
  generateButton: {
    position: 'absolute',
    top: scaleHeight(1715),
    left: scaleWidth(60),
    width: scaleWidth(730),
    height: scaleHeight(160),
    backgroundColor: 'transparent',

  },

  // ✅ 모달 관련 스타일 (53번과 완전히 동일)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: scaleWidth(60),
    borderRadius: scaleWidth(20),
    alignItems: 'center',
    width: scaleWidth(800),
  },

  modalText: {
    fontSize: scaleFontSize(55),
    color: '#E74C3C',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: scaleHeight(40),
    lineHeight: scaleFontSize(75),
  },

  modalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scaleWidth(60),
    paddingVertical: scaleHeight(20),
    borderRadius: scaleWidth(10),
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(50),
    fontWeight: 'bold',
  },
});
