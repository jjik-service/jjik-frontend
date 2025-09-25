// ✅ 파일 위치: src/p_member/screens/info/PInfo6Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/info/p_info6.png

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

export default function PInfo6Screen() {
  const navigation = useNavigation<any>();
  const [showRewardedAd, setShowRewardedAd] = useState(false);

  // <<이전 버튼 클릭 - info5로 이동
  const handlePrevPress = () => {
    navigation.navigate("PInfo5");
  };

  // 다음>> 버튼 클릭 - info7로 이동
  const handleNextPress = () => {
    navigation.navigate("PInfo7");
  };

  // ✅ 필터링 조합 / 합성 조합 버튼 클릭 - 15초 보상형 광고 후 PCombiHome 이동
  const handleCombinationPress = () => {
    console.log("보상형 광고 시작 - 15초 후 PCombiHome 이동");
    setShowRewardedAd(true);
  };

  // ✅ 광고 완료 후 PCombiHome 이동
  const handleAdComplete = () => {
    setShowRewardedAd(false);
    console.log("보상형 광고 완료 - PCombiHome으로 이동");
    navigation.navigate("PCombiHome");
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/p_member/info/p_info6.png")}
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

      {/* ✅ 필터링 조합 / 합성 조합 4개 버튼 통합 - 보상형 광고 후 PCombiHome 이동 */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.combinationButtons]}
        onPress={handleCombinationPress}
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

  // <<이전 버튼
  prevButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 0 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },

  // 다음>> 버튼
  nextButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 890 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },

  // 필터링 조합 / 합성 조합 4개 버튼 통합 영역
  combinationButtons: {
    top: 1540 * (height / DESIGN_HEIGHT),
    left: 50 * (width / DESIGN_WIDTH),
    width: 992 * (width / DESIGN_WIDTH),
    height: 265 * (height / DESIGN_HEIGHT),
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