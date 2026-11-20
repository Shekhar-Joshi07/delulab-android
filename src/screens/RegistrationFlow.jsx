import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurTargetView, BlurView } from 'expo-blur';
import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

const C = { ink: '#21172E', purple: '#8055F6', lime: '#D8FF63', pink: '#EBA8DE', muted: '#8C8099', border: '#E9E2EF', soft: '#F6F2FC' };
const creatorInterests = [
  { label: 'Video', icon: require('../../assets/GenZ_Illustration_Icons/Video.png') },
  { label: 'Design', icon: require('../../assets/GenZ_Illustration_Icons/Design.png') },
  { label: 'Photo', icon: require('../../assets/GenZ_Illustration_Icons/Photo.png') },
  { label: 'Motion', icon: require('../../assets/GenZ_Illustration_Icons/Motion.png') },
  { label: 'Music', icon: require('../../assets/GenZ_Illustration_Icons/Music.png') },
  { label: 'Writing', icon: require('../../assets/GenZ_Illustration_Icons/Writing.png') },
  { label: 'Creative direction', icon: require('../../assets/GenZ_Illustration_Icons/Creative_Direction.png') },
  { label: 'Digital', icon: require('../../assets/GenZ_Illustration_Icons/Digital.png') },
];
const businessInterests = [
  { label: 'Content & reels', icon: require('../../assets/businessOrBrandOnbording/Content_Reels.png') },
  { label: 'Branding', icon: require('../../assets/businessOrBrandOnbording/Branding.png') },
  { label: 'Photography', icon: require('../../assets/businessOrBrandOnbording/Photography.png') },
  { label: 'Campaigns', icon: require('../../assets/businessOrBrandOnbording/Campaigns.png') },
  { label: 'Audio', icon: require('../../assets/businessOrBrandOnbording/Audio.png') },
  { label: 'Web & digital', icon: require('../../assets/businessOrBrandOnbording/Web_Digital.png') },
];
const otherBusinessIcon = require('../../assets/businessOrBrandOnbording/Something Else.png');
const customMagicIcon = require('../../assets/GenZ_Illustration_Icons/Custom_Magic_Cutout.png');

function FloatingIllustration({ compact }) {
  const cameraY = useSharedValue(0);
  const ringY = useSharedValue(0);
  const instagramY = useSharedValue(0);
  const sparkle = useSharedValue(0);
  useEffect(() => {
    cameraY.value = withRepeat(withTiming(-14, { duration: 2500, easing: Easing.inOut(Easing.sin) }), -1, true);
    ringY.value = withRepeat(withTiming(12, { duration: 3000, easing: Easing.inOut(Easing.sin) }), -1, true);
    instagramY.value = withRepeat(withTiming(-18, { duration: 3400, easing: Easing.inOut(Easing.sin) }), -1, true);
    sparkle.value = withRepeat(withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.sin) }), -1, true);
    return () => [cameraY, ringY, instagramY, sparkle].forEach(cancelAnimation);
  }, [cameraY, ringY, instagramY, sparkle]);
  const cameraStyle = useAnimatedStyle(() => ({ transform: [{ translateY: cameraY.value }, { rotate: '-9deg' }] }));
  const ringStyle = useAnimatedStyle(() => ({ transform: [{ translateY: ringY.value }, { rotate: '9deg' }] }));
  const instagramStyle = useAnimatedStyle(() => ({ transform: [{ translateY: instagramY.value }, { rotate: '12deg' }] }));
  const sparkleStyle = useAnimatedStyle(() => ({ opacity: 0.45 + sparkle.value * 0.55, transform: [{ scale: 0.8 + sparkle.value * 0.3 }] }));
  return <View pointerEvents="none" style={[styles.artwork, compact && styles.artworkCompact]}>
    <View style={styles.artCirclePurple} /><View style={styles.artCirclePink} /><View style={styles.artCircleLime} />
    <Animated.View style={[styles.ringArt, compact && styles.ringArtCompact, ringStyle]}><Image source={require('../../assets/onboarding/ring_light_art.png')} resizeMode="contain" style={styles.artImage} /></Animated.View>
    <Animated.View style={[styles.cameraArt, compact && styles.cameraArtCompact, cameraStyle]}><Image source={require('../../assets/onboarding/camera_art.png')} resizeMode="contain" style={styles.artImage} /></Animated.View>
    <Animated.View style={[styles.instagramArt, compact && styles.instagramArtCompact, instagramStyle]}><Image source={require('../../assets/onboarding/instagram_logo_art.png')} resizeMode="contain" style={styles.artImage} /></Animated.View>
    <Animated.Text style={[styles.artSpark, sparkleStyle]}>✳</Animated.Text>
  </View>;
}

