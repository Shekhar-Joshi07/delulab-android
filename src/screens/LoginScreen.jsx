import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import Svg, { Path } from 'react-native-svg';
import Reanimated, { cancelAnimation, Easing as ReanimatedEasing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  ink: '#21172E',
  purple: '#8055F6',
  lime: '#D8FF63',
  pink: '#EBA8DE',
  caption: '#968AA7',
  outline: '#E7DFEF',
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function GoogleIcon() {
  return <Svg width={18} height={18} viewBox="0 0 48 48" accessibilityLabel="Google logo">
    <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.28 5.48-4.8 7.18l7.73 6C44.38 38.03 46.98 31.89 46.98 24.55z" />
    <Path fill="#FBBC05" d="M10.53 28.59A14.41 14.41 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" />
    <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </Svg>;
}

/**
 * Static login UI. The form deliberately has no authentication request yet;
 * the callbacks only dismiss the keyboard until the API contract is available.
 */
export default function LoginScreen({ onJoin, onEmail, onMobile, onGoogle, preparing = false }) {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactMode, setContactMode] = useState('email');
  const heroEntrance = useRef(new Animated.Value(0)).current;
  const contentEntrance = useRef(new Animated.Value(0)).current;
  const purpleFloat = useSharedValue(0);
  const pinkFloat = useSharedValue(0);
  const limeFloat = useSharedValue(0);
  const starRotation = useSharedValue(0);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const formItems = useRef(Array.from({ length: 5 }, () => new Animated.Value(0))).current;
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
    Inter_700Bold: require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
    Inter_800ExtraBold: require('@expo-google-fonts/inter/800ExtraBold/Inter_800ExtraBold.ttf'),
    Inter_900Black: require('@expo-google-fonts/inter/900Black/Inter_900Black.ttf'),
  });

  const heroHeight = useMemo(() => Math.round(Math.max(320, Math.min(height * 0.5, 416))), [height]);
  const shapeSize = Math.round(Math.max(280, Math.min(width * 0.91, 344)));

  useEffect(() => {
    if (!fontsLoaded) return undefined;
    Animated.stagger(90, [
      Animated.timing(heroEntrance, { toValue: 1, duration: 520, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(contentEntrance, { toValue: 1, duration: 460, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    Animated.stagger(85, formItems.map((value) => Animated.timing(value, {
      toValue: 1, duration: 530, easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }))).start();

    purpleFloat.value = withRepeat(withTiming(-30, { duration: 3300, easing: ReanimatedEasing.inOut(ReanimatedEasing.sin) }), -1, true);
    pinkFloat.value = withRepeat(withTiming(25, { duration: 4100, easing: ReanimatedEasing.inOut(ReanimatedEasing.sin) }), -1, true);
    limeFloat.value = withRepeat(withTiming(24, { duration: 3700, easing: ReanimatedEasing.inOut(ReanimatedEasing.sin) }), -1, true);
    starRotation.value = withRepeat(withTiming(360, { duration: 12000, easing: ReanimatedEasing.linear }), -1, false);
    return () => {
      cancelAnimation(purpleFloat);
      cancelAnimation(pinkFloat);
      cancelAnimation(limeFloat);
      cancelAnimation(starRotation);
    };
  }, [contentEntrance, fontsLoaded, formItems, heroEntrance, limeFloat, pinkFloat, purpleFloat, starRotation]);

  const handlePressIn = () => Animated.spring(buttonScale, { toValue: 0.975, speed: 28, bounciness: 0, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(buttonScale, { toValue: 1, speed: 22, bounciness: 8, useNativeDriver: true }).start();
  const continueWithEmail = () => { Keyboard.dismiss(); onEmail?.(email.trim()); };
  const continueWithMobile = () => { Keyboard.dismiss(); onMobile?.(phone.trim(), countryCode.trim()); };
  const continueWithGoogle = () => { Keyboard.dismiss(); onGoogle?.(); };

  const heroTranslate = heroEntrance.interpolate({ inputRange: [0, 1], outputRange: [18, 0] });
  const contentTranslate = contentEntrance.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });
  const purpleStyle = useAnimatedStyle(() => ({ transform: [{ translateY: purpleFloat.value }, { translateX: purpleFloat.value * -0.35 }] }));
  const pinkStyle = useAnimatedStyle(() => ({ transform: [{ translateY: pinkFloat.value }, { translateX: pinkFloat.value * 0.35 }] }));
  const limeStyle = useAnimatedStyle(() => ({ transform: [{ translateY: limeFloat.value }, { translateX: limeFloat.value * -0.4 }] }));
  const starStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${starRotation.value}deg` }] }));
  const itemStyle = (index) => ({ opacity: formItems[index], transform: [{ translateY: formItems[index].interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] });

  if (!fontsLoaded) return <View style={styles.safe} />;

  return <SafeAreaView style={styles.safe}>
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.hero, { height: heroHeight }]}>
        <Animated.View style={[styles.heroLayer, { opacity: heroEntrance, transform: [{ translateY: heroTranslate }] }]}>
          <Reanimated.View style={[styles.purpleOrb, { width: shapeSize * 0.92, height: shapeSize * 0.92, borderRadius: shapeSize, top: heroHeight * 0.39 }, purpleStyle]} />
          <Reanimated.View style={[styles.pinkOrb, { width: shapeSize * 0.64, height: shapeSize * 0.64, borderRadius: shapeSize, top: heroHeight * 0.72 }, pinkStyle]} />
          <Reanimated.View style={[styles.limeOrb, { width: shapeSize, height: shapeSize, borderRadius: shapeSize }, limeStyle]}>
            <Reanimated.View style={[styles.star, starStyle]}>
              <View style={styles.starShadow}>
                {[0, 60, 120].map((rotation) => <View key={rotation} style={[styles.shadowRay, { transform: [{ rotate: `${rotation}deg` }] }]} />)}
              </View>
              {[0, 60, 120].map((rotation) => <View key={rotation} style={[styles.ray, { transform: [{ rotate: `${rotation}deg` }] }]} />)}
            </Reanimated.View>
          </Reanimated.View>
          <Text style={styles.brand}>delula<Text style={styles.brandLime}>b.</Text></Text>
          <Text style={[styles.heroTitle, { top: heroHeight * 0.47 }]}>STAY{`\n`}DELU<Text style={styles.heroTitleLime}>LU.</Text>{`\n`}MAKE IT{`\n`}REAL.</Text>
          <Text style={styles.heroKicker}>THE CREATIVE SIDE OF THE INTERNET ✳</Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.form, { opacity: contentEntrance, transform: [{ translateY: contentTranslate }] }]}>
        <Animated.View style={itemStyle(0)}><Text style={styles.formTitle}>Find your people.{`\n`}Make your thing.</Text>
          <Text style={styles.formSubtitle}>Your work deserves to be seen. And booked.</Text></Animated.View>

        <Animated.View style={itemStyle(1)}>
          <View style={styles.contactSwitch}>
            <Pressable accessibilityRole="button" accessibilityState={{ selected: contactMode === 'email' }} onPress={() => setContactMode('email')} style={[styles.contactTab, contactMode === 'email' && styles.contactTabActive]}><Text style={[styles.contactTabText, contactMode === 'email' && styles.contactTabTextActive]}>Email</Text></Pressable>
            <Pressable accessibilityRole="button" accessibilityState={{ selected: contactMode === 'phone' }} onPress={() => setContactMode('phone')} style={[styles.contactTab, contactMode === 'phone' && styles.contactTabActive]}><Text style={[styles.contactTabText, contactMode === 'phone' && styles.contactTabTextActive]}>Mobile</Text></Pressable>
          </View>
        </Animated.View>

        <Animated.View style={[styles.inputShell, itemStyle(1)]}>
          {contactMode === 'email' ? <Text style={styles.mailIcon}>✉</Text> : <TextInput accessibilityLabel="Country code" value={countryCode} onChangeText={(value) => setCountryCode(value.replace(/[^+\d]/g, '').slice(0, 5))} keyboardType="phone-pad" style={styles.countryCode} />}
          <TextInput
            accessibilityLabel={contactMode === 'email' ? 'Your email address' : 'Your mobile number'}
            autoCapitalize="none"
            autoComplete={contactMode === 'email' ? 'email' : 'tel'}
            keyboardType={contactMode === 'email' ? 'email-address' : 'phone-pad'}
            onChangeText={contactMode === 'email' ? setEmail : (value) => setPhone(value.replace(/\D/g, '').slice(0, 15))}
            placeholder={contactMode === 'email' ? 'Your email address' : 'Your mobile number'}
            placeholderTextColor="#AA9DB9"
            returnKeyType="done"
            value={contactMode === 'email' ? email : phone}
            style={styles.input}
          />
        </Animated.View>

        <AnimatedPressable
          accessibilityRole="button"
          onPress={contactMode === 'email' ? continueWithEmail : continueWithMobile}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.emailButton, { opacity: formItems[2], transform: [{ translateY: formItems[2].interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }, { scale: buttonScale }] }]}
        >
          <Text style={styles.emailButtonText}>Continue with {contactMode === 'email' ? 'email' : 'mobile'}</Text>
        </AnimatedPressable>

        <Animated.View style={itemStyle(3)}><Pressable accessibilityRole="button" onPress={continueWithGoogle} style={({ pressed }) => [styles.googleButton, pressed && { opacity: 0.72 }]}>
          <GoogleIcon /><Text style={styles.googleText}>Continue with Google</Text>
        </Pressable></Animated.View>

        <Animated.View style={itemStyle(4)}><View style={styles.joinRow}><Text style={styles.join}>New here? </Text><Pressable accessibilityRole="button" accessibilityLabel="Join the lab" onPress={onJoin} hitSlop={10}><Text style={styles.joinLink}>Join the lab ✳</Text></Pressable></View></Animated.View>
        {preparing ? <Text style={styles.preparing}>Preparing your creative universe…</Text> : null}
      </Animated.View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  hero: { backgroundColor: COLORS.ink, overflow: 'hidden' },
  heroLayer: { ...StyleSheet.absoluteFillObject },
  purpleOrb: { position: 'absolute', left: '22%', backgroundColor: COLORS.purple },
  pinkOrb: { position: 'absolute', left: '34%', backgroundColor: COLORS.pink },
  limeOrb: { position: 'absolute', right: '-40%', top: 17, backgroundColor: COLORS.lime, overflow: 'hidden' },
  star: { position: 'absolute', left: 52, top: 144, width: 116, height: 116, alignItems: 'center', justifyContent: 'center' },
  starShadow: { position: 'absolute', width: 116, height: 116, alignItems: 'center', justifyContent: 'center', transform: [{ translateX: 5 }, { translateY: 6 }], opacity: 0.17 },
  shadowRay: { position: 'absolute', width: 8, height: 112, borderRadius: 4, backgroundColor: COLORS.ink },
  ray: { position: 'absolute', width: 5, height: 112, borderRadius: 3, backgroundColor: COLORS.ink },
  brand: { position: 'absolute', top: 42, left: 18, color: '#FFFFFF', fontFamily: 'Inter_900Black', fontSize: 36, lineHeight: 40, letterSpacing: -2.8, includeFontPadding: false },
  brandLime: { color: COLORS.lime },
  heroTitle: { position: 'absolute', left: 18, color: '#FFFFFF', fontFamily: 'Inter_900Black', fontSize: 36, lineHeight: 35, letterSpacing: -1.8, includeFontPadding: false },
  heroTitleLime: { color: COLORS.lime },
  heroKicker: { position: 'absolute', left: 18, bottom: 13, color: '#EEE0F7', fontFamily: 'Inter_700Bold', fontSize: 9, lineHeight: 12, letterSpacing: 0.9, includeFontPadding: false },
  form: { flex: 1, paddingHorizontal: 18, paddingTop: 21, backgroundColor: '#FFFFFF' },
  formTitle: { color: '#161122', fontFamily: 'Inter_800ExtraBold', fontSize: 24, lineHeight: 27, letterSpacing: -0.9, includeFontPadding: false },
  formSubtitle: { marginTop: 8, marginBottom: 15, color: COLORS.caption, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
  contactSwitch: { flexDirection: 'row', width: '100%', height: 43, padding: 4, backgroundColor: '#F5F0FC', borderRadius: 12 },
  contactTab: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  contactTabActive: { backgroundColor: '#FFFFFF', shadowColor: COLORS.purple, shadowOpacity: 0.12, shadowRadius: 5, elevation: 2 },
  contactTabText: { color: COLORS.caption, fontFamily: 'Inter_700Bold', fontSize: 12 },
  contactTabTextActive: { color: COLORS.ink },
  inputShell: { height: 49, borderWidth: 1, borderColor: COLORS.outline, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingLeft: 12, backgroundColor: '#FFFFFF', marginTop: 9 },
  countryCode: { width: 46, height: '100%', marginRight: 8, borderRightWidth: 1, borderRightColor: COLORS.outline, color: COLORS.ink, fontFamily: 'Inter_700Bold', fontSize: 13, padding: 0 },
  mailIcon: { color: '#9B8CAA', fontSize: 12, marginRight: 9, marginTop: -1 },
  input: { flex: 1, height: '100%', color: COLORS.ink, fontFamily: 'Inter_400Regular', fontSize: 13, padding: 0, paddingRight: 12 },
  emailButton: { height: 49, marginTop: 11, borderRadius: 12, backgroundColor: COLORS.purple, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  emailButtonText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 14, lineHeight: 20 },
  arrow: { marginLeft: 11, marginTop: -1, color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  googleButton: { height: 49, marginTop: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.outline, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#FFFFFF' },
  googleText: { color: '#1C1628', fontFamily: 'Inter_700Bold', fontSize: 14, lineHeight: 20 },
  joinRow: { marginTop: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  join: { color: '#A095AA', fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  joinLink: { color: COLORS.purple, fontFamily: 'Inter_700Bold', fontSize: 12, lineHeight: 18 },
  preparing: { color: COLORS.purple, fontFamily: 'Inter_700Bold', fontSize: 11, textAlign: 'center', marginTop: 12 },
});
