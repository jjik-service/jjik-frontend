// ✅ 파일 위치: src/p_member/screens/info/PInfo8Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/info/p_info8.png
// Info8 회원 화면 - 마이페이지 안내 (마지막 페이지)

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 보상형 광고 컴포넌트 (15초)
const AdPlaceholder = ({ onComplete }: { onComplete: () => void }) => {
  const [countdown, setCountdown] = useState(15);

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => onComplete(), 500);
      return () => clearTimeout(completeTimer);
    }
  }, [countdown, onComplete]);

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.adModalContainer}>
        <Text style={styles.adTitle}>보상형 광고 시청 중</Text>
        <Text style={styles.adCountdown}>{countdown}초 후 이용 가능</Text>
        <View style={styles.adPlaceholder}>
          <Text style={styles.adPlaceholderText}>광고 영역</Text>
          <Text style={styles.adTypeText}>보상형 광고</Text>
        </View>
      </View>
    </Modal>
  );
};

export default function PInfo8Screen() {
  const navigation = useNavigation<any>();
  const [showRewardedAd, setShowRewardedAd] = useState(false);

  // 찍 로고 클릭 - PMainHome으로 이동
  const handleLogoPress = () => {
    navigation.navigate("PMainHome");
  };

  // <<이전 버튼 클릭 - info7로 이동
  const handlePrevPress = () => {
    navigation.navigate("PInfo7");
  };

  // ✅ 마이페이지 바로가기 버튼 클릭 - 15초 보상형 광고 후 PMyPage 이동
  const handleMyPagePress = () => {
    console.log("보상형 광고 시작 - 15초 후 PMyPage 이동");
    setShowRewardedAd(true);
  };

  // ✅ 광고 완료 후 PMyPage 이동
  const handleAdComplete = () => {
    setShowRewardedAd(false);
    console.log("보상형 광고 완료 - PMyPage로 이동");
    navigation.navigate("PMyPage");
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/p_member/info/p_info8.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* 찍 로고 버튼 (x10 y10 w120 h120) - 좌측 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.logoButton]}
        onPress={handleLogoPress}
        activeOpacity={0.7}
      />

      {/* <<이전 버튼 (우측) */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.prevButton]}
        onPress={handlePrevPress}
        activeOpacity={0.7}
      />

      {/* ✅ 마이페이지 바로가기 버튼 - 보상형 광고 후 PMyPage 이동 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.myPageButton]}
        onPress={handleMyPagePress}
        activeOpacity={0.7}
      />

      {/* ✅ 보상형 광고 모달 */}
      {showRewardedAd && (
        <AdPlaceholder onComplete={handleAdComplete} />
      )}
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

  // 찍 로고 버튼
  logoButton: {
    top: 90 * (height / DESIGN_HEIGHT),
    right: 10 * (width / DESIGN_WIDTH),
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },

  // <<이전 버튼
  prevButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 5 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },

  // 마이페이지 바로가기 버튼
  myPageButton: {
    top: 1635 * (height / DESIGN_HEIGHT),
    left: 116 * (width / DESIGN_WIDTH),
    width: 860 * (width / DESIGN_WIDTH),
    height: 180 * (height / DESIGN_HEIGHT),
  },

  // ✅ 광고 모달 스타일
  adModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  adTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  adCountdown: {
    color: "#FF6B35",
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },

  adPlaceholder: {
    width: width * 0.8,
    height: height * 0.3,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  adPlaceholderText: {
    color: "#AAA",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  adTypeText: {
    color: "#666",
    fontSize: 14,
  },
});