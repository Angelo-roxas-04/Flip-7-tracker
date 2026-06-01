/**
 * Base layout for every game screen: dark felt background + safe-area insets.
 * Pure presentation — screens compose their content inside it.
 */

import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { MaxContentWidth, Palette, Spacing } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  /** Extra style for the centered content column. */
  contentStyle?: ViewStyle;
  edges?: Edge[];
};

export function ScreenContainer({ children, contentStyle, edges }: Props) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={edges ?? ['top', 'bottom']}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.feltDeep, alignItems: 'center' },
  safe: { flex: 1, width: '100%', maxWidth: MaxContentWidth },
  content: { flex: 1, paddingHorizontal: Spacing.three, width: '100%' },
});