function DreamSparkles() {
  const glow = useSharedValue(0);
  useEffect(() => {
    glow.value = withDelay(180, withRepeat(withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.sin) }), -1, true));
    return () => cancelAnimation(glow);
  }, [glow]);
  const style = useAnimatedStyle(() => ({ opacity: 0.35 + glow.value * 0.55, transform: [{ scale: 0.75 + glow.value * 0.4 }] }));
  return <View pointerEvents="none" style={StyleSheet.absoluteFillObject}><Animated.Text style={[styles.sparkleOne, style]}>✳</Animated.Text><Animated.Text style={[styles.sparkleTwo, style]}>✦</Animated.Text></View>;
}

function SpinningStar() {
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 11500, easing: Easing.linear }), -1, false);
    return () => cancelAnimation(rotation);
  }, [rotation]);
  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));
  return <Animated.View pointerEvents="none" style={[styles.cardStar, style]}>
    <View style={styles.cardStarShadow}>{[0, 60, 120].map((angle) => <View key={angle} style={[styles.cardStarShadowRay, { transform: [{ rotate: `${angle}deg` }] }]} />)}</View>
    {[0, 60, 120].map((angle) => <View key={angle} style={[styles.cardStarRay, { transform: [{ rotate: `${angle}deg` }] }]} />)}
  </Animated.View>;
}

const radarBlipPaths = [
  [[38, 54], [109, 28], [45, 111], [119, 127]],
  [[139, 70], [112, 122], [54, 35], [146, 101]],
  [[65, 141], [31, 88], [121, 46], [83, 151]],
];

function RadarBlip({ index }) {
  const x = useSharedValue(radarBlipPaths[index][0][0]);
  const y = useSharedValue(radarBlipPaths[index][0][1]);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  useEffect(() => {
    let step = 0;
    let revealTimer;
    const blink = () => {
      opacity.value = withTiming(0, { duration: 210 });
      scale.value = withTiming(0.65, { duration: 210 });
      revealTimer = setTimeout(() => {
        step = (step + 1) % radarBlipPaths[index].length;
        x.value = radarBlipPaths[index][step][0];
        y.value = radarBlipPaths[index][step][1];
        opacity.value = withTiming(1, { duration: 320 });
        scale.value = withTiming(1, { duration: 320 });
      }, 260);
    };
    let interval;
    const startTimer = setTimeout(() => {
      blink();
      interval = setInterval(blink, 1800);
    }, 1300 + index * 360);
    return () => { clearTimeout(startTimer); clearTimeout(revealTimer); clearInterval(interval); [x, y, opacity, scale].forEach(cancelAnimation); };
  }, [index, opacity, scale, x, y]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ translateX: x.value }, { translateY: y.value }, { scale: scale.value }] }));
  return <Animated.View style={[styles.radarPointGlow, style]}><View style={styles.radarPoint} /></Animated.View>;
}

