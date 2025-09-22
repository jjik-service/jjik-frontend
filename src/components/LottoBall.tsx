// ✅ 파일 위치: src/components/LottoBall.tsx
// JJIK 로또공 공통 컴포넌트
// 모든 화면에서 일관된 로또공 디자인과 색상을 적용하기 위한 재사용 가능한 컴포넌트

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { getLottoNumberColor } from '../utils/LottoColors';

// 화면 크기 및 디자인 기준
const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// LottoBall 컴포넌트 Props 타입 정의
interface LottoBallProps {
  number: number; // 로또 번호 (1~45)
  size?: number; // 로또공 크기 (선택적, 기본값: 반응형 계산)
  fontSize?: number; // 텍스트 크기 (선택적, 기본값: 반응형 계산)
  borderColor?: string; // 테두리 색상 (선택적, 기본값: #cedcff)
  borderWidth?: number; // 테두리 두께 (선택적, 기본값: 1)
}

/**
 * 로또공 컴포넌트
 * 번호에 따라 자동으로 색상이 적용되는 로또공을 렌더링
 * 
 * @param number - 표시할 로또 번호 (1~45)
 * @param size - 로또공 크기 (픽셀, 기본값: 반응형)
 * @param fontSize - 번호 텍스트 크기 (픽셀, 기본값: 반응형)
 * @param borderColor - 테두리 색상 (HEX, 기본값: #cedcff)
 * @param borderWidth - 테두리 두께 (픽셀, 기본값: 1)
 */
export const LottoBall: React.FC<LottoBallProps> = ({ 
  number, 
  size = 80 * (width / DESIGN_WIDTH), // 반응형 기본 크기
  fontSize = 64 * (width / DESIGN_WIDTH), // 반응형 기본 폰트 크기
  borderColor = '#cedcff', // 기본 테두리 색상
  borderWidth = 1, // 기본 테두리 두께
}) => {
  return (
    <View style={[
      styles.lottoBall,
      {
        width: size,
        height: size,
        borderRadius: size / 2, // 완전한 원형을 위해 크기의 절반
        backgroundColor: getLottoNumberColor(number), // 번호별 자동 색상 적용
        borderColor: borderColor,
        borderWidth: borderWidth,
      }
    ]}>
      <Text style={[styles.ballText, { fontSize }]}>{number}</Text>
    </View>
  );
};

// 보너스 로또공 Props 타입 정의
interface BonusLottoBallProps {
  number: number; // 보너스 번호
  size?: number; // 로또공 크기 (선택적, 기본값: 반응형 계산)
  fontSize?: number; // 텍스트 크기 (선택적, 기본값: 반응형 계산)
}

/**
 * 보너스번호용 로또공 컴포넌트
 * 일반 로또공과 구별되는 노란색 배경과 검은색 테두리 적용
 * 
 * @param number - 표시할 보너스 번호
 * @param size - 로또공 크기 (픽셀, 기본값: 반응형)
 * @param fontSize - 번호 텍스트 크기 (픽셀, 기본값: 반응형)
 */
export const BonusLottoBall: React.FC<BonusLottoBallProps> = ({ 
  number, 
  size = 80 * (width / DESIGN_WIDTH), // 반응형 기본 크기
  fontSize = 64 * (width / DESIGN_WIDTH), // 반응형 기본 폰트 크기
}) => {
  return (
    <View style={[
      styles.lottoBall,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#eeff00', // 보너스번호 전용 노란색
        borderColor: '#000', // 보너스번호 전용 검은색 테두리
        borderWidth: 1,
      }
    ]}>
      <Text style={[styles.bonusBallText, { fontSize }]}>{number}</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  // 로또공 공통 스타일
  lottoBall: {
    alignItems: 'center', // 가로 중앙 정렬
    justifyContent: 'center', // 세로 중앙 정렬
    // 그림자 효과 (iOS)
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // 그림자 효과 (Android)
    elevation: 3,
  },
  
  // 일반 로또공 번호 텍스트 스타일
  ballText: {
    fontWeight: '900', // 매우 굵은 폰트
    color: '#fff', // 흰색 텍스트 (대부분 배경과 대비)
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  
  // 보너스 로또공 번호 텍스트 스타일
  bonusBallText: {
    fontWeight: '900', // 매우 굵은 폰트
    color: '#000', // 검은색 텍스트 (노란 배경과 대비)
    textAlign: 'center', // 텍스트 중앙 정렬
  },
});