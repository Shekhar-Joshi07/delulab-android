import React, { useEffect, useState } from 'react';
import { Image, Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationFlow from './src/screens/RegistrationFlow';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import GigsScreen from './src/screens/GigsScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import SquadScreen from './src/screens/SquadScreen';

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
  const [profile, setProfile] = useState(null);
  const [collabDrafts, setCollabDrafts] = useState([]);
  const [squads, setSquads] = useState([]);
  const [squadSeed, setSquadSeed] = useState(null);
  const [savedGigIds, setSavedGigIds] = useState([]);
  const [interestedGigIds, setInterestedGigIds] = useState([]);
  const [squadGigInterests, setSquadGigInterests] = useState([]);
  const [squadJoinRequests, setSquadJoinRequests] = useState([]);
  const [squadContactDrafts, setSquadContactDrafts] = useState([]);
  const [createOrigin, setCreateOrigin] = useState('home');
  const [createDraft, setCreateDraft] = useState({ mode: 'work', mediaUri: null, title: '', caption: '', description: '', budget: '', category: '', customCategory: '', collaborators: '', openToHire: true, remote: false });
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
  const openCreate = () => { setCreateOrigin(page); setPage('create'); };
  const openSquads = (seed = null) => { setSquadSeed(seed); setPage('squads'); };
  const createSquad = (details) => {
    const id = `squad-${Date.now()}`;
    setSquads((items) => [...items, { ...details, id, ownerName: profile?.name || 'You', city: profile?.city || '', invites: details.invites || [], projects: [] }]);
    setSquadSeed(null);
    return id;
  };
  const updateSquad = (id, changes) => setSquads((items) => items.map((item) => item.id === id ? { ...item, ...changes } : item));
  const toggleId = (setter, id) => setter((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const toggleSquadGigInterest = (squadId, gigId) => setSquadGigInterests((items) => items.some((item) => item.squadId === squadId && item.gigId === gigId) ? items.filter((item) => item.squadId !== squadId || item.gigId !== gigId) : [...items, { squadId, gigId }]);
  return <SafeAreaProvider initialMetrics={initialWindowMetrics}><View style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? '#F0EBF7' : '#FFFFFF', alignItems: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <View style={{ flex: 1, width: '100%', maxWidth: Platform.OS === 'web' ? 430 : undefined, backgroundColor: '#FFFFFF', boxShadow: Platform.OS === 'web' ? '0 14px 50px rgba(33, 23, 46, 0.18)' : undefined }}>
      {page === 'login'
        ? <LoginScreen onJoin={() => openRegistration('join')} onEmail={(email) => openRegistration('email', email)} onMobile={(phone, countryCode) => openRegistration('phone', phone, countryCode)} onGoogle={() => openRegistration('google')} />
        : page === 'registration'
          ? <RegistrationFlow entry={entry} onExit={() => setPage('login')} onComplete={(details) => { setProfile(details); setCreateDraft((draft) => ({ ...draft, mode: details.role === 'business' ? 'gig' : 'work' })); setPage('home'); }} />
          : page === 'profile'
            ? <ProfileScreen profile={profile} onUpdateProfile={(changes) => setProfile((current) => ({ ...current, ...changes }))} onHome={() => setPage('home')} onExplore={() => setPage('explore')} onGigs={() => setPage('gigs')} onCreate={openCreate} />
            : page === 'explore'
              ? <ExploreScreen profile={profile} collabDrafts={collabDrafts} onSaveCollabDraft={(draft) => setCollabDrafts((items) => [...items, draft])} onOpenSquads={openSquads} onHome={() => setPage('home')} onGigs={() => setPage('gigs')} onProfile={() => setPage('profile')} onCreate={openCreate} />
              : page === 'squads'
                ? <SquadScreen profile={profile} squads={squads} seed={squadSeed} joinRequests={squadJoinRequests} contactDrafts={squadContactDrafts} onToggleJoinRequest={(id) => toggleId(setSquadJoinRequests, id)} onSaveContactDraft={(draft) => setSquadContactDrafts((items) => [...items, draft])} onCreateSquad={createSquad} onUpdateSquad={updateSquad} onBack={() => { setSquadSeed(null); setPage('explore'); }} onHome={() => setPage('home')} onExplore={() => setPage('explore')} onGigs={() => setPage('gigs')} onProfile={() => setPage('profile')} onCreate={openCreate} />
              : page === 'gigs'
                ? <GigsScreen savedGigIds={savedGigIds} interestedGigIds={interestedGigIds} squads={profile?.role === 'creator' ? squads : []} squadGigInterests={squadGigInterests} onToggleSquadGigInterest={toggleSquadGigInterest} onToggleSaveGig={(id) => toggleId(setSavedGigIds, id)} onToggleInterestGig={(id) => toggleId(setInterestedGigIds, id)} onHome={() => setPage('home')} onExplore={() => setPage('explore')} onProfile={() => setPage('profile')} onCreate={openCreate} />
                : page === 'create'
                  ? <CreatePostScreen profile={profile} draft={createDraft} onChangeDraft={setCreateDraft} onClose={() => setPage(createOrigin)} onSaveDraft={() => setPage(createOrigin)} />
                  : <HomeScreen profile={profile} onOpenExplore={() => setPage('explore')} onOpenGigs={() => setPage('gigs')} onOpenCreate={openCreate} onOpenProfile={() => setPage('profile')} />}
      <View pointerEvents="none" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
        {onboardingArt.map((source, index) => <Image key={index} source={source} style={{ width: 185, height: 185 }} />)}
      </View>
    </View>
  </View></SafeAreaProvider>;
}