function RadarCard() {
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 4800, easing: Easing.linear }), -1, false);
    pulse.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.out(Easing.cubic) }), -1, false);
    return () => { cancelAnimation(rotation); cancelAnimation(pulse); };
  }, [rotation, pulse]);
  const sweepStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));
  const pulseStyle = useAnimatedStyle(() => ({ opacity: 0.7 * (1 - pulse.value), transform: [{ scale: 0.35 + pulse.value * 0.9 }] }));
  return <View pointerEvents="none" style={styles.radarCard}>
    <View style={styles.radarGlowPink} />
    <View style={styles.radarGlowLime} />
    <View style={styles.radarSticker}><View style={styles.radarLiveDot} /><Text style={styles.radarStickerText}>LOCAL SIGNAL</Text></View>
    <View style={styles.radarComicRays}>{[0, 34, 68].map((angle) => <View key={angle} style={[styles.radarComicRay, { transform: [{ rotate: `${angle}deg` }] }]} />)}</View>
    <View style={styles.radarCanvas}>
      <Svg width={176} height={176} viewBox="0 0 176 176" style={styles.radarGrid}>
        {[26, 53, 80].map((radius) => <Circle key={radius} cx="88" cy="88" r={radius} stroke={C.purple} strokeOpacity="0.48" strokeWidth="1.5" fill="none" />)}
        <Line x1="88" y1="8" x2="88" y2="168" stroke={C.purple} strokeOpacity="0.2" />
        <Line x1="8" y1="88" x2="168" y2="88" stroke={C.purple} strokeOpacity="0.2" />
      </Svg>
      <Animated.View style={[styles.radarPulse, pulseStyle]} />
      <Animated.View style={[styles.radarSweep, sweepStyle]}>
        <Svg width={176} height={176} viewBox="0 0 176 176">
          <Defs><LinearGradient id="radarGlow" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor={C.purple} stopOpacity="0.04" /><Stop offset="1" stopColor={C.purple} stopOpacity="0.38" /></LinearGradient></Defs>
          <Path d="M88 88 L88 8 A80 80 0 0 1 168 88 Z" fill="url(#radarGlow)" />
          <Line x1="88" y1="88" x2="88" y2="8" stroke={C.purple} strokeWidth="2" strokeLinecap="round" />
        </Svg>
      </Animated.View>
      {[0, 1, 2].map((index) => <RadarBlip key={index} index={index} />)}
      <View style={styles.radarCenter} />
    </View>
    <View style={styles.radarCaptionPill}><Text style={styles.radarCaption}>FIND YOUR PEOPLE, LOCALLY</Text></View>
  </View>;
}

function ActionButton({ title, onPress }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return <Animated.View style={animatedStyle}><Pressable accessibilityRole="button" onPress={onPress} onPressIn={() => { scale.value = withSpring(0.97); }} onPressOut={() => { scale.value = withSpring(1); }} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text><View style={styles.buttonBadge}><Text style={styles.buttonBadgeText}>✳</Text></View>
  </Pressable></Animated.View>;
}

function TextField({ label, value, onChangeText, placeholder, prefix, ...rest }) {
  return <View style={styles.fieldBlock}><Text style={styles.label}>{label}</Text><View style={styles.inputShell}>{prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}<TextInput accessibilityLabel={label} style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#AA9DB6" {...rest} /></View></View>;
}

function Choice({ label, icon, selected, onPress, large = false, compact = false, tile = false, tone }) {
  return <Pressable accessibilityRole={large ? 'button' : 'checkbox'} accessibilityState={large ? undefined : { checked: selected }} onPress={onPress} style={({ pressed }) => [styles.choice, tile && styles.tileChoice, large && styles.largeChoice, large && (tone === 'creator' ? styles.creatorChoice : styles.businessChoice), large && compact && styles.largeChoiceCompact, selected && styles.selectedChoice, pressed && { transform: [{ scale: 0.975 }] }]}>
    {large ? <><View style={styles.roleCopy}><Text style={[styles.choiceKicker, tone === 'business' && styles.businessText]}>{tone === 'creator' ? '01 / THE MAKER' : '02 / THE VISION'}</Text><Text style={[styles.largeChoiceLabel, tone === 'business' && styles.businessText]}>{label}</Text></View>{icon ? <Image source={icon} resizeMode="contain" style={styles.roleChoiceImage} /> : null}</> : <View style={styles.choiceContent}>{icon ? <Image source={icon} resizeMode="contain" style={styles.choiceIcon} /> : null}<Text style={[styles.choiceLabel, tile && styles.tileLabel, selected && styles.selectedLabel]} numberOfLines={2}>{label}</Text></View>}
  </Pressable>;
}

