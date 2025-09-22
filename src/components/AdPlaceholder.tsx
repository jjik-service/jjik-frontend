// src/components/AdPlaceholder.tsx
// 광고 자리 잡아두기 컴포넌트 (개발용)
// 나중에 실제 AdMob으로 교체 예정

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// 화면 크기 정보
const { width } = Dimensions.get("window");

// 컴포넌트 props 타입 정의
interface AdPlaceholderProps {
  onComplete: () => void;  // 광고 완료시 실행할 함수
  duration?: number;       // 광고 시간 (기본값: 5초)
  type?: "banner" | "interstitial" | "rewarded";  // 광고 타입
  canSkip?: boolean;       // 건너뛰기 버튼 표시 여부
  skipAfter?: number;      // 몇 초 후 건너뛰기 가능 (기본값: 5초)
}

/**
 * AdPlaceholder 컴포넌트
 * - 개발 단계에서 광고 자리를 잡아두는 가짜 광고
 * - 실제 배포시에는 AdMob으로 교체
 * - 사용자 플로우 테스트용
 */
export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ 
  onComplete, 
  duration = 3000,  // 기본 3초
  type = "interstitial",
  canSkip = false,
  skipAfter = 5000,  // 5초 후 건너뛰기 가능
}) => {
  const [countdown, setCountdown] = useState(Math.floor(duration / 1000));
  const [isLoading, setIsLoading] = useState(true);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [skipCountdown, setSkipCountdown] = useState(Math.floor(skipAfter / 1000));

  /**
   * 광고 로딩 시뮬레이션 (1초)
   * 실제로는 AdMob이 광고를 로드하는 시간
   */
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  /**
   * 건너뛰기 버튼 타이머 (canSkip이 true일 때만)
   */
  useEffect(() => {
    if (!canSkip || isLoading) return;

    if (skipCountdown > 0) {
      const timer = setTimeout(() => {
        setSkipCountdown(skipCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowSkipButton(true);
    }
  }, [skipCountdown, isLoading, canSkip]);

  /**
   * 메인 카운트다운 타이머
   * 광고 시청 시간을 시뮬레이션
   */
  useEffect(() => {
    if (isLoading) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 카운트다운 완료 -> 광고 완료 콜백 실행
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [countdown, isLoading, onComplete]);

  /**
   * 건너뛰기 버튼 클릭
   */
  const handleSkip = () => {
    onComplete();
  };

  // 광고 타입별 스타일
  const getAdStyle = () => {
    switch (type) {
      case "banner":
        return styles.bannerAd;
      case "rewarded":
        return styles.rewardedAd;
      default:
        return styles.interstitialAd;
    }
  };

  // 광고 타입별 메시지
  const getAdMessage = () => {
    switch (type) {
      case "banner":
        return "배너 광고 영역";
      case "rewarded":
        return "보상형 광고 시청 중...";
      default:
        return "광고 시청 중...";
    }
  };

  // 광고 타입별 아이콘
  const getAdIcon = () => {
    switch (type) {
      case "banner":
        return "📋";
      case "rewarded":
        return "🎁";
      default:
        return "📺";
    }
  };

  return (
    <View style={[styles.container, getAdStyle()]}>
      {isLoading ? (
        // 광고 로딩 중
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>광고 로딩 중...</Text>
        </View>
      ) : (
        // 광고 시청 중
        <View style={styles.adContent}>
          <Text style={styles.adTitle}>
            {getAdIcon()} {getAdMessage()}
          </Text>
          <Text style={styles.adSubtitle}>개발용 가짜 광고입니다</Text>
          
          {type !== "banner" && (
            <View style={styles.adVideo}>
              <Text style={styles.adVideoText}>🎬 광고 영상 자리</Text>
              <Text style={styles.countdown}>{countdown}초 남음</Text>
              
              {/* 광고 진행률 바 */}
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${((Math.floor(duration / 1000) - countdown) / Math.floor(duration / 1000)) * 100}%` 
                    }
                  ]} 
                />
              </View>
            </View>
          )}
          
          <Text style={styles.adNote}>
            * 실제 배포시에는 AdMob 광고로 교체됩니다
          </Text>
        </View>
      )}
    </View>
  );
};

/**
 * 스타일 정의
 */
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  
  // 전면 광고 (화면 전체)
  interstitialAd: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  
  // 보상형 광고 (화면 전체)
  rewardedAd: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },
  
  // 배너 광고 (하단 배너)
  bannerAd: {
    width: width,
    height: 60,
    backgroundColor: "#333",
    borderTopWidth: 1,
    borderTopColor: "#555",
  },
  
  // 로딩 상태
  loadingContainer: {
    alignItems: "center",
  },
  
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
  },
  
  // 광고 컨텐츠
  adContent: {
    alignItems: "center",
    padding: 20,
  },
  
  adTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  
  adSubtitle: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 24,
  },
  
  // 가짜 광고 영상 영역
  adVideo: {
    width: width * 0.8,
    height: 200,
    backgroundColor: "#222",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#444",
    borderStyle: "dashed",
  },
  
  adVideoText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  
  countdown: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 16,
  },
  
  // 진행률 바
  progressBarContainer: {
    width: width * 0.7,
    height: 4,
    backgroundColor: "#444",
    borderRadius: 2,
    overflow: "hidden",
  },
  
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  
  // 건너뛰기 관련
  skipContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  
  skipButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  
  skipButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  
  skipWaitText: {
    color: "#999",
    fontSize: 12,
  },
  
  adNote: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default AdPlaceholder;
