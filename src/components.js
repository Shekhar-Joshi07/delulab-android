import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export function Header({ s, title, onBack, right = '☾', onRight }) {
  return (
    <View style={s.header}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} style={s.iconButton}><Text style={s.iconText}>‹</Text></Pressable>
      ) : <View style={{ width: 38 }} />}
      <Text style={[s.micro, s.iconText, { fontSize: 10, letterSpacing: 1.4 }]}>{title}</Text>
      <Pressable accessibilityRole="button" onPress={onRight} style={s.iconButton}><Text style={s.iconText}>{right}</Text></Pressable>
    </View>
  );
}

export function BrandHeader({ s, word, onTheme, right = '☾', onRight }) {
  return (
    <View style={s.header}>
      <Text style={s.logo}>{word}<Text style={s.purple}>.</Text></Text>
      <Pressable accessibilityRole="button" accessibilityLabel={right === '☾' ? 'Change theme' : right} onPress={onRight || onTheme} style={s.iconButton}>
        <Text style={s.iconText}>{right}</Text>
      </Pressable>
    </View>
  );
}

export function Chips({ items, active, onChange, s }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
      {items.map((item) => {
        const selected = item === active;
        return <Pressable key={item} onPress={() => onChange?.(item)} style={[s.chip, selected && s.chipActive]}><Text style={[s.chipText, selected && s.chipTextActive]}>{item}</Text></Pressable>;
      })}
    </ScrollView>
  );
}

export function Avatar({ s, initials = 'R', color, size = 38 }) {
  return <View style={[s.avatar, { width: size, height: size, borderRadius: size * .34 }, color && { backgroundColor: color }]}><Text style={s.avatarText}>{initials}</Text></View>;
}

export function SectionTitle({ s, title, action, onAction }) {
  return <View style={[s.between, s.sectionRow]}><Text style={s.sectionTitle}>{title}</Text>{action ? <Pressable onPress={onAction}><Text style={[s.micro, s.purple]}>{action}</Text></Pressable> : null}</View>;
}

const tabs = [
  ['Home', '⌂', 'home'], ['Explore', '⌕', 'explore'], ['Create', '+', 'create'], ['Gigs', '▣', 'gigs'], ['Profile', '◉', 'profile'],
];

export function BottomNav({ s, active, navigate }) {
  return <View style={s.nav}>{tabs.map(([label, icon, route]) => route === 'create' ? (
    <Pressable key={route} accessibilityLabel="Create a post" onPress={() => navigate(route)} style={s.navItem}><View style={s.postButton}><Text style={{ color: '#fff', fontSize: 27, lineHeight: 30 }}>+</Text></View></Pressable>
  ) : (
    <Pressable key={route} accessibilityLabel={label} onPress={() => navigate(route)} style={s.navItem}>
      <Text style={[s.navIcon, active === route && s.navIconActive]}>{icon}</Text>
      <Text style={[s.navLabel, active === route && s.navLabelActive]}>{label}</Text>
    </Pressable>
  ))}</View>;
}

export function AbstractArt({ c, compact = false, label = 'MAKE\nIT\nLOUD.' }) {
  return (
    <View style={{ height: compact ? 130 : 245, borderRadius: 22, overflow: 'hidden', backgroundColor: '#2B2147' }}>
      <View style={{ position: 'absolute', width: 220, height: 220, borderRadius: 110, right: -40, top: 20, backgroundColor: c.purple }} />
      <View style={{ position: 'absolute', width: 140, height: 140, borderRadius: 70, right: 20, top: 60, backgroundColor: c.pink }} />
      <View style={{ position: 'absolute', width: 95, height: 95, borderRadius: 48, right: 43, top: 82, backgroundColor: c.lime }} />
      <View style={{ position: 'absolute', width: 240, height: 74, borderWidth: 15, borderColor: '#FADAF0', borderRadius: 80, left: 6, bottom: 34, transform: [{ rotate: '-18deg' }] }} />
      <Text style={{ color: '#fff', fontSize: compact ? 27 : 40, lineHeight: compact ? 25 : 35, fontWeight: '900', letterSpacing: -2, position: 'absolute', left: 18, top: 20 }}>{label}</Text>
      <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 2, position: 'absolute', left: 19, bottom: 15 }}>CAMPAIGN 001 / EXPERIMENTAL</Text>
    </View>
  );
}

export function PersonRow({ s, initials, name, subtitle, action, onPress, color }) {
  return <Pressable onPress={onPress} style={[s.card, s.row, { gap: 11, marginBottom: 10 }]}><Avatar s={s} initials={initials} color={color} size={48} /><View style={{ flex: 1 }}><Text style={s.name}>{name}</Text><Text style={s.muted}>{subtitle}</Text></View><Text style={[s.h3, s.purple]}>{action || '↗'}</Text></Pressable>;
}

export function PrimaryButton({ s, title, onPress, lime = false, style }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={[s.primary, lime && s.limeButton, style]}><Text style={[s.primaryText, lime && s.limeText]}>{title}</Text></Pressable>;
}
