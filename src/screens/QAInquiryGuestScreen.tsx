// ✅ 파일 위치: src/screens/QAInquiryGuestScreen.tsx
// 게스트용 Q&A 1:1 문의하기 화면
// 1092x1920 피그마 디자인 기준 반응형 구현

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

// ✅ 카테고리별 세부항목 데이터
const CATEGORY_OPTIONS = {
  "번호 생성 문의": ["패턴 생성 문의", "조합 생성 문의", "AI 추천 문의"],
  "기타 문의": ["계정/로그인 문의", "결제/회원 문의", "마이페이지/기타"]
};

export default function QAInquiryGuestScreen() {
  const navigation = useNavigation<any>();

  // ✅ 폼 상태
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("010");
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);

  // ✅ 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // ✅ 이전 버튼 클릭 - QA 메인으로 이동
  const handleBackPress = () => {
    navigation.navigate("QAMainGuest");
  };

  // ✅ 카테고리 선택
  const handleCategoryPress = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowSubCategoryDropdown(false);
  };

  // ✅ 세부항목 선택
  const handleSubCategoryPress = () => {
    if (selectedCategory) {
      setShowSubCategoryDropdown(!showSubCategoryDropdown);
      setShowCategoryDropdown(false);
    } else {
      Alert.alert("알림", "먼저 카테고리를 선택해주세요.");
    }
  };

  // ✅ 카테고리 선택 처리
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(""); // 세부항목 초기화
    setShowCategoryDropdown(false);
  };

  // ✅ 세부항목 선택 처리
  const selectSubCategory = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setShowSubCategoryDropdown(false);
  };

  // ✅ 파일 첨부
  const handleFileAttach = () => {
    Alert.alert("파일첨부", "파일첨부 기능 - 추후 구현");
  };

  // ✅ 이미지 첨부
  const handleImageAttach = () => {
    Alert.alert("이미지첨부", "이미지첨부 기능 - 추후 구현");
  };

  // ✅ 문의 보내기
  const handleSubmit = async () => {
    if (!selectedCategory || !selectedSubCategory || !subject.trim() || !content.trim() || !phoneNumber.trim()) {
      Alert.alert("알림", "모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const formData = {
        category: selectedCategory,
        subCategory: selectedSubCategory,
        subject: subject.trim(),
        content: content.trim(),
        phoneNumber: phoneNumber.trim(),
        attachedFiles,
        attachedImages
      };

      console.log("문의 내용:", formData);
     
      Alert.alert("문의 완료", "문의가 성공적으로 전송되었습니다.", [
        { text: "확인", onPress: () => navigation.navigate("QAMainGuest") }
      ]);
    } catch (error) {
      console.error("문의 전송 오류:", error);
      Alert.alert("오류", "문의 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../assets/images/pages/Q&A/Q&A_ask_guest.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* 찍 로고 버튼 */}
      <TouchableOpacity
        style={styles.logoButton}
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* 이전 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        activeOpacity={0.7}
      />

      {/* 카테고리 선택 버튼 - 연노랑 선택 상태 */}
      <TouchableOpacity
        style={[
          styles.dropdownButton, 
          styles.categoryButton,
          selectedCategory ? styles.selectedCategoryButton : null
        ]}
        onPress={handleCategoryPress}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dropdownText,
          selectedCategory ? styles.selectedCategoryText : null
        ]}>
          {selectedCategory || "카테고리 선택"}
        </Text>
        <Text style={styles.dropdownArrow}>🔽</Text>
      </TouchableOpacity>

      {/* 세부항목 선택 버튼 - 파란색 선택 상태 */}
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          styles.subCategoryButton,
          selectedSubCategory ? styles.selectedButton : null
        ]}
        onPress={handleSubCategoryPress}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dropdownText,
          selectedSubCategory ? styles.selectedText : null
        ]}>
          {selectedSubCategory || "세부항목 선택"}
        </Text>
        <Text style={styles.dropdownArrow}>🔽</Text>
      </TouchableOpacity>

      {/* 카테고리 드롭다운 */}
      {showCategoryDropdown && (
        <View style={[styles.dropdown, styles.categoryDropdown]}>
          {Object.keys(CATEGORY_OPTIONS).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.dropdownItem,
                selectedCategory === category ? styles.selectedDropdownItem : null
              ]}
              onPress={() => selectCategory(category)}
            >
              <Text style={[
                styles.dropdownItemText,
                selectedCategory === category ? styles.selectedDropdownItemText : null
              ]}>
                {category === "번호 생성 문의" ? "🔢" : "📁"} {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 세부항목 드롭다운 */}
      {showSubCategoryDropdown && selectedCategory && (
        <View style={[styles.dropdown, styles.subCategoryDropdown]}>
          {CATEGORY_OPTIONS[selectedCategory as keyof typeof CATEGORY_OPTIONS].map((subCategory) => {
            let icon = "▼";
            if (subCategory === "패턴 생성 문의") icon = "🔍";
            else if (subCategory === "조합 생성 문의") icon = "⚙️";
            else if (subCategory === "AI 추천 문의") icon = "🤖";
            else if (subCategory === "계정/로그인 문의") icon = "👤";
            else if (subCategory === "결제/회원 문의") icon = "💳";
            else if (subCategory === "마이페이지/기타") icon = "📋";
            
            return (
              <TouchableOpacity
                key={subCategory}
                style={[
                  styles.dropdownItem,
                  selectedSubCategory === subCategory ? styles.selectedDropdownItem : null
                ]}
                onPress={() => selectSubCategory(subCategory)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  selectedSubCategory === subCategory ? styles.selectedDropdownItemText : null
                ]}>
                  {icon} {subCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* 제목 입력창 */}
      <TextInput
        style={[styles.textInput, styles.subjectInput]}
        placeholder="제목 (필수)"
        placeholderTextColor="#999"
        value={subject}
        onChangeText={setSubject}
        maxLength={100}
      />

      {/* 문의 내용 입력창 */}
      <TextInput
        style={[styles.textInput, styles.contentInput]}
        placeholder="문의 내용 (필수)"
        placeholderTextColor="#999"
        value={content}
        onChangeText={setContent}
        multiline={true}
        textAlignVertical="top"
        maxLength={1000}
      />

      {/* 파일첨부 버튼 */}
      <TouchableOpacity
        style={styles.fileAttachButton}
        onPress={handleFileAttach}
        activeOpacity={0.7}
      />

      {/* 이미지첨부 버튼 */}
      <TouchableOpacity
        style={styles.imageAttachButton}
        onPress={handleImageAttach}
        activeOpacity={0.7}
      />

      {/* 연락처 휴대폰 입력창 */}
      <TextInput
        style={[styles.textInput, styles.phoneInput]}
        placeholder="연락받으실 휴대폰번호"
        placeholderTextColor="#999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={13}
      />

      {/* 문의 보내기 버튼 */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
  },

  background: {
    position: "absolute",
    width: width,
    height: height,
  },

  // 찍 로고 버튼 - 위치 수정됨
  logoButton: {
    position: "absolute",
    top: 85 * (height / DESIGN_HEIGHT),
    left: 10 * (width / DESIGN_WIDTH),
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),

  },

  // 이전 버튼 - 위치 수정됨
  backButton: {
    position: "absolute",
    top: 90 * (height / DESIGN_HEIGHT),
    left: 850 * (width / DESIGN_WIDTH),
    width: 250 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),

  },

  // 드롭다운 버튼 공통 스타일
  dropdownButton: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20 * (width / DESIGN_WIDTH),
  },

  // 카테고리 선택 버튼 - 위치 수정됨
  categoryButton: {
    top: 530 * (height / DESIGN_HEIGHT),
    left: 18 * (width / DESIGN_WIDTH),
    width: 510 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },

  // 세부항목 선택 버튼 - 위치 수정됨
  subCategoryButton: {
    top: 530 * (height / DESIGN_HEIGHT),
    left: 563 * (width / DESIGN_WIDTH),
    width: 510 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },

  // 선택된 카테고리 버튼 스타일 (연노랑)
  selectedCategoryButton: {
    backgroundColor: "#FFF9C4", // 연노랑
  },

  selectedCategoryText: {
    color: "#E65100", // 진한 주황색
    fontWeight: "700",
  },

  // 선택된 세부항목 버튼 스타일 (파란색)
  selectedButton: {
    backgroundColor: "#E3F2FD", // 연한 파란색
  },

  // 드롭다운 텍스트 - 크게
  dropdownText: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    color: "#333",
    fontWeight: "700",
    flex: 1,
  },

  selectedText: {
    color: "#0066FF",
    fontWeight: "700",
  },

  // 드롭다운 화살표
  dropdownArrow: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    color: "#666",
  },

  // 드롭다운 메뉴
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2196F3",
    zIndex: 1000,
    maxHeight: 200 * (height / DESIGN_HEIGHT),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  categoryDropdown: {
    top: 617 * (height / DESIGN_HEIGHT),
    left: 23 * (width / DESIGN_WIDTH),
    width: 500 * (width / DESIGN_WIDTH),
  },

  subCategoryDropdown: {
    top: 617 * (height / DESIGN_HEIGHT),
    left: 569 * (width / DESIGN_WIDTH),
    width: 500 * (width / DESIGN_WIDTH),
  },

  dropdownItem: {
    paddingVertical: 15 * (height / DESIGN_HEIGHT),
    paddingHorizontal: 20 * (width / DESIGN_WIDTH),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#F8F9FA",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  // 드롭다운 아이템 텍스트 - 아이콘 포함
  dropdownItemText: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    color: "#333",
    fontWeight: "500",
  },

  // 선택된 드롭다운 아이템
  selectedDropdownItem: {
    backgroundColor: "#0066FF",
  },

  selectedDropdownItemText: {
    color: "#fff",
    fontWeight: "700",
  },

  // 텍스트 입력창 공통 스타일
  textInput: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    paddingHorizontal: 20 * (width / DESIGN_WIDTH),
    fontSize: 56 * (width / DESIGN_WIDTH),
    color: "#333",
  },

  // 제목 입력창 - 위치 수정됨
  subjectInput: {
    top: 675 * (height / DESIGN_HEIGHT),
    left: 46 * (width / DESIGN_WIDTH),
    width: 1000 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
    paddingVertical: 20 * (height / DESIGN_HEIGHT),
  },

  // 문의 내용 입력창 - 위치 수정됨
  contentInput: {
    top: 825 * (height / DESIGN_HEIGHT),
    left: 46 * (width / DESIGN_WIDTH),
    width: 1000 * (width / DESIGN_WIDTH),
    height: 400 * (height / DESIGN_HEIGHT),
    paddingTop: 20 * (height / DESIGN_HEIGHT),
    paddingBottom: 20 * (height / DESIGN_HEIGHT),
  },

  // 파일첨부 버튼
  fileAttachButton: {
    position: "absolute",
    top: 1177 * (height / DESIGN_HEIGHT),
    left: 46 * (width / DESIGN_WIDTH),
    width: 450 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
    backgroundColor: "transparent",
  },

  // 이미지첨부 버튼
  imageAttachButton: {
    position: "absolute",
    top: 1177 * (height / DESIGN_HEIGHT),
    left: 573 * (width / DESIGN_WIDTH),
    width: 450 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
    backgroundColor: "transparent",
  },

  // 연락처 휴대폰 입력창 - 위치 수정됨
  phoneInput: {
    top: 1383 * (height / DESIGN_HEIGHT),
    left: 46 * (width / DESIGN_WIDTH),
    width: 1000 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
    paddingVertical: 15 * (height / DESIGN_HEIGHT),
  },

  // 문의 보내기 버튼 - 위치 수정됨
  submitButton: {
    position: "absolute",
    top: 1505 * (height / DESIGN_HEIGHT),
    left: 46 * (width / DESIGN_WIDTH),
    width: 1000 * (width / DESIGN_WIDTH),
    height: 150 * (height / DESIGN_HEIGHT),
    backgroundColor: "transparent",

  },

  submitButtonText: {
    fontSize: 20 * (width / DESIGN_WIDTH),
    fontWeight: "bold",
    color: "#fff",
  },
});