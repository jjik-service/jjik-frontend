// ✅ 파일 위치: src/screens/QAEtcGuestScreen.tsx
// 게스트용 Q&A 기타 화면
// 1092x1920 피그마 디자인 기준 반응형 구현

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../types/navigation";

// ✅ 화면 크기 정보
const { width, height } = Dimensions.get("window");

export default function QAEtcGuestScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // ✅ 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // ✅ 이전 버튼 클릭 - QA 메인으로 이동
  const handleBackPress = () => {
    navigation.navigate("QAMainGuest");
  };

  // ✅ 질문 클릭 - 답변 토글
  const handleQuestionPress = (questionId: number) => {
    if (expandedItems.includes(questionId)) {
      setExpandedItems(expandedItems.filter(id => id !== questionId));
    } else {
      setExpandedItems([...expandedItems, questionId]);
    }
  };

  // ✅ 1:1 문의하기 버튼 클릭
  const handleInquiryPress = () => {
    navigation.navigate("QAInquiryGuest");
  };

  return (
    <View style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image
        source={require("../../../../assets/images/pages/Q&A/Q&A_other_guest.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 찍 로고 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '4%',
          left: '0.9%',
          width: '11%',
          height: '6.3%',
        }]}
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* ✅ 이전 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '4.5%',
          left: '80.8%',
          width: '18.3%',
          height: '4.2%',
        }]}
        onPress={handleBackPress}
        activeOpacity={0.7}
      />

      {/* ✅ Q1 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '24%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(1)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(1) && (
        <View style={[styles.answerContainer, styles.q1Answer]}>
          <Text style={styles.answerText}>앱 업데이트는 구글 플레이스토어에서 가능합니다.</Text>
        </View>
      )}

      {/* ✅ Q2 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '31.6%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(2)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(2) && (
        <View style={[styles.answerContainer, styles.q2Answer]}>
          <Text style={styles.answerText}>고객센터 운영시간은 평일 09:00-18:00입니다.</Text>
        </View>
      )}

      {/* ✅ Q3 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '39.1%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(3)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(3) && (
        <View style={[styles.answerContainer, styles.q3Answer]}>
          <Text style={styles.answerText}>개인정보처리방침은 설정 메뉴에서 확인 가능합니다.</Text>
        </View>
      )}

      {/* ✅ Q4 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '46.6%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(4)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(4) && (
        <View style={[styles.answerContainer, styles.q4Answer]}>
          <Text style={styles.answerText}>서비스 이용약관은 회원가입 시 동의한 내용입니다.</Text>
        </View>
      )}

      {/* ✅ Q5 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '54.2%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(5)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(5) && (
        <View style={[styles.answerContainer, styles.q5Answer]}>
          <Text style={styles.answerText}>앱 오류 신고는 1:1 문의하기를 이용해주세요.</Text>
        </View>
      )}

      {/* ✅ Q6 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '61.8%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(6)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(6) && (
        <View style={[styles.answerContainer, styles.q6Answer]}>
          <Text style={styles.answerText}>푸시 알림 설정은 휴대폰 설정에서 변경 가능합니다.</Text>
        </View>
      )}

      {/* ✅ Q7 질문 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '69.2%',
          left: '4.2%',
          width: '91.6%',
          height: '4.2%',
        }]}
        onPress={() => handleQuestionPress(7)}
        activeOpacity={0.7}
      />

      {expandedItems.includes(7) && (
        <View style={[styles.answerContainer, styles.q7Answer]}>
          <Text style={styles.answerText}>앱 데이터 백업은 구글 드라이브와 연동됩니다.</Text>
        </View>
      )}

      {/* ✅ 1:1 문의하기 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '80.1%',
          left: '19%',
          width: '62.3%',
          height: '8.3%',
        }]}
        onPress={handleInquiryPress}
        activeOpacity={0.7}
      />
    </View>
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

  // ✅ 투명 버튼 (외곽선 포함)
  button: {
    position: "absolute",
    backgroundColor: "transparent",
  },

  // ✅ 답변 컨테이너 공통 스타일
  answerContainer: {
    position: "absolute",
    left: '4.2%', // 46 / 1092
    width: '91.6%', // 1000 / 1092
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    zIndex: 10,
  },

  // Q1 답변 위치
  q1Answer: {
    top: '27.6%', // 530 / 1920
  },

  // Q2 답변 위치
  q2Answer: {
    top: '36%', // 700 / 1920
  },

  // Q3 답변 위치
  q3Answer: {
    top: '43.2%', // 870 / 1920
  },

  // Q4 답변 위치
  q4Answer: {
    top: '50.4%', // 1040 / 1920
  },

  // Q5 답변 위치
  q5Answer: {
    top: '58%', // 1210 / 1920
  },

  // Q6 답변 위치
  q6Answer: {
    top: '65.8%', // 1380 / 1920
  },

  // Q7 답변 위치
  q7Answer: {
    top: '73.2%', // 1550 / 1920
  },

  // 답변 텍스트 스타일
  answerText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});