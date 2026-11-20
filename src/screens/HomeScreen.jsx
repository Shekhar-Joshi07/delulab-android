import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import AppNavigation, { AppIcon } from '../components/AppNavigation';

const C = { ink: '#21172E', purple: '#8055F6', lime: '#D8FF63', muted: '#8C8099', pale: '#F6F2FC', border: '#ECE6F3' };

const extraPosts = [
  { id: 'naina', name: 'naina.frames', initials: 'NF', color: '#F18BAB', category: 'Photographer · Photo series', art: 'photo', title: 'CITY IN\nCOLOUR.', overline: 'THE EVERYDAY, REMIXED', footer: 'STREET STORIES / 2026', likes: '1.8k', comments: '42', caption: 'A little colour changes the whole story. Frames from an evening walk through the city.', cta: 'View photo series →' },
  { id: 'monsoon', name: 'studio.monsoon', initials: 'SM', color: '#8055F6', category: 'Brand studio · Design', art: 'design', title: 'GOOD IDEAS\nGROW.', overline: 'NEW BRAND WORLD', footer: 'IDENTITY DESIGN / 2026', likes: '936', comments: '28', caption: 'New shapes, fresh energy, one very loud visual identity. Built with local creatives.', cta: 'See the project →' },
  { id: 'rohan', name: 'rohan.wav', initials: 'RW', color: '#4EADD0', category: 'Music producer · Audio', art: 'music', title: 'TURN IT\nUP.', overline: 'FRESH SOUND', footer: 'BEAT TAPE / 2026', likes: '2.1k', comments: '73', caption: 'Late-night sounds for people making things after everyone else has gone quiet.', cta: 'Explore the sound →' },
];

function ExtraArtwork({ variant }) {
  const drift = useSharedValue(0);
  useEffect(() => {
    drift.value = withRepeat(withTiming(1, { duration: 3600, easing: Easing.inOut(Easing.sin) }), -1, true);
    return () => cancelAnimation(drift);
  }, [drift]);
  const motion = useAnimatedStyle(() => ({ transform: [{ translateY: drift.value * -9 }, { scale: 1 + drift.value * 0.03 }] }));
  return <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFillObject, motion]}>
    <Svg width="100%" height="100%" viewBox="0 0 380 255" preserveAspectRatio="xMidYMid slice">
      {variant === 'photo' ? <>
        <Defs><LinearGradient id="streetSky" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#34214E" /><Stop offset="0.55" stopColor="#A14B91" /><Stop offset="1" stopColor="#F38A90" /></LinearGradient><RadialGradient id="streetSun"><Stop offset="0" stopColor="#FFF7A7" /><Stop offset="0.55" stopColor="#FFD978" /><Stop offset="1" stopColor="#FF9D72" stopOpacity="0" /></RadialGradient></Defs>
        <Rect width="380" height="255" fill="url(#streetSky)" /><Ellipse cx="281" cy="119" rx="104" ry="100" fill="url(#streetSun)" /><Path d="M0 199c70-42 129-36 189-4 74 41 137 20 191-11v71H0Z" fill="#2C2050" /><Path d="M0 223c74-23 113-18 172 8 72 32 146 11 208-12v36H0Z" fill="#714475" /><Path d="M27 256V167m0 0 18-16m-18 16-17-11M321 255V173m0 0 24-20m-24 20-18-14" fill="none" stroke="#251A43" strokeWidth="5" strokeLinecap="round" />
      </> : variant === 'design' ? <>
        <Defs><LinearGradient id="designBack" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#EEE4FF" /><Stop offset="1" stopColor="#F5CDE9" /></LinearGradient></Defs>
        <Rect width="380" height="255" fill="url(#designBack)" /><Ellipse cx="323" cy="20" rx="140" ry="140" fill="#D8FF63" /><Path d="M-22 258C38 165 165 130 256 158c63 19 112 14 157-16" fill="none" stroke="#8055F6" strokeWidth="37" /><Path d="M-10 271c79-69 172-80 249-47 59 26 113 19 159-9" fill="none" stroke="#F7ECFF" strokeWidth="15" /><Ellipse cx="289" cy="114" rx="38" ry="38" fill="#21172E" /><Ellipse cx="289" cy="114" rx="22" ry="22" fill="#EBA8DE" />
      </> : <>
        <Defs><LinearGradient id="musicBack" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#21172E" /><Stop offset="1" stopColor="#5A3196" /></LinearGradient><RadialGradient id="musicGlow"><Stop offset="0" stopColor="#EBA8DE" /><Stop offset="1" stopColor="#8055F6" stopOpacity="0" /></RadialGradient></Defs>
        <Rect width="380" height="255" fill="url(#musicBack)" /><Ellipse cx="310" cy="121" rx="145" ry="145" fill="url(#musicGlow)" /><Ellipse cx="304" cy="125" rx="104" ry="104" fill="none" stroke="#D8FF63" strokeWidth="19" /><Ellipse cx="304" cy="125" rx="66" ry="66" fill="none" stroke="#EBA8DE" strokeWidth="19" /><Ellipse cx="304" cy="125" rx="29" ry="29" fill="#D8FF63" /><Path d="M0 232c65-19 83 21 145 0s82-55 145-29c35 14 62 13 90-3" fill="none" stroke="#F3DBFF" strokeWidth="6" opacity="0.8" />
      </>}
    </Svg>
  </Animated.View>;
}

