import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { AbstractArt, Avatar, BottomNav, BrandHeader, Chips, Header, PersonRow, PrimaryButton, SectionTitle } from './components';

export function Welcome({ s, c, enter, toggleTheme }) {
  const [email, setEmail] = useState('');
  return <ScrollView keyboardShouldPersistTaps="handled" style={s.screen} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ height: 410, backgroundColor: c.deep, overflow: 'hidden', padding: 24, paddingTop: 52 }}>
      <View style={{ position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: c.lime, right: -90, top: 70 }} />
      <View style={{ position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: c.purple, right: 10, top: 180 }} />
      <View style={{ position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: c.pink, right: 80, top: 265 }} />
      <View style={s.between}><Text style={[s.logo, { color: '#fff', fontSize: 37 }]}>delulab<Text style={{ color: c.lime }}>.</Text></Text><Pressable onPress={toggleTheme}><Text style={{ color: '#fff', fontSize: 20 }}>☾</Text></Pressable></View>
      <Text style={{ color: '#fff', fontWeight: '900', fontSize: 43, lineHeight: 40, letterSpacing: -2.5, marginTop: 66 }}>STAY{`\n`}DELU<Text style={{ color: c.lime }}>LU.</Text>{`\n`}MAKE IT{`\n`}REAL.</Text>
      <Text style={{ color: '#E7CAFD', fontSize: 9, letterSpacing: 1.4, fontWeight: '800', marginTop: 25 }}>THE CREATIVE SIDE OF THE INTERNET ✳</Text>
    </View>
    <View style={{ padding: 22 }}>
      <Text style={s.h2}>Find your people.{`\n`}Make your thing.</Text>
      <Text style={[s.muted, { marginTop: 6, marginBottom: 16 }]}>Your work deserves to be seen. And booked.</Text>
      <TextInput accessibilityLabel="Email address" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} placeholder="✉   Your email address" placeholderTextColor={c.muted} style={s.input} />
      <PrimaryButton s={s} title="Continue with email   ↗" onPress={enter} style={{ marginTop: 10 }} />
      <Pressable onPress={enter} style={[s.primary, { marginTop: 9, backgroundColor: c.panel, borderWidth: 1, borderColor: c.line }]}><Text style={[s.primaryText, { color: c.ink }]}>G   Continue with Google</Text></Pressable>
      <Text style={[s.muted, { textAlign: 'center', marginTop: 16 }]}>New here? <Text style={[s.name, s.purple]}>Join the lab ✳</Text></Text>
    </View>
  </ScrollView>;
}

export function Home({ s, c, navigate, toggleTheme }) {
  const [feed, setFeed] = useState('For you');
  return <View style={s.screen}><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <BrandHeader s={s} word="delulab" onTheme={toggleTheme} />
    <Text style={s.muted}>Hey, creative human 👋</Text><Text style={[s.h1, { marginTop: 4 }]}>What's being made{`\n`}around you?</Text>
    <Chips s={s} items={['For you', 'Nearby', 'Following']} active={feed} onChange={setFeed} />
    <View style={[s.row, { gap: 10, marginBottom: 12 }]}><Avatar s={s} initials="A" /><View><Text style={s.name}>Aarav Visuals ✦</Text><Text style={s.muted}>Lucknow · 18 min ago</Text></View><Text style={[s.iconText, { marginLeft: 'auto' }]}>•••</Text></View>
    <Pressable onPress={() => navigate('project')}><AbstractArt c={c} /></Pressable>
    <View style={[s.between, { marginTop: 13 }]}><View style={[s.row, { gap: 18 }]}><Text style={s.h3}>♡ 2.4k</Text><Text style={s.h3}>◌ 86</Text><Text style={s.h3}>↗</Text></View><Text style={s.h3}>♧</Text></View>
    <Text style={[s.body, { marginTop: 10 }]}><Text style={s.name}>aarav.visuals  </Text>New campaign, new energy. Shot this with my crew ⚡</Text>
    <Pressable onPress={() => navigate('squads')} style={[s.card, s.between, { marginTop: 14, backgroundColor: c.purpleSoft }]}><View><Text style={s.name}>Aarav + Riya + Maya</Text><Text style={s.muted}>3 collaborators on this project</Text></View><Text style={[s.micro, s.purple]}>Hire crew →</Text></Pressable>
    <SectionTitle s={s} title="Fresh from the lab" action="See more →" />
    <View style={[s.row, { gap: 10 }]}><Pressable onPress={() => navigate('profile')} style={[s.card, { flex: 1, padding: 10 }]}><View style={{ height: 105, backgroundColor: '#4C8C93', borderRadius: 13, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 26 }}>✳</Text></View><Text style={[s.name, { marginTop: 9 }]}>Color grade diary</Text><Text style={s.muted}>by Riya Sharma</Text></Pressable><Pressable onPress={() => navigate('gigs')} style={[s.card, { flex: 1, padding: 10 }]}><View style={{ height: 105, backgroundColor: '#A43E76', borderRadius: 13, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontWeight: '900', fontSize: 22 }}>NO{`\n`}FILTER</Text></View><Text style={[s.name, { marginTop: 9 }]}>Album identity</Text><Text style={s.muted}>Open for hire</Text></Pressable></View>
  </ScrollView><BottomNav s={s} active="home" navigate={navigate} /></View>;
}

