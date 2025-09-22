// 🔹 FindIdPasswordModal.tsx (src/components)
// 🔹 아이디/비밀번호 찾기 모달 전체 코드 – 입력창, 버튼, 결과, 닫기까지
// 📁 src/components/FindIdPasswordModal.tsx

import React, { useState } from "react";
import {
  Modal,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

const bgImage = require("../../assets/images/modals/modal_find_idpassword.png");
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// 실제 모달 이미지 크기 기준 (Figma: 920x911)
const modalBaseWidth = 920;
const modalBaseHeight = 911;

// 화면 비율 기반으로 모달 실제 크기 조정
const modalWidth = screenWidth * 0.9;
const modalHeight = (modalBaseHeight / modalBaseWidth) * modalWidth;


type Props = {
  visible: boolean;
  onClose: () => void;
};

const FindIdPasswordModal = ({ visible, onClose }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState<{ user_id: string; password: string } | null>(null);

  const handleFind = () => {
    if (!/^010\d{8}$/.test(phoneNumber)) {
      alert("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }
    setResult({ user_id: "user1234", password: "pass5678" });
  };

  const handleClose = () => {
    setPhoneNumber("");
    setResult(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
            {/* 입력창 */}
            <TextInput
              style={[
                styles.input,
                {
                  top: modalHeight * (235 / 911),
                  left: modalWidth * (45 / 920),
                  width: modalWidth * (840 / 920),
                  height: modalHeight * (120 / 911),
                },
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              maxLength={11}
            />

            {/* 찾기 버튼 */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  top: modalHeight * (389 / 911),
                  left: modalWidth * (145 / 920),
                  width: modalWidth * (600 / 920),
                  height: modalHeight * (100 / 911),
                },
              ]}
              onPress={handleFind}
            />

            {/* 결과 */}
            {result && (
              <>
                <Text
                  style={[
                    styles.result,
                    {
                      top: modalHeight * (630 / 911),
                      left: modalWidth * (60 / 920),
                      width: modalWidth * (400 / 920),
                      height: modalHeight * (91 / 911),
                    },
                  ]}
                >
                  {result.user_id}
                </Text>
                <Text
                  style={[
                    styles.result,
                    {
                      top: modalHeight * (630 / 911),
                      left: modalWidth * (480 / 920),
                      width: modalWidth * (400 / 920),
                      height: modalHeight * (91 / 911),
                    },
                  ]}
                >
                  {result.password}
                </Text>
              </>
            )}

            {/* 확인 버튼 */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  top: modalHeight * (788 / 911),
                  left: modalWidth * (168 / 920),
                  width: modalWidth * (220 / 920),
                  height: modalHeight * (64 / 911),
                },
              ]}
              onPress={handleClose}
            />

            {/* 닫기 버튼 */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  top: modalHeight * (788 / 911),
                  left: modalWidth * (688 / 920),
                  width: modalWidth * (64 / 920),
                  height: modalHeight * (64 / 911),
                },
              ]}
              onPress={handleClose}
            />
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default FindIdPasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    width: modalWidth,
    height: modalHeight,
    resizeMode: "contain",
  },
  input: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    zIndex: 10,
  },
  button: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 10,
  },
  result: {
    position: "absolute",
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
    zIndex: 10,
  },
});