function ExtraPost({ post, onNotice }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const scale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return <View style={styles.extraPost}>
    <View style={styles.postHeader}><View style={[styles.avatar, { backgroundColor: post.color }]}><Text style={styles.avatarText}>{post.initials}</Text></View><View style={styles.author}><Text style={styles.authorName}>{post.name}</Text><Text style={styles.authorMeta}>{post.category}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={`${post.name} post options`} onPress={() => onNotice('More post options coming soon')} hitSlop={10}><AppIcon name="dots" color={C.muted} /></Pressable></View>
    <Animated.View style={pressStyle}><Pressable accessibilityRole="button" accessibilityLabel={`${post.name} featured project`} onPress={() => onNotice('Project details are coming soon')} onPressIn={() => { scale.value = withSpring(0.985); }} onPressOut={() => { scale.value = withSpring(1); }} style={styles.extraArtCard}><ExtraArtwork variant={post.art} /><View style={styles.extraArtCopy}><Text style={[styles.extraOverline, post.art === 'design' && styles.designInk]}>{post.overline}</Text><Text style={[styles.extraArtTitle, post.art === 'design' && styles.designInk]}>{post.title}</Text><Text style={[styles.extraArtFooter, post.art === 'design' && styles.designInk]}>{post.footer}</Text></View></Pressable></Animated.View>
    <View style={styles.engagement}><Pressable accessibilityRole="button" accessibilityLabel={liked ? `Unlike ${post.name} post` : `Like ${post.name} post`} onPress={() => setLiked(!liked)} style={styles.engagementItem}><AppIcon name="heart" size={18} color={liked ? '#F15A90' : C.ink} filled={liked} /><Text style={styles.count}>{post.likes}</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel={`${post.comments} comments`} onPress={() => onNotice('Comments are coming soon')} style={styles.engagementItem}><AppIcon name="bell" size={17} /><Text style={styles.count}>{post.comments}</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Share post" onPress={() => onNotice('Sharing is coming soon')} style={styles.engagementItem}><AppIcon name="arrow" size={17} /></Pressable><View style={styles.engagementSpacer} /><Pressable accessibilityRole="button" accessibilityLabel={saved ? 'Remove saved post' : 'Save post'} onPress={() => setSaved(!saved)}><AppIcon name="bookmark" size={18} color={saved ? C.purple : C.ink} filled={saved} /></Pressable></View>
    <Text style={styles.caption}><Text style={styles.captionBold}>{post.name}</Text> {post.caption}</Text>
    <Pressable accessibilityRole="button" onPress={() => onNotice('Project details are coming soon')} style={styles.projectLink}><Text style={styles.projectLinkText}>{post.cta}</Text></Pressable>
  </View>;
}

