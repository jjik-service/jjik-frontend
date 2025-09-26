// src/screens/Info5GuestScreen.tsx
// 게스트용 Info5 화면 (프리미엄 회원 혜택 안내)
// 하단에 "프리미엄 회원가입" 버튼 포함

import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { GuestStackNavigationProp } from "../../../types/navigation";

// 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

export default function Info5GuestScreen() {
  const navigation = useNavigation<GuestStackNavigationProp>();

  // <<이전 버튼 클릭 - info4로 이동
  const handlePrevPress = () => {
    navigation.navigate("Info4Guest");
  };

  // 다음>> 버튼 클릭 - info6으로 이동
  const handleNextPress = () => {
    navigation.navigate("Info6Guest");
  };

  // 프리미엄 회원가입 버튼 클릭 - 회원가입 페이지로 이동
  const handlePremiumSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../assets/images/guest/info/info5_guest.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* <<이전 버튼 (x0 y24 w175 h80) */}
      <TouchableOpacity 
        style={[styles.transparentButton, styles.prevButton]} 
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* 다음>> 버튼 (x907 y20.5 w175 h80) */}
      <TouchableOpacity 
        style={[styles.transparentButton, styles.nextButton]} 
        onPress={handleNextPress}
        activeOpacity={0.7}
      />

      {/* 프리미엄 회원가입 버튼 (x246 y1730 w600 h125) */}
      <TouchableOpacity 
        style={[styles.transparentButton, styles.premiumSignUpButton]} 
        onPress={handlePremiumSignUpPress}
        activeOpacity={0.7}
      />
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
  
  transparentButton: {
    position: "absolute",
    backgroundColor: "transparent",

  },
  
  // <<이전 버튼 (x0 y24 w175 h80)
  prevButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 0 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },
  
  // 다음>> 버튼 (x907 y20.5 w175 h80)
  nextButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 907 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },
  
  // 프리미엄 회원가입 버튼 (x246 y1730 w600 h125)
  premiumSignUpButton: {
    top: 1653 * (height / DESIGN_HEIGHT),
    left: 246 * (width / DESIGN_WIDTH),
    width: 600 * (width / DESIGN_WIDTH),
    height: 140 * (height / DESIGN_HEIGHT),
  },
});