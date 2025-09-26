// ✅ 파일 위치: src/types/navigation.ts
// JJIK 로또 앱 게스트 전용 네비게이션 타입 정의

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type GuestStackParamList = {
  // 기본 인증 및 메인 화면
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  GMainHome: undefined;
  // PremiumStack: undefined;

  // Info 화면들 (게스트용)
  Info1Guest: undefined;
  Info2Guest: undefined;
  Info3Guest: undefined;
  Info4Guest: undefined;
  Info5Guest: undefined;
  Info6Guest: undefined;
  Info7Guest: undefined;
  Info8Guest: undefined;
  
  // Q&A 화면들 (게스트용)
  QAMainGuest: undefined;
  QAMemberGuest: undefined;
  QANumberGenGuest: undefined;
  QAAIStatsGuest: undefined;
  QAPremiumGuest: undefined;
  QAEtcGuest: undefined;
  QAInquiryGuest: undefined;
  
  // 패턴 화면들 (게스트용)
  Patterns1to10Guest: undefined;
  Patterns11to20Guest: undefined;
  Patterns21to30Guest: undefined;
  Patterns31to40Guest: undefined;
  Patterns41to45Guest: undefined;
  Patterns46to55Guest: undefined;

  // 개별 패턴 화면들 (게스트용)
  Pattern47Guest: undefined;
  Pattern48Guest: undefined;
  Pattern49Guest: undefined;
  Pattern50Guest: undefined;
  Pattern51Guest: undefined;
  Pattern52Guest: undefined;
  Pattern53Guest: undefined;
  Pattern54Guest: undefined;
  Pattern55Guest: undefined;
};

export type GuestStackNavigationProp = NativeStackNavigationProp<GuestStackParamList>;