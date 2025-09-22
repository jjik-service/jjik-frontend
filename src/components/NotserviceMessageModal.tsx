// ✅ 파일 위치: src/components/NotserviceMasegeModal.tsx
// 서비스 준비중 모달 컴포넌트
// 내부 터치시 닫기 방지 + 반응형 개선

import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";

// ✅ 화면 크기 정보
const { width, height } = Dimensions.get("window");

// ✅ 컴포넌트 props 타입 정의
interface NotserviceMasegeModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * NotserviceMasegeModal 컴포넌트
 * - 게스트가 회원 전용 기능에 접근할 때 표시
 * - 회원가입 유도 메시지 모달
 * - 외부 클릭시만 닫힘 (내부 터치시 닫기 방지)
 */
export default function NotserviceMasegeModal({
  visible,
  onClose
}: NotserviceMasegeModalProps) {
 
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 외부 오버레이 - 클릭시 모달 닫힘 */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* 모달 컨테이너 - 내부 클릭 이벤트 차단 */}
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => {
            e.stopPropagation(); // 이벤트 버블링 완전 차단
          }}
        >
          {/* 모달 배경 이미지 */}
          <Image
            source={require("../../assets/images/modals/notservice_message_modal.png")}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

/**
 * 스타일 정의
 * - 완전 반응형 대응
 * - 외부 클릭시만 닫힘 구조
 */
const styles = StyleSheet.create({
  // 모달 오버레이 (외부 클릭 영역)
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
 
  // 모달 컨테이너
  modalContainer: {
    width: width * 0.85,
    maxWidth: 350,
    aspectRatio: 1,  // 정사각형 비율
  },
 
  // 모달 이미지 - 반응형 개선
  modalImage: {
    width: "100%",
    height: "100%",
  },
});