import React, { useEffect, useState } from 'react';
import { BackHandler, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import AppNavigation, { AppIcon } from '../components/AppNavigation';

const C = { ink: '#21172E', purple: '#8055F6', lime: '#D8FF63', pink: '#EBA8DE', muted: '#8C8099', pale: '#F6F2FC', border: '#ECE6F3' };

async function choosePhoto(onSelected, onError) {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.85 });
    if (!result.canceled && result.assets?.[0]?.uri) onSelected(result.assets[0].uri);
  } catch (_) {
    onError('Could not open your photos. Please try again.');
  }
}

function ProfileAvatar({ uri, initials, small = false }) {
  return <View style={[styles.avatarFrame, small && styles.editorAvatarFrame]}><View style={styles.avatar}>{uri ? <Image source={{ uri }} resizeMode="cover" style={styles.avatarImage} /> : <Text style={styles.avatarText}>{initials || '✳'}</Text>}</View></View>;
}

function CoverArt() {
  const drift = useSharedValue(0);
  const spin = useSharedValue(0);
  useEffect(() => {
    drift.value = withRepeat(withTiming(1, { duration: 3800, easing: Easing.inOut(Easing.sin) }), -1, true);
    spin.value = withRepeat(withTiming(360, { duration: 16000, easing: Easing.linear }), -1, false);
    return () => { cancelAnimation(drift); cancelAnimation(spin); };
  }, [drift, spin]);
  const floatStyle = useAnimatedStyle(() => ({ transform: [{ translateY: drift.value * -13 }, { translateX: drift.value * 6 }] }));
  const starStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));
  return <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
    <Svg width="100%" height="100%" viewBox="0 0 390 238" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="cover" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#241532" /><Stop offset="0.55" stopColor="#452368" /><Stop offset="1" stopColor="#2F1C52" /></LinearGradient>
        <RadialGradient id="pulse" cx="50%" cy="50%" rx="50%" ry="50%"><Stop offset="0" stopColor="#B78AFF" stopOpacity="0.9" /><Stop offset="1" stopColor="#B78AFF" stopOpacity="0" /></RadialGradient>
        <LinearGradient id="swipe" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FBDCF8" /><Stop offset="1" stopColor="#8055F6" /></LinearGradient>
      </Defs>
      <Rect width="390" height="238" fill="url(#cover)" />
      <Circle cx="280" cy="89" r="137" fill="url(#pulse)" />
      <Path d="M-30 221C64 179 151 164 231 178c72 13 119 34 179 7" stroke="url(#swipe)" strokeWidth="34" fill="none" opacity="0.66" />
      <Path d="M-20 247C96 200 177 197 262 216c58 13 100 15 152-5" stroke="#EBA8DE" strokeWidth="11" fill="none" opacity="0.8" />
      <Circle cx="347" cy="38" r="5" fill="#D8FF63" /><Circle cx="244" cy="25" r="3" fill="#FFFFFF" opacity="0.65" /><Circle cx="36" cy="174" r="3" fill="#D8FF63" />
    </Svg>
    <Animated.View style={[styles.coverOrb, floatStyle]} />
    <Animated.View style={[styles.coverOrbSmall, floatStyle]} />
    <Animated.Text style={[styles.coverStar, starStyle]}>✳</Animated.Text>
  </View>;
}