function AnimatedArtwork() {
  const float = useSharedValue(0);
  const glint = useSharedValue(0);
  useEffect(() => {
    float.value = withRepeat(withTiming(1, { duration: 4700, easing: Easing.inOut(Easing.sin) }), -1, true);
    glint.value = withRepeat(withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.sin) }), -1, true);
    return () => { cancelAnimation(float); cancelAnimation(glint); };
  }, [float, glint]);
  const orbStyle = useAnimatedStyle(() => ({ transform: [{ translateY: float.value * -13 }, { scale: 1 + float.value * 0.045 }] }));
  const glintStyle = useAnimatedStyle(() => ({ opacity: 0.35 + glint.value * 0.65, transform: [{ rotate: `${glint.value * 40}deg` }, { scale: 0.8 + glint.value * 0.35 }] }));
  return <View pointerEvents="none" style={styles.artwork}>
    <Animated.View style={[StyleSheet.absoluteFillObject, orbStyle]}>
      <Svg width="100%" height="100%" viewBox="0 0 380 290" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="back" x1="0" y1="1" x2="1" y2="0"><Stop offset="0" stopColor="#342052" /><Stop offset="0.55" stopColor="#6B369B" /><Stop offset="1" stopColor="#301E53" /></LinearGradient>
          <RadialGradient id="sun" cx="48%" cy="48%" rx="55%" ry="55%"><Stop offset="0" stopColor="#FFF99B" /><Stop offset="0.22" stopColor="#FFF39C" /><Stop offset="0.52" stopColor="#F992B1" /><Stop offset="0.78" stopColor="#DC56AD" /><Stop offset="1" stopColor="#A249B8" /></RadialGradient>
          <LinearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FFE6F4" /><Stop offset="0.5" stopColor="#FFF1FA" /><Stop offset="1" stopColor="#F6CAED" /></LinearGradient>
          <LinearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" /><Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.12" /><Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" /></LinearGradient>
        </Defs>
        <Rect width="380" height="290" fill="url(#back)" />
        <Ellipse cx="260" cy="188" rx="185" ry="155" fill="url(#sun)" />
        <Path d="M-25 285C25 190 139 119 247 101c82-13 129 9 172 45" fill="none" stroke="url(#ribbon)" strokeWidth="29" />
        <Path d="M88 325c37-72 113-131 196-155 61-17 105-11 143 8" fill="none" stroke="#FBE2F6" strokeWidth="18" opacity="0.95" />
        <Path d="M-15 295c95-36 162-43 226-21 78 28 146 24 207-34v69H-15Z" fill="#623291" opacity="0.45" />
        <Path d="M0 0h380v290H0Z" fill="url(#shine)" />
      </Svg>
    </Animated.View>
    <Animated.Text style={[styles.heroGlint, glintStyle]}>✳</Animated.Text>
  </View>;
}