export function Explore({ s, c, navigate, toggleTheme }) {
  const [category, setCategory] = useState('All talent');
  return <View style={s.screen}><ScrollView contentContainerStyle={s.scroll}>
    <BrandHeader s={s} word="explore" onTheme={toggleTheme} />
    <Text style={s.h1}>Talent around{`\n`}your corner. ✳</Text>
    <TextInput placeholder="⌕   Search creators, skills, vibes..." placeholderTextColor={c.muted} style={[s.input, { marginTop: 16, backgroundColor: c.layer, borderWidth: 0 }]} />
    <Chips s={s} items={['All talent', 'Video', 'Design', 'Photo']} active={category} onChange={setCategory} />
    <View style={s.between}><Text style={s.name}>📍 Near Lucknow</Text><View style={s.tag}><Text style={s.tagText}>Within 10 km</Text></View></View>
    <View style={{ height: 205, borderRadius: 22, marginTop: 14, overflow: 'hidden', backgroundColor: '#DDE6D8' }}>
      {[18, 72, 132, 180].map((x, i) => <View key={x} style={{ position: 'absolute', width: i % 2 ? 16 : 280, height: i % 2 ? 240 : 16, backgroundColor: '#fff', left: i % 2 ? x : -8, top: i % 2 ? -20 : x, transform: [{ rotate: i % 2 ? '22deg' : '-8deg' }] }} />)}
      <View style={{ position: 'absolute', left: 142, top: 87, width: 34, height: 34, borderRadius: 17, backgroundColor: '#8055F633', alignItems: 'center', justifyContent: 'center' }}><View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: c.purple, borderColor: '#fff', borderWidth: 2 }} /></View>
      <View style={{ position: 'absolute', left: 32, top: 44, backgroundColor: c.panel, borderRadius: 15, padding: 8 }}><Text style={s.name}>🎥 4.9</Text></View>
      <View style={{ position: 'absolute', right: 35, top: 80, backgroundColor: c.deep, borderRadius: 15, padding: 8 }}><Text style={[s.name, { color: '#fff' }]}>✦ 5.0</Text></View>
      <View style={{ position: 'absolute', left: 90, bottom: 20, backgroundColor: c.panel, borderRadius: 15, padding: 8 }}><Text style={s.name}>📷 4.8</Text></View>
    </View>
    <SectionTitle s={s} title="Top creators nearby" action="See all →" />
    <PersonRow s={s} initials="R" name="Riya Sharma ✦" subtitle="Video editor · 2.4 km · ★ 4.9 · From ₹1,500" onPress={() => navigate('profile')} />
    <PersonRow s={s} initials="S" color="#4C8C93" name="Studio North" subtitle="Photography · 5.8 km · ★ 4.8 · From ₹2,000" onPress={() => Alert.alert('Studio North', 'Creator profile coming soon.')} />
  </ScrollView><BottomNav s={s} active="explore" navigate={navigate} /></View>;
}

