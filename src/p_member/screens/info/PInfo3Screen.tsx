// src/p_member/screens/info/PInfo3Screen.tsx
// 회원용 Info3 화면 (JJIK 회원별 기능 안내)
// 하단에 "베이직/프리미엄 회원 가입하기" 버튼 포함

import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";

// 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

export default function Info3GuestScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  // <<이전 버튼 클릭 - info2로 이동
  const handlePrevPress = () => {
    navigation.navigate("PInfo2");
  };

  // 다음>> 버튼 클릭 - info4로 이동
  const handleNextPress = () => {
    navigation.navigate("PInfo4");
  };

  // 베이직/프리미엄 회원 가입하기 버튼 클릭 - 회원가입 페이지로 이동
  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/p_member/info/p_info3.png")}
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

      {/* 베이직/프리미엄 회원 가입하기 버튼 (x96 y1760 w900 h125) */}
      <TouchableOpacity 
        style={[styles.transparentButton, styles.signUpButton]} 
        onPress={handleSignUpPress}
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
  
  // 베이직/프리미엄 회원 가입하기 버튼 (x96 y1760 w900 h125)
  signUpButton: {
    top: 1687 * (height / DESIGN_HEIGHT),
    left: 96 * (width / DESIGN_WIDTH),
    width: 900 * (width / DESIGN_WIDTH),
    height: 125 * (height / DESIGN_HEIGHT),
  },
});