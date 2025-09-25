// ✅ 파일 위치: src/p_member/screens/info/PInfo7Screen.tsx
// ✅ 배경 이미지: assets/images/p_member/info/p_info7.png
// ✅ 모달 이미지: assets/images/modals/update_message_modal.png
// Info7 회원 화면 - AI 분석 통계 안내

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

// ✅ 업데이트 예정 모달 컴포넌트 - 내부/외부 터치 모두 닫기
const UpdateMessageModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <Image
        source={require("../../../../assets/images/modals/update_message_modal.png")}
        style={styles.modalImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </Modal>
);

export default function PInfo7Screen() {
  const navigation = useNavigation<any>();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // <<이전 버튼 클릭 - info6으로 이동
  const handlePrevPress = () => {
    navigation.navigate("PInfo6");
  };

  // 다음>> 버튼 클릭 - info8으로 이동
  const handleNextPress = () => {
    navigation.navigate("PInfo8");
  };

  // ✅ AI 분석 통계 바로가기 버튼 클릭 - update_message_modal 표시
  const handleAIStatsPress = () => {
    console.log("AI 분석 통계 - 업데이트 예정");
    setShowUpdateModal(true);
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 
      <Image
        source={require("../../../../assets/images/p_member/info/p_info7.png")}
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

      {/* AI 분석 통계 바로가기 버튼 (x116 y1730 w860 h150) */}
      <TouchableOpacity
        style={[styles.transparentButton, styles.aiStatsButton]}
        onPress={handleAIStatsPress}
        activeOpacity={0.7}
      />

      {/* ✅ 업데이트 예정 모달 */}
      <UpdateMessageModal
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
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

  // AI 분석 통계 바로가기 버튼
  aiStatsButton: {
    top: 1645 * (height / DESIGN_HEIGHT),
    left: 95 * (width / DESIGN_WIDTH),
    width: 900 * (width / DESIGN_WIDTH),
    height: 170 * (height / DESIGN_HEIGHT),
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
    maxWidth: 300,
    aspectRatio: 1.2,
  },
});