export function Profile({ s, c, navigate, goBack, toggleTheme }) {
  const [tab, setTab] = useState('Portfolio');
  return <View style={s.screen}><ScrollView contentContainerStyle={s.scroll}>
    <Header s={s} title="CREATOR PASSPORT ✦" onBack={goBack} onRight={toggleTheme} />
    <View style={{ height: 150, marginHorizontal: -18, backgroundColor: '#6B50A2', overflow: 'hidden' }}><View style={{ position: 'absolute', width: 210, height: 210, borderRadius: 105, right: -30, top: -70, backgroundColor: '#C5B0F6' }} /><Text style={{ position: 'absolute', right: 18, top: 20, color: '#fff', fontSize: 27, lineHeight: 24, fontWeight: '900', transform: [{ rotate: '-8deg' }] }}>CREATE{`\n`}THE{`\n`}UNREAL.</Text></View>
    <View style={[s.between, { marginTop: -33 }]}><Avatar s={s} initials="R" size={72} /><PrimaryButton s={s} title="✦  Hire Riya" lime onPress={() => navigate('booking')} style={{ minHeight: 42 }} /></View>
    <Text style={[s.h2, { marginTop: 10 }]}>Riya Sharma <Text style={s.purple}>✦</Text></Text><Text style={s.muted}>@riyagrades · Video editor & colorist</Text><Text style={[s.body, { marginTop: 8 }]}>Turning raw clips into main-character energy. 🎬</Text><Text style={[s.muted, { marginTop: 6 }]}>📍 Lucknow · Available for remote work</Text>
    <View style={[s.row, { gap: 8, marginTop: 18 }]}>{[['4.9 ★','Client rating'],['24','Verified gigs'],['18k','Followers']].map(([v,l]) => <View key={l} style={[s.card, { flex: 1, alignItems: 'center', padding: 11 }]}><Text style={s.h3}>{v}</Text><Text style={[s.micro, { marginTop: 3 }]}>{l}</Text></View>)}</View>
    <Chips s={s} items={['Portfolio', 'Services', 'Reviews']} active={tab} onChange={setTab} />
    {tab === 'Portfolio' ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{[['FRESH\nCUT','#418F86'],['NO\nFILTER','#A43E76'],['BOLD\nTAKES','#E8754F'],['FRAME\n01','#555BB5']].map(([t,b]) => <Pressable key={t} onPress={() => navigate('project')} style={{ width: '48.7%', height: 135, borderRadius: 17, backgroundColor: b, padding: 12, justifyContent: 'center' }}><Text style={{ color: '#fff', fontWeight: '900', fontSize: 24, lineHeight: 22 }}>{t}</Text><Text style={{ color: '#fff', fontSize: 9, position: 'absolute', bottom: 10, left: 12 }}>View project ↗</Text></Pressable>)}</View> : tab === 'Services' ? <View><PersonRow s={s} initials="✦" name="3 short-form reels" subtitle="3-day delivery · From ₹3,500" action="Book" onPress={() => navigate('booking')} /><PersonRow s={s} initials="◉" name="Color grading" subtitle="Per minute · From ₹1,500" action="Book" onPress={() => navigate('booking')} /></View> : <View style={s.card}><Text style={s.name}>★★★★★ “Riya absolutely got the vibe.”</Text><Text style={[s.muted, { marginTop: 8 }]}>— Brew Haus · Verified project</Text></View>}
  </ScrollView><BottomNav s={s} active="profile" navigate={navigate} /></View>;
}