function ProfileEditor({ visible, profile, onClose, onSave }) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState({ name: '', handle: '', city: '', bio: '', photoUri: null });
  const [error, setError] = useState('');
  useEffect(() => {
    if (visible) { setDraft({ name: profile?.name || '', handle: profile?.handle || '', city: profile?.city || '', bio: profile?.bio || '', photoUri: profile?.photoUri || null }); setError(''); }
  }, [visible]);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const save = () => {
    if (!draft.name.trim() || !draft.city.trim() || !/^[a-z0-9._]{3,20}$/.test(draft.handle.trim().toLowerCase())) { setError('Add a name, city, and a valid handle (3–20 characters).'); return; }
    onSave({ name: draft.name.trim(), handle: draft.handle.trim().toLowerCase(), city: draft.city.trim(), bio: draft.bio.trim(), photoUri: draft.photoUri });
    onClose();
  };
  return <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalShade}>
      <View style={[styles.editor, { paddingBottom: Math.max(insets.bottom, 12) + 13 }]}>
        <View style={styles.editorHead}><View><Text style={styles.editorKicker}>MAKE IT YOURS ✳</Text><Text style={styles.editorTitle}>Edit your vibe.</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Close editor" onPress={onClose} style={styles.closeButton}><AppIcon name="close" size={18} /></Pressable></View>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.editorPhotoRow}><Pressable accessibilityRole="button" accessibilityLabel="Choose profile photo" onPress={() => choosePhoto((uri) => update('photoUri', uri), setError)}><ProfileAvatar uri={draft.photoUri} initials={draft.name.split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('')} small /></Pressable><View style={styles.editorPhotoActions}><Pressable accessibilityRole="button" onPress={() => choosePhoto((uri) => update('photoUri', uri), setError)} style={styles.changePhotoButton}><AppIcon name="camera" size={16} color={C.purple} /><Text style={styles.changePhotoText}>{draft.photoUri ? 'Change photo' : 'Add a photo'}</Text></Pressable>{draft.photoUri ? <Pressable accessibilityRole="button" onPress={() => update('photoUri', null)}><Text style={styles.removePhotoText}>Remove photo</Text></Pressable> : <Text style={styles.photoHint}>A face for your creative space.</Text>}</View></View>
          {[
            { key: 'name', label: profile?.role === 'business' ? 'BRAND NAME' : 'YOUR NAME', placeholder: 'Your name' },
            { key: 'handle', label: 'DELULAB HANDLE', placeholder: 'yourhandle' },
            { key: 'city', label: 'YOUR CITY', placeholder: 'Your city' },
            { key: 'bio', label: 'YOUR ONE-LINER', placeholder: 'What makes your work yours?' },
          ].map((field) => <View key={field.key} style={styles.editField}><Text style={styles.editLabel}>{field.label}</Text><TextInput style={[styles.editInput, field.key === 'bio' && styles.bioInput]} value={draft[field.key]} onChangeText={(value) => update(field.key, field.key === 'handle' ? value.replace(/^@/, '').replace(/\s/g, '').toLowerCase() : value)} placeholder={field.placeholder} placeholderTextColor="#A69AB3" autoCapitalize={field.key === 'handle' ? 'none' : 'sentences'} maxLength={field.key === 'bio' ? 130 : undefined} multiline={field.key === 'bio'} /></View>)}
          {error ? <Text accessibilityRole="alert" style={styles.editError}>{error}</Text> : null}
          <Text style={styles.editorNote}>Changes stay on this device until accounts are connected.</Text>
        </ScrollView>
        <Pressable accessibilityRole="button" onPress={save} style={styles.saveButton}><Text style={styles.saveText}>Save my vibe</Text><AppIcon name="check" color={C.ink} size={18} /></Pressable>
      </View>
    </KeyboardAvoidingView>
  </Modal>;
}

