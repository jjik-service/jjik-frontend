// 📄 src/components/OpenpageModal.tsx
// 기능: 앱 실행 시 보이는 첫 모달 → 바깥 클릭 시 닫힘
// src/components/OpenpageModal.tsx
// 기능: 앱 실행 시 보이는 첫 모달 → 바깥 클릭 시 닫힘

import React from "react";
import {
  Modal,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
  onClose: () => void;
}

export default function OpenpageModal({ onClose }: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalContainer}>
              <Image
                source={require("../../assets/images/modals/openpage_modal.png")}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // 최상단 레이어
  },
  modalContainer: {
    width: (1035 / 1080) * width,
    height: (970 / 1920) * height,
    zIndex: 10000, // 모달 컨테이너 최상단
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});