export function Gigs({ s, c, navigate, toggleTheme }) {
  const [tab, setTab] = useState('For you');
  const gigs = [
    ['📍 3.2 km away', 'Need 3 aesthetic café reels ☕', 'Brew Haus · Food & beverage', '₹5,000 budget', 'Video shoot · This weekend'],
    ['🌐 Remote', 'Looking for album cover artist 🎨', 'Independent musician · Graphic design', '₹3,500 budget', 'Digital illustration · 7 days'],
    ['📍 7.8 km away', 'Fashion product photoshoot 📷', 'Local clothing brand · Photography', '₹8,000 budget', 'Half-day booking'],
  ];
  return <View style={s.screen}><ScrollView contentContainerStyle={s.scroll}>
    <BrandHeader s={s} word="gigs" onTheme={toggleTheme} /><Text style={s.h1}>Your next big{`\n`}thing is here. ⚡</Text><Chips s={s} items={['For you','Nearby','Remote','Saved']} active={tab} onChange={setTab} />
    <View style={{ backgroundColor: c.deep, borderRadius: 23, padding: 20, overflow: 'hidden' }}><Text style={{ color: c.lime, fontSize: 10, fontWeight: '900' }}>✦ FEATURED OPPORTUNITY</Text><Text style={{ color: '#fff', fontWeight: '900', fontSize: 29, lineHeight: 29, letterSpacing: -1.3, marginTop: 11 }}>Your creativity.{`\n`}Their <Text style={{ color: c.lime }}>next big</Text>{`\n`}campaign.</Text><Text style={{ color: '#C9BEDA', marginTop: 10, fontSize: 12 }}>Explore briefs from people who need your skills.</Text><View style={[s.between, { marginTop: 18 }]}><Text style={{ color: '#fff', fontWeight: '800', fontSize: 11 }}>12 new gigs nearby</Text><View style={[s.tag, { backgroundColor: c.lime }]}><Text style={[s.tagText, { color: c.deep }]}>Explore →</Text></View></View></View>
    <SectionTitle s={s} title="Fresh opportunities" />
    {gigs.map((g) => <View key={g[1]} style={[s.card, { marginBottom: 11 }]}><View style={s.between}><View style={s.tag}><Text style={s.tagText}>{g[0]}</Text></View><Text style={s.micro}>2h ago</Text></View><Text style={[s.h3, { marginTop: 13 }]}>{g[1]}</Text><Text style={[s.muted, { marginTop: 4 }]}>{g[2]}</Text><View style={[s.between, { marginTop: 14 }]}><View><Text style={s.name}>{g[3]}</Text><Text style={s.muted}>{g[4]}</Text></View><Pressable onPress={() => Alert.alert('Application started', 'Your Delulab profile has been attached.')} style={[s.tag, { backgroundColor: c.ink }]}><Text style={[s.tagText, { color: c.bg }]}>Apply ↗</Text></Pressable></View></View>)}
  </ScrollView><BottomNav s={s} active="gigs" navigate={navigate} /></View>;
}

export function Squads({ s, c, navigate, goBack, toggleTheme }) {
  return <View style={s.screen}><ScrollView contentContainerStyle={s.detailScroll}>
    <Header s={s} title="CREATIVE SQUADS ✳" onBack={goBack} onRight={toggleTheme} /><Text style={s.h1}>Better together.{`\n`}Wilder together.</Text>
    <View style={{ height: 185, backgroundColor: c.lime, borderRadius: 23, padding: 20, marginTop: 17, overflow: 'hidden' }}><View style={{ position: 'absolute', width: 210, height: 210, borderRadius: 105, right: -60, bottom: -90, backgroundColor: c.purple }} /><Text style={{ color: '#21192E', fontSize: 31, lineHeight: 29, fontWeight: '900', letterSpacing: -1.3 }}>Find your{`\n`}creative{`\n`}people.</Text><Pressable onPress={() => Alert.alert('Squad creator', 'Your new squad workspace is ready to set up.')} style={{ backgroundColor: c.deep, alignSelf: 'flex-start', paddingHorizontal: 13, paddingVertical: 9, borderRadius: 11, marginTop: 12 }}><Text style={{ color: '#fff', fontWeight: '900', fontSize: 10 }}>+ Create a squad</Text></Pressable></View>
    <SectionTitle s={s} title="Squads around you" action="Explore →" />
    <View style={s.card}><View style={{ height: 110, borderRadius: 15, backgroundColor: '#5C55B3', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 24, fontWeight: '900' }}>THE FRAME CLUB</Text></View><Text style={[s.name, { marginTop: 12 }]}>The Frame Club ✦</Text><Text style={s.muted}>Video · Photography · Editing</Text><View style={[s.between, { marginTop: 12 }]}><Text style={s.muted}>A  R  S   ·  11 projects</Text><Pressable onPress={() => navigate('project')}><Text style={[s.micro, s.purple]}>View squad ↗</Text></Pressable></View></View>
    <View style={[s.card, { marginTop: 11 }]}><Text style={s.name}>✳ Color Theory Crew</Text><Text style={s.muted}>Design · Motion · Branding · 5.4 km away</Text><View style={[s.between, { marginTop: 12 }]}><Text style={s.muted}>3 members · Open to collab</Text><Pressable onPress={() => Alert.alert('Request sent', 'The crew will see your collaboration request.')}><Text style={[s.micro, s.purple]}>Join ↗</Text></Pressable></View></View>
    <SectionTitle s={s} title="Open calls ✨" /><View style={s.card}><Text style={s.name}>Need a motion designer for our next project</Text><Text style={[s.muted, { marginTop: 5 }]}>Posted by The Frame Club · 1 day ago</Text></View>
  </ScrollView></View>;
}

