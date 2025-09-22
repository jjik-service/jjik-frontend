// ✅ 파일 위치: src/screens/Info6GuestScreen.tsx
// ✅ 배경 이미지: assets/images/pages/info/info6_guest.png
// ✅ 모달 이미지: assets/images/modals/notservice_message_modal.png
// Info6 게스트 화면 - 패턴조합 안내

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// ✅ 화면 크기 및 비율 계산
const { width, height } = Dimensions.get("window");
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 서비스 준비중 모달 컴포넌트 - 내부/외부 터치 모두 닫기
const NotServiceModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <Image
        source={require("../../assets/images/modals/notservice_message_modal.png")}
        style={styles.modalImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </Modal>
);

export default function Info6GuestScreen() {
  const navigation = useNavigation<any>();
  const [showNotServiceModal, setShowNotServiceModal] = useState(false);

  // <<이전 버튼 클릭 - info5로 이동
  const handlePrevPress = () => {
    navigation.navigate("Info5Guest");
  };

  // 다음>> 버튼 클릭 - info7로 이동
  const handleNextPress = () => {
    navigation.navigate("Info7Guest");
  };

  // 필터링 조합 / 합성 조합 버튼 클릭 - 모달 표시
  const handleCombinationPress = () => {
    setShowNotServiceModal(true);
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require("../../assets/images/pages/info/info6_guest.png")}
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

      {/* 필터링 조합 / 합성 조합 4개 버튼 통합 (x50 y1600 w992 h265) */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.combinationButtons]}
        onPress={handleCombinationPress}
        activeOpacity={0.7}
      />

      {/* 서비스 준비중 모달 */}
      <NotServiceModal
        visible={showNotServiceModal}
        onClose={() => setShowNotServiceModal(false)}
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

  // <<이전 버튼 (x0 y24 w175 h80) - Info5와 동일하게 수정
  prevButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 0 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },

  // 다음>> 버튼 (x907 y20.5 w175 h80) - Info5와 동일하게 수정
  nextButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    left: 907 * (width / DESIGN_WIDTH),
    width: 175 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },

  // 필터링 조합 / 합성 조합 4개 버튼 통합 영역 (x50 y1600 w992 h265)
  combinationButtons: {
    top: 1540 * (height / DESIGN_HEIGHT),
    left: 50 * (width / DESIGN_WIDTH),
    width: 992 * (width / DESIGN_WIDTH),
    height: 265 * (height / DESIGN_HEIGHT),
  },

  // 모달 관련 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalImage: {
    width: width * 0.85,
    maxWidth: 400,
    aspectRatio: 1.2,
  },
});