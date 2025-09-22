// src/p_member/screens/info/PInfo2Screen.tsx
// 회원용 Info2 화면 (JJIK 서비스 이용안내 2페이지)
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
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";

// 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

export default function Info2GuestScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  // <<이전 버튼 클릭 - info1으로 이동
  const handlePrevPress = () => {
    navigation.navigate("PInfo1");
  };

  // 다음>> 버튼 클릭 - info3으로 이동
  const handleNextPress = () => {
    navigation.navigate("PInfo3");
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require("../../../../assets/images/p_member/info/p_info2.png")}
        style={styles.background}
        resizeMode="contain"
      />

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
    top: 100 * (height / DESIGN_HEIGHT),
    left: 0 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },
  
  // 다음>> 버튼 (x907 y20.5 w175 h80)
  nextButton: {
    top: 100 * (height / DESIGN_HEIGHT),
    left: 907 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },
});