export function Project({ s, c, navigate, goBack, toggleTheme }) {
  return <View style={s.screen}><ScrollView contentContainerStyle={s.detailScroll}><Header s={s} title="THE PROJECT FILE ✳" onBack={goBack} right="↗" onRight={() => Alert.alert('Share project', 'Share link copied.')} /><AbstractArt c={c} />
    <View style={[s.row, { gap: 10, marginVertical: 14 }]}><Avatar s={s} initials="A" /><View><Text style={s.name}>Aarav Visuals ✦</Text><Text style={s.muted}>Lucknow · Creative director</Text></View><Text style={[s.h3, { marginLeft: 'auto' }]}>♡   ↗</Text></View>
    <Text style={s.h2}>The work hits different.</Text><Text style={[s.body, { marginTop: 7 }]}>A concept campaign made with a 3-person creative crew. Big energy, zero boring frames.</Text><Chips s={s} items={['Motion','Brand film','Creative']} active="Motion" />
    <SectionTitle s={s} title="People behind the magic" /><PersonRow s={s} initials="A" name="Aarav Mehta" subtitle="Director · 4.9 ★" action="View ↗" onPress={() => {}} /><PersonRow s={s} initials="R" name="Riya Sharma" subtitle="Editor · 4.9 ★" action="View ↗" color="#4C8C93" onPress={() => navigate('profile')} /><PrimaryButton s={s} lime title="✳   Hire this creative squad   ↗" onPress={() => navigate('booking')} style={{ marginTop: 4 }} />
  </ScrollView></View>;
}

