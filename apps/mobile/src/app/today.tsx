import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import {
  MaxContentWidth,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.brand, { color: colors.brand }]}>Hobby-Seeker</Text>

            <Text style={[styles.title, { color: colors.text }]}>
              오늘은 어떤 하루였나요?
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              일상을 조금씩 들려주세요.{'\n'}
              당신에게 맞는 취미의 씨앗을 찾아볼게요.
            </Text>
          </View>

          <View
            style={[
              styles.seedCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}>
            <View
              style={[
                styles.seedIcon,
                { backgroundColor: colors.brandSoft },
              ]}>
              <Text style={styles.seedEmoji}>🌱</Text>
            </View>

            <View style={styles.seedContent}>
              <Text style={[styles.seedLabel, { color: colors.brand }]}>
                아직 발견 중이에요
              </Text>

              <Text style={[styles.seedTitle, { color: colors.text }]}>
                오늘 있었던 일을{'\n'}편하게 이야기해보세요.
              </Text>

              <Text style={[styles.seedDescription, { color: colors.textSecondary }]}>
                작은 이야기들이 쌓이면 새로운 취미의 씨앗이 보여요.
              </Text>
            </View>
          </View>

          {/* <Pressable
            accessibilityRole="button"
            style={[styles.primaryButton, { backgroundColor: colors.brand }]}>
            <Text style={styles.primaryButtonText}>오늘 이야기하기</Text>
          </Pressable> */}
          
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/recommendation')}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.brand,
                opacity: pressed ? 0.85 : 1,
              },
            ]}>
            <Text style={styles.primaryButtonText}>오늘 이야기하기</Text>
          </Pressable>
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
    paddingTop: Spacing.six,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.five,
  },
  header: {
    gap: Spacing.three,
  },
  brand: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  title: {
    ...Typography.title,
  },
  description: {
    ...Typography.body,
  },
  seedCard: {
    borderWidth: 1,
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  seedIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seedEmoji: {
    fontSize: 26,
  },
  seedContent: {
    gap: Spacing.two,
  },
  seedLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  seedTitle: {
    ...Typography.subheading,
  },
  seedDescription: {
    ...Typography.bodySmall,
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
    color: '#FFFFFF',
    fontWeight: '700',
  },
});