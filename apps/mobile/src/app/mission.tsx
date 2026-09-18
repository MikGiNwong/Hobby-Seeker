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

export default function MissionScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.eyebrow, { color: colors.brand }]}>
              오늘의 미션
            </Text>

            <Text style={[styles.title, { color: colors.text }]}>
              산책하며{'\n'}마음에 드는 장면 3개 찍기
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              잘 찍을 필요는 없어요.{'\n'}
              그냥 눈길이 가는 순간을 남겨보세요.
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
            <View style={styles.missionRow}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.brandSoft },
                ]}>
                <Text style={styles.icon}>📷</Text>
              </View>

              <View style={styles.missionInfo}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  목표
                </Text>
                <Text style={[styles.value, { color: colors.text }]}>
                  사진 3장
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.missionRow}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.brandSoft },
                ]}>
                <Text style={styles.icon}>⏱️</Text>
              </View>

              <View style={styles.missionInfo}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  예상 시간
                </Text>
                <Text style={[styles.value, { color: colors.text }]}>
                  약 30분
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tip}>
            <Text style={[styles.tipLabel, { color: colors.brand }]}>
              작은 팁
            </Text>
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
              멀리 갈 필요 없어요. 집 근처에서 시작해도 충분해요.
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/feedback')}
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: colors.brand,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <Text style={styles.primaryButtonText}>미션 완료했어요</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.secondaryButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}>
              <Text
                style={[
                  styles.secondaryButtonText,
                  { color: colors.textSecondary },
                ]}>
                나중에 할게요
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
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  missionInfo: {
    gap: Spacing.one,
  },
  label: {
    ...Typography.caption,
  },
  value: {
    ...Typography.body,
    fontWeight: '600',
  },
  divider: {
    height: 1,
  },
  tip: {
    gap: Spacing.two,
  },
  tipLabel: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  tipText: {
    ...Typography.bodySmall,
  },
  actions: {
    marginTop: 'auto',
    gap: Spacing.two,
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
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
});