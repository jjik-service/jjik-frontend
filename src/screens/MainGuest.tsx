// ✅ 파일 위치: src/screens/MainGuest.tsx
// ✅ 배경 이미지: assets/images/pages/home_guestuser.png
// ✅ 모달 이미지: assets/images/modals/notservice_message_modal.png
// ✅ 모달 이미지: assets/images/modals/modal_lottonumber_check.png
// ✅ 연결 페이지: SignUp, Info1Guest, Patterns1to10Guest, QAMainGuest
// 게스트 홈페이지 - 완벽한 기능 구현 (광고, 모달, 정확한 좌표)

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  Text,
  Alert,
} from "react-native";
// ✅ 네비게이션: @react-navigation/native 패키지 사용
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";

// ✅ 네비게이션 타입 정의 - 게스트홈페이지에서 실제 이동하는 페이지만
type RootStackParamList = {
  MainGuest: undefined;
  SignUp: undefined;
  Info1Guest: undefined;
  Patterns1to10Guest: undefined;
  QAMainGuest: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

// ✅ 화면 크기: React Native Dimensions API로 현재 기기 화면 크기 획득
const { width, height } = Dimensions.get("window");
// ✅ 피그마 디자인 기준: 1092x1920 해상도
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// ✅ 서비스 준비중 모달 컴포넌트 - 회원 전용 기능 클릭시 표시
// ✅ 모달 이미지 경로: assets/images/modals/notservice_message_modal.png
const NotServiceModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <TouchableOpacity style={styles.modalContent} onPress={onClose} activeOpacity={1}>
        <Image
          source={require("../../assets/images/modals/notservice_message_modal.png")}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ✅ 당첨확인 모달 컴포넌트 - 당첨확인 버튼 클릭시 표시  
// ✅ 모달 이미지 경로: assets/images/modals/modal_lottonumber_check.png
const LottoCheckModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <TouchableOpacity style={styles.modalContent} onPress={onClose} activeOpacity={1}>
        <Image
          source={require("../../assets/images/modals/modal_lottonumber_check.png")}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ✅ 광고 플레이스홀더 컴포넌트 - 게스트 광고 시청용
const AdPlaceholder = ({
  onComplete,
  duration = 5000,
  type = "interstitial",
  canSkip = false
}: {
  onComplete: () => void;
  duration?: number;
  type?: "banner" | "interstitial" | "rewarded";
  canSkip?: boolean;
}) => {
  const [countdown, setCountdown] = useState(Math.floor(duration / 1000));
  const [showSkipButton, setShowSkipButton] = useState(false);

  // ✅ 광고 카운트다운 타이머
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => onComplete(), 500);
      return () => clearTimeout(completeTimer);
    }
  }, [countdown, onComplete]);

  // ✅ 건너뛰기 버튼 타이머
  useEffect(() => {
    if (canSkip && countdown <= 2) {
      setShowSkipButton(true);
    }
  }, [countdown, canSkip]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.adModalContainer}>
        <Text style={styles.adTitle}>광고 시청 중</Text>
        <Text style={styles.adCountdown}>{countdown}초 후 이용 가능</Text>
        <View style={styles.adPlaceholder}>
          <Text style={styles.adPlaceholderText}>광고 영역</Text>
          <Text style={styles.adTypeText}>{type === "rewarded" ? "보상형 광고" : "일반 광고"}</Text>
        </View>
        {showSkipButton && (
          <TouchableOpacity style={styles.adSkipButton} onPress={handleSkip}>
            <Text style={styles.adSkipButtonText}>건너뛰기</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default function MainGuest() {
  // ✅ 네비게이션 훅: React Navigation의 useNavigation 사용
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 모달 상태 관리: useState로 모달 표시/숨김 제어
  const [showNotServiceModal, setShowNotServiceModal] = useState(false);
  const [showLottoCheckModal, setShowLottoCheckModal] = useState(false);
  const [showInitialAd, setShowInitialAd] = useState(true);
  // 상태에 추가
  const [showQAAd, setShowQAAd] = useState(false);

  // ✅ 컴포넌트 마운트시 초기 광고 표시
  useEffect(() => {
    console.log("게스트 홈화면 진입 - 초기 광고 시작");
  }, []);

  // ✅ 초기 광고 완료 처리
  const handleInitialAdComplete = useCallback(() => {
    setShowInitialAd(false);
    console.log("초기 광고 시청 완료 - 홈화면 이용 가능");
  }, []);


  // ✅ 회원가입 버튼 클릭 - SignUp 페이지 이동
  const handleSignUpPress = useCallback(() => {
    console.log("회원가입 페이지 이동");
    navigation.navigate("SignUp");
  }, [navigation]);

  // ✅ 이용안내 버튼 클릭 - Info1Guest 페이지 이동
  const handleInfoPress = useCallback(() => {
    console.log("이용안내 페이지 이동");
    navigation.navigate("Info1Guest");
  }, [navigation]);

  // ✅ Q&A 버튼 클릭 - QAMainGuest 페이지 이동
  const handleQAPress = useCallback(() => {
    console.log("Q&A 광고 시청후 페이지 이동");
    setShowQAAd(true);
  }, []);

  // Q&A 광고 완료 처리
  const handleQAAdComplete = useCallback(() => {
    setShowQAAd(false);
    console.log("Q&A 광고 시청 완료 - Q&A 페이지 이동");
    navigation.navigate("QAMainGuest");
  }, [navigation]);

  // ✅ AI 추천 패턴 버튼 클릭 - 패턴 페이지 이동
  const handleAIRecommendPress = useCallback(() => {
    console.log("AI 추천 패턴 바로 이동");
    navigation.navigate("Patterns1to10Guest");  // 이 줄로 변경
  }, [navigation]);
 

  // ✅ 당첨확인 버튼 클릭 - 당첨확인 모달 표시
  const handleLottoCheckPress = useCallback(() => {
    console.log("당첨확인 모달 표시");
    setShowLottoCheckModal(true);
  }, []);

  // ✅ 회원 전용 기능 클릭시 회원가입 유도 모달 표시
  const handleMemberOnlyFeature = useCallback(() => {
    console.log("회원 전용 기능 - 서비스 준비중 모달 표시");
    setShowNotServiceModal(true);
  }, []);

  // ✅ 모달 닫기 핸들러들
  const handleCloseNotServiceModal = useCallback(() => {
    setShowNotServiceModal(false);
  }, []);

  const handleCloseLottoCheckModal = useCallback(() => {
    setShowLottoCheckModal(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 경로: assets/images/pages/home_guestuser.png 
      <Image
        source={require("../../assets/images/pages/home_guestuser.png")}
        style={styles.background}
        resizeMode="contain"
      /> */}

      {/* ✅ 회원가입 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '19.2%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleSignUpPress}
        activeOpacity={0.7}
      />

      {/* ✅ 이용안내 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '28.2%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleInfoPress}
        activeOpacity={0.7}
      />

      {/* ✅ 회원별기능 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '37%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleMemberOnlyFeature}
        activeOpacity={0.7}
      />

      {/* ✅ AI 추천 패턴 번호생성 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '45.9%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleAIRecommendPress}
        activeOpacity={0.7}
      />

      {/* ✅ 프리미엄 패턴 번호생성 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '54.7%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleMemberOnlyFeature}
        activeOpacity={0.7}
      />

      {/* ✅ 패턴조합 번호생성 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '63.7%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleMemberOnlyFeature}
        activeOpacity={0.7}
      />

      {/* ✅ AI 분석 통계 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '72.7%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleMemberOnlyFeature}
        activeOpacity={0.7}
      />

      {/* ✅ 마이페이지 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '81.7%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleMemberOnlyFeature}
        activeOpacity={0.7}
      />

      {/* ✅ 당첨확인 버튼 - 피그마 좌표: x760 y222 w300 h80 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '13.6%', // 222 / 1920
          left: '69.6%', // 760 / 1092
          width: '27.5%', // 300 / 1092
          height: '4.2%', // 80 / 1920
        }]}
        onPress={handleLottoCheckPress}
        activeOpacity={0.7}
      />

      {/* ✅ Q&A 버튼 - 피그마 좌표: x880 y125 w180 h60 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '9.5%', // 125 / 1920
          left: '80.6%', // 880 / 1092
          width: '16.5%', // 180 / 1092
          height: '3.1%', // 60 / 1920
        }]}
        onPress={handleQAPress}
        activeOpacity={0.7}
      />

      {/* ✅ Q&A 보상형 광고 모달 */}
      {showQAAd && (
        <AdPlaceholder
          onComplete={handleQAAdComplete}
          duration={15000}
          type="rewarded"
          canSkip={false}
        />
      )}

      {/* ✅ 초기 진입 광고 모달 - 홈 진입시 자동 표시 */}
      {showInitialAd && (
        <AdPlaceholder
          onComplete={handleInitialAdComplete}
          duration={5000}
          type="interstitial"
          canSkip={false}
        />
      )}


      {/* ✅ 서비스 준비중 모달 - 회원 전용 기능 클릭시 표시 */}
      <NotServiceModal
        visible={showNotServiceModal}
        onClose={handleCloseNotServiceModal}
      />

      {/* ✅ 당첨확인 모달 - 당첨확인 버튼 클릭시 표시 */}
      <LottoCheckModal
        visible={showLottoCheckModal}
        onClose={handleCloseLottoCheckModal}
      />
    </SafeAreaView>
  );
}

// ✅ 스타일 정의 - 1092x1920 피그마 디자인 기준 반응형
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  // ✅ 배경 이미지 스타일
  background: {
    position: "absolute",
    width: width,
    height: height,
  },

  // ✅ 투명 버튼 기본 스타일 - 흰색 외곽선, 완전 투명
  button: {
    position: "absolute",
    backgroundColor: "transparent",
  },

  // ✅ 모달 오버레이 - 검은 반투명 배경
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ 모달 컨텐츠 컨테이너
  modalContent: {
    width: width * 0.85,
    maxWidth: 400,
    aspectRatio: 1.2,
  },

  // ✅ 모달 이미지 스타일
  modalImage: {
    width: "100%",
    height: "100%",
  },

  // ✅ 광고 모달 관련 스타일
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
    marginBottom: 20,
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

  adSkipButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },

  adSkipButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});