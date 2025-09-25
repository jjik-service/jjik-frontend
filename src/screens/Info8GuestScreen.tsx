// ✅ 파일 위치: src/screens/Info8GuestScreen.tsx
// ✅ 배경 이미지: assets/images/pages/info/info8_guest.png
// ✅ 모달 이미지: assets/images/modals/notservice_message_modal.png
// Info8 게스트 화면 - 마이페이지 안내 (마지막 페이지)

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

export default function Info8GuestScreen() {
  const navigation = useNavigation<any>();
  const [showNotServiceModal, setShowNotServiceModal] = useState(false);

  // 찍 로고 클릭 - 게스트홈으로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainGuest");
  };

  // <<이전 버튼 클릭 - info7로 이동
  const handlePrevPress = () => {
    navigation.navigate("Info7Guest");
  };

  // 마이페이지 바로가기 버튼 클릭 - notservice_message_modal 표시
  const handleMyPagePress = () => {
    setShowNotServiceModal(true);
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../assets/images/pages/info/info8_guest.png")}
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

      {/* 마이페이지 바로가기 버튼 (x116 y1730 w860 h150) */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.myPageButton]}
        onPress={handleMyPagePress}
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

  // 찍 로고 버튼 (x10 y10 w120 h120) - 좌측 상단
  logoButton: {
    top: 90 * (height / DESIGN_HEIGHT),
    left: 25 * (width / DESIGN_WIDTH),
    width: 120 * (width / DESIGN_WIDTH),
    height: 120 * (height / DESIGN_HEIGHT),
  },

  // <<이전 버튼 - 우측 ("이전>>" 텍스트 표시) 
  prevButton: {
    top: 105 * (height / DESIGN_HEIGHT),
    right: 10 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 80 * (height / DESIGN_HEIGHT),
  },

  // 마이페이지 바로가기 버튼 (x116 y1730 w860 h150)
  myPageButton: {
    top: 1640 * (height / DESIGN_HEIGHT),
    left: 116 * (width / DESIGN_WIDTH),
    width: 860 * (width / DESIGN_WIDTH),
    height: 180 * (height / DESIGN_HEIGHT),
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