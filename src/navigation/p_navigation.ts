// ✅ 파일 위치: src/navigation/p_navigation.ts
// 프리미엄 회원 전용 네비게이션 타입 정의 (완전 수정판)

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

// 프리미엄 회원 전용 모든 화면과 매개변수 정의
export type RootStackParamList = {
  // 기본 인증 화면
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  PMainHome: undefined;

  // Info 화면들
  PInfo1: undefined;
  PInfo2: undefined;
  PInfo3: undefined;
  PInfo4: undefined;
  PInfo5: undefined;
  PInfo6: undefined;
  PInfo7: undefined;
  PInfo8: undefined;

  // Q&A 화면들
  PQAMain: undefined;
  PQAInquiry: undefined;
  PQANumber: undefined;
  PQAMember: undefined;
  PQAAIStats: undefined;
  PQAPremium: undefined;
  PQAEtc: undefined;

  // 패턴 그룹 화면들
  PPatterns1to10: undefined;
  PPatterns11to20: undefined;
  PPatterns21to30: undefined;
  PPatterns31to40: undefined;
  PPatterns41to45: undefined;
  PPatterns46to55: undefined;
  
  // 개별 패턴 화면들
  PPattern47: undefined;
  PPattern48: undefined;
  PPattern49: undefined;
  PPattern50: undefined;
  PPattern51: undefined;
  PPattern52: undefined;
  PPattern53: undefined;
  PPattern54: undefined;
  PPattern55: undefined;
  
  // 옵션형 패턴 화면들
  POptionPatterns1to5: undefined;
  POptionPatterns6to10: undefined;
  POptionPatterns11to15: undefined;
  POptionPatterns16to20: undefined;

  // 조합 기능
  PCombiHome: undefined;
  PCombiGenCompose: undefined;
  PCombiGenFilter: undefined;
  PCombiOpCompose: undefined;
  PCombiOpFilter: undefined;

  // 마이페이지
  PMyPage: undefined;
  PMyProfile: undefined;
  PMyGenNumber: undefined;
  PMyBuyNumber: undefined;
  PMyCombiSaveCard: undefined;
  PMyPatSaveCard: undefined;
  PMyWinNumberSearch: undefined;
};

// useNavigation 훅에서 사용할 네비게이션 타입
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

// 각 화면별 Props 타입 정의
export type PMainHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'PMainHome'>;
export type PMyPageScreenProps = NativeStackScreenProps<RootStackParamList, 'PMyPage'>;
export type PMyCombiSaveCardProps = NativeStackScreenProps<RootStackParamList, 'PMyCombiSaveCard'>;

// 특정 화면의 네비게이션 타입
export type ScreenNavigationProp<T extends keyof RootStackParamList> = NavigationProp<
  RootStackParamList,
  T
>;

// 특정 화면의 라우트 타입
export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;