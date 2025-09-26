// 📁 src/screens/IntroScreen.tsx
// ✅ 영상보다 배경이 먼저 → 로그인으로 넘어갈 때 login_bg도 미리 불러옴
// src/screens/IntroScreen.tsx
// 영상보다 배경이 먼저 → 로그인으로 넘어갈 때 login_bg도 미리 불러옴
// src/screens/IntroScreen.tsx
// 배경 이미지 위에 정확한 위치의 인트로 동영상

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";

// 로컬 타입 정의
type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  MainGuest: undefined;
  MainMember: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function IntroScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 5400);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleBackgroundLoad = () => {
    // 배경 이미지 로드 완료 후 200ms 뒤 동영상 시작
    setTimeout(() => {
      setShowVideo(true);
    }, 10);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/pages/open_bg.png")}
      style={styles.background}
      resizeMode="contain"
      onLoad={handleBackgroundLoad}
    >
      {/*
      {showVideo && (
        <View style={styles.videoContainer}>
          
          <Video
            source={require("../../assets/videos/intro.mp4")}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isMuted={false}
            isLooping={false}
            useNativeControls={false}
          />
        </View>
      )} */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    position: "absolute",
    top: screenHeight * 0.525,    // 위로 조정된 위치
    left: screenWidth * 0.03,
    width: screenWidth * 0.94,
    height: screenHeight * 0.3,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});