export default function HomeScreen({ profile, onOpenExplore, onOpenGigs, onOpenCreate, onOpenProfile }) {
  const [feed, setFeed] = useState('For you');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState('');
  const entrance = useSharedValue(0);
  const cardScale = useSharedValue(1);
  useEffect(() => {
    entrance.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    return () => cancelAnimation(entrance);
  }, [entrance]);
  const introStyle = useAnimatedStyle(() => ({ opacity: entrance.value, transform: [{ translateY: (1 - entrance.value) * 24 }] }));
  const cardStyle = useAnimatedStyle(() => ({ opacity: entrance.value, transform: [{ translateY: (1 - entrance.value) * 34 }, { scale: cardScale.value }] }));
  const moreStyle = useAnimatedStyle(() => ({ opacity: entrance.value, transform: [{ translateY: (1 - entrance.value) * 42 }] }));
  const announce = (message) => { setNotice(message); setTimeout(() => setNotice(''), 2400); };
  const greeting = profile?.role === 'business' ? 'brand' : 'creator';
  const tabs = ['For you', 'Nearby', 'Following'];
  return <SafeAreaView style={styles.safe}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Animated.View style={introStyle}>
        <View style={styles.header}>
          <Text style={styles.brand}>delulab<Text style={styles.brandDot}>.</Text></Text>
          <View style={styles.headerActions}>
            <Pressable accessibilityRole="button" accessibilityLabel="Search" onPress={() => announce('Search is coming soon')} style={styles.roundButton}><AppIcon name="search" size={19} /></Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => announce('No new notifications yet')} style={styles.roundButton}><AppIcon name="bell" size={19} /></Pressable>
          </View>
        </View>
        <Text style={styles.greeting}>Good morning, {greeting} <Text style={styles.tinySpark}>✳</Text></Text>
        <Text style={styles.headline}>Make some{'\n'}creative noise<Text style={styles.headlineDot}>.</Text></Text>
        <View style={styles.filters}>{tabs.map((tab) => <Pressable key={tab} accessibilityRole="button" accessibilityState={{ selected: feed === tab }} onPress={() => setFeed(tab)} style={[styles.filter, feed === tab && styles.filterActive]}><Text style={[styles.filterText, feed === tab && styles.filterTextActive]}>{tab}</Text></Pressable>)}</View>
        {feed === 'For you' ? <Text style={styles.sampleNote}>A peek inside the lab · Sample posts</Text> : null}
      </Animated.View>
      {feed === 'For you' ? <View><Animated.View style={[styles.post, cardStyle]}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}><Text style={styles.avatarText}>AV</Text></View>
          <View style={styles.author}><Text style={styles.authorName}>aarav.visuals</Text><Text style={styles.authorMeta}>Featured creator · Video</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Post options" onPress={() => announce('More post options coming soon')} hitSlop={10}><AppIcon name="dots" color={C.muted} /></Pressable>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Featured creative campaign" onPressIn={() => { cardScale.value = withSpring(0.985); }} onPressOut={() => { cardScale.value = withSpring(1); }} style={styles.heroCard}>
          <AnimatedArtwork />
          <View style={styles.heroTop}><Text style={styles.heroTitle}>MAKE{'\n'}IT{'\n'}LOUD.</Text><View style={styles.workPill}><Text style={styles.workPillText}>NEW WORK ✦</Text></View></View>
          <Text style={styles.heroFoot}>CREATIVE CAMPAIGN / 2026</Text>
        </Pressable>
        <View style={styles.engagement}>
          <Pressable accessibilityRole="button" accessibilityLabel={liked ? 'Unlike post' : 'Like post'} onPress={() => setLiked(!liked)} style={styles.engagementItem}><AppIcon name="heart" size={18} color={liked ? '#F15A90' : C.ink} filled={liked} /><Text style={styles.count}>{liked ? '2.5k' : '2.4k'}</Text></Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Comments" onPress={() => announce('Comments are coming soon')} style={styles.engagementItem}><AppIcon name="bell" size={17} /><Text style={styles.count}>86</Text></Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Share post" onPress={() => announce('Sharing is coming soon')} style={styles.engagementItem}><AppIcon name="arrow" size={17} /></Pressable>
          <View style={styles.engagementSpacer} />
          <Pressable accessibilityRole="button" accessibilityLabel={saved ? 'Remove saved post' : 'Save post'} onPress={() => setSaved(!saved)}><AppIcon name="bookmark" size={18} color={saved ? C.purple : C.ink} filled={saved} /></Pressable>
        </View>
        <Text style={styles.caption}><Text style={styles.captionBold}>aarav.visuals</Text> New campaign, new energy. Shot this with my crew <Text style={styles.captionSpark}>✦</Text></Text>
        <Pressable accessibilityRole="button" accessibilityLabel="See collaborators" onPress={() => announce('Collaborator profiles are coming soon')} style={styles.collabBar}>
          <View style={styles.collabAvatars}><View style={[styles.collabAvatar, { backgroundColor: '#F293BC' }]}><Text style={styles.collabLetter}>A</Text></View><View style={[styles.collabAvatar, styles.overlap, { backgroundColor: '#56B0C9' }]}><Text style={styles.collabLetter}>R</Text></View><View style={[styles.collabAvatar, styles.overlap, { backgroundColor: '#8055F6' }]}><Text style={styles.collabLetter}>M</Text></View></View>
          <Text style={styles.collabText}>3 collaborators</Text><Text style={styles.collabLink}>Hire from post →</Text>
        </Pressable>
      </Animated.View><Animated.View style={[styles.moreFeed, moreStyle]}><View style={styles.moreHeading}><View style={styles.moreRule} /><Text style={styles.moreHeadingText}>MORE FROM THE LAB</Text><View style={styles.moreRule} /></View>{extraPosts.map((post) => <ExtraPost key={post.id} post={post} onNotice={announce} />)}</Animated.View></View> : <Animated.View style={[styles.emptyCard, cardStyle]}><Text style={styles.emptyMark}>✳</Text><Text style={styles.emptyTitle}>{feed === 'Nearby' ? `Your ${profile?.city || 'local'} scene starts here.` : 'Your creative circle starts here.'}</Text><Text style={styles.emptyCopy}>{feed === 'Nearby' ? 'Local posts will appear when the community feed is connected.' : 'Follow creators and brands to fill this feed.'}</Text></Animated.View>}
      <Text style={styles.previewFoot}>A first look at Delulab · Feed content is sample work</Text>
    </ScrollView>
    {notice ? <View style={styles.notice}><Text style={styles.noticeText}>{notice}</Text></View> : null}
    <AppNavigation active="Home" onHome={() => setFeed('For you')} onExplore={onOpenExplore} onGigs={onOpenGigs} onProfile={onOpenProfile} onCreate={onOpenCreate} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' }, scroll: { flex: 1 }, content: { paddingHorizontal: 20, paddingBottom: 24 },
  header: { height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, brand: { color: C.ink, fontFamily: 'Inter_900Black', fontSize: 28, letterSpacing: -2.1 }, brandDot: { color: C.purple },
  headerActions: { flexDirection: 'row', gap: 10 }, roundButton: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  greeting: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 }, tinySpark: { color: '#F4944D', fontSize: 14 },
  headline: { color: '#0D0916', fontFamily: 'Inter_900Black', fontSize: 29, lineHeight: 29, letterSpacing: -1.6, marginTop: 5 }, headlineDot: { color: C.purple },
  filters: { flexDirection: 'row', gap: 8, marginTop: 17, marginBottom: 15 }, filter: { backgroundColor: '#F4F2F8', borderRadius: 18, paddingHorizontal: 17, height: 32, justifyContent: 'center' }, filterActive: { backgroundColor: C.ink }, filterText: { fontFamily: 'Inter_700Bold', fontSize: 11, color: C.ink }, filterTextActive: { color: '#FFFFFF' },
  sampleNote: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 10, marginBottom: 12 },
  post: { width: '100%' }, postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 9 }, avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#D27BBE', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#FFFFFF', fontFamily: 'Inter_800ExtraBold', fontSize: 12 }, author: { flex: 1 }, authorName: { fontFamily: 'Inter_800ExtraBold', color: C.ink, fontSize: 12 }, authorMeta: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 2 },
  heroCard: { height: 285, borderRadius: 18, overflow: 'hidden', backgroundColor: '#382352' }, artwork: { ...StyleSheet.absoluteFillObject }, heroGlint: { position: 'absolute', top: 34, right: 75, color: '#FFF8C4', fontSize: 24, textShadowColor: '#FFF7A8', textShadowRadius: 15 },
  heroTop: { padding: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }, heroTitle: { color: '#FFFFFF', fontFamily: 'Inter_900Black', fontSize: 39, lineHeight: 35, letterSpacing: -2.2 }, workPill: { borderWidth: 1, borderColor: '#EDE0F3AA', backgroundColor: '#21172E77', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 6 }, workPillText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 9 }, heroFoot: { position: 'absolute', left: 19, bottom: 15, color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2 },
  engagement: { height: 39, flexDirection: 'row', alignItems: 'center', gap: 15 }, engagementItem: { flexDirection: 'row', alignItems: 'center', gap: 5 }, count: { color: C.ink, fontFamily: 'Inter_800ExtraBold', fontSize: 10 }, engagementSpacer: { flex: 1 },
  caption: { color: C.ink, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginBottom: 10 }, captionBold: { fontFamily: 'Inter_800ExtraBold' }, captionSpark: { color: C.purple },
  collabBar: { minHeight: 47, borderRadius: 13, backgroundColor: C.pale, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }, collabAvatars: { flexDirection: 'row', alignItems: 'center', marginRight: 7 }, collabAvatar: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, overlap: { marginLeft: -7 }, collabLetter: { color: '#FFFFFF', fontFamily: 'Inter_800ExtraBold', fontSize: 10 }, collabText: { color: C.muted, fontFamily: 'Inter_400Regular', fontSize: 10, flex: 1 }, collabLink: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 10 },
  moreFeed: { marginTop: 24 }, moreHeading: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 }, moreRule: { flex: 1, height: 1, backgroundColor: C.border }, moreHeadingText: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.4 },
  extraPost: { marginBottom: 28 }, extraArtCard: { height: 250, borderRadius: 18, overflow: 'hidden', backgroundColor: C.ink }, extraArtCopy: { flex: 1, padding: 17, justifyContent: 'space-between' }, extraOverline: { color: '#FFF0F9', fontFamily: 'Inter_800ExtraBold', fontSize: 9, letterSpacing: 1.4 }, extraArtTitle: { color: '#FFFFFF', fontFamily: 'Inter_900Black', fontSize: 39, lineHeight: 37, letterSpacing: -1.9, maxWidth: 275 }, extraArtFooter: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1.1 }, designInk: { color: C.ink }, projectLink: { alignSelf: 'flex-start', borderRadius: 10, backgroundColor: C.pale, paddingHorizontal: 12, paddingVertical: 9 }, projectLinkText: { color: C.purple, fontFamily: 'Inter_800ExtraBold', fontSize: 10 },
  emptyCard: { minHeight: 300, backgroundColor: C.pale, borderRadius: 20, padding: 27, justifyContent: 'center', alignItems: 'center' }, emptyMark: { color: C.purple, fontSize: 55 }, emptyTitle: { color: C.ink, textAlign: 'center', fontFamily: 'Inter_900Black', fontSize: 23, marginTop: 8 }, emptyCopy: { color: C.muted, textAlign: 'center', fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 8 }, previewFoot: { textAlign: 'center', color: '#A99DB5', fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 17 },
  notice: { position: 'absolute', bottom: 79, alignSelf: 'center', backgroundColor: C.ink, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, zIndex: 10 }, noticeText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 11 },
});