export function Booking({ s, c, navigate, goBack, toggleTheme }) {
  const [day, setDay] = useState(11); const [brief, setBrief] = useState('');
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.screen}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.detailScroll}><Header s={s} title="LET'S MAKE SOMETHING ✳" onBack={goBack} right="♡" onRight={() => Alert.alert('Saved', 'Riya was added to your favorites.')} />
    <View style={{ backgroundColor: c.deep, borderRadius: 23, height: 180, padding: 20, overflow: 'hidden' }}><Text style={{ color: c.lime, fontSize: 9, letterSpacing: 1.1, fontWeight: '900' }}>YOU + RIYA = SOMETHING GOOD</Text><Text style={{ color: '#fff', fontSize: 33, lineHeight: 33, fontWeight: '900', marginTop: 10 }}>Let's get{`\n`}creative.</Text><View style={{ backgroundColor: c.lime, padding: 7, borderRadius: 8, alignSelf: 'flex-start', marginTop: 12 }}><Text style={{ color: c.deep, fontWeight: '900', fontSize: 10 }}>FROM ₹3,500 / PROJECT</Text></View><Text style={{ color: c.purple, fontSize: 150, position: 'absolute', right: -30, top: -25 }}>✳</Text></View>
    <View style={[s.row, { gap: 10, marginVertical: 14 }]}><Avatar s={s} initials="R" /><View><Text style={s.name}>Riya Sharma ✦</Text><Text style={s.muted}>Video editor · 4.9 ★ · 24 gigs</Text></View><View style={[s.tag, { marginLeft: 'auto', backgroundColor: c.lime }]}><Text style={[s.tagText, { color: c.deep }]}>AVAILABLE</Text></View></View>
    <Text style={s.sectionTitle}>Pick your magic ✨</Text><View style={[s.card, s.between, { borderWidth: 2, borderColor: c.purple, marginTop: 10 }]}><View><Text style={s.name}>3 short-form reels</Text><Text style={s.muted}>Editing · 3-day delivery</Text></View><Text style={s.h3}>₹3,500 ✓</Text></View>
    <Text style={s.label}>When do we start?</Text><Text style={s.micro}>NOVEMBER 2026</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>{[9,10,11,12,13,14,15].map((d) => <Pressable key={d} onPress={() => setDay(d)} style={{ width: '12.2%', aspectRatio: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: day === d ? c.purple : c.layer }}><Text style={[s.name, day === d && { color: '#fff' }]}>{d}</Text></Pressable>)}</View>
    <Text style={s.label}>Spill the brief 💬</Text><TextInput value={brief} onChangeText={setBrief} placeholder="Tell Riya about your project, vibe, references..." placeholderTextColor={c.muted} multiline style={[s.input, { height: 82, textAlignVertical: 'top', paddingTop: 13 }]} /><View style={[s.tag, { marginTop: 10 }]}><Text style={s.tagText}>✦ You're sending a request, not paying yet.</Text></View><PrimaryButton s={s} title="Send booking request ↗" onPress={() => navigate('messages')} style={{ marginTop: 12 }} />
  </ScrollView></KeyboardAvoidingView>;
}

export function Messages({ s, c, goBack, toggleTheme }) {
  const [text, setText] = useState(''); const [messages, setMessages] = useState(['This is the vibe. Let’s gooo 🔥']);
  const send = () => { if (!text.trim()) return; setMessages((m) => [...m, text.trim()]); setText(''); };
  return <KeyboardAvoidingView style={s.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><View style={{ flex: 1 }}><ScrollView contentContainerStyle={[s.detailScroll, { paddingBottom: 100 }]}><Header s={s} title="INBOX ✳" onBack={goBack} right="•••" onRight={() => Alert.alert('Conversation', 'Project details and safety tools will appear here.')} />
    <View style={[s.row, { gap: 10, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: c.line }]}><Avatar s={s} initials="R" color="#4C8C93" /><View><Text style={s.name}>Riya Sharma ✦</Text><Text style={s.muted}>● Online · Video editor</Text></View></View>
    <View style={[s.card, s.row, { gap: 10, backgroundColor: c.lime, marginTop: 14 }]}><Avatar s={s} initials="✳" color={c.deep} /><View><Text style={[s.name, { color: c.deep }]}>The creative brief is live!</Text><Text style={[s.muted, { color: '#655968' }]}>3 reels · ₹3,500 · Awaiting response</Text></View></View>
    <Text style={[s.micro, { textAlign: 'center', marginVertical: 17 }]}>TODAY, 9:41 AM</Text>
    <Bubble s={s} c={c}>Heyyy! Just saw your request 👀 Love the concept!</Bubble><Bubble s={s} c={c} out>Ahh amazing! We want it cinematic, not like typical ads ⚡</Bubble><Bubble s={s} c={c}>Say less. I have ideas already ✳</Bubble>
    <View style={[s.card, { marginVertical: 10 }]}><View style={[s.tag, { alignSelf: 'flex-start' }]}><Text style={s.tagText}>PROJECT PROPOSAL ✦</Text></View><Text style={[s.h3, { marginTop: 10 }]}>3 aesthetic café reels</Text><Text style={s.muted}>3 videos · 3-day delivery · 1 revision</Text><Text style={[s.h2, { marginTop: 8 }]}>₹3,500</Text><PrimaryButton s={s} lime title="Review proposal ↗" onPress={() => Alert.alert('Proposal', 'Proposal accepted in demo mode.')} style={{ marginTop: 10, minHeight: 42 }} /></View>
    {messages.map((m, i) => <Bubble key={`${m}-${i}`} s={s} c={c} out>{m}</Bubble>)}
  </ScrollView><View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: c.panel, borderTopWidth: 1, borderTopColor: c.line, flexDirection: 'row', gap: 8, alignItems: 'center' }}><TextInput value={text} onChangeText={setText} placeholder="Type a message..." placeholderTextColor={c.muted} style={[s.input, { flex: 1 }]} onSubmitEditing={send} /><Pressable onPress={send} style={[s.postButton, { borderRadius: 13 }]}><Text style={{ color: '#fff', fontSize: 18 }}>➤</Text></Pressable></View></View></KeyboardAvoidingView>;
}

