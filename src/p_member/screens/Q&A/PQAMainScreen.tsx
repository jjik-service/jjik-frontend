// ✅ 파일 위치: src/p_member/screens/PQAMainScreen.tsx
// ✅ 배경 이미지: assets/images/p_member/Q&A/p_Q&A_home.png
// Q&A 메인 게스트 화면 - 카테고리 선택

import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";

// ✅ 화면 크기
const { width, height } = Dimensions.get("window");

export default function QAMainGuestScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  // ✅ 찍 로고 클릭 - 게스트홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("PMainHome");
  };

  // ✅ 회원/로그인 카테고리 클릭
  const handleMemberPress = () => {
    navigation.navigate("PQAMember");
  };

  // ✅ 번호 생성 카테고리 클릭
  const handleNumberGenPress = () => {
    navigation.navigate("PQANumber");
  };

  // ✅ AI 통계 카테고리 클릭
  const handleAIStatsPress = () => {
    navigation.navigate("PQAAIStats");
  };

  // ✅ 프리미엄/결제 카테고리 클릭
  const handlePremiumPress = () => {
    navigation.navigate("PQAPremium");
  };

  // ✅ 기타 카테고리 클릭
  const handleEtcPress = () => {
    navigation.navigate("PQAEtc");
  };

  // ✅ 1:1 문의하기 버튼 클릭
  const handleInquiryPress = () => {
    navigation.navigate("PQAInquiry");
  };

  return (
    <View style={styles.container}>
      {/* ✅ 배경 이미지 */}
      <Image
        source={require("../../../../assets/images/p_member/Q&A/p_Q&A_home.png")}
        style={styles.background}
        resizeMode="contain"
      />

      {/* ✅ 찍 로고 버튼 - 피그마 좌표: x10 y10 w120 h120 */}
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

      {/* ✅ 회원/로그인 카테고리 버튼 - 피그마 좌표: x64 y500 w460 h120 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '26%',
          left: '5.9%',
          width: '42.1%',
          height: '6.3%',

        }]}
        onPress={handleMemberPress}
        activeOpacity={0.7}
      />

      {/* ✅ 번호 생성 카테고리 버튼 - 피그마 좌표: x64 y700 w460 h120 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '34.9%',
          left: '5.9%',
          width: '42.1%',
          height: '6.3%',

        }]}
        onPress={handleNumberGenPress}
        activeOpacity={0.7}
      />

      {/* ✅ AI 통계 카테고리 버튼 - 피그마 좌표: x64 y900 w460 h120 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '43.8%',
          left: '5.9%',
          width: '42.1%',
          height: '6.3%',

        }]}
        onPress={handleAIStatsPress}
        activeOpacity={0.7}
      />

      {/* ✅ 프리미엄/결제 카테고리 버튼 - 피그마 좌표: x64 y1100 w460 h120 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '52.7%',
          left: '5.9%',
          width: '42.1%',
          height: '6.3%',

        }]}
        onPress={handlePremiumPress}
        activeOpacity={0.7}
      />

      {/* ✅ 기타 카테고리 버튼 - 피그마 좌표: x64 y1300 w460 h120 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '61.7%',
          left: '5.9%',
          width: '42.1%',
          height: '6.3%',

        }]}
        onPress={handleEtcPress}
        activeOpacity={0.7}
      />

      {/* ✅ 1:1 문의하기 버튼 - 피그마 좌표: x193 y1691 w680 h160 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '79%',
          left: '17.7%',
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

  // ✅ 투명 버튼
  button: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});