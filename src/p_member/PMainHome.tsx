// ✅ 파일 위치: src/p_member/PMainHome.tsx
// ✅ 배경 이미지: assets/images/p_member/p_home-payuser.png
// ✅ 업데이트 모달: assets/images/modals/update_message_modal.png
// ✅ 당첨확인 모달: assets/images/modals/modal_lottonumber_check.png
// ✅ 프리미엄 멤버 홈화면 - 모든 기능 연결 (완전 수정된 버전)

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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackNavigationProp } from "../navigation/p_navigation";

// ✅ 화면 크기 및 반응형 계산
const { width, height } = Dimensions.get("window");

// ✅ 이미지 파일 상수 정의
const homePayuserBg = require("../../assets/images/p_member/p_home_payuser.png");
const updateModalImage = require("../../assets/images/modals/update_message_modal.png");
const lottoCheckModalImage = require("../../assets/images/modals/modal_lottonumber_check.png");

// ✅ 업데이트 예정 모달 컴포넌트
const UpdateMessageModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <TouchableOpacity style={styles.modalContent} onPress={onClose} activeOpacity={1}>
        <Image
          source={updateModalImage}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ✅ 당첨확인 모달 컴포넌트
const LottoCheckModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <TouchableOpacity style={styles.modalContent} onPress={onClose} activeOpacity={1}>
        <Image
          source={lottoCheckModalImage}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ✅ 광고 플레이스홀더 컴포넌트 
const AdPlaceholder = ({
  onComplete,
  duration = 15000,
  type = "rewarded",
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


  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.adModalContainer}>
        <Text style={styles.adTitle}>광고 시청 중</Text>
        <Text style={styles.adCountdown}>{countdown}초 후 이용 가능</Text>
        <View style={styles.adPlaceholder}>
          <Text style={styles.adPlaceholderText}>광고 영역</Text>
          <Text style={styles.adTypeText}>{type === "rewarded" ? "보상형 광고" : "일반 광고"}</Text>
        </View>
        
      </View>
    </Modal>
  );
};

