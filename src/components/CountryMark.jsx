import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export default function CountryMark({ code }) {
  if (code !== '+91') {
    return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" accessibilityLabel="Country code">
      <Circle cx="12" cy="12" r="9" stroke="#8055F6" strokeWidth="1.6" />
      <Path d="M3 12h18M12 3c2.5 2.5 3.6 5.5 3.6 9S14.5 18.5 12 21M12 3C9.5 5.5 8.4 8.5 8.4 12S9.5 18.5 12 21" stroke="#8055F6" strokeWidth="1.3" />
    </Svg>;
  }
  return <View style={styles.flag} accessibilityLabel="India flag">
    <Svg width={22} height={16} viewBox="0 0 22 16">
      <Rect width="22" height="5.33" fill="#FF9933" />
      <Rect y="5.33" width="22" height="5.34" fill="#FFFFFF" />
      <Rect y="10.67" width="22" height="5.33" fill="#138808" />
      <Circle cx="11" cy="8" r="2.35" stroke="#000080" strokeWidth="0.65" fill="none" />
      <Circle cx="11" cy="8" r="0.38" fill="#000080" />
    </Svg>
  </View>;
}

const styles = StyleSheet.create({ flag: { width: 22, height: 16, borderRadius: 2, overflow: 'hidden' } });
