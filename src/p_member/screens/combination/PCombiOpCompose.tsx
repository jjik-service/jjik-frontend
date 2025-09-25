// ✅ 파일 위치: src/p_member/screens/combination/PCombiOptionCompose.tsx
// ✅ 배경 이미지: assets/images/p_member/combination/p_my_combination_option_compose.png
// ✅ 프리미엄 옵션형 패턴 합성 조합 화면 - 완전 수정 버전

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";
import AdPlaceholder from "../../../components/AdPlaceholder";
import { LottoBall, BonusLottoBall } from "../../../components/LottoBall";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 옵션형 패턴 데이터 (이미지와 정확히 일치하도록 수정)
const OPTION_PATTERN_DATA = {
  16: "번호별 가중치 기반",
  17: "AI 추천번호 포함 기반", 
  18: "AI 추천패턴 합성 조합 기반",
  19: "AI 추천패턴 필터링 조합 기반",
  20: "AI 분석 추론 예측 기반",
  1: "최근 5~50회 최다 출현 기반(선택)",
  2: "최근 5~50회 최소 출현 기반(선택)",
  3: "최근 5~50회 미출현 기반(선택)",
  4: "2~4개 연속번호 포함 기반(선택)",
  5: "홀:짝 비율 패턴 기반(선택)",
  6: "고수/저수 각 1~3개 포함 기반(선택)",
  7: "번호 이합 범위 100~180 기반(선택)",
  8: "번호 구간 2~6개 분할 분포 기반(선택)",
  9: "끝수 다양성 2~6종 기반(선택)",
  10: "전체 1등 최다패턴 유사성 기반",
  11: "전체 1등 역최다패턴 유사성 기반",
  12: "최근10~50회 1등 유사패턴 기반(선택)",
  13: "번호별 상승 연관번호 포함 기반",
  14: "번호별 역상승 연관번호 제외 기반",
  15: "사주 별자리 이름 음양오행 기반",
};

// ✅ 옵션 모달 정보 (패턴별로 다른 옵션값들)
const OPTION_MODAL_INFO = {
  1: { type: "recent_count", options: [5, 10, 20, 30, 40, 50] },
  2: { type: "recent_count", options: [5, 10, 20, 30, 40, 50] },
  3: { type: "recent_count", options: [5, 10, 20, 30, 40, 50] },
  4: { type: "consecutive_count", options: [2, 3, 4] },
  5: { type: "odd_even_ratio", options: ["1:5", "2:4", "3:3", "4:2", "5:1"] },
  6: { type: "high_low_count", options: ["고수1", "고수2", "고수3", "저수1", "저수2", "저수3"] },
  7: { type: "sum_range", options: [100, 110, 120, 130, 140, 150, 160, 170, 180] },
  8: { type: "diverse_count", options: [2, 3, 4, 5, 6] },
  9: { type: "zone_count", options: [2, 3, 4, 5, 6] },
  12: { type: "recent_count", options: [10, 20, 30, 40, 50] },
  15: { type: "birth_info", options: null },
};

// ✅ 로또공 컴포넌트 (당첨확인 파일과 동일한 색상 적용)