export default function RegistrationFlow({ entry, onExit, onComplete }) {
  const { height } = useWindowDimensions();
  const compact = height < 740;
  const method = entry?.method || 'join';
  const [page, setPage] = useState('role');
  const [blank, setBlank] = useState(false);
  const [role, setRole] = useState('');
  const [name, setName] = useState(method === 'google' ? 'Alex Creative' : '');
  const [handle, setHandle] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandHandle, setBrandHandle] = useState('');
  const [instagram, setInstagram] = useState('');
  const [interests, setInterests] = useState([]);
  const [customMagicEnabled, setCustomMagicEnabled] = useState(false);
  const [customMagic, setCustomMagic] = useState('');
  const [city, setCity] = useState('');
  const roleAnswers = useRef({ creator: null, business: null });
  const [error, setError] = useState('');
  const [locked, setLocked] = useState(false);
  const lockRef = useRef(false);
  const blankTimer = useRef(null);
  const blurTarget = useRef(null);
  const screen = useSharedValue(0);

  const pages = ['role', 'identity', 'instagram', 'focus', 'city'];
  const index = pages.indexOf(page);
  const screenStyle = useAnimatedStyle(() => ({ opacity: screen.value, transform: [{ translateY: (1 - screen.value) * 24 }] }));
  const blurStyle = useAnimatedStyle(() => ({ opacity: 1 - screen.value }));

  useEffect(() => {
    screen.value = withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) });
    return () => { if (blankTimer.current) clearTimeout(blankTimer.current); cancelAnimation(screen); };
  }, [screen]);

  const finishEntrance = () => { lockRef.current = false; setLocked(false); };
  const showNext = (target) => {
    setBlank(true);
    blankTimer.current = setTimeout(() => {
      if (target === '__exit') { onExit(); return; }
      if (target === '__home') {
        onComplete({ role, name: role === 'creator' ? name.trim() : brandName.trim(), handle: role === 'creator' ? handle : brandHandle, instagram, interests: [...interests, ...(customMagicEnabled && customMagic.trim() ? [customMagic.trim()] : [])], city: city.trim(), method, email: entry?.email || '', phone: entry?.phone || '' });
        return;
      }
      setPage(target);
      setBlank(false);
      screen.value = 0;
      screen.value = withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) }, (finished) => {
        if (finished) runOnJS(finishEntrance)();
      });
    }, 180);
  };
  const transition = (target) => {
    if (lockRef.current) return;
    lockRef.current = true; setLocked(true); setError(''); Keyboard.dismiss();
    screen.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(showNext)(target);
    });
  };
  const back = () => transition(index === 0 ? '__exit' : pages[index - 1]);
  useEffect(() => {
    if (Platform.OS !== 'android') return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!lockRef.current) back();
      return true;
    });
    return () => subscription.remove();
  });
  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !lockRef.current) { event.preventDefault(); back(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });
  const next = () => {
    if (lockRef.current) return;
    if (page === 'role' && !role) { setError('Choose what brings you to the lab.'); return; }
    if (page === 'identity' && (role === 'creator' ? !name.trim() || !/^[a-z0-9._]{3,20}$/.test(handle) : !brandName.trim() || !/^[a-z0-9._]{3,20}$/.test(brandHandle))) {
      setError(role === 'creator' ? 'Add your name and a handle with 3–20 letters, numbers, dots or underscores.' : 'Add your brand name and a handle with 3–20 letters, numbers, dots or underscores.'); return;
    }
    if (page === 'focus' && interests.length === 0 && !customMagic.trim()) { setError('Pick at least one option or tell us your custom magic.'); return; }
    if (page === 'city' && !city.trim()) { setError('Add your city to continue.'); return; }
    transition(pages[index + 1] || '__home');
  };
  const selectRole = (value) => {
    if (lockRef.current) return;
    if (role) roleAnswers.current[role] = { instagram, interests, customMagicEnabled, customMagic, city };
    const saved = roleAnswers.current[value];
    setRole(value);
    setInstagram(saved?.instagram || '');
    setInterests(saved?.interests || []);
    setCustomMagicEnabled(saved?.customMagicEnabled || false);
    setCustomMagic(saved?.customMagic || '');
    setCity(saved?.city || '');
    transition('identity');
  };
  const toggleInterest = (value) => { setInterests((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]); setError(''); };

  if (blank) return <View style={styles.blank} />;

  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <Animated.View style={[styles.screen, screenStyle]} pointerEvents={locked ? 'none' : 'auto'}>
      <BlurTargetView ref={blurTarget} style={styles.screen}>
      <View style={styles.header}><View style={styles.headerSpacer} /><Text style={styles.brand}>delulab<Text style={styles.brandDot}>.</Text></Text><Text style={styles.counter}>{`${index + 1} / ${pages.length}`}</Text></View>
      <View style={styles.progress}><View style={[styles.progressFill, { width: `${((index + 1) / pages.length) * 100}%` }]} /></View>
      <ScrollView key={page} keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.scroll, compact && styles.scrollCompact]} showsVerticalScrollIndicator={false}>
        <View style={styles.questionWrap}>
          <Text style={styles.eyebrow}>{`QUESTION 0${index + 1}  ✳`}</Text>
          {page === 'role' && <><Text style={[styles.question, compact && styles.questionCompact]}>Who are you in this <Text style={styles.purple}>creative universe?</Text></Text><Text style={[styles.subtitle, compact && styles.subtitleCompact]}>Pick your side. You can always evolve later.</Text><FloatingIllustration compact={compact} /><Choice large compact={compact} tone="creator" icon={require('../../assets/onboarding/creator.png')} label="Creator / influencer" onPress={() => selectRole('creator')} /><Choice large compact={compact} tone="business" icon={require('../../assets/onboarding/businessOrbrand.png')} label="Business / brand" onPress={() => selectRole('business')} /></>}
          {page === 'identity' && <><Text style={styles.question}>{role === 'creator' ? <>What's your <Text style={styles.purple}>name?</Text></> : <>What's your <Text style={styles.purple}>brand called?</Text></>}</Text><Text style={styles.subtitle}>{role === 'creator' ? 'Let the world meet the person behind the magic.' : 'Give your business its spot in the creative universe.'}</Text><View style={styles.accentCard}><Text style={styles.accentWord}>{role === 'creator' ? 'MAIN\nCHARACTER' : 'BIG\nENERGY'}</Text><SpinningStar /></View>{role === 'creator' ? <><TextField label="YOUR NAME" value={name} onChangeText={(v) => { setName(v); setError(''); }} placeholder="E.g. Riya Sharma" autoCapitalize="words" /><TextField label="YOUR DELULAB HANDLE" prefix="@" value={handle} onChangeText={(v) => { setHandle(v.replace(/\s/g, '').toLowerCase()); setError(''); }} placeholder="riyagrades" autoCapitalize="none" /></> : <><TextField label="BUSINESS / BRAND NAME" value={brandName} onChangeText={(v) => { setBrandName(v); setError(''); }} placeholder="E.g. Brew Haus" autoCapitalize="words" /><TextField label="YOUR DELULAB HANDLE" prefix="@" value={brandHandle} onChangeText={(v) => { setBrandHandle(v.replace(/\s/g, '').toLowerCase()); setError(''); }} placeholder="brewhaus" autoCapitalize="none" /></>}</>}
          {page === 'instagram' && <><Text style={styles.question}>What's your <Text style={styles.purple}>@?</Text></Text><Text style={styles.subtitle}>Drop your Instagram username so people can see your vibe. Totally optional.</Text><View style={[styles.accentCard, styles.instagramCard]}><Text style={styles.accentWord}>LET'S GET{'\n'}SOCIAL.</Text><Image source={require('../../assets/onboarding/instagram_logo_art.png')} resizeMode="contain" style={styles.instagramCardImage} /></View><TextField label="INSTAGRAM USERNAME" prefix="@" value={instagram} onChangeText={(v) => { setInstagram(v.replace(/^@/, '').replace(/\s/g, '')); setError(''); }} placeholder="yourhandle" autoCapitalize="none" /><Text style={styles.hint}>No account connection needed. Just your username.</Text></>}
          {page === 'focus' && <><Text style={styles.question}>{role === 'creator' ? <>What's your <Text style={styles.purple}>magic?</Text></> : <>Who do you want to <Text style={styles.purple}>find?</Text></>}</Text><Text style={styles.subtitle}>{role === 'creator' ? 'Pick every lane you play in. Multi-hyphenates welcome.' : 'Choose the creative work your brand needs.'}</Text><View style={styles.choiceGrid}>{(role === 'creator' ? creatorInterests : businessInterests).map(({ label, icon }) => <Choice key={label} tile label={label} icon={icon} selected={interests.includes(label)} onPress={() => toggleInterest(label)} />)}<Choice tile label={role === 'creator' ? 'Custom magic' : 'Something else'} icon={role === 'creator' ? customMagicIcon : otherBusinessIcon} selected={customMagicEnabled} onPress={() => { setCustomMagicEnabled((enabled) => { if (enabled) setCustomMagic(''); return !enabled; }); setError(''); }} /></View>{customMagicEnabled ? <TextField label={role === 'creator' ? 'TELL US YOUR MAGIC' : 'TELL US WHAT YOU NEED'} value={customMagic} onChangeText={(value) => { setCustomMagic(value); setError(''); }} placeholder={role === 'creator' ? 'E.g. 3D artist, dancer, stylist' : 'E.g. Event filmmaker, social media manager'} autoCapitalize="sentences" /> : null}</>}
          {page === 'city' && <><Text style={styles.question}>Where's your <Text style={styles.purple}>scene?</Text></Text><Text style={styles.subtitle}>Delulab helps local talent and ideas find each other.</Text><RadarCard /><TextField label="YOUR CITY" value={city} onChangeText={(v) => { setCity(v); setError(''); }} placeholder="E.g. Lucknow" autoCapitalize="words" /></>}
          {method === 'google' && page === 'role' ? <Text style={styles.demoNote}>Google sign-in isn't connected yet. This demo uses an example name and does not access your Google account.</Text> : null}
          {page !== 'focus' && page !== 'city' ? <DreamSparkles /> : null}
        </View>
      </ScrollView>
      <View style={styles.footer}>{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}{page === 'role' ? <Text style={styles.roleHint}>TAP A PATH TO BEGIN ✳</Text> : <ActionButton onPress={next} title={page === 'instagram' && !instagram ? 'Skip for now' : page === 'identity' ? 'That’s me' : page === 'focus' ? 'Lock it in' : page === 'city' ? 'Explore the lab' : 'Keep going'} />}</View>
      </BlurTargetView>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFillObject, blurStyle]}><BlurView intensity={55} tint="light" blurMethod="dimezisBlurViewSdk31Plus" blurTarget={blurTarget} style={StyleSheet.absoluteFillObject} /></Animated.View>
    </Animated.View>
  </KeyboardAvoidingView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' }, blank: { flex: 1, backgroundColor: '#FFFFFF' }, screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 },
  headerSpacer: { width: 44 },
  brand: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 22, letterSpacing: -1.7 }, brandDot: { color: C.purple },
  counter: { width: 44, textAlign: 'right', color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 11 },
  progress: { height: 3, backgroundColor: '#F1ECF7' }, progressFill: { height: 3, backgroundColor: C.purple },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 28 }, scrollCompact: { paddingTop: 16, paddingBottom: 16 }, questionWrap: { flex: 1 },
  eyebrow: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 10, letterSpacing: 1.5 },
  question: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 35, lineHeight: 39, letterSpacing: -1.6, marginTop: 15 }, questionCompact: { fontSize: 30, lineHeight: 33, marginTop: 10 }, purple: { color: C.purple },
  subtitle: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20, marginTop: 12, marginBottom: 15 }, subtitleCompact: { marginTop: 8, marginBottom: 7 },
  artwork: { height: 208, overflow: 'hidden', marginHorizontal: -20, marginTop: 3, marginBottom: 3 }, artworkCompact: { height: 145 },
  artCirclePurple: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: C.purple, right: -98, top: 18 },
  artCirclePink: { position: 'absolute', width: 138, height: 138, borderRadius: 69, backgroundColor: C.pink, right: 90, top: 91 },
  artCircleLime: { position: 'absolute', width: 140, height: 140, borderRadius: 70, backgroundColor: C.lime, right: -28, top: -42 },
  artImage: { width: '100%', height: '100%' },
  instagramArt: { position: 'absolute', top: -14, right: -9, width: 132, height: 132 }, ringArt: { position: 'absolute', top: 3, right: 78, width: 186, height: 186 }, cameraArt: { position: 'absolute', top: 71, right: -23, width: 185, height: 185 },
  instagramArtCompact: { top: -21, width: 120, height: 120 }, ringArtCompact: { top: -18, width: 165, height: 165 }, cameraArtCompact: { top: 41, width: 171, height: 171 },
  artSpark: { position: 'absolute', top: 75, left: 35, color: C.purple, fontSize: 47 },
  sparkleOne: { position: 'absolute', top: 118, right: 13, color: C.purple, fontSize: 24 }, sparkleTwo: { position: 'absolute', top: 257, left: 5, color: C.pink, fontSize: 22 },
  choice: { borderWidth: 1.5, borderColor: '#D8C6FA', borderRadius: 15, paddingHorizontal: 12, minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.soft },
  tileChoice: { width: '48%', minHeight: 65, paddingHorizontal: 9, overflow: 'hidden' },
  largeChoice: { minHeight: 96, marginTop: 10, paddingHorizontal: 17, borderWidth: 0, borderTopLeftRadius: 10, borderBottomRightRadius: 10, elevation: 4, shadowColor: C.purple, shadowOpacity: 0.17, shadowRadius: 8, shadowOffset: { width: 0, height: 5 } },
  largeChoiceCompact: { minHeight: 82, marginTop: 7 }, creatorChoice: { backgroundColor: C.lime }, businessChoice: { backgroundColor: '#E9DEFF' },
  selectedChoice: { backgroundColor: C.ink, borderColor: C.ink },
  roleCopy: { flex: 1 }, roleChoiceImage: { width: 88, height: 88, marginLeft: 8 },
  choiceContent: { flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1, minWidth: 0 }, choiceIcon: { width: 43, height: 43, flexShrink: 0 },
  choiceLabel: { color: C.ink, fontFamily: 'Inter_700Bold', fontSize: 13, flexShrink: 1 }, tileLabel: { flex: 1, minWidth: 0, fontSize: 11, lineHeight: 14 }, largeChoiceLabel: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 17, letterSpacing: -0.4 },
  choiceKicker: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.2, marginBottom: 3, opacity: 0.7 }, businessText: { color: C.ink },
  selectedLabel: { color: C.lime },
  choiceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 15 },
  fieldBlock: { marginTop: 18 }, label: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 10, letterSpacing: 1.2, marginBottom: 8 },
  inputShell: { height: 54, borderColor: C.border, borderWidth: 1, borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  prefix: { color: C.purple, fontFamily: 'Inter_700Bold', fontSize: 16, marginRight: 7 }, input: { flex: 1, height: '100%', padding: 0, color: C.ink, fontFamily: 'Inter_400Regular', fontSize: 14 },
  hint: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 10 },
  accentCard: { marginTop: 22, marginBottom: 8, height: 142, borderRadius: 20, backgroundColor: C.lime, overflow: 'hidden', padding: 17, justifyContent: 'center' },
  accentWord: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 27, lineHeight: 29, letterSpacing: -1, zIndex: 2 },
  cardStar: { position: 'absolute', right: -9, top: 13, width: 120, height: 120, alignItems: 'center', justifyContent: 'center' },
  cardStarShadow: { position: 'absolute', width: 120, height: 120, alignItems: 'center', justifyContent: 'center', transform: [{ translateX: 5 }, { translateY: 6 }], opacity: 0.24 },
  cardStarShadowRay: { position: 'absolute', width: 8, height: 116, borderRadius: 5, backgroundColor: C.ink },
  cardStarRay: { position: 'absolute', width: 5, height: 116, borderRadius: 4, backgroundColor: C.purple },
  instagramCard: { backgroundColor: '#F7B5D8' },
  instagramCardImage: { position: 'absolute', right: -8, top: -9, width: 160, height: 160 },
  radarCard: { height: 210, borderRadius: 20, backgroundColor: '#E9DEFF', overflow: 'hidden', alignItems: 'center', marginTop: 22, paddingTop: 6, borderWidth: 1.5, borderColor: '#C9ADFF' },
  radarGlowPink: { position: 'absolute', left: -60, bottom: -115, width: 240, height: 240, borderRadius: 120, backgroundColor: '#F8B0E2', opacity: 0.65 },
  radarGlowLime: { position: 'absolute', right: -60, top: -110, width: 225, height: 225, borderRadius: 113, backgroundColor: C.lime, opacity: 0.75 },
  radarSticker: { position: 'absolute', left: 13, top: 15, zIndex: 2, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FFFFFFDD', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 9, transform: [{ rotate: '-5deg' }] },
  radarLiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.purple }, radarStickerText: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 8, letterSpacing: 0.8 },
  radarComicRays: { position: 'absolute', right: 27, top: 38, width: 40, height: 44, zIndex: 2 },
  radarComicRay: { position: 'absolute', left: 17, top: 0, width: 5, height: 24, borderRadius: 3, backgroundColor: C.purple, borderWidth: 1, borderColor: C.ink },
  radarCanvas: { width: 176, height: 176, alignItems: 'center', justifyContent: 'center' },
  radarGrid: { position: 'absolute' }, radarSweep: { position: 'absolute', width: 176, height: 176 },
  radarPulse: { position: 'absolute', width: 94, height: 94, borderRadius: 47, borderWidth: 2, borderColor: C.purple, backgroundColor: '#8055F622' },
  radarCenter: { position: 'absolute', width: 14, height: 14, borderRadius: 7, backgroundColor: C.ink, borderWidth: 3, borderColor: C.lime, shadowColor: C.purple, shadowOpacity: 0.7, shadowRadius: 9, elevation: 5 },
  radarPointGlow: { position: 'absolute', left: 0, top: 0, width: 22, height: 22, borderRadius: 11, backgroundColor: '#8055F655', alignItems: 'center', justifyContent: 'center', shadowColor: C.purple, shadowOpacity: 0.7, shadowRadius: 9, elevation: 4 },
  radarPoint: { width: 9, height: 9, borderRadius: 5, backgroundColor: C.lime, borderWidth: 1.5, borderColor: C.ink },
  radarCaptionPill: { position: 'absolute', bottom: 10, backgroundColor: C.ink, borderRadius: 10, paddingHorizontal: 13, paddingVertical: 6, transform: [{ rotate: '-2deg' }] },
  radarCaption: { color: C.lime, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.2 },
  footer: { padding: 15, borderTopWidth: 1, borderTopColor: C.border, minHeight: 78 },
  button: { minHeight: 54, borderRadius: 16, borderTopLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: C.ink, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 11, elevation: 5, shadowColor: C.purple, shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 5 } },
  buttonText: { color: '#FFFFFF', fontFamily: 'Inter_800ExtraBold', fontSize: 15 },
  buttonBadge: { width: 28, height: 28, borderRadius: 9, backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '10deg' }] }, buttonBadgeText: { color: C.ink, fontSize: 18, lineHeight: 22 },
  roleHint: { color: C.muted, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.5, textAlign: 'center', marginTop: 18 },
  error: { color: '#B63858', fontFamily: 'Inter_700Bold', fontSize: 11, lineHeight: 16, marginBottom: 9 }, demoNote: { color: C.purple, fontFamily: 'Inter_700Bold', fontSize: 11, marginTop: 22 },
});
