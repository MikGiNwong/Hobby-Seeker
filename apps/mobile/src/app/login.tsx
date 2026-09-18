import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import {
//   Colors,
  MaxContentWidth,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function LoginScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.brandSection}>
            <Text style={[styles.brand, { color: colors.brand }]}>
              Hobby-Seeker
            </Text>

            <View
              style={[
                styles.seedIcon,
                { backgroundColor: colors.brandSoft },
              ]}>
              <Text style={styles.seedEmoji}>🌱</Text>
            </View>

            <View style={styles.copy}>
              <Text style={[styles.title, { color: colors.text }]}>
                내 일상에서{'\n'}취미의 씨앗을 찾아보세요.
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.textSecondary },
                ]}>
                특별한 취미를 고를 필요 없어요.{'\n'}
                오늘 있었던 일을 들려주면 작은 활동부터 함께 찾아볼게요.
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/today')}
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: colors.brand,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <Text style={styles.primaryButtonText}>시작하기</Text>
            </Pressable>

            <Text
              style={[
                styles.helperText,
                { color: colors.textSecondary },
              ]}>
              로그인 기능은 다음 단계에서 연결할 예정이에요.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Spacing.six,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  brandSection: {
    gap: Spacing.five,
  },
  brand: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  seedIcon: {
    width: 72,
    height: 72,
    borderRadius: Radius.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seedEmoji: {
    fontSize: 34,
  },
  copy: {
    gap: Spacing.three,
  },
  title: {
    ...Typography.title,
  },
  description: {
    ...Typography.body,
  },
  actions: {
    gap: Spacing.three,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  primaryButtonText: {
    ...Typography.body,
    // color: Colors.dark.text,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  helperText: {
    ...Typography.caption,
    textAlign: 'center',
  },
});