export default function PCombiOptionCompose() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 패턴 선택 상태
  const [selectedPattern1, setSelectedPattern1] = useState<number | null>(null);
  const [selectedPattern2, setSelectedPattern2] = useState<number | null>(null);
  const [selectedPattern3, setSelectedPattern3] = useState<number | null>(null);
  const [pattern3Excluded, setPattern3Excluded] = useState<boolean>(false);
  
  // ✅ 드롭다운 표시 상태
  const [showDropdown1, setShowDropdown1] = useState<boolean>(false);
  const [showDropdown2, setShowDropdown2] = useState<boolean>(false);
  const [showDropdown3, setShowDropdown3] = useState<boolean>(false);
  
  // ✅ 옵션 모달 상태
  const [showOptionModal, setShowOptionModal] = useState<boolean>(false);
  const [currentOptionPattern, setCurrentOptionPattern] = useState<number | null>(null);
  
  // ✅ 패턴별 선택된 옵션 값들
  const [patternOptions, setPatternOptions] = useState<{[key: number]: any}>({});
  
  // ✅ 패턴 15번 생년월일/이름 상태
  const [birthDate, setBirthDate] = useState<string>("");
  const [koreanName, setKoreanName] = useState<string>("");
  const [calendarType, setCalendarType] = useState<"solar" | "lunar" | null>(null);
  
  // ✅ 패턴 6번 전용 상태
  const [pattern6HighCount, setPattern6HighCount] = useState<number | null>(null);
  const [pattern6LowCount, setPattern6LowCount] = useState<number | null>(null);
  
  // ✅ 패턴 7번 범위 상태
  const [selectedPattern7Range, setSelectedPattern7Range] = useState<{start: number, end: number}>({start: 120, end: 170});
  
  // ✅ 포함/제외 번호 상태
  const [includeNumbers, setIncludeNumbers] = useState<string[]>(["", "", ""]);
  const [excludeNumbers, setExcludeNumbers] = useState<string[]>(["", "", ""]);
  
  // ✅ 생성된 번호 상태
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  
  // ✅ 광고 모달 상태
  const [showAdModal, setShowAdModal] = useState<boolean>(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string>("");
  
  // ✅ 번호 생성 완료 모달 상태
  const [showGenerationModal, setShowGenerationModal] = useState<boolean>(false);

  // ✅ 키보드 높이 상태 (직접 키보드 이벤트 처리)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  // ✅ 키보드 이벤트 리스너 설정
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // ✅ 패턴별 선택된 옵션을 문자열로 변환 (함수들을 맨 위로 이동)
  const getOptionDisplayText = useCallback((patternId: number) => {
    const option = patternOptions[patternId];
    if (!option) return '';
    
    // 패턴 15번: 생년월일 정보
    if (typeof option === 'object' && option.birth_date) {
      return `(${option.birth_date}, ${option.korean_name}, ${option.calendar_type === 'solar' ? '양력' : '음력'})`;
    }
    
    // 패턴 6번: 고수/저수 정보
    if (typeof option === 'object' && option.high_count && option.low_count) {
      return `(고수 ${option.high_count}개, 저수 ${option.low_count}개)`;
    }
    
    // 패턴 7번: 범위 정보
    if (typeof option === 'object' && option.min && option.max) {
      return `(${option.min}~${option.max})`;
    }
    
    // 기타 패턴들
    return `(선택: ${option})`;
  }, [patternOptions]);

  // ✅ 선택된 패턴 개수 확인
  const getSelectedPatternCount = useCallback(() => {
    const patterns = [selectedPattern1, selectedPattern2, selectedPattern3].filter(p => p !== null);
    return pattern3Excluded && selectedPattern3 ? patterns.length - 1 : patterns.length;
  }, [selectedPattern1, selectedPattern2, selectedPattern3, pattern3Excluded]);

  // ✅ my 버튼 - 보상형 광고 후 PMyPage 이동
  const handleMyPress = useCallback(() => {
    console.log("보상형 광고 시청 후 마이페이지로 이동");
    setAdCompletionAction('navigateToMyPage');
    setShowAdModal(true);
  }, []);

  // ✅ 이전 버튼 - PCombiHome 이동
  const handlePrevPress = useCallback(() => {
    console.log("조합 홈으로 이동");
    navigation.navigate("PCombiHome");
  }, [navigation]);

  // ✅ 보상형 광고 완료 처리
  const handleAdComplete = useCallback(() => {
    setShowAdModal(false);
    
    switch (adCompletionAction) {
      case 'navigateToMyPage':
        console.log("광고 시청 완료 - 마이페이지로 이동");
        navigation.navigate("PMyPage");
        break;
      default:
        break;
    }
    
    setAdCompletionAction("");
  }, [adCompletionAction, navigation]);

  // ✅ 패턴 선택 처리 (옵션 모달 체크)
  const handlePatternSelect = useCallback((patternId: number, dropdownIndex: number) => {
    // 패턴 6번 선택시 이전 선택 상태 초기화
    if (patternId === 6) {
      setPattern6HighCount(null);
      setPattern6LowCount(null);
    }
    
    // 옵션이 필요한 패턴인지 확인
    if (OPTION_MODAL_INFO[patternId as keyof typeof OPTION_MODAL_INFO]) {
      setCurrentOptionPattern(patternId);
      setShowOptionModal(true);
    }
    
    switch (dropdownIndex) {
      case 1:
        setSelectedPattern1(patternId);
        setShowDropdown1(false);
        break;
      case 2:
        setSelectedPattern2(patternId);
        setShowDropdown2(false);
        break;
      case 3:
        setSelectedPattern3(patternId);
        setShowDropdown3(false);
        break;
    }
  }, []);

  // ✅ 옵션 모달에서 값 선택 완료
  const handleOptionSelect = useCallback((selectedValue: any) => {
    console.log("handleOptionSelect 호출됨:", selectedValue, "패턴:", currentOptionPattern);
    
    if (currentOptionPattern) {
      // 패턴 15번의 경우 생년월일/이름 정보를 패턴 옵션에 저장
      if (currentOptionPattern === 15 && birthDate && koreanName && calendarType) {
        setPatternOptions(prev => ({
          ...prev,
          [currentOptionPattern]: {
            birth_date: birthDate,
            korean_name: koreanName,
            calendar_type: calendarType
          }
        }));
      } else {
        setPatternOptions(prev => ({
          ...prev,
          [currentOptionPattern]: selectedValue
        }));
      }
    }
    setShowOptionModal(false);
    setCurrentOptionPattern(null);
  }, [currentOptionPattern, birthDate, koreanName, calendarType]);

  // ✅ 패턴 3 제외 체크박스 토글
  const handlePattern3ExcludeToggle = useCallback(() => {
    setPattern3Excluded(prev => !prev);
  }, []);

  // ✅ 포함번호 입력 처리 (1-45 범위 검증)
  const handleIncludeNumberChange = useCallback((text: string, index: number) => {
    const number = parseInt(text);
    if (text === "" || (number >= 1 && number <= 45)) {
      const newNumbers = [...includeNumbers];
      newNumbers[index] = text;
      setIncludeNumbers(newNumbers);
    }
  }, [includeNumbers]);

  // ✅ 제외번호 입력 처리 (1-45 범위 검증)
  const handleExcludeNumberChange = useCallback((text: string, index: number) => {
    const number = parseInt(text);
    if (text === "" || (number >= 1 && number <= 45)) {
      const newNumbers = [...excludeNumbers];
      newNumbers[index] = text;
      setExcludeNumbers(newNumbers);
    }
  }, [excludeNumbers]);

  // ✅ 패턴 7 구간 점 선택 함수
  const handleRangePointPress = useCallback((value: number) => {
    setSelectedPattern7Range(prev => {
      // 첫 번째 클릭이거나 같은 값 클릭시 시작점으로 설정
      if (prev.start === 120 && prev.end === 170) {
        return {start: value, end: value};
      }
      
      // 이미 시작점이 설정된 경우
      if (prev.start === prev.end) {
        if (value < prev.start) {
          return {start: value, end: prev.start};
        } else {
          return {start: prev.start, end: value};
        }
      }
      
      // 시작점과 끝점이 모두 설정된 경우 새로 시작
      return {start: value, end: value};
    });
  }, []);

  // ✅ 합성 조합 번호 생성 버튼
  const handleGenerateNumbers = useCallback(async () => {
    // 최소 2개 패턴 선택 확인
    const selectedPatterns = [selectedPattern1, selectedPattern2, selectedPattern3].filter(p => p !== null);
    if (selectedPatterns.length < 2) {
      Alert.alert("알림", "최소 2개 이상의 패턴을 선택해주세요.");
      return;
    }

    // 먼저 생성 완료 모달 표시
    setShowGenerationModal(true);
  }, [selectedPattern1, selectedPattern2, selectedPattern3]);

  // ✅ 생성 완료 모달 확인 후 실제 번호 생성
  const handleGenerationConfirm = useCallback(async () => {
    setShowGenerationModal(false);

    // 패턴 3이 제외되었다면 제거
    const selectedPatterns = [selectedPattern1, selectedPattern2, selectedPattern3].filter(p => p !== null);
    const finalPatterns = pattern3Excluded && selectedPattern3 ? 
      [selectedPattern1, selectedPattern2].filter(p => p !== null) : 
      selectedPatterns;

    // 포함/제외 번호 처리
    const includeNums = includeNumbers.filter(n => n.trim() !== "").map(n => parseInt(n));
    const excludeNums = excludeNumbers.filter(n => n.trim() !== "").map(n => parseInt(n));

    try {
      // ✅ 백엔드 API 호출 - 옵션형 패턴 합성 조합
      const response = await fetch('/api/option-patterns/compose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pattern_ids: finalPatterns,
          include_numbers: includeNums,
          exclude_numbers: excludeNums,
          filter_kwargs: patternOptions,
          user_id: null, // 임시로 null, 추후 로그인 정보 연동
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedNums = data.numbers || [];
        
        if (generatedNums.length === 6) {
          setGeneratedNumbers(generatedNums);
          console.log("생성된 번호:", generatedNums);
          console.log("사용된 패턴:", finalPatterns);
          console.log("패턴 옵션:", patternOptions);
          console.log("포함번호:", includeNums);
          console.log("제외번호:", excludeNums);
        } else {
          Alert.alert("알림", "조건에 맞는 번호를 생성할 수 없습니다. 다른 조건을 시도해보세요.");
        }
      } else {
        const errorData = await response.json();
        Alert.alert("오류", errorData.detail || "번호 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("번호 생성 오류:", error);
      Alert.alert("오류", "서버와의 연결에 문제가 발생했습니다.");
    }
  }, [selectedPattern1, selectedPattern2, selectedPattern3, pattern3Excluded, includeNumbers, excludeNumbers, patternOptions]);

  // ✅ 나만의 조합 저장하기
  const handleSavePress = useCallback(() => {
    if (generatedNumbers.length === 0) {
      Alert.alert("알림", "먼저 번호를 생성해주세요.");
      return;
    }
    // TODO: 저장 모달 구현
    Alert.alert("알림", "조합 저장 기능은 준비중입니다.");
  }, [generatedNumbers]);

  // ✅ 이동 버튼 (PMCombiSaveCard로 수정)
  const handleMovePress = useCallback(() => {
    console.log("저장된 조합 페이지로 이동");
    navigation.navigate("PCombiHome");
  }, [navigation]);

  // ✅ 모달 닫기 처리 (패턴 6번, 7번 상태 초기화)
  const handleCloseModal = useCallback(() => {
    setShowOptionModal(false);
    setCurrentOptionPattern(null);
    // 패턴 6번 상태 초기화
    setPattern6HighCount(null);
    setPattern6LowCount(null);
    // 패턴 7번 상태 초기화
    setSelectedPattern7Range({start: 120, end: 170});
  }, []);

  // ✅ 옵션 모달 렌더링 (실제 이미지 사용 + 클릭 가능한 버튼 오버레이)
  const renderOptionModal = () => {
    if (!showOptionModal || !currentOptionPattern) return null;

    // 패턴별 모달 이미지 매핑
    const getModalImageSource = (patternNumber: number) => {
      switch(patternNumber) {
        case 1: return require("../../../../assets/images/p_member/modals/option_pattern1_modal.png");
        case 2: return require("../../../../assets/images/p_member/modals/option_pattern2_modal.png");
        case 3: return require("../../../../assets/images/p_member/modals/option_pattern3_modal.png");
        case 4: return require("../../../../assets/images/p_member/modals/option_pattern4_modal.png");
        case 5: return require("../../../../assets/images/p_member/modals/option_pattern5_modal.png");
        case 6: return require("../../../../assets/images/p_member/modals/option_pattern6_modal.png");
        case 7: return require("../../../../assets/images/p_member/modals/option_pattern7_modal.png");
        case 8: return require("../../../../assets/images/p_member/modals/option_pattern8_modal.png");
        case 9: return require("../../../../assets/images/p_member/modals/option_pattern9_modal.png");
        case 12: return require("../../../../assets/images/p_member/modals/option_pattern12_modal.png");
        case 15: return require("../../../../assets/images/p_member/modals/option_pattern15_modal.png");
        default: return null;
      }
    };

    const modalImageSource = getModalImageSource(currentOptionPattern);
    if (!modalImageSource) return null;

    // 패턴별 옵션 버튼 클릭 영역 렌더링
    const renderOptionButtons = () => {
      const optionInfo = OPTION_MODAL_INFO[currentOptionPattern as keyof typeof OPTION_MODAL_INFO];
      if (!optionInfo) return null;

      // 패턴 15번의 경우 별도 처리 (생년월일/이름 입력) - 키보드 직접 처리
      if (currentOptionPattern === 15) {
        return (
          <View style={styles.pattern15InputContainer}>
            <ScrollView 
              contentContainerStyle={[
                styles.pattern15ScrollContainer,
                { 
                  paddingBottom: keyboardHeight > 0 ? keyboardHeight + 50 : 200,
                  marginTop: keyboardHeight > 0 ? -keyboardHeight * 0.5 : 0
                }
              ]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* 모달 상단 여백 */}
              <View style={{ height: (width * 0.9) / 1000 * 610 }} />
              
              {/* 생년월일 입력 */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.pattern15Input, {
                    width: (width * 0.9) / 1000 * 960,
                    height: (width * 0.9) / 1000 * 165,
                    marginHorizontal: (width * 0.9) / 1000 * 65,
                  }]}
                  value={birthDate}
                  onChangeText={setBirthDate}
                  placeholder="19901225"
                  keyboardType="numeric"
                  maxLength={8}
                  returnKeyType="next"
                />
              </View>
              
              {/* 입력창 간 간격 */}
              <View style={{ height: (width * 0.9) / 1000 * 115 }} />
              
              {/* 이름 입력 */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.pattern15Input, {
                    width: (width * 0.9) / 1000 * 960,
                    height: (width * 0.9) / 1000 * 165,
                    marginHorizontal: (width * 0.9) / 1000 * 65,
                  }]}
                  value={koreanName}
                  onChangeText={setKoreanName}
                  placeholder="홍길동"
                  maxLength={10}
                  returnKeyType="done"
                />
              </View>
              
              {/* 체크박스까지 간격 */}
              <View style={{ height: (width * 0.9) / 1000 * 210 }} />
              
              {/* 양력/음력 체크박스 */}
              <View style={styles.checkboxContainer}>
                {/* 양력 체크박스 */}
                <TouchableOpacity
                  style={[styles.calendarButton, {
                    width: (width * 0.9) / 1000 * 110,
                    height: (width * 0.9) / 1000 * 110,
                    marginLeft: (width * 0.9) / 1000 * 360,
                  }]}
                  onPress={() => setCalendarType('solar')}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, {
                    backgroundColor: calendarType === 'solar' ? '#1601FF' : '#fff',
                  }]}>
                    {calendarType === 'solar' && (
                      <Text style={styles.checkMark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
                
                {/* 음력 체크박스 */}
                <TouchableOpacity
                  style={[styles.calendarButton, {
                    width: (width * 0.9) / 1000 * 110,
                    height: (width * 0.9) / 1000 * 110,
                    marginLeft: (width * 0.9) / 1000 * 880,
                  }]}
                  onPress={() => setCalendarType('lunar')}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, {
                    backgroundColor: calendarType === 'lunar' ? '#FF0000' : '#fff',
                  }]}>
                    {calendarType === 'lunar' && (
                      <Text style={styles.checkMark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              
              {/* 저장 버튼까지 간격 */}
              <View style={{ height: (width * 0.9) / 1000 * 115 }} />
              
              {/* 저장 버튼 */}
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  style={[styles.confirmButton, {
                    width: (width * 0.9) / 1000 * 255,
                    height: (width * 0.9) / 1000 * 135,
                    marginLeft: (width * 0.9) / 1000 * 150,
                  }]}
                  onPress={() => {
                    if (birthDate.length === 8 && koreanName.length >= 2 && calendarType) {
                      handleOptionSelect({
                        birth_date: birthDate,
                        korean_name: koreanName,
                        calendar_type: calendarType
                      });
                    } else {
                      Alert.alert("알림", "모든 정보를 정확히 입력해주세요.");
                    }
                  }}
                  activeOpacity={0.7}
                />
              </View>
            </ScrollView>
          </View>
        );
      }

      // 기타 패턴들의 옵션 버튼들 (피그마 좌표 기준 정확한 위치)
      return (
        <View style={styles.optionButtonsContainer}>
          {optionInfo.options && optionInfo.options.map((option, index) => {
            let buttonTop, buttonLeft, buttonWidth, buttonHeight;

            // 패턴별 정확한 버튼 위치 설정 (피그마 좌표 기준)
            if (currentOptionPattern === 1 || currentOptionPattern === 2 || currentOptionPattern === 3) {
              // 6개 버튼 2줄 3열 배치 (패턴 1,2,3)
              const modalHeight = 600;
              const buttonsStartY = 870; // 피그마에서 버튼 시작 Y 좌표
              buttonWidth = 120;
              buttonHeight = 120;
              buttonLeft = 107 + (index % 6) * (buttonWidth + 32); // 가로 간격 25px
              buttonTop = buttonsStartY;
              
              // 1000px 모달 너비 기준으로 스케일링
              const modalScale = (width * 0.9) / 1000;
              buttonTop *= modalScale;
              buttonLeft *= modalScale;
              buttonWidth *= modalScale;
              buttonHeight *= modalScale;
              
            } else if (currentOptionPattern === 4) {
              // 3개 버튼 1줄 배치 (패턴 4)
              const modalHeight = 600;
              const buttonsStartY = 870;
              buttonWidth = 120;
              buttonHeight = 120;
              buttonLeft = 225 + index * (buttonWidth + 143); // gap 131px
              buttonTop = buttonsStartY;
              
              const modalScale = (width * 0.9) / 1000;
              buttonTop *= modalScale;
              buttonLeft *= modalScale;
              buttonWidth *= modalScale;
              buttonHeight *= modalScale;
              
            } else if (currentOptionPattern === 5) {
              // 5개 버튼 1줄 배치 (패턴 5: 홀짝 비율)
              const modalHeight = 600;
              const buttonsStartY = 870;
              buttonWidth = 120;
              buttonHeight = 120;
              buttonLeft = 125 + index * (buttonWidth + 62); // gap 55px
              buttonTop = buttonsStartY;
              
              const modalScale = (width * 0.9) / 1000;
              buttonTop *= modalScale;
              buttonLeft *= modalScale;
              buttonWidth *= modalScale;
              buttonHeight *= modalScale;
              
            } else if (currentOptionPattern === 6) {
              // 6개 버튼 2그룹 배치 (고수/저수 각 3개)
              const modalHeight = 700;
              const buttonsStartY = 800;
              buttonWidth = 120;
              buttonHeight = 120;
              
              if (index < 3) {
                // 고수 그룹 (왼쪽)
                buttonLeft = 100 + index * (buttonWidth + 30);
              } else {
                // 저수 그룹 (오른쪽) 
                buttonLeft = 600 + (index - 3) * (buttonWidth + 30);
              }
              buttonTop = buttonsStartY + 100; // 고수/저수 라벨 아래
              
              const modalScale = (width * 0.9) / 1000;
              buttonTop *= modalScale;
              buttonLeft *= modalScale;
              buttonWidth *= modalScale;
              buttonHeight *= modalScale;
              
            } else if (currentOptionPattern === 7) {
              // 패턴 7번: 이미지와 동일한 9개 점 + 현재선택 텍스트
              return (
                <View style={styles.optionButtonsContainer}>
                  {/* 9개 동그라미 점들 */}
                  {[100, 110, 120, 130, 140, 150, 160, 170, 180].map((value, index) => (
                    <TouchableOpacity
                      key={value}
                      style={{
                        position: 'absolute',
                        top: (width * 0.9) / 1000 * 810,
                        left: (width * 0.9) / 1000 * (185 + index * 85),
                        width: (width * 0.9) / 1000 * 60,
                        height: (width * 0.9) / 1000 * 60,
                        backgroundColor: 
                          selectedPattern7Range.start === value ? '#0066FF' : 
                          selectedPattern7Range.end === value ? '#FF0000' : '#666666',
                        borderRadius: (width * 0.9) / 1000 * 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleRangePointPress(value)}
                      activeOpacity={0.7}
                    />
                  ))}

                  {/* 점 아래 숫자들 */}
                  {[100, 110, 120, 130, 140, 150, 160, 170, 180].map((value, index) => (
                    <Text
                      key={`text-${value}`}
                      style={{
                        position: 'absolute',
                        top: (width * 0.9) / 1000 * 480,
                        left: (width * 0.9) / 1000 * (65 + index * 93),
                        width: (width * 0.9) / 1000 * 90,
                        fontSize: (width * 0.9) / 1000 * 32,
                        fontWeight: 'bold',
                        color: '#000',
                        textAlign: 'center',
                      }}
                    >
                      {value}
                    </Text>
                  ))}

                  {/* 현재선택 텍스트 - 흰 배경 위에 */}
                  <View style={{
                    position: 'absolute',
                    top: (width * 0.9) / 1000 * 970,
                    left: (width * 0.9) / 1000 * 250,
                    width: (width * 0.9) / 1000 * 600,
                    height: (width * 0.9) / 1000 * 100,
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: (width * 0.9) / 1000 * 48,
                      fontWeight: 'bold',
                      color: '#000',
                      textAlign: 'center',
                    }}>
                      현재선택: {selectedPattern7Range.start} ~ {selectedPattern7Range.end}
                    </Text>
                  </View>
                  
                  {/* 확인 버튼 */}
                  <TouchableOpacity
                    style={[styles.optionModalButton, {
                      top: (width * 0.9) / 1000 * 1140,
                      left: (width * 0.9) / 1000 * 155,
                      width: (width * 0.9) / 1000 * 260,
                      height: (width * 0.9) / 1000 * 130,
                      backgroundColor: (selectedPattern7Range.start !== selectedPattern7Range.end) ? '#00FF00' : 'transparent'
                    }]}
                    onPress={() => {
                      if (selectedPattern7Range.start !== selectedPattern7Range.end) {
                        handleOptionSelect({
                          min: selectedPattern7Range.start,
                          max: selectedPattern7Range.end
                        });
                        setSelectedPattern7Range({start: 120, end: 170});
                      } else {
                        Alert.alert("알림", "범위를 선택해주세요.");
                      }
                    }}
                    activeOpacity={0.7}
                  />
                </View>
              );
              
            } else if (currentOptionPattern === 8 || currentOptionPattern === 9 || currentOptionPattern === 12) {
              // 5개 버튼 1줄 배치 (패턴 8,9,12)
              const modalHeight = 600;
              const buttonsStartY = 855;
              buttonWidth = 130;
              buttonHeight = 130;
              buttonLeft = 165 + index * (buttonWidth + 35); // gap 38px
              buttonTop = buttonsStartY;
              
              const modalScale = (width * 0.9) / 1000;
              buttonTop *= modalScale;
              buttonLeft *= modalScale;
              buttonWidth *= modalScale;
              buttonHeight *= modalScale;
              
            } else {
              // 기본값
              buttonWidth = 120;
              buttonHeight = 120;
              buttonLeft = 100 + index * 150;
              buttonTop = 300;
              
              const modalScale = (width * 0.9) / 1000;
              buttonTop *= modalScale;
              buttonLeft *= modalScale;
              buttonWidth *= modalScale;
              buttonHeight *= modalScale;
            }
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.optionModalButton, {
                  top: buttonTop,
                  left: buttonLeft,
                  width: buttonWidth,
                  height: buttonHeight,
                  // 패턴 6번 선택 상태 표시
                  backgroundColor: currentOptionPattern === 6 ? 
                    (index < 3 && pattern6HighCount === (index + 1)) ? '#DDFF00' :
                    (index >= 3 && pattern6LowCount === (index - 2)) ? '#DDFF00' : 
                    'transparent' : 'transparent'
                }]}
                onPress={() => {
                  console.log(`패턴 ${currentOptionPattern}, 인덱스 ${index}, 옵션 ${option}`);
                  
                  if (currentOptionPattern === 6) {
                    // 패턴 6번은 2개 선택이 필요하므로 바로 닫지 않음
                    if (index < 3) {
                      setPattern6HighCount(index + 1);
                      console.log(`고수 ${index + 1} 선택됨`);
                    } else {
                      setPattern6LowCount(index - 2);
                      console.log(`저수 ${index - 2} 선택됨`);
                    }
                    // 모달을 열어둠 (handleOptionSelect 호출 안 함)
                  } else {
                    // 다른 패턴들은 바로 선택 완료
                    handleOptionSelect(option);
                  }
                }}
                activeOpacity={0.7}
              />
            );
          })}
          
          {/* 패턴 6번 전용 확인 버튼 */}
          {currentOptionPattern === 6 && (
            <TouchableOpacity
              style={[styles.optionModalButton, {
                top: (width * 0.9) / 1000 * 1070,
                left: (width * 0.9) / 1000 * 155,
                width: (width * 0.9) / 1000 * 280,
                height: (width * 0.9) / 1000 * 140,
                backgroundColor: (pattern6HighCount && pattern6LowCount) ? '#00FF00' : 'transparent'
              }]}
              onPress={() => {
                if (pattern6HighCount && pattern6LowCount) {
                  console.log(`패턴 6번 확인: 고수 ${pattern6HighCount}, 저수 ${pattern6LowCount}`);
                  handleOptionSelect({
                    high_count: pattern6HighCount,
                    low_count: pattern6LowCount
                  });
                  // 상태 초기화
                  setPattern6HighCount(null);
                  setPattern6LowCount(null);
                } else {
                  Alert.alert("알림", "고수와 저수를 모두 선택해주세요.");
                }
              }}
              activeOpacity={0.7}
            />
          )}

          {/* 패턴 6번, 15번이 아닌 경우의 저장 버튼 */}
          {currentOptionPattern !== 15 && currentOptionPattern !== 6 && currentOptionPattern !== 7 && (
            <TouchableOpacity
              style={[styles.optionModalButton, {
                top: (width * 0.9) / 1000 * 1050,
                left: (width * 0.9) / 1000 * 150,
                width: (width * 0.9) / 1000 * 260,
                height: (width * 0.9) / 1000 * 140,
              }]}
              onPress={() => {
                if (optionInfo.options && optionInfo.options.length > 0) {
                  handleOptionSelect(optionInfo.options[0]);
                } else {
                  handleOptionSelect(null);
                }
              }}
              activeOpacity={0.7}
            />
          )}
        </View>
      );
    };

    return (
      <Modal
        visible={showOptionModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          {/* 모달 배경 이미지 */}
          <Image
            source={modalImageSource}
            style={styles.optionModalImage}
            resizeMode="contain"
          />
          
          {/* 클릭 가능한 버튼들 오버레이 */}
          {renderOptionButtons()}
          
          {/* 닫기 버튼 (모든 모달 공통) */}
          <TouchableOpacity
            style={[styles.closeModalButton, {
              top: currentOptionPattern === 15 ? 
                (width * 0.9) / 1000 * 1383 : // 패턴 15는 모달이 길어서 아래쪽
                (width * 0.9) / 1000 * 1050,
              left: (width * 0.9) / 1000 * 815,
              width: (width * 0.9) / 1000 * 140,
              height: (width * 0.9) / 1000 * 140,
            }]}
            onPress={handleCloseModal}
            activeOpacity={0.7}
          />
        </View>
      </Modal>
    );
  };

  // ✅ 드롭다운 렌더링
  const renderDropdown = (dropdownIndex: number, selectedPattern: number | null, showDropdown: boolean) => {
    if (!showDropdown) return null;

    return (
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          switch (dropdownIndex) {
            case 1: setShowDropdown1(false); break;
            case 2: setShowDropdown2(false); break;
            case 3: setShowDropdown3(false); break;
          }
        }}
      >
        <TouchableOpacity 
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => {
            switch (dropdownIndex) {
              case 1: setShowDropdown1(false); break;
              case 2: setShowDropdown2(false); break;
              case 3: setShowDropdown3(false); break;
            }
          }}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScrollView}>
              {Object.entries(OPTION_PATTERN_DATA).map(([id, name]) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.dropdownItem,
                    selectedPattern === parseInt(id) && styles.selectedDropdownItem
                  ]}
                  onPress={() => handlePatternSelect(parseInt(id), dropdownIndex)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedPattern === parseInt(id) && styles.selectedDropdownItemText
                  ]}>
                    {id}. {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 (옵션형 합성 조합 전용 이미지 필요) 
      <Image
        source={require("../../../../assets/images/p_member/combination/p_my_combination_option_compose.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ my 버튼 (x10, y10, w200, h80) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (10 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleMyPress}
        activeOpacity={0.7}
      />

      {/* ✅ 이전 버튼 (x878, y10, w200, h80) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (878 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴 선택 1 드롭다운 (x73, y420, w646, h106) */}
      <TouchableOpacity
        style={[styles.dropdownButton, {
          top: (445 / DESIGN_HEIGHT) * height,
          left: (63 / DESIGN_WIDTH) * width,
          width: (655 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => setShowDropdown1(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPattern1 ? `${selectedPattern1}. ${OPTION_PATTERN_DATA[selectedPattern1 as keyof typeof OPTION_PATTERN_DATA]}` : "패턴 선택            🔽"}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 1 설명 (x73, y536, w946, h56) */}
      <View style={[styles.descriptionArea, {
        top: (555 / DESIGN_HEIGHT) * height,
        left: (70 / DESIGN_WIDTH) * width,
        width: (946 / DESIGN_WIDTH) * width,
        height: (56 / DESIGN_HEIGHT) * height,
      }]}>
        <Text style={styles.descriptionText}>
          {selectedPattern1 ? `${OPTION_PATTERN_DATA[selectedPattern1 as keyof typeof OPTION_PATTERN_DATA]} ${getOptionDisplayText(selectedPattern1)}` : "패턴 설명 1"}
        </Text>
      </View>

      {/* ✅ 패턴 선택 2 드롭다운 (x73, y618, w646, h106) */}
      <TouchableOpacity
        style={[styles.dropdownButton, {
          top: (625 / DESIGN_HEIGHT) * height,
          left: (63 / DESIGN_WIDTH) * width,
          width: (655 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => setShowDropdown2(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPattern2 ? `${selectedPattern2}. ${OPTION_PATTERN_DATA[selectedPattern2 as keyof typeof OPTION_PATTERN_DATA]}` : "패턴 선택            🔽"}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 2 설명 (x73, y734, w946, h56) */}
      <View style={[styles.descriptionArea, {
        top: (735 / DESIGN_HEIGHT) * height,
        left: (70 / DESIGN_WIDTH) * width,
        width: (946 / DESIGN_WIDTH) * width,
        height: (56 / DESIGN_HEIGHT) * height,
      }]}>
        <Text style={styles.descriptionText}>
          {selectedPattern2 ? `${OPTION_PATTERN_DATA[selectedPattern2 as keyof typeof OPTION_PATTERN_DATA]} ${getOptionDisplayText(selectedPattern2)}` : "패턴 설명 2"}
        </Text>
      </View>

      {/* ✅ 패턴 선택 3 드롭다운 (x70, y813, w646, h106) */}
      <TouchableOpacity
        style={[styles.dropdownButton, {
          top: (818 / DESIGN_HEIGHT) * height,
          left: (63 / DESIGN_WIDTH) * width,
          width: (655 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={() => setShowDropdown3(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedPattern3 ? `${selectedPattern3}. ${OPTION_PATTERN_DATA[selectedPattern3 as keyof typeof OPTION_PATTERN_DATA]}` : "패턴 선택            🔽"}
        </Text>
      </TouchableOpacity>

      {/* ✅ 패턴 3 제외 체크박스 (x820, y835, w80, h60) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (835 / DESIGN_HEIGHT) * height,
          left: (787 / DESIGN_WIDTH) * width,
          width: (80 / DESIGN_WIDTH) * width,
          height: (80 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handlePattern3ExcludeToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, pattern3Excluded && styles.checkedCheckbox]}>
          {pattern3Excluded && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* ✅ 패턴 3 설명 (x70, y929, w946, h56) */}
      <View style={[styles.descriptionArea, {
        top: (929 / DESIGN_HEIGHT) * height,
        left: (70 / DESIGN_WIDTH) * width,
        width: (946 / DESIGN_WIDTH) * width,
        height: (56 / DESIGN_HEIGHT) * height,
      }]}>
        <Text style={styles.descriptionText}>
          {selectedPattern3 ? `${OPTION_PATTERN_DATA[selectedPattern3 as keyof typeof OPTION_PATTERN_DATA]} ${getOptionDisplayText(selectedPattern3)}` : "패턴 설명 3"}
        </Text>
      </View>

      {/* ✅ 포함번호 입력창들 (x24, y1174, 3개) */}
      {[0, 1, 2].map((index) => (
        <TextInput
          key={`include-${index}`}
          style={[styles.numberInput, {
            top: (1150 / DESIGN_HEIGHT) * height,
            left: ((24 + index * 170) / DESIGN_WIDTH) * width,
            width: (160 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
          }]}
          value={includeNumbers[index]}
          onChangeText={(text) => handleIncludeNumberChange(text, index)}
          placeholder="입력"
          keyboardType="numeric"
          maxLength={2}
          textAlign="center"
          textAlignVertical="bottom"
          multiline={false}
        />
      ))}

      {/* ✅ 제외번호 입력창들 (x544, y1174, 3개) */}
      {[0, 1, 2].map((index) => (
        <TextInput
          key={`exclude-${index}`}
          style={[styles.numberInput, {
            top: (1150 / DESIGN_HEIGHT) * height,
            left: ((570 + index * 170) / DESIGN_WIDTH) * width,
            width: (160 / DESIGN_WIDTH) * width,
            height: (100 / DESIGN_HEIGHT) * height,
          }]}
          value={excludeNumbers[index]}
          onChangeText={(text) => handleExcludeNumberChange(text, index)}
          placeholder="입력"
          keyboardType="numeric"
          maxLength={2}
          textAlign="center"
          textAlignVertical="bottom"
          multiline={false}
        />
      ))}

      {/* ✅ 합성 조합 번호 생성 버튼 (x62, y1368, w968, h164) */}
      <TouchableOpacity
        style={[styles.generateButton, {
          top: (1325 / DESIGN_HEIGHT) * height,
          left: (62 / DESIGN_WIDTH) * width,
          width: (968 / DESIGN_WIDTH) * width,
          height: (164 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleGenerateNumbers}
        activeOpacity={0.7}
      />

      {/* ✅ 생성된 로또공 6개 표시 (x55, y1573) */}
      {generatedNumbers.length > 0 && (
        <View style={[styles.lottoNumbersContainer, {
          top: (1573 / DESIGN_HEIGHT) * height,
          left: (55 / DESIGN_WIDTH) * width,
        }]}>
          {generatedNumbers.map((number, index) => (
            <LottoBall 
              key={index} 
              number={number} 
              size={(120 / DESIGN_WIDTH) * width}
              fontSize={(64 / DESIGN_HEIGHT) * height}
            />
          ))}
        </View>
      )}

      {/* ✅ 이동 버튼 (x806, y1749, w246, h102) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1670 / DESIGN_HEIGHT) * height,
          left: (780 / DESIGN_WIDTH) * width,
          width: (260 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleMovePress}
        activeOpacity={0.7}
      />

      {/* ✅ 드롭다운 모달들 */}
      {renderDropdown(1, selectedPattern1, showDropdown1)}
      {renderDropdown(2, selectedPattern2, showDropdown2)}
      {renderDropdown(3, selectedPattern3, showDropdown3)}

      {/* ✅ 옵션 선택 모달 */}
      {renderOptionModal()}

      {/* ✅ 번호 생성 완료 모달 */}
      {showGenerationModal && (
        <Modal
          visible={showGenerationModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowGenerationModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleGenerationConfirm}
          >
            <Image
              source={require("../../../../assets/images/p_member/modals/compose_retry_message_modal.png")}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}

      {/* ✅ 보상형 광고 모달 */}
      {showAdModal && (
        <AdPlaceholder
          onComplete={handleAdComplete}
          duration={15000}
          type="rewarded"
          canSkip={false}
        />
      )}
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
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownButton: {
    position: "absolute",
    backgroundColor: "#E6EDFF",
    borderRadius: (16 / DESIGN_WIDTH) * width,
    borderWidth: 3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#009DFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },

  dropdownButtonText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
  },

  descriptionArea: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: (12 / DESIGN_WIDTH) * width,
    justifyContent: "center",
    paddingLeft: (52 / DESIGN_WIDTH) * width,
  },

  descriptionText: {
    fontSize: (36 / DESIGN_HEIGHT) * height,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
  },

  checkbox: {
    width: (100 / DESIGN_WIDTH) * width,
    height: (100 / DESIGN_HEIGHT) * height,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  checkedCheckbox: {
    backgroundColor: "#FF0000",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: (70 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
  },

  checkMark: {
    color: "#FFFFFF",
    fontSize: (70 / DESIGN_HEIGHT) * height,
    fontWeight: "bold",
  },

  numberInput: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: (12 / DESIGN_WIDTH) * width,
    fontSize: (48 / DESIGN_HEIGHT) * height,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    letterSpacing: (0.1 / DESIGN_WIDTH) * width,
    paddingVertical: (20 / DESIGN_HEIGHT) * height,
  },

  generateButton: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: (24 / DESIGN_WIDTH) * width,
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ 생성된 로또공 컨테이너
  lottoNumbersContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: (30 / DESIGN_WIDTH) * width,
  },

  // ✅ 드롭다운 모달 스타일
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(113, 113, 113, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownContainer: {
    backgroundColor: "#FFF",
    borderRadius: (16 / DESIGN_WIDTH) * width,
    margin: (20 / DESIGN_WIDTH) * width,
    maxHeight: height * 0.6,
    width: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  dropdownScrollView: {
    maxHeight: height * 0.5,
  },

  dropdownItem: {
    padding: (15 / DESIGN_HEIGHT) * height,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  selectedDropdownItem: {
    backgroundColor: "#E6EDFF",
  },

  dropdownItemText: {
    fontSize: (40 / DESIGN_HEIGHT) * height,
    color: "#000",
    fontWeight: "500",
  },

  selectedDropdownItemText: {
    color: "#009DFF",
    fontWeight: "bold",
  },

  // ✅ 옵션 모달 스타일
  optionModalImage: {
    width: width * 0.9,
    maxWidth: 350,
    aspectRatio: 0.8,
  },

  optionButtonsContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  optionModalButton: {
    position: "absolute",
    backgroundColor: "transparent",
  },

  pattern15InputContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  pattern15ScrollContainer: {
    flexGrow: 1,
  },

  inputWrapper: {
    alignItems: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  saveButtonContainer: {
    alignItems: 'flex-start',
  },

  pattern15Input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: (8 / DESIGN_WIDTH) * width,
    fontSize: (72 / DESIGN_HEIGHT) * height,
    textAlign: "center",
    color: "#000",
  },

  calendarButton: {
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmButton: {
    position: "absolute",
    backgroundColor: "transparent",
  },

  closeModalButton: {
    position: "absolute",
    backgroundColor: "transparent",
  },

  // ✅ 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(113, 113, 113, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalImage: {
    width: width * 0.85,
    maxWidth: 400,
    aspectRatio: 1,
  },
});