// ✅ 파일 위치: src/navigation/PremiumNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './p_navigation';

// ✅ 프리미엄 화면 import
import PMainHome from '../p_member/PMainHome';

// ✅ Info 화면들 (Screen → .tsx 확장자로 수정)
import PInfo1 from '../p_member/screens/info/PInfo1Screen';
import PInfo2 from '../p_member/screens/info/PInfo2Screen';
import PInfo3 from '../p_member/screens/info/PInfo3Screen';
import PInfo4 from '../p_member/screens/info/PInfo4Screen';
import PInfo5 from '../p_member/screens/info/PInfo5Screen';
import PInfo6 from '../p_member/screens/info/PInfo6Screen';
import PInfo7 from '../p_member/screens/info/PInfo7Screen';
import PInfo8 from '../p_member/screens/info/PInfo8Screen';

// ✅ g_patterns 화면들
import PPatterns1to10 from '../p_member/screens/g_patterns/PPatterns1to10Screen';
import PPatterns11to20 from '../p_member/screens/g_patterns/PPatterns11to20Screen';
import PPatterns21to30 from '../p_member/screens/g_patterns/PPatterns21to30Screen';
import PPatterns31to40 from '../p_member/screens/g_patterns/PPatterns31to40Screen';
import PPatterns41to45 from '../p_member/screens/g_patterns/PPatterns41to45Screen';
import PPatterns46to55 from '../p_member/screens/g_patterns/PPatterns46to55Screen';

// ✅ 개별 패턴들
import PPattern47 from '../p_member/screens/g_patterns/PPattern47Screen';
import PPattern48 from '../p_member/screens/g_patterns/PPattern48Screen';
import PPattern49 from '../p_member/screens/g_patterns/PPattern49Screen';
import PPattern50 from '../p_member/screens/g_patterns/PPattern50Screen';
import PPattern51 from '../p_member/screens/g_patterns/PPattern51Screen';
import PPattern52 from '../p_member/screens/g_patterns/PPattern52Screen';
import PPattern53 from '../p_member/screens/g_patterns/PPattern53Screen';
import PPattern54 from '../p_member/screens/g_patterns/PPattern54Screen';
import PPattern55 from '../p_member/screens/g_patterns/PPattern55Screen';

// ✅ o_patterns 화면들
import POptionPatterns1to5 from '../p_member/screens/o_patterns/POptionPatterns1to5Screen';
import POptionPatterns6to10 from '../p_member/screens/o_patterns/POptionPatterns6to10Screen';
import POptionPatterns11to15 from '../p_member/screens/o_patterns/POptionPatterns11to15Screen';
import POptionPatterns16to20 from '../p_member/screens/o_patterns/POptionPatterns16to20Screen';

// ✅ combination 화면들
import PCombiHome from '../p_member/screens/combination/PCombiHome';
import PCombiGenFilter from '../p_member/screens/combination/PCombiGenFilter';
import PCombiOpFilter from '../p_member/screens/combination/PCombiOpFilter';
import PCombiGenCompose from '../p_member/screens/combination/PCombiGenCompose';
import PCombiOpCompose from '../p_member/screens/combination/PCombiOpCompose';

// ✅ mypage 화면들 (파일명 수정)
import PMyPage from '../p_member/screens/mypage/PMyPageScreen';
import PMyProfile from '../p_member/screens/mypage/PMyProfileScreen';
import PMyGenNumber from '../p_member/screens/mypage/PMyGenNumberScreen';
import PMyBuyNumber from '../p_member/screens/mypage/PMyBuyNumberScreen';
import PMyCombiSaveCard from '../p_member/screens/mypage/PMyCombiSaveCardScreen';
// ✅ 추가 파일들
import PMyPatSaveCard from '../p_member/screens/mypage/PMyPatSaveCardScreen';
import PMyWinNumberSearch from '../p_member/screens/mypage/PMyWinNumberSearchScreen';

