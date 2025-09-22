// ✅ 파일 위치: src/utils/lottoColors.ts
// JJIK 로또 번호별 색상 유틸리티 함수
// 실제 로또 번호 범위별 색상 규칙을 적용하여 일관된 UI 제공

/**
 * 로또 번호에 따른 공식 색상을 반환하는 유틸리티 함수
 * 실제 로또 번호별 색상 규칙을 따름
 * 
 * @param number - 로또 번호 (1~45)
 * @returns 해당 번호 범위의 색상 코드 (HEX)
 */
export const getLottoNumberColor = (number: number): string => {
    // 1~10번: 노란색 계열
    if (number >= 1 && number <= 10) return '#FBC400';
    
    // 11~20번: 파란색 계열
    if (number >= 11 && number <= 20) return '#69C8F2';
    
    // 21~30번: 빨간색 계열
    if (number >= 21 && number <= 30) return '#FF7272';
    
    // 31~40번: 회색 계열
    if (number >= 31 && number <= 40) return '#AAAAAA';
    
    // 41~45번: 초록색 계열
    if (number >= 41 && number <= 45) return '#B0D840';
    
    // 범위를 벗어난 경우 기본 색상 (보라색)
    return '#5c5bef';
  };