export default function ProfileScreen({ profile, onUpdateProfile, onHome, onExplore, onGigs, onCreate }) {
  const [section, setSection] = useState('Work');
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState('');
  const appear = useSharedValue(0);
  useEffect(() => { appear.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }); return () => cancelAnimation(appear); }, [appear]);
  useEffect(() => {
    if (Platform.OS !== 'android') return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => { if (editing) setEditing(false); else onHome(); return true; });
    return () => subscription.remove();
  }, [editing, onHome]);
  const introStyle = useAnimatedStyle(() => ({ opacity: appear.value, transform: [{ translateY: (1 - appear.value) * 22 }] }));
  const announce = (message) => { setNotice(message); setTimeout(() => setNotice(''), 2400); };
  const name = profile?.name || 'Your name';
  const handle = profile?.handle || 'yourhandle';
  const city = profile?.city || 'Your city';
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('');
  const roleLabel = profile?.role === 'business' ? 'BUSINESS / BRAND' : 'CREATOR / INFLUENCER';
  const interests = profile?.interests || [];
  const pickPhoto = () => choosePhoto((uri) => onUpdateProfile({ photoUri: uri }), announce);
  return <SafeAreaView style={styles.safe}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Animated.View style={introStyle}>
        <View style={styles.header}><Text style={styles.brand}>delulab<Text style={styles.brandDot}>.</Text></Text><View style={styles.headerBadge}><View style={styles.liveDot} /><Text style={styles.headerBadgeText}>YOUR SPACE</Text></View></View>
        <View style={styles.cover}><CoverArt /><View style={styles.coverCopy}><Text style={styles.coverKicker}>CREATIVE ID / PREVIEW</Text><Text style={styles.coverTitle}>MADE TO{'\n'}BE SEEN<Text style={styles.coverPeriod}>.</Text></Text><Text style={styles.coverBottom}>A whole universe starts with you ✳</Text></View></View>
        <View style={styles.identityRow}><Pressable accessibilityRole="button" accessibilityLabel={profile?.photoUri ? 'Change profile photo' : 'Add profile photo'} onPress={pickPhoto} style={styles.avatarAction}><ProfileAvatar uri={profile?.photoUri} initials={initials} /><View style={styles.cameraBadge}><AppIcon name="camera" size={14} color={C.ink} /></View></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Edit profile" onPress={() => setEditing(true)} style={styles.editButton}><AppIcon name="edit" size={16} color={C.ink} /><Text style={styles.editButtonText}>Edit profile</Text></Pressable></View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.handle}>@{handle}</Text>
        <View style={styles.metaRow}><View style={styles.rolePill}><Text style={styles.rolePillText}>{roleLabel}</Text></View><View style={styles.location}><AppIcon name="pin" size={14} color={C.muted} /><Text style={styles.locationText}>{city}</Text></View></View>
        <Text style={[styles.bio, !profile?.bio && styles.bioPrompt]}>{profile?.bio || 'Your story deserves a one-liner. Add one to make this space yours.'}</Text>
        <View style={styles.divider} />
        <View style={styles.sectionHead}><Text style={styles.sectionKicker}>YOUR CREATIVE DNA</Text><Text style={styles.sectionSpark}>✳</Text></View>
        <View style={styles.interestWrap}>{interests.length ? interests.map((interest, index) => <View key={`${interest}-${index}`} style={[styles.interestChip, index % 3 === 1 && styles.interestChipPink, index % 3 === 2 && styles.interestChipPurple]}><Text style={[styles.interestText, index % 3 === 2 && styles.interestTextWhite]}>{interest}</Text></View>) : <Text style={styles.interestEmpty}>Your creative interests will show here.</Text>}</View>
        <View style={styles.infoRow}><View style={styles.infoCard}><Text style={styles.infoSymbol}>◎</Text><Text style={styles.infoValue}>{city}</Text><Text style={styles.infoLabel}>YOUR SCENE</Text></View><View style={[styles.infoCard, styles.infoCardDark]}><Text style={styles.infoSymbolDark}>✦</Text><Text style={styles.infoValueDark}>{profile?.role === 'business' ? 'The vision' : 'The maker'}</Text><Text style={styles.infoLabelDark}>YOUR ENERGY</Text></View></View>
        <View style={styles.sectionTabs}>{['Work', 'About'].map((tab) => <Pressable key={tab} accessibilityRole="button" accessibilityState={{ selected: section === tab }} onPress={() => setSection(tab)} style={[styles.sectionTab, section === tab && styles.sectionTabActive]}><Text style={[styles.sectionTabText, section === tab && styles.sectionTabTextActive]}>{tab.toUpperCase()}</Text></Pressable>)}</View>
        {section === 'Work' ? <View style={styles.workEmpty}><View style={styles.workOrb} /><Text style={styles.workSpark}>✳</Text><Text style={styles.workEyebrow}>THE CANVAS IS YOURS</Text><Text style={styles.workTitle}>Your first drop{'\n'}starts here.</Text><Text style={styles.workBody}>When posting is ready, your work will live right here for the creative world to find.</Text><Pressable accessibilityRole="button" onPress={onCreate} style={styles.workButton}><Text style={styles.workButtonText}>Make your first post</Text><AppIcon name="arrow" size={16} color="#FFFFFF" /></Pressable></View> : <View style={styles.aboutCard}><Text style={styles.aboutTitle}>A little more about you.</Text><View style={styles.aboutLine}><AppIcon name="pin" color={C.purple} size={18} /><Text style={styles.aboutText}>Creating in {city}</Text></View><View style={styles.aboutLine}><AppIcon name="profile" color={C.purple} size={18} /><Text style={styles.aboutText}>{roleLabel.toLowerCase()}</Text></View>{profile?.instagram ? <View style={styles.aboutLine}><AppIcon name="instagram" color={C.purple} size={18} /><Text style={styles.aboutText}>@{profile.instagram}</Text></View> : null}<Text style={styles.aboutHint}>This profile is a local preview. Nothing has been published yet.</Text></View>}
      </Animated.View>
    </ScrollView>
    {notice ? <View style={styles.notice}><Text style={styles.noticeText}>{notice}</Text></View> : null}
    <AppNavigation active="Profile" onHome={onHome} onExplore={onExplore} onGigs={onGigs} onProfile={() => {}} onCreate={onCreate} />
    <ProfileEditor visible={editing} profile={profile} onClose={() => setEditing(false)} onSave={(changes) => onUpdateProfile(changes)} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' }, scroll: { flex: 1 }, content: { paddingHorizontal: 18, paddingBottom: 30 },
  header: { height: 71, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, brand: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 27, letterSpacing: -2 }, brandDot: { color: C.purple }, headerBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 16, backgroundColor: C.pale }, liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.purple }, headerBadgeText: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1 },
  cover: { height: 236, borderRadius: 23, overflow: 'hidden', backgroundColor: C.ink }, coverOrb: { position: 'absolute', right: 20, top: -58, width: 170, height: 170, borderRadius: 85, backgroundColor: C.lime }, coverOrbSmall: { position: 'absolute', right: 115, bottom: -67, width: 128, height: 128, borderRadius: 64, backgroundColor: C.pink, opacity: 0.95 }, coverStar: { position: 'absolute', right: 67, top: 49, color: C.ink, fontSize: 78, lineHeight: 86, textShadowColor: '#21172E55', textShadowRadius: 6 }, coverCopy: { flex: 1, padding: 19, justifyContent: 'space-between' }, coverKicker: { color: '#F4DDFE', fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.6 }, coverTitle: { color: '#FFFFFF', fontFamily: 'Inter_900Black', fontSize: 38, lineHeight: 37, letterSpacing: -2.3 }, coverPeriod: { color: C.lime }, coverBottom: { color: '#F7E7FA', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 0.3 },
  identityRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -37, paddingHorizontal: 8 }, avatarAction: { position: 'relative' }, avatarFrame: { width: 82, height: 82, borderRadius: 26, backgroundColor: '#FFFFFF', padding: 5, shadowColor: C.ink, shadowOpacity: 0.16, shadowRadius: 9, elevation: 5 }, avatar: { flex: 1, borderRadius: 21, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: C.lime, overflow: 'hidden' }, avatarImage: { width: '100%', height: '100%' }, avatarText: { color: '#FFFFFF', fontFamily: 'Inter_900Black', fontSize: 27, letterSpacing: -1 }, cameraBadge: { position: 'absolute', right: -5, bottom: 0, width: 28, height: 28, borderRadius: 10, borderWidth: 2, borderColor: '#FFFFFF', backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center', elevation: 5 }, editButton: { height: 36, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 13, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: '#FFFFFF', marginBottom: 7 }, editButtonText: { color: C.ink, fontFamily: 'Inter_700Bold', fontSize: 11 },
  name: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 29, lineHeight: 34, letterSpacing: -1.6, marginTop: 10 }, handle: { color: C.purple, fontFamily: 'Inter_700Bold', fontSize: 13, marginTop: 2 }, metaRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 13 }, rolePill: { backgroundColor: C.lime, borderRadius: 9, paddingHorizontal: 10, paddingVertical: 7 }, rolePillText: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 0.4 }, location: { flexDirection: 'row', alignItems: 'center', gap: 3 }, locationText: { color: C.muted, fontFamily: 'Inter_700Bold', fontSize: 11 }, bio: { color: C.ink, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: 15 }, bioPrompt: { color: C.muted }, divider: { height: 1, backgroundColor: C.border, marginTop: 21, marginBottom: 17 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, sectionKicker: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 10, letterSpacing: 1.5 }, sectionSpark: { color: C.purple, fontSize: 19 }, interestWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12 }, interestChip: { backgroundColor: C.lime, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 }, interestChipPink: { backgroundColor: '#F6D5EC' }, interestChipPurple: { backgroundColor: C.purple }, interestText: { color: C.ink, fontFamily: 'Inter_700Bold', fontSize: 11 }, interestTextWhite: { color: '#FFFFFF' }, interestEmpty: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 12 },
  infoRow: { flexDirection: 'row', gap: 9, marginTop: 20 }, infoCard: { flex: 1, minHeight: 104, borderRadius: 17, backgroundColor: C.pale, padding: 13, justifyContent: 'space-between', overflow: 'hidden' }, infoCardDark: { backgroundColor: C.ink }, infoSymbol: { color: C.purple, fontSize: 23, lineHeight: 24 }, infoSymbolDark: { color: C.lime, fontSize: 20, lineHeight: 24 }, infoValue: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 14 }, infoValueDark: { color: '#FFFFFF', fontFamily: 'Inter_800ExtraBold', fontSize: 14 }, infoLabel: { color: C.muted, fontFamily: 'Inter_800ExtraBold', fontSize: 8, letterSpacing: 1.2 }, infoLabelDark: { color: '#CDBDE2', fontFamily: 'Inter_800ExtraBold', fontSize: 8, letterSpacing: 1.2 },
  sectionTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.border, gap: 26, marginTop: 24 }, sectionTab: { paddingHorizontal: 6, paddingBottom: 12, borderBottomWidth: 3, borderBottomColor: 'transparent' }, sectionTabActive: { borderBottomColor: C.purple }, sectionTabText: { color: C.muted, fontFamily: 'Inter_800ExtraBold', fontSize: 11, letterSpacing: 1.2 }, sectionTabTextActive: { color: C.purple },
  workEmpty: { marginTop: 16, minHeight: 260, borderRadius: 20, backgroundColor: '#F3ECFF', overflow: 'hidden', padding: 20, justifyContent: 'center' }, workOrb: { position: 'absolute', right: -30, top: -36, width: 155, height: 155, borderRadius: 80, backgroundColor: C.lime }, workSpark: { position: 'absolute', right: 38, top: 19, color: C.purple, fontSize: 48 }, workEyebrow: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.3 }, workTitle: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 29, lineHeight: 30, letterSpacing: -1.4, marginTop: 8 }, workBody: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17, maxWidth: 250, marginTop: 8 }, workButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'flex-start', gap: 17, borderRadius: 11, backgroundColor: C.ink, paddingHorizontal: 13, paddingVertical: 11, marginTop: 15 }, workButtonText: { color: '#FFFFFF', fontFamily: 'Inter_800ExtraBold', fontSize: 11 },
  aboutCard: { marginTop: 16, padding: 18, borderRadius: 19, backgroundColor: C.pale }, aboutTitle: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 18, marginBottom: 14 }, aboutLine: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 8 }, aboutText: { color: C.ink, fontFamily: 'Inter_700Bold', fontSize: 12 }, aboutHint: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 15, marginTop: 16 },
  notice: { position: 'absolute', bottom: 79, alignSelf: 'center', backgroundColor: C.ink, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, zIndex: 10 }, noticeText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 11 },
  modalShade: { flex: 1, backgroundColor: '#21172E88', justifyContent: 'flex-end' }, editor: { maxHeight: '90%', backgroundColor: '#FFFFFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 22, paddingTop: 22, paddingBottom: 25 }, editorHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }, editorKicker: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.3 }, editorTitle: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 28, letterSpacing: -1.3, marginTop: 4 }, closeButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }, editorPhotoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 21, padding: 11, borderRadius: 16, backgroundColor: C.pale }, editorAvatarFrame: { width: 70, height: 70, borderRadius: 23 }, editorPhotoActions: { gap: 7 }, changePhotoButton: { flexDirection: 'row', alignItems: 'center', gap: 7 }, changePhotoText: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 12 }, removePhotoText: { color: C.muted, fontFamily: 'Inter_700Bold', fontSize: 10 }, photoHint: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 10 }, editField: { marginBottom: 15 }, editLabel: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 10, letterSpacing: 1.1, marginBottom: 7 }, editInput: { minHeight: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingHorizontal: 13, color: C.ink, fontFamily: 'Inter_400Regular', fontSize: 13 }, bioInput: { minHeight: 75, paddingTop: 13, textAlignVertical: 'top' }, editError: { color: '#B63858', fontFamily: 'Inter_700Bold', fontSize: 11, marginBottom: 10 }, editorNote: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 10, marginBottom: 14 }, saveButton: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 13, backgroundColor: C.lime }, saveText: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 13 },
});
