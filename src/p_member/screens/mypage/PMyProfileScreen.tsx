// ✅ 파일 위치: src/p_member/screens/mypage/PMyProfileScreen.tsx
// JJIK 프리미엄 회원 개인정보 수정 화면

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  TextInput,
  Modal,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

// 네비게이션 타입 정의
type RootStackParamList = {
  PMainHome: undefined;
  PMyPage: undefined;
  Intro: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

// 화면 크기 및 디자인 기준
const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 1092;
const DESIGN_HEIGHT = 1920;

// 사용자 정보 타입
interface UserInfo {
  id: string;
  phone: string;
  memberType: 'FREE' | 'BASIC' | 'PREMIUM';
  expireDate: string;
  marketingAgreement: boolean;
}

// API 응답 타입
interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

// 아이디/비밀번호 변경 모달 컴포넌트
const ChangeIdPasswordModal = ({ 
  visible, 
  onClose, 
  onSave 
}: { 
  visible: boolean; 
  onClose: () => void;
  onSave: (data: {id: string, password: string, phone: string}) => void;
}) => {
  const [newId, setNewId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!newId.trim()) {
      newErrors.id = '아이디를 입력해주세요';
    } else if (newId.length < 4) {
      newErrors.id = '아이디는 4자 이상이어야 합니다';
    }
    
    if (!newPassword.trim()) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (newPassword.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phone = '핸드폰 번호를 입력해주세요';
    } else if (phoneNumber.length < 10) {
      newErrors.phone = '올바른 핸드폰 번호를 입력해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        id: newId,
        password: newPassword,
        phone: phoneNumber
      });
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setNewId('');
    setNewPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.changeModalContent}>
          <Text style={styles.changeModalTitle}>아이디 / 비밀번호 변경</Text>
          
          <View style={styles.changeFormContainer}>
            {/* 새 아이디 입력 */}
            <View style={styles.changeInputGroup}>
              <Text style={styles.changeInputLabel}>새 아이디</Text>
              <TextInput
                style={[styles.changeInput, errors.id && styles.changeInputError]}
                value={newId}
                onChangeText={setNewId}
                placeholder="새 아이디를 입력하세요"
                placeholderTextColor="#999"
              />
              {errors.id && <Text style={styles.changeErrorText}>{errors.id}</Text>}
            </View>

            {/* 새 비밀번호 입력 */}
            <View style={styles.changeInputGroup}>
              <Text style={styles.changeInputLabel}>새 비밀번호</Text>
              <TextInput
                style={[styles.changeInput, errors.password && styles.changeInputError]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="새 비밀번호를 입력하세요"
                placeholderTextColor="#999"
                secureTextEntry
              />
              {errors.password && <Text style={styles.changeErrorText}>{errors.password}</Text>}
            </View>

            {/* 비밀번호 확인 */}
            <View style={styles.changeInputGroup}>
              <Text style={styles.changeInputLabel}>비밀번호 확인</Text>
              <TextInput
                style={[styles.changeInput, errors.confirmPassword && styles.changeInputError]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="비밀번호를 다시 입력하세요"
                placeholderTextColor="#999"
                secureTextEntry
              />
              {errors.confirmPassword && <Text style={styles.changeErrorText}>{errors.confirmPassword}</Text>}
            </View>

            {/* 핸드폰 번호 */}
            <View style={styles.changeInputGroup}>
              <Text style={styles.changeInputLabel}>핸드폰 번호</Text>
              <TextInput
                style={[styles.changeInput, errors.phone && styles.changeInputError]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="핸드폰 번호를 입력하세요"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                maxLength={11}
              />
              {errors.phone && <Text style={styles.changeErrorText}>{errors.phone}</Text>}
            </View>
          </View>

          {/* 버튼들 */}
          <View style={styles.changeButtonContainer}>
            <TouchableOpacity
              style={[styles.changeButton, styles.changeCancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.changeCancelButtonText}>닫기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.changeButton, styles.changeSaveButton]}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.changeSaveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.changeCloseButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={styles.changeCloseButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.modalBackdrop}
          onPress={handleClose}
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
};

// 고급 로그아웃 확인 모달
const LogoutModal = ({ 
  visible, 
  onClose, 
  onConfirm 
}: { 
  visible: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity 
      style={styles.modalOverlay} 
      onPress={onClose} 
      activeOpacity={1}
    >
      <View style={styles.premiumAlertModalContent}>
        {/* 아이콘 */}
        <View style={styles.alertIconContainer}>
          <Text style={styles.alertIcon}>🚪</Text>
        </View>
        
        {/* 제목 */}
        <Text style={styles.alertTitle}>로그아웃</Text>
        
        {/* 메시지 */}
        <Text style={styles.alertMessage}>
          정말 로그아웃 하시겠습니까?{"\n"}
          현재 작업 중인 내용이 저장되지 않을 수 있습니다.
        </Text>
        
        {/* 추가 정보 */}
        <View style={styles.alertInfoBox}>
          <Text style={styles.alertInfoText}>
            💡 다음에 더 빠르게 로그인하려면{"\n"}자동 로그인을 설정해보세요
          </Text>
        </View>
        
        {/* 버튼들 */}
        <View style={styles.premiumAlertButtonContainer}>
          <TouchableOpacity 
            style={[styles.premiumAlertButton, styles.premiumCancelButton]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.premiumCancelButtonText}>취소</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.premiumAlertButton, styles.premiumConfirmButton]}
            onPress={onConfirm}
            activeOpacity={0.7}
          >
            <Text style={styles.premiumConfirmButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

// 고급 계정삭제 확인 모달
const DeleteAccountModal = ({ 
  visible, 
  onClose, 
  onConfirm 
}: { 
  visible: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  
  const handleConfirm = () => {
    if (confirmText === '계정삭제' && isAgreed) {
      onConfirm();
      setConfirmText('');
      setIsAgreed(false);
    }
  };
  
  const handleClose = () => {
    setConfirmText('');
    setIsAgreed(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.dangerModalContent}>
          {/* 경고 아이콘 */}
          <View style={styles.dangerIconContainer}>
            <Text style={styles.dangerIcon}>⚠️</Text>
          </View>
          
          {/* 제목 */}
          <Text style={styles.dangerTitle}>계정 완전 삭제</Text>
          
          {/* 경고 메시지 */}
          <Text style={styles.dangerMessage}>
         
          </Text>
          
          {/* 삭제될 항목들 */}
          <View style={styles.deleteItemsList}>
            <Text style={styles.deleteItem}>• 모든 생성한 로또 번호</Text>
            <Text style={styles.deleteItem}>• 저장된 패턴 및 조합</Text>
            <Text style={styles.deleteItem}>• 개인정보 및 결제 내역</Text>
            <Text style={styles.deleteItem}>• 프리미엄 구독 혜택</Text>
            <Text style={styles.deleteItem}>• 계정 복구 불가능</Text>
          </View>
          
          {/* 확인 입력 */}
          <View style={styles.confirmInputContainer}>
            <Text style={styles.confirmInputLabel}>
              계속하려면 "계정삭제"를 정확히 입력하세요:
            </Text>
            <TextInput
              style={styles.confirmInput}
              value={confirmText}
              onChangeText={setConfirmText}
              placeholder="계정삭제"
              placeholderTextColor="#ccc"
            />
          </View>
          
          {/* 체크박스 */}
          <TouchableOpacity 
            style={styles.agreementContainer}
            onPress={() => setIsAgreed(!isAgreed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
              {isAgreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.agreementText}>
              위 내용을 이해했으며, 계정 삭제에 동의합니다
            </Text>
          </TouchableOpacity>
          
          {/* 버튼들 */}
          <View style={styles.dangerButtonContainer}>
            <TouchableOpacity 
              style={[styles.dangerButton, styles.dangerCancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.dangerCancelButtonText}>취소</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.dangerButton, 
                styles.dangerDeleteButton,
                !(confirmText === '계정삭제' && isAgreed) && styles.dangerDeleteButtonDisabled
              ]}
              onPress={!(confirmText === '계정삭제' && isAgreed) ? undefined : handleConfirm}
              activeOpacity={!(confirmText === '계정삭제' && isAgreed) ? 1 : 0.7}
            >
              <Text style={[
                styles.dangerDeleteButtonText,
                !(confirmText === '계정삭제' && isAgreed) && styles.dangerDeleteButtonTextDisabled
              ]}>
                영구 삭제
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.modalBackdrop}
          onPress={onClose}
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
};

const PMyProfileScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    phone: '',
    memberType: 'PREMIUM',
    expireDate: '',
    marketingAgreement: false  // API에서 로드될 때까지 기본값 false
  });

  // 모달 상태들
  const [showFindModal, setShowFindModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ 사용자 토큰 (실제 앱에서는 AsyncStorage나 Context에서 가져와야 함)
  const [userToken, setUserToken] = useState<string>(''); // TODO: 실제 토큰으로 교체

  // 초기 사용자 정보 로드
  useEffect(() => {
    loadUserProfile();
  }, []);

  // 사용자 프로필 정보 로드
  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      // ✅ 백엔드 API 호출 - 사용자 프로필 조회
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success && data.data) {
          setUserInfo(data.data);
        } else {
          throw new Error(data.message || 'API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('사용자 프로필 로드 실패:', error);
      Alert.alert('오류', '사용자 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 찍로고 버튼 클릭 - PMainHome으로 이동
  const handleLogoPress = () => {
    navigation.navigate('PMainHome');
  };

  // 이전 버튼 클릭 - PMyPage로 이동
  const handleBackPress = () => {
    navigation.navigate('PMyPage');
  };

  // 아이디 변경 버튼 클릭
  const handleIdChangePress = () => {
    setShowFindModal(true);
  };

  // 비밀번호 변경 버튼 클릭 - 변경 모달 표시
  const handlePasswordChangePress = () => {
    setShowFindModal(true);
  };

  // 아이디/비밀번호 변경 완료
  const handleSaveChanges = async (data: {id: string, password: string, phone: string}) => {
    setIsLoading(true);
    try {
      // ✅ 백엔드 API 호출 - 사용자 정보 업데이트
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          id: data.id,
          password: data.password,
          phone: data.phone
        })
      });

      if (response.ok) {
        const result: ApiResponse = await response.json();
        if (result.success) {
          setUserInfo(prev => ({
            ...prev,
            id: data.id,
            phone: data.phone
          }));
          Alert.alert('완료', '정보가 성공적으로 변경되었습니다.');
        } else {
          throw new Error(result.message || 'API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error);
      Alert.alert('오류', '정보 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 마케팅 수신 동의 변경
  const handleMarketingChange = async (value: boolean) => {
    try {
      // ✅ 백엔드 API 호출 - 마케팅 수신 동의 변경
      const response = await fetch('/api/user/marketing-agreement', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ marketingAgreement: value })
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          setUserInfo(prev => ({ ...prev, marketingAgreement: value }));
        } else {
          throw new Error(data.message || 'API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('마케팅 수신 동의 변경 실패:', error);
      Alert.alert('오류', '설정 변경에 실패했습니다.');
      // 실패 시 원래 값으로 되돌리기
    }
  };

  // 로그아웃 확인
  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    setIsLoading(true);
    
    try {
      // ✅ 백엔드 API 호출 - 로그아웃
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        // 로컬 토큰 삭제 및 인트로 화면으로 이동
        setUserToken('');
        navigation.navigate('Intro');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      Alert.alert('오류', '로그아웃에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 계정삭제 확인
  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    setIsLoading(true);
    
    try {
      // ✅ 백엔드 API 호출 - 계정 삭제
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (data.success) {
          Alert.alert('완료', '계정이 영구적으로 삭제되었습니다.', [
            { text: '확인', onPress: () => navigation.navigate('Intro') }
          ]);
        } else {
          throw new Error(data.message || 'API response unsuccessful');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('계정 삭제 실패:', error);
      Alert.alert('오류', '계정 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require('../../../../assets/images/p_member/mypage/p_my_profile.png')}
        style={styles.background}
        resizeMode="contain"
      />

        {/* 찍로고 버튼 */}
        <TouchableOpacity
          style={[styles.transparentButton, styles.logoButton]}
          onPress={handleLogoPress}
          activeOpacity={0.7}
        />

        {/* 이전 버튼 */}
        <TouchableOpacity
          style={[styles.transparentButton, styles.backButton]}
          onPress={handleBackPress}
          activeOpacity={0.7}
        />


      {/* 개인정보 입력 카드 */}
      <View style={styles.profileCard}>
        {/* 회원유형 표시 */}
        <View style={styles.memberTypeSection}>
          <View style={styles.memberTypeTag}>
            <Text style={styles.memberTypeText}>회원유형</Text>
          </View>
          <Text style={styles.memberPeriodText}>
            {isLoading ? '로딩 중...' : `"유료기간 ${userInfo.expireDate}"`}
          </Text>
        </View>

        {/* 아이디 입력 */}
        <TextInput
          style={styles.profileInput}
          value={userInfo.id}
          onChangeText={(text) => setUserInfo(prev => ({...prev, id: text}))}
          placeholder="아이디 입력 [input_id]"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          editable={!isLoading}
        />

        {/* 핸드폰 입력 */}
        <TextInput
          style={styles.profileInput}
          value={userInfo.phone}
          onChangeText={(text) => setUserInfo(prev => ({...prev, phone: text}))}
          placeholder="핸드폰 입력 [input_phone]"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          keyboardType="phone-pad"
          maxLength={11}
          editable={!isLoading}
        />

        {/* 버튼들 */}
        <View style={styles.profileButtonsContainer}>
          {/* 아이디 변경 버튼 */}
          <TouchableOpacity
            style={[styles.profileButton, styles.idChangeButton, isLoading && styles.disabledButton]}
            onPress={handleIdChangePress}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            <Text style={styles.profileButtonText}>아이디 변경</Text>
          </TouchableOpacity>

          {/* 비밀번호 변경 버튼 */}
          <TouchableOpacity
            style={[styles.profileButton, styles.passwordChangeButton, isLoading && styles.disabledButton]}
            onPress={handlePasswordChangePress}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            <Text style={styles.profileButtonText}>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 등급 정보 카드 */}
      <View style={styles.gradeCard}>
        <Text style={styles.gradeTitle}>
          현재등급 : {isLoading ? '로딩 중...' : userInfo.memberType}
        </Text>
        <Text style={styles.gradeExpire}>
          만료일 : {isLoading ? '로딩 중...' : userInfo.expireDate}
        </Text>
        
        <View style={styles.gradeButtonsContainer}>
          {/* 프리미엄 업그레이드 버튼 (베타 기간엔 비활성) */}
          <TouchableOpacity style={[styles.gradeButton, styles.upgradeButton]} activeOpacity={0.7}>
            <Text style={styles.gradeButtonText}>프리미엄 업그레이드</Text>
          </TouchableOpacity>
          
          {/* 회원연장 버튼 (베타 기간엔 비활성) */}
          <TouchableOpacity style={[styles.gradeButton, styles.extendButton]} activeOpacity={0.7}>
            <Text style={styles.gradeButtonText}>회원연장</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 마케팅 알림 카드 */}
      <View style={styles.marketingCard}>
        <View style={styles.marketingHeader}>
          <Text style={styles.marketingTitle}>마케팅 알림 수신 동의</Text>
          <Switch
            value={userInfo.marketingAgreement}
            onValueChange={handleMarketingChange}
            trackColor={{ false: '#ccc', true: '#46aaff' }}
            thumbColor={userInfo.marketingAgreement ? '#fff' : '#fff'}
            disabled={isLoading}
          />
        </View>
        
        <View style={styles.termsContainer}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.termsText}>이용약관</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.privacyText}>개인정보</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        style={[styles.logoutContainer, isLoading && styles.disabledButton]}
        onPress={() => setShowLogoutModal(true)}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>
            {isLoading ? '처리 중...' : '로 그 아 웃'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* 계정삭제 섹션 */}
      <View style={styles.deleteSection}>

        <TouchableOpacity
          style={[styles.deleteButton, isLoading && styles.disabledButton]}
          onPress={() => setShowDeleteModal(true)}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <Text style={styles.deleteButtonText}>계 정 삭 제</Text>
        </TouchableOpacity>
      </View>

      {/* 아이디/비밀번호 변경 모달 */}
      <ChangeIdPasswordModal
        visible={showFindModal}
        onClose={() => setShowFindModal(false)}
        onSave={handleSaveChanges}
      />

      {/* 로그아웃 확인 모달 */}
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* 계정삭제 확인 모달 */}
      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  transparentButton: {
    position: 'absolute',
    backgroundColor: 'transparent',

  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },

  logoButton: {
    top: 30,
    left: 10 * (width / DESIGN_WIDTH),
    width: 130 * (width / DESIGN_WIDTH),
    height: 130 * (height / DESIGN_HEIGHT),
  },
  backButton: {
    top: 77 * (height / DESIGN_HEIGHT),
    right: 30 * (width / DESIGN_WIDTH),
    width: 200 * (width / DESIGN_WIDTH),
    height: 100 * (height / DESIGN_HEIGHT),
  },
  // 개인정보 카드
  profileCard: {
    position: 'absolute',
    top: 320 * (height / DESIGN_HEIGHT),
    left: 60 * (width / DESIGN_WIDTH),
    width: 984 * (width / DESIGN_WIDTH),
    height: 540 * (height / DESIGN_HEIGHT),
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 5,
    shadowColor: 'rgba(255, 255, 255, 0.35)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#b9c3e1',
  },
  memberTypeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  memberTypeTag: {
    backgroundColor: '#e5ebff',
    borderRadius: 32,
    paddingHorizontal: 29,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#7ca0ff',
  },
  memberTypeText: {
    fontSize: 36 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
  },
  memberPeriodText: {
    fontSize: 32 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
  },
  profileInput: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#cdd2e6',
    height: 90 * (height / DESIGN_HEIGHT),
    paddingHorizontal: 11,
    paddingTop: 5,
    paddingBottom: 2,
    fontSize: 48 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlignVertical: 'bottom'
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  profileButton: {
    height: 90 * (height / DESIGN_HEIGHT),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  idChangeButton: {
    flex: 1,
    backgroundColor: '#c694ff',
    marginRight: 15,
  },
  passwordChangeButton: {
    flex: 1,
    backgroundColor: '#586089',
  },
  profileButtonText: {
    fontSize: 48 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  // 등급 카드
  gradeCard: {
    position: 'absolute',
    top: 910 * (height / DESIGN_HEIGHT),
    left: 64 * (width / DESIGN_WIDTH),
    width: 984 * (width / DESIGN_WIDTH),
    height: 280 * (height / DESIGN_HEIGHT),
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#b9c3e1',
  },
  gradeTitle: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: '900',
    color: '#1601ff',
    marginBottom: 10,
  },
  gradeExpire: {
    fontSize: 32 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  gradeButtonsContainer: {
    flexDirection: 'row',
  },
  gradeButton: {
    height: 90 * (height / DESIGN_HEIGHT),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  upgradeButton: {
    flex: 1.6,
    backgroundColor: '#46aaff',
    marginRight: 18,
  },
  extendButton: {
    flex: 1,
    backgroundColor: '#8a5cff',
  },
  gradeButtonText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  // 마케팅 카드
  marketingCard: {
    position: 'absolute',
    top: 1230 * (height / DESIGN_HEIGHT),
    left: 54 * (width / DESIGN_WIDTH),
    width: 984 * (width / DESIGN_WIDTH),
    height: 222 * (height / DESIGN_HEIGHT),
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 6,
    borderWidth: 3,
    borderColor: '#b9c3e1',
  },
  marketingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  marketingTitle: {
    fontSize: 32 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 44,
  },
  termsText: {
    fontSize: 32 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#0084ff',
  },
  privacyText: {
    fontSize: 32 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#000',
  },
  // 로그아웃
  logoutContainer: {
    position: 'absolute',
    top: 1500 * (height / DESIGN_HEIGHT),
    left: 54 * (width / DESIGN_WIDTH),
    width: 964 * (width / DESIGN_WIDTH),
    height: 150 * (height / DESIGN_HEIGHT),
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 12,
    shadowColor: 'rgba(255, 255, 255, 0.35)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#b9c3e1',
  },
  logoutButton: {
    width: '100%',
    height: 96 * (height / DESIGN_HEIGHT),
    backgroundColor: '#7e89a8',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logoutButtonText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  // 계정삭제
  deleteSection: {
    position: 'absolute',
    top: 1700 * (height / DESIGN_HEIGHT),
    left: 54 * (width / DESIGN_WIDTH),
    width: 984 * (width / DESIGN_WIDTH),
    height: 150 * (height / DESIGN_HEIGHT),
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 6,
    borderWidth: 3,
    borderColor: '#b9c3e1',
  },

  deleteButton: {
    position: 'absolute',
    top: 24 * (height / DESIGN_HEIGHT),
    left: 20 * (width / DESIGN_WIDTH),
    width: '100%',
    height: 96 * (height / DESIGN_HEIGHT),
    backgroundColor: 'rgba(68, 119, 68, 0.6)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',

  },
  
  deleteButtonText: {
    fontSize: 40 * (width / DESIGN_WIDTH),
    fontWeight: 'bold',
    color: '#fff',
  },
  // 모달 스타일들
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  
  // 아이디/비밀번호 변경 모달
  changeModalContent: {
    width: width * 0.9,
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    maxHeight: height * 0.8,
  },
  changeModalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  changeFormContainer: {
    marginBottom: 30,
  },
  changeInputGroup: {
    marginBottom: 20,
  },
  changeInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  changeInput: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  changeInputError: {
    borderColor: '#ff4444',
  },
  changeErrorText: {
    fontSize: 14,
    color: '#ff4444',
    marginTop: 5,
  },
  changeButtonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  changeButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeCancelButton: {
    backgroundColor: '#f0f0f0',
  },
  changeSaveButton: {
    backgroundColor: '#007AFF',
  },
  changeCancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  changeSaveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  changeCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeCloseButtonText: {
    fontSize: 24,
    color: '#999',
  },

  // 프리미엄 로그아웃 모달
  premiumAlertModalContent: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  alertIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3CD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  alertIcon: {
    fontSize: 40,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  alertInfoBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  alertInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  premiumAlertButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
  },
  premiumAlertButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumCancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  premiumConfirmButton: {
    backgroundColor: '#FF6B6B',
  },
  premiumCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  premiumConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  // 계정삭제 위험 모달
  dangerModalContent: {
    width: width * 0.9,
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: height * 0.9,
  },
  dangerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  dangerIcon: {
    fontSize: 40,
  },
  dangerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 15,
  },
  dangerMessage: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  deleteItemsList: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  deleteItem: {
    fontSize: 14,
    color: '#7F1D1D',
    lineHeight: 22,
    marginBottom: 5,
  },
  confirmInputContainer: {
    marginBottom: 20,
  },
  confirmInputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  confirmInput: {
    height: 45,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  checkmark: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  agreementText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  dangerButtonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  dangerButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerCancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dangerDeleteButton: {
    backgroundColor: '#DC2626',
  },
  dangerDeleteButtonDisabled: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dangerCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  dangerDeleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dangerDeleteButtonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default PMyProfileScreen;