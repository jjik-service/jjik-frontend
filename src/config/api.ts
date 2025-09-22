// src/config/api.ts
// JJIK 백엔드 API 설정

// 운영 환경
export const API_BASE_URL = 'https://jjik.kr:8000';

// 개발 환경에서는 localhost 사용
export const DEV_API_BASE_URL = 'http://localhost:8000';

// 현재 환경에 따라 API URL 결정
export const getApiUrl = () => {
  // 웹에서 실행 중이고 localhost가 아니면 운영 환경
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return API_BASE_URL;
  }
  return DEV_API_BASE_URL;
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