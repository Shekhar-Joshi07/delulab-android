import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

const PURPLE = '#8055F6';
const INK = '#21172E';

export function AppIcon({ name, size = 20, color = INK, filled = false }) {
  const line = { fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const shapes = {
    search: <><Circle cx="10.7" cy="10.7" r="5.8" {...line} /><Line x1="15" y1="15" x2="20.5" y2="20.5" {...line} /></>,
    bell: <><Path d="M5 17h14c-1.6-1.8-2-3.1-2-6a5 5 0 0 0-10 0c0 2.9-.4 4.2-2 6Z" {...line} /><Path d="M10 20h4" {...line} /></>,
    heart: <Path d="M12 20.5 4.5 13a4.4 4.4 0 0 1 6.2-6.2L12 8.1l1.3-1.3a4.4 4.4 0 0 1 6.2 6.2Z" {...line} fill={filled ? color : 'none'} />,
    home: <><Path d="M3.5 10 12 3.7 20.5 10v10H3.5Z" {...line} /><Path d="M9 20v-6h6v6" {...line} /></>,
    explore: <><Circle cx="12" cy="12" r="8.2" {...line} /><Path d="m15.9 8.1-2.1 5.7-5.7 2.1 2.1-5.7Z" {...line} /></>,
    gigs: <><Rect x="4" y="5.2" width="16" height="14" rx="2" {...line} /><Path d="M4 9h16M9 5V3m6 2V3m-7 11h8" {...line} /></>,
    profile: <><Circle cx="12" cy="8" r="3.5" {...line} /><Path d="M5.1 20a6.9 6.9 0 0 1 13.8 0" {...line} /></>,
    plus: <Path d="M12 4v16M4 12h16" {...line} />,
    dots: <><Circle cx="5" cy="12" r="1.3" fill={color} /><Circle cx="12" cy="12" r="1.3" fill={color} /><Circle cx="19" cy="12" r="1.3" fill={color} /></>,
    arrow: <Path d="M5 18 18 5m-8 0h8v8" {...line} />,
    bookmark: <Path d="M6 4h12v17l-6-4-6 4Z" {...line} fill={filled ? color : 'none'} />,
    edit: <><Path d="M4 17.5V20h2.5L18.8 7.7l-2.5-2.5Z" {...line} /><Path d="m14.9 6.6 2.5 2.5" {...line} /></>,
    camera: <><Rect x="3" y="6" width="18" height="14" rx="3" {...line} /><Path d="M8 6l1.2-2h5.6L16 6" {...line} /><Circle cx="12" cy="13" r="3.3" {...line} /></>,
    pin: <><Path d="M12 21s6.5-6.1 6.5-11.1a6.5 6.5 0 0 0-13 0C5.5 14.9 12 21 12 21Z" {...line} /><Circle cx="12" cy="9.8" r="2.2" {...line} /></>,
    instagram: <><Rect x="3.5" y="3.5" width="17" height="17" rx="5" {...line} /><Circle cx="12" cy="12" r="4" {...line} /><Circle cx="17.3" cy="6.9" r="1" fill={color} /></>,
    close: <Path d="M5 5l14 14M19 5 5 19" {...line} />,
    check: <Path d="m4 12 5 5L20 6" {...line} />,
  };
  return <Svg width={size} height={size} viewBox="0 0 24 24">{shapes[name]}</Svg>;
}

function NavItem({ label, icon, active, onPress }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: active }} onPress={onPress} style={styles.navItem}>
    <AppIcon name={icon} size={19} color={active ? PURPLE : '#9F93AE'} />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </Pressable>;
}

export default function AppNavigation({ active, onHome, onExplore, onGigs, onProfile, onCreate }) {
  return <View style={styles.bottomNav}>
    <NavItem label="Home" icon="home" active={active === 'Home'} onPress={onHome} />
    <NavItem label="Explore" icon="explore" active={active === 'Explore'} onPress={onExplore} />
    <Pressable accessibilityRole="button" accessibilityLabel="Create post" onPress={onCreate} style={styles.createButton}><AppIcon name="plus" size={23} color="#FFFFFF" /></Pressable>
    <NavItem label="Gigs" icon="gigs" active={active === 'Gigs'} onPress={onGigs} />
    <NavItem label="Profile" icon="profile" active={active === 'Profile'} onPress={onProfile} />
  </View>;
}

const styles = StyleSheet.create({
  bottomNav: { minHeight: 66, borderTopWidth: 1, borderTopColor: '#ECE6F3', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFFFFF', paddingHorizontal: 7 },
  navItem: { width: 54, alignItems: 'center', justifyContent: 'center', gap: 3 },
  navLabel: { color: '#9F93AE', fontFamily: 'Inter_400Regular', fontSize: 9 },
  navLabelActive: { color: PURPLE, fontFamily: 'Inter_700Bold' },
  createButton: { width: 43, height: 43, borderRadius: 14, backgroundColor: PURPLE, alignItems: 'center', justifyContent: 'center', marginTop: -6, shadowColor: PURPLE, shadowOpacity: 0.33, shadowRadius: 10, elevation: 5 },
});
