// ✅ 파일 위치: src/types/navigation.ts
// JJIK 로또 앱 완전한 네비게이션 타입 정의 (수정된 완전판)

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 앱의 모든 화면과 매개변수 정의 (100개 이상 화면 지원)
export type RootStackParamList = {
  // =================== 기본 인증 및 메인 화면 ===================
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  MainGuest: undefined;
  PMainHome: undefined;
  PremiumStack: undefined;

  // =================== Info 화면들 (게스트용) ===================
  Info1Guest: undefined;
  Info2Guest: undefined;
  Info3Guest: undefined;
  Info4Guest: undefined;
  Info5Guest: undefined;
  Info6Guest: undefined;
  Info7Guest: undefined;
  Info8Guest: undefined;
  
  // =================== Q&A 화면들 (게스트용) ===================
  QAMainGuest: undefined;
  QAMemberGuest: undefined;
  QANumberGenGuest: undefined;
  QAAIStatsGuest: undefined;
  QAPremiumGuest: undefined;
  QAEtcGuest: undefined;
  QAInquiryGuest: undefined;
  
  // =================== 패턴 화면들 (게스트용) ===================
  Patterns1to10Guest: undefined;
  Patterns11to20Guest: undefined;
  Patterns21to30Guest: undefined;
  Patterns31to40Guest: undefined;
  Patterns41to45Guest: undefined;
  Patterns46to55Guest: undefined;

  // =================== 개별 패턴 화면들 (게스트용) - 🔥 추가됨 ===================
  Pattern47Guest: undefined;
  Pattern48Guest: undefined;
  Pattern49Guest: undefined;
  Pattern50Guest: undefined;
  Pattern51Guest: undefined;
  Pattern52Guest: undefined;
  Pattern53Guest: undefined;
  Pattern54Guest: undefined;
  Pattern55Guest: undefined;

  // =================== 회원 전용 화면들 (추후 추가) ===================
  // Info 화면들 (회원용)
  // Info1Member: undefined;
  // Info2Member: undefined;
  // ... (필요시 추가)
  
  // Q&A 화면들 (회원용)
  // QAMainMember: undefined;
  // QAMemberMember: undefined;
  // ... (필요시 추가)
  
  // 패턴 화면들 (회원용)
  // Patterns1to10Member: undefined;
  // Patterns11to20Member: undefined;
  // ... (필요시 추가)

  // =================== 옵션형 패턴 화면들 (추후 추가) ===================
  // OptionPatterns: undefined;
  // OptionPattern1: undefined;
  // OptionPattern2: undefined;
  // ... OptionPattern20까지

  // =================== AI 추천 화면들 (추후 추가) ===================
  // AIRecommend: undefined;
  // AIStats: undefined;
  // AIAnalysis: undefined;

  // =================== 조합 화면들 (추후 추가) ===================
  // CombinationHome: undefined;
  // MyCombination: undefined;
  // NewCombination: undefined;

  // =================== 부가 기능들 (추후 추가) ===================
  // Statistics: undefined;
  // WinningCheck: undefined;
  // NumberHistory: undefined;
  // Settings: undefined;
  // Profile: undefined;
  // Notice: undefined;
  // Event: undefined;

  // =================== 결제 및 요금제 (추후 추가) ===================
  // Subscription: undefined;
  // Payment: undefined;
  // Premium: undefined;

  // =================== 기타 (추후 추가) ===================
  // Test: undefined;
  // Debug: undefined;
  // Tutorial: undefined;
  // Guide: undefined;
};

// navigation.navigate("Login") → 타입 자동완성 지원
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// =================== 개발 가이드 ===================
/* 
화면 추가시 가이드:

1. 새 화면 타입 추가:
   RootStackParamList에 화면 이름과 파라미터 추가
   예: NewScreen: { userId: string; } | undefined;

2. App.tsx에 Screen 추가:
   <Stack.Screen name="NewScreen" component={NewScreenComponent} />

3. 네비게이션 사용시:
   const navigation = useNavigation<RootStackNavigationProp>();
   navigation.navigate('NewScreen', { userId: '123' });

4. 파라미터가 있는 화면의 경우:
   export type NewScreenParams = {
     userId: string;
     optional?: number;
   };
   
   RootStackParamList에서:
   NewScreen: NewScreenParams;

5. 타입 안전성:
   - 모든 화면 이름이 자동완성됨
   - 파라미터 타입 체크 자동
   - 존재하지 않는 화면 네비게이션시 컴파일 에러
*/