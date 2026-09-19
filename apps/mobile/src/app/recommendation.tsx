import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MaxContentWidth,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function RecommendationScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.eyebrow, { color: colors.brand }]}>
              🌱 오늘 발견한 활동
            </Text>

            <Text style={[styles.title, { color: colors.text }]}>
              사진 산책
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              최근 산책하거나 밖에 나가고 싶다는 이야기가 여러 번 있었어요.
            </Text>
          </View>

          <View
            style={[
              styles.missionCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}>
            <Text style={[styles.cardLabel, { color: colors.brand }]}>
              오늘은 이렇게 시작해볼까요?
            </Text>

            <Text style={[styles.missionTitle, { color: colors.text }]}>
              산책하면서 마음에 드는 장면 3개만 찍어보세요.
            </Text>

            <Text
              style={[
                styles.duration,
                { color: colors.textSecondary },
              ]}>
              약 30분
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/mission')}
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: colors.brand,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <Text style={styles.primaryButtonText}>해볼게요</Text>
            </Pressable>

            <Pressable
                accessibilityRole="button"
                onPress={() => router.replace('/today')}
                style={({ pressed }) => [
                    styles.secondaryButton,
                    {
                    borderColor: colors.border,
                    opacity: pressed ? 0.6 : 1,
                    },
                ]}>
                <Text
                    style={[
                    styles.secondaryButtonText,
                    { color: colors.textSecondary },
                    ]}>
                    오늘은 어려워요
                </Text>
                </Pressable>
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
    paddingTop: Spacing.six,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.five,
  },
  header: {
    gap: Spacing.three,
  },
  eyebrow: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  title: {
    ...Typography.title,
  },
  description: {
    ...Typography.body,
  },
  missionCard: {
    borderWidth: 1,
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  cardLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  missionTitle: {
    ...Typography.subheading,
  },
  duration: {
    ...Typography.bodySmall,
  },
  actions: {
    marginTop: 'auto',
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
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  secondaryButtonText: {
    ...Typography.body,
    fontWeight: '600',
  },
});