function Bubble({ s, c, out, children }) { return <View style={{ alignSelf: out ? 'flex-end' : 'flex-start', maxWidth: '83%', backgroundColor: out ? c.purple : c.layer, paddingHorizontal: 13, paddingVertical: 11, borderRadius: 16, borderBottomRightRadius: out ? 4 : 16, borderBottomLeftRadius: out ? 16 : 4, marginBottom: 9 }}><Text style={[s.body, out && { color: '#fff' }]}>{children}</Text></View>; }

export function CreatePost({ s, c, goBack, toggleTheme }) {
  const [title, setTitle] = useState(''); const [kind, setKind] = useState('Video'); const [hire, setHire] = useState(true);
  return <KeyboardAvoidingView style={s.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={s.detailScroll} keyboardShouldPersistTaps="handled"><Header s={s} title="DROP SOMETHING GOOD ✳" onBack={goBack} right="?" onRight={() => Alert.alert('Posting tips', 'Lead with your strongest visual, credit collaborators, and add a clear title.')} />
    <View style={{ height: 160, borderRadius: 23, backgroundColor: c.lime, padding: 18, overflow: 'hidden' }}><Text style={{ color: c.deep, fontSize: 29, lineHeight: 27, fontWeight: '900', letterSpacing: -1.3 }}>YOUR{`\n`}WORK.{`\n`}YOUR{`\n`}WORLD.</Text><View style={{ position: 'absolute', width: 170, height: 170, borderRadius: 85, backgroundColor: c.purple, right: -15, top: 55 }} /><Text style={{ position: 'absolute', right: 19, top: 38, fontSize: 85, color: c.deep }}>✳</Text></View>
    <Pressable onPress={() => Alert.alert('Media picker', 'Connect the device media library when you are ready to upload real work.')} style={{ height: 130, borderRadius: 17, borderWidth: 2, borderStyle: 'dashed', borderColor: '#A68BCF', backgroundColor: c.purpleSoft, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}><Text style={[s.h1, s.purple]}>⊕</Text><Text style={[s.name, s.purple]}>Add your best work</Text><Text style={s.muted}>Reels, images, posters, motion & more</Text></Pressable>
    <Text style={s.label}>Give this masterpiece a name</Text><TextInput value={title} onChangeText={setTitle} placeholder="E.g. The campaign that ate ✨" placeholderTextColor={c.muted} style={s.input} />
    <Text style={s.label}>What kind of magic?</Text><Chips s={s} items={['Video','Design','Photo']} active={kind} onChange={setKind} />
    <Text style={s.label}>Tag your creative besties</Text><Pressable style={[s.input, { justifyContent: 'center' }]}><Text style={s.muted}>＋ Add collaborators & project credits</Text></Pressable>
    <View style={[s.between, { marginTop: 18, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: c.line }]}><View><Text style={s.name}>Open to getting hired?</Text><Text style={s.muted}>Let viewers book you from this post</Text></View><Switch value={hire} onValueChange={setHire} trackColor={{ false: c.line, true: c.purple }} thumbColor="#fff" /></View>
    <PrimaryButton s={s} title="Publish your magic ✳ ↗" onPress={() => Alert.alert('Published!', title ? `“${title}” is now live in the lab.` : 'Your project is now live in the lab.')} style={{ marginTop: 22 }} />
  </ScrollView></KeyboardAvoidingView>;
}
