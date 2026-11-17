import React, { useEffect, useState } from 'react';
import { Image, Platform, StatusBar, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationFlow from './src/screens/RegistrationFlow';

const onboardingArt = [
  require('./assets/onboarding/instagram_logo_art.png'),
  require('./assets/onboarding/camera_art.png'),
  require('./assets/onboarding/ring_light_art.png'),
  require('./assets/onboarding/creator.png'),
  require('./assets/onboarding/businessOrbrand.png'),
  require('./assets/GenZ_Illustration_Icons/Video.png'),
  require('./assets/GenZ_Illustration_Icons/Design.png'),
  require('./assets/GenZ_Illustration_Icons/Photo.png'),
  require('./assets/GenZ_Illustration_Icons/Motion.png'),
  require('./assets/GenZ_Illustration_Icons/Music.png'),
  require('./assets/GenZ_Illustration_Icons/Writing.png'),
  require('./assets/GenZ_Illustration_Icons/Creative_Direction.png'),
  require('./assets/GenZ_Illustration_Icons/Digital.png'),
  require('./assets/GenZ_Illustration_Icons/Custom_Magic_Cutout.png'),
  require('./assets/businessOrBrandOnbording/Content_Reels.png'),
  require('./assets/businessOrBrandOnbording/Branding.png'),
  require('./assets/businessOrBrandOnbording/Photography.png'),
  require('./assets/businessOrBrandOnbording/Campaigns.png'),
  require('./assets/businessOrBrandOnbording/Audio.png'),
  require('./assets/businessOrBrandOnbording/Web_Digital.png'),
  require('./assets/businessOrBrandOnbording/Something Else.png'),
];

export default function App() {
  const [page, setPage] = useState('login');
  const [entry, setEntry] = useState({ method: 'join', email: '', phone: '', countryCode: '+91' });
  useEffect(() => {
    if (Platform.OS === 'web') return;
    onboardingArt.forEach((source) => {
      const uri = Image.resolveAssetSource?.(source)?.uri;
      if (uri && Image.prefetch) Image.prefetch(uri).catch(() => {});
    });
  }, []);
  const openRegistration = (method, value = '', countryCode = '+91') => {
    setEntry({ method, email: method === 'email' ? value : '', phone: method === 'phone' ? value : '', countryCode });
    setPage('registration');
  };
  return <View style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? '#F0EBF7' : '#FFFFFF', alignItems: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <View style={{ flex: 1, width: '100%', maxWidth: Platform.OS === 'web' ? 430 : undefined, backgroundColor: '#FFFFFF', boxShadow: Platform.OS === 'web' ? '0 14px 50px rgba(33, 23, 46, 0.18)' : undefined }}>
      {page === 'login'
        ? <LoginScreen onJoin={() => openRegistration('join')} onEmail={(email) => openRegistration('email', email)} onMobile={(phone, countryCode) => openRegistration('phone', phone, countryCode)} onGoogle={() => openRegistration('google')} />
        : <RegistrationFlow entry={entry} onExit={() => setPage('login')} />}
      <View pointerEvents="none" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
        {onboardingArt.map((source, index) => <Image key={index} source={source} style={{ width: 185, height: 185 }} />)}
      </View>
    </View>
  </View>;
}