// ✅ Q&A 화면들
import PQAMain from '../p_member/screens/Q&A/PQAMainScreen';
import PQAMember from '../p_member/screens/Q&A/PQAMemberScreen';
import PQANumber from '../p_member/screens/Q&A/PQANumberScreen';
import PQAAIStats from '../p_member/screens/Q&A/PQAAIStatsScreen';
import PQAPremium from '../p_member/screens/Q&A/PQAPremiumScreen';
import PQAEtc from '../p_member/screens/Q&A/PQAEtcScreen';
import PQAInquiry from '../p_member/screens/Q&A/PQAInquiryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PremiumNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false 
      }}
      initialRouteName="PMainHome"
    >
      {/* ✅ 프리미엄 메인 홈 */}
      <Stack.Screen name="PMainHome" component={PMainHome} />
      
      {/* ✅ Info 화면들 */}
      <Stack.Screen name="PInfo1" component={PInfo1} />
      <Stack.Screen name="PInfo2" component={PInfo2} />
      <Stack.Screen name="PInfo3" component={PInfo3} />
      <Stack.Screen name="PInfo4" component={PInfo4} />
      <Stack.Screen name="PInfo5" component={PInfo5} />
      <Stack.Screen name="PInfo6" component={PInfo6} />
      <Stack.Screen name="PInfo7" component={PInfo7} />
      <Stack.Screen name="PInfo8" component={PInfo8} />
      
      {/* ✅ 패턴 그룹 화면들 */}
      <Stack.Screen name="PPatterns1to10" component={PPatterns1to10} />
      <Stack.Screen name="PPatterns11to20" component={PPatterns11to20} />
      <Stack.Screen name="PPatterns21to30" component={PPatterns21to30} />
      <Stack.Screen name="PPatterns31to40" component={PPatterns31to40} />
      <Stack.Screen name="PPatterns41to45" component={PPatterns41to45} />
      <Stack.Screen name="PPatterns46to55" component={PPatterns46to55} />
      
      {/* ✅ 개별 패턴들 */}
      <Stack.Screen name="PPattern47" component={PPattern47} />
      <Stack.Screen name="PPattern48" component={PPattern48} />
      <Stack.Screen name="PPattern49" component={PPattern49} />
      <Stack.Screen name="PPattern50" component={PPattern50} />
      <Stack.Screen name="PPattern51" component={PPattern51} />
      <Stack.Screen name="PPattern52" component={PPattern52} />
      <Stack.Screen name="PPattern53" component={PPattern53} />
      <Stack.Screen name="PPattern54" component={PPattern54} />
      <Stack.Screen name="PPattern55" component={PPattern55} />
      
      {/* ✅ 옵션형 패턴들 */}
      <Stack.Screen name="POptionPatterns1to5" component={POptionPatterns1to5} />
      <Stack.Screen name="POptionPatterns6to10" component={POptionPatterns6to10} />
      <Stack.Screen name="POptionPatterns11to15" component={POptionPatterns11to15} />
      <Stack.Screen name="POptionPatterns16to20" component={POptionPatterns16to20} />
      
      {/* ✅ 조합 기능들 */}
      <Stack.Screen name="PCombiHome" component={PCombiHome} />
      <Stack.Screen name="PCombiGenFilter" component={PCombiGenFilter} />
      <Stack.Screen name="PCombiOpFilter" component={PCombiOpFilter} />
      <Stack.Screen name="PCombiGenCompose" component={PCombiGenCompose} />
      <Stack.Screen name="PCombiOpCompose" component={PCombiOpCompose} />
      
      {/* ✅ 마이페이지들 */}
      <Stack.Screen name="PMyPage" component={PMyPage} />
      <Stack.Screen name="PMyProfile" component={PMyProfile} />
      <Stack.Screen name="PMyGenNumber" component={PMyGenNumber} />
      <Stack.Screen name="PMyBuyNumber" component={PMyBuyNumber} />
      <Stack.Screen name="PMyCombiSaveCard" component={PMyCombiSaveCard} />
      <Stack.Screen name="PMyPatSaveCard" component={PMyPatSaveCard} />
      <Stack.Screen name="PMyWinNumberSearch" component={PMyWinNumberSearch} />
      
      {/* ✅ Q&A 화면들 */}
      <Stack.Screen name="PQAMain" component={PQAMain} />
      <Stack.Screen name="PQAMember" component={PQAMember} />
      <Stack.Screen name="PQANumber" component={PQANumber} />
      <Stack.Screen name="PQAAIStats" component={PQAAIStats} />
      <Stack.Screen name="PQAPremium" component={PQAPremium} />
      <Stack.Screen name="PQAEtc" component={PQAEtc} />
      <Stack.Screen name="PQAInquiry" component={PQAInquiry} />
      
    </Stack.Navigator>
  );
}