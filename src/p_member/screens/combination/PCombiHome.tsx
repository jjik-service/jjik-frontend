// ✅ 파일 위치: src/p_member/screens/combination/PCombiHome.tsx
// ✅ 배경 이미지: assets/images/p_member/combination/p_my_combination_home.png
// ✅ 프리미엄 조합 홈 화면 (4개 조합 기능 + 보상형 광고)

import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../../../navigation/p_navigation";
import AdPlaceholder from "../../../components/AdPlaceholder";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

export default function PCombiHome() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 배경 이미지 로딩 상태 추가
  const [backgroundLoaded, setBackgroundLoaded] = useState<boolean>(false);
  
  // ✅ 광고 모달 상태
  const [showAdModal, setShowAdModal] = useState<boolean>(false);
  const [adCompletionAction, setAdCompletionAction] = useState<string>("");

  // ✅ 배경 이미지 로딩 완료 처리
  const handleBackgroundLoad = useCallback(() => {
    setBackgroundLoaded(true);
  }, []);

  // ✅ 찍로고 버튼 - PMainHome 이동
  const handleLogoPress = useCallback(() => {
    console.log("메인 홈으로 이동");
    navigation.navigate("PMainHome");
  }, [navigation]);

  // ✅ my 버튼 - PMyPage 이동
  const handleMyPress = useCallback(() => {
    console.log("마이페이지로 이동");
    navigation.navigate("PMyPage");
  }, [navigation]);

  // ✅ 보상형 광고 완료 처리
  const handleAdComplete = useCallback(() => {
    setShowAdModal(false);
    
    switch (adCompletionAction) {
      case 'navigateToGenFilter':
        console.log("광고 시청 완료 - 일반 필터링 조합으로 이동");
        navigation.navigate("PCombiGenFilter");
        break;
      case 'navigateToGenCompose':
        console.log("광고 시청 완료 - 일반 합성 조합으로 이동");
        navigation.navigate("PCombiGenCompose");
        break;
      case 'navigateToOpFilter':
        console.log("광고 시청 완료 - 옵션형 필터링 조합으로 이동");
        navigation.navigate("PCombiOpFilter");
        break;
      case 'navigateToOpCompose':
        console.log("광고 시청 완료 - 옵션형 합성 조합으로 이동");
        navigation.navigate("PCombiOpCompose");
        break;
      default:
        break;
    }
    
    setAdCompletionAction("");
  }, [adCompletionAction, navigation]);

  // ✅ 일반 패턴 필터링 조합 버튼
  const handleGenFilterPress = useCallback(() => {
    console.log("보상형 광고 시청 후 일반 필터링 조합으로 이동");
    setAdCompletionAction('navigateToGenFilter');
    setShowAdModal(true);
  }, []);

  // ✅ 일반 패턴 합성 조합 버튼
  const handleGenComposePress = useCallback(() => {
    console.log("보상형 광고 시청 후 일반 합성 조합으로 이동");
    setAdCompletionAction('navigateToGenCompose');
    setShowAdModal(true);
  }, []);

  // ✅ 옵션형 패턴 필터링 조합 버튼
  const handleOpFilterPress = useCallback(() => {
    console.log("보상형 광고 시청 후 옵션형 필터링 조합으로 이동");
    setAdCompletionAction('navigateToOpFilter');
    setShowAdModal(true);
  }, []);

  // ✅ 옵션형 패턴 합성 조합 버튼
  const handleOpComposePress = useCallback(() => {
    console.log("보상형 광고 시청 후 옵션형 합성 조합으로 이동");
    setAdCompletionAction('navigateToOpCompose');
    setShowAdModal(true);
  }, []);

  // ✅ 내가 저장한 조합 보기 버튼 (아직 미구현 페이지로 이동)
  const handleMySavedCombinationsPress = useCallback(() => {
    console.log("내가 저장한 조합 페이지 이동동");
    navigation.navigate('PMyCombiSaveCard');
  }, [navigation]);

  // ✅ 로딩 화면 렌더링
  if (!backgroundLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009DFF" />
        {/* ✅ 배경 이미지를 숨겨서 미리 로드 */}
        <Image
          source={require("../../../../assets/images/p_member/combination/p_my_combination_home.png")}
          style={styles.hiddenImage}
          onLoad={handleBackgroundLoad}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 
      <Image
        source={require("../../../../assets/images/p_member/combination/p_my_combination_home.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 찍로고 버튼 (x153, y82, w70, h70) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (90 / DESIGN_HEIGHT) * height,
          left: (10 / DESIGN_WIDTH) * width,
          width: (120 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* ✅ my 버튼 (x918, y82, w70, h70) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (85 / DESIGN_HEIGHT) * height,
          left: (880 / DESIGN_WIDTH) * width,
          width: (200 / DESIGN_WIDTH) * width,
          height: (100 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleMyPress}
        activeOpacity={0.7}
      />

      {/* ✅ 일반 패턴 필터링 조합 버튼 (x371, y204, w140, h60) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (350 / DESIGN_HEIGHT) * height,
          left: (675 / DESIGN_WIDTH) * width,
          width: (360 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleGenFilterPress}
        activeOpacity={0.7}
      />

      {/* ✅ 일반 패턴 합성 조합 버튼 (x525, y204, w140, h60) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (470 / DESIGN_HEIGHT) * height,
          left: (675 / DESIGN_WIDTH) * width,
          width: (360 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleGenComposePress}
        activeOpacity={0.7}
      />

      {/* ✅ 옵션형 패턴 필터링 조합 버튼 (x371, y324, w140, h60) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (670 / DESIGN_HEIGHT) * height,
          left: (675 / DESIGN_WIDTH) * width,
          width: (360 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleOpFilterPress}
        activeOpacity={0.7}
      />

      {/* ✅ 옵션형 패턴 합성 조합 버튼 (x525, y324, w140, h60) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (790 / DESIGN_HEIGHT) * height,
          left: (675 / DESIGN_WIDTH) * width,
          width: (360 / DESIGN_WIDTH) * width,
          height: (120 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleOpComposePress}
        activeOpacity={0.7}
      />

      {/* ✅ 내가 저장한 조합 보기 버튼 (x231, y680, w320, h60) */}
      <TouchableOpacity
        style={[styles.button, {
          top: (1650 / DESIGN_HEIGHT) * height,
          left: (221 / DESIGN_WIDTH) * width,
          width: (650 / DESIGN_WIDTH) * width,
          height: (110 / DESIGN_HEIGHT) * height,
        }]}
        onPress={handleMySavedCombinationsPress}
        activeOpacity={0.7}
      />

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

  // ✅ 로딩 화면 스타일
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ 숨겨진 이미지 (미리 로드용)
  hiddenImage: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  background: {
    position: "absolute",
    width: width,
    height: height,
  },

  button: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});