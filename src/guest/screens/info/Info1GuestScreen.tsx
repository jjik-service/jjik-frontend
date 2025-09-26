// src/screens/Info1GuestScreen.tsx
// 게스트용 Info1 화면 (JJIK 서비스 이용안내 1페이지)
// 1092x1920 피그마 디자인 기준 반응형 구현

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

export default function Info1GuestScreen() {
  const navigation = useNavigation<GuestStackNavigationProp>();

  // 찍 로고 클릭 - 홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("GMainHome");
  };

  // 다음>> 버튼 클릭 - info2로 이동
  const handleNextPress = () => {
    navigation.navigate("Info2Guest");
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../assets/images/guest/info/info1_guest.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* 찍 로고 버튼 (x10 y10 w120 h120) */}
      <TouchableOpacity 
        style={[styles.transparentButton, styles.logoButton]} 
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* 다음>> 버튼 (x907 y20.5 w175 h80) */}
      <TouchableOpacity 
        style={[styles.transparentButton, styles.nextButton]} 
        onPress={handleNextPress}
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
  
  // 찍 로고 버튼 (x10 y10 w120 h120)
  logoButton: {
    top: 85 * (height / DESIGN_HEIGHT),
    left: 10 * (width / DESIGN_WIDTH),
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },
  
  // 다음>> 버튼 (x907 y20.5 w175 h80)
  nextButton: {
    top: 110 * (height / DESIGN_HEIGHT),
    left: 907 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },
});