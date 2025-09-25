// src/config/api.ts
// JJIK 백엔드 API 설정

// 운영 환경 (실서버)
export const API_BASE_URL = 'https://app.jjik.kr';

// React Native 환경에서 항상 실서버 사용
export const getApiUrl = () => {
  return API_BASE_URL;
};

// API 엔드포인트들
export const API_ENDPOINTS = {
  // 메타 정보
  features: '/meta/features',
  uiStrings: '/meta/ui-strings',
  entitlements: '/meta/entitlements',
  
  // 번호 생성
  generate: '/generate',
  optionGenerate: '/option-generate',
  
  // 인증
  auth: '/auth',
  
  // 통계
  statistics: '/statistics',
  
  // 기타
  health: '/health'
};