export default function PMainHome() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // ✅ 모달 상태 관리
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showLottoCheckModal, setShowLottoCheckModal] = useState(false);
  const [showCombinationAd, setShowCombinationAd] = useState(false);
  const [showMyPageAd, setShowMyPageAd] = useState(false);
  const [showQAAd, setShowQAAd] = useState(false);

  // ✅ 컴포넌트 마운트시 로그
  useEffect(() => {
    console.log("프리미엄 멤버 홈화면 진입");
  }, []);

  // ✅ 이용안내 버튼 - PInfo1으로 이동
  const handleInfoPress = useCallback(() => {
    console.log("이용안내 페이지 이동");
    navigation.navigate('PInfo1');
  }, [navigation]);

  // ✅ AI 추천 패턴 버튼 - PPatterns1to10으로 이동
  const handleAIPatternPress = useCallback(() => {
    console.log("AI 추천 패턴 페이지 이동");
    navigation.navigate('PPatterns1to10');
  }, [navigation]);

  // ✅ 프리미엄 패턴 버튼 - POptionPatterns1to5로 이동
  const handlePremiumPatternPress = useCallback(() => {
    console.log("프리미엄 패턴 페이지 이동");
    navigation.navigate('POptionPatterns1to5');
  }, [navigation]);

  // ✅ 패턴 조합 버튼 - 광고 후 PCombiHome으로 이동
  const handleCombinationPress = useCallback(() => {
    console.log("패턴 조합 홈홈 페이지 이동");
    navigation.navigate('PCombiHome');
  }, [navigation]); 


  // ✅ 마이페이지 버튼 - 광고 후 PMyPage로 이동
  const handleMyPagePress = useCallback(() => {
    console.log("마이페이지 광고 시청 후 페이지 이동");
    setShowMyPageAd(true);
  }, []);

  const handleMyPageAdComplete = useCallback(() => {
    setShowMyPageAd(false);
    console.log("마이페이지 광고 시청 완료 - 마이페이지 이동");
    navigation.navigate('PMyPage');
  }, [navigation]);

  // ✅ Q&A 버튼 - 광고 후 PQAMain으로 이동
  const handleQAPress = useCallback(() => {
    console.log("Q&A 광고 시청 후 페이지 이동");
    setShowQAAd(true);
  }, []);

  const handleQAAdComplete = useCallback(() => {
    setShowQAAd(false);
    console.log("Q&A 광고 시청 완료 - Q&A 페이지 이동");
    navigation.navigate('PQAMain');
  }, [navigation]);

  // ✅ 당첨확인 버튼 클릭 - 당첨확인 모달 표시
  const handleLottoCheckPress = useCallback(() => {
    console.log("당첨확인 모달 표시");
    setShowLottoCheckModal(true);
  }, []);

  // ✅ 업데이트 예정 기능들 (당첨로또자랑하기, AI분석통계, 회원별기능)
  const handleUpdateFeatures = useCallback(() => {
    console.log("업데이트 예정 기능 - 업데이트 모달 표시");
    setShowUpdateModal(true);
  }, []);

  // ✅ 모달 닫기 핸들러들
  const handleCloseUpdateModal = useCallback(() => {
    setShowUpdateModal(false);
  }, []);

  const handleCloseLottoCheckModal = useCallback(() => {
    setShowLottoCheckModal(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 배경 이미지 */}
      <Image
        source={homePayuserBg}
        style={styles.background}
        resizeMode="contain"
      />

      {/* ✅ Q&A 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '9.5%',
          left: '80.6%',
          width: '16.5%',
          height: '3.1%',
        }]}
        onPress={handleQAPress}
        activeOpacity={0.7}
      />

      {/* ✅ 당첨확인 버튼 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '13.5%',
          left: '69.6%',
          width: '27.5%',
          height: '4.2%',
        }]}
        onPress={handleLottoCheckPress}
        activeOpacity={0.7}
      />

      {/* ✅ 당첨로또 자랑하기 버튼 - 업데이트 예정 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '19.2%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleUpdateFeatures}
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

      {/* ✅ 회원별기능 버튼 - 업데이트 예정 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '37%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleUpdateFeatures}
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
        onPress={handleAIPatternPress}
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
        onPress={handlePremiumPatternPress}
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
        onPress={handleCombinationPress}
        activeOpacity={0.7}
      />

      {/* ✅ AI 분석 통계 버튼 - 업데이트 예정 */}
      <TouchableOpacity
        style={[styles.button, {
          top: '72.7%',
          left: '4.6%',
          width: '32.1%',
          height: '5.2%',
        }]}
        onPress={handleUpdateFeatures}
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
        onPress={handleMyPagePress}
        activeOpacity={0.7}
      />



      {/* ✅ 마이페이지 광고 */}
      {showMyPageAd && (
        <AdPlaceholder
          onComplete={handleMyPageAdComplete}
          duration={15000}
          type="rewarded"
          canSkip={false}
        />
      )}

      {/* ✅ Q&A 광고 */}
      {showQAAd && (
        <AdPlaceholder
          onComplete={handleQAAdComplete}
          duration={15000}
          type="rewarded"
          canSkip={false}
        />
      )}

      {/* ✅ 업데이트 예정 모달 */}
      <UpdateMessageModal
        visible={showUpdateModal}
        onClose={handleCloseUpdateModal}
      />

      {/* ✅ 당첨확인 모달 */}
      <LottoCheckModal
        visible={showLottoCheckModal}
        onClose={handleCloseLottoCheckModal}
      />
    </SafeAreaView>
  );
}

// ✅ 스타일 정의 - 완전 반응형
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

  button: {
    position: "absolute",
    backgroundColor: "transparent",
    // 개발용 노란색 외곽선 제거 - 완성된 버전
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: width * 0.85,
    maxWidth: 400,
    aspectRatio: 0.9,
  },

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