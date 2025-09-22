// ✅ 파일 위치: App.tsx
// JJIK 로또 앱 - 최종 완성 버전
// 모든 실제 화면 연결, TemporaryScreen 완전 제거

import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// 기존 import들 아래에 추가
import PremiumNavigator from "./src/navigation/PremiumNavigator";

// ✅ 기본 화면들
import IntroScreen from "./src/screens/IntroScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainGuest from "./src/screens/MainGuest";
import SignUpScreen from "./src/screens/SignUpScreen";


// ✅ Info 화면들 (8개)
import Info1GuestScreen from "./src/screens/Info1GuestScreen";
import Info2GuestScreen from "./src/screens/Info2GuestScreen";
import Info3GuestScreen from "./src/screens/Info3GuestScreen";
import Info4GuestScreen from "./src/screens/Info4GuestScreen";
import Info5GuestScreen from "./src/screens/Info5GuestScreen";
import Info6GuestScreen from "./src/screens/Info6GuestScreen";
import Info7GuestScreen from "./src/screens/Info7GuestScreen";
import Info8GuestScreen from "./src/screens/Info8GuestScreen";

// ✅ Q&A 화면들 (7개)
import QAMainGuestScreen from "./src/screens/QAMainGuestScreen";
import QAMemberGuestScreen from "./src/screens/QAMemberGuestScreen";
import QANumberGenGuestScreen from "./src/screens/QANumberGenGuestScreen";
import QAAIStatsGuestScreen from "./src/screens/QAAIStatsGuestScreen";
import QAPremiumGuestScreen from "./src/screens/QAPremiumGuestScreen";
import QAEtcGuestScreen from "./src/screens/QAEtcGuestScreen";
import QAInquiryGuestScreen from "./src/screens/QAInquiryGuestScreen";

// ✅ 패턴 화면들 (6개)
import Patterns1to10GuestScreen from "./src/screens/Patterns1to10GuestScreen";
import Patterns11to20GuestScreen from "./src/screens/Patterns11to20GuestScreen";
import Patterns21to30GuestScreen from "./src/screens/Patterns21to30GuestScreen";
import Patterns31to40GuestScreen from "./src/screens/Patterns31to40GuestScreen";
import Patterns41to45GuestScreen from "./src/screens/Patterns41to45GuestScreen";
import Patterns46to55GuestScreen from "./src/screens/Patterns46to55GuestScreen";

// ✅ 개별 패턴 화면들 (9개)
import Pattern47GuestScreen from "./src/screens/Pattern47GuestScreen";
import Pattern48GuestScreen from "./src/screens/Pattern48GuestScreen";
import Pattern49GuestScreen from "./src/screens/Pattern49GuestScreen";
import Pattern50GuestScreen from "./src/screens/Pattern50GuestScreen";
import Pattern51GuestScreen from "./src/screens/Pattern51GuestScreen";
import Pattern52GuestScreen from "./src/screens/Pattern52GuestScreen";
import Pattern53GuestScreen from "./src/screens/Pattern53GuestScreen";
import Pattern54GuestScreen from "./src/screens/Pattern54GuestScreen";
import Pattern55GuestScreen from "./src/screens/Pattern55GuestScreen";

// ✅ 모달 컴포넌트들
import AdPlaceholder from "./src/components/AdPlaceholder";
import NotserviceMessageModal from "./src/components/NotserviceMessageModal";
import FindIdPasswordModal from "./src/components/FindIdPasswordModal";
import OpenpageModal from "./src/components/OpenpageModal";

// ✅ 네비게이션 타입
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

// ✅ JJIK 브랜드 테마
const JJIKTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000000",
    card: "#000000", 
    text: "#FFFFFF",
    border: "#333333",
    notification: "#FF6B35",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={JJIKTheme}>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 300,
          contentStyle: { backgroundColor: "#000000" },
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {/* =================== 기본 화면들 =================== */}
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen 
          name="MainGuest" 
          component={MainGuest}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen name="PremiumStack" component={PremiumNavigator} />

        {/* =================== Info 화면들 =================== */}
        <Stack.Screen name="Info1Guest" component={Info1GuestScreen} />
        <Stack.Screen name="Info2Guest" component={Info2GuestScreen} />
        <Stack.Screen name="Info3Guest" component={Info3GuestScreen} />
        <Stack.Screen name="Info4Guest" component={Info4GuestScreen} />
        <Stack.Screen name="Info5Guest" component={Info5GuestScreen} />
        <Stack.Screen name="Info6Guest" component={Info6GuestScreen} />
        <Stack.Screen name="Info7Guest" component={Info7GuestScreen} />
        <Stack.Screen name="Info8Guest" component={Info8GuestScreen} />

        {/* =================== Q&A 화면들 =================== */}
        <Stack.Screen name="QAMainGuest" component={QAMainGuestScreen} />
        <Stack.Screen name="QAMemberGuest" component={QAMemberGuestScreen} />
        <Stack.Screen name="QANumberGenGuest" component={QANumberGenGuestScreen} />
        <Stack.Screen name="QAAIStatsGuest" component={QAAIStatsGuestScreen} />
        <Stack.Screen name="QAPremiumGuest" component={QAPremiumGuestScreen} />
        <Stack.Screen name="QAEtcGuest" component={QAEtcGuestScreen} />
        <Stack.Screen name="QAInquiryGuest" component={QAInquiryGuestScreen} />

        {/* =================== 패턴 화면들 =================== */}
        <Stack.Screen name="Patterns1to10Guest" component={Patterns1to10GuestScreen} />
        <Stack.Screen name="Patterns11to20Guest" component={Patterns11to20GuestScreen} />
        <Stack.Screen name="Patterns21to30Guest" component={Patterns21to30GuestScreen} />
        <Stack.Screen name="Patterns31to40Guest" component={Patterns31to40GuestScreen} />
        <Stack.Screen name="Patterns41to45Guest" component={Patterns41to45GuestScreen} />
        <Stack.Screen name="Patterns46to55Guest" component={Patterns46to55GuestScreen} />

        {/* =================== 개별 패턴 화면들 =================== */}
        <Stack.Screen name="Pattern47Guest" component={Pattern47GuestScreen} />
        <Stack.Screen name="Pattern48Guest" component={Pattern48GuestScreen} />
        <Stack.Screen name="Pattern49Guest" component={Pattern49GuestScreen} />
        <Stack.Screen name="Pattern50Guest" component={Pattern50GuestScreen} />
        <Stack.Screen name="Pattern51Guest" component={Pattern51GuestScreen} />
        <Stack.Screen name="Pattern52Guest" component={Pattern52GuestScreen} />
        <Stack.Screen name="Pattern53Guest" component={Pattern53GuestScreen} />
        <Stack.Screen name="Pattern54Guest" component={Pattern54GuestScreen} />
        <Stack.Screen name="Pattern55Guest" component={Pattern55GuestScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}