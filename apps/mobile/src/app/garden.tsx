import { router } from 'expo-router';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MaxContentWidth,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  type Difficulty,
  type Enjoyment,
  type RepeatIntent,
  useFeedbackStore,
} from '@/stores/feedback-store';

const ENJOYMENT_LABELS: Record<Enjoyment, string> = {
  low: '별로였어요',
  medium: '괜찮았어요',
  high: '재미있었어요',
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '쉬웠어요',
  good: '적당했어요',
  hard: '어려웠어요',
};

const REPEAT_INTENT_LABELS: Record<RepeatIntent, string> = {
  no: '다시 할 생각은 없어요',
  maybe: '다시 할 수도 있어요',
  yes: '다시 해보고 싶어요',
};

export default function GardenScreen() {
  const colors = useTheme();
  const enjoyment = useFeedbackStore((state) => state.enjoyment);
  const difficulty = useFeedbackStore((state) => state.difficulty);
  const repeatIntent = useFeedbackStore((state) => state.repeatIntent);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.eyebrow, { color: colors.brand }]}>
              나의 취미 정원
            </Text>

            <Text style={[styles.title, { color: colors.text }]}>
              작은 활동이{'\n'}취미로 자라고 있어요.
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              직접 해본 경험이 쌓일수록 취미의 모습이 조금씩 선명해져요.
            </Text>
          </View>

          <View
            style={[
              styles.gardenCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}>
            <View
              style={[
                styles.stageBadge,
                { backgroundColor: colors.brandSoft },
              ]}>
              <Text style={[styles.stageBadgeText, { color: colors.brand }]}>
                TRIED · 한 번 해봄
              </Text>
            </View>

            <Text style={styles.plantEmoji}>🌱</Text>

            <Text style={[styles.hobbyTitle, { color: colors.text }]}>
              사진 산책
            </Text>

            <Text
              style={[
                styles.hobbyDescription,
                { color: colors.textSecondary },
              ]}>
              산책하면서 주변을 관찰하고 마음에 드는 장면을 사진으로 남겨봤어요.
            </Text>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.growthSection}>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>
                성장 과정
              </Text>

              <View style={styles.growthRow}>
                <GrowthStage emoji="🌰" label="발견" active />
                <Text style={[styles.arrow, { color: colors.textSecondary }]}>
                  →
                </Text>

                <GrowthStage emoji="🌱" label="해봄" active />
                <Text style={[styles.arrow, { color: colors.textSecondary }]}>
                  →
                </Text>

                <GrowthStage emoji="🌿" label="새싹" />
                <Text style={[styles.arrow, { color: colors.textSecondary }]}>
                  →
                </Text>

                <GrowthStage emoji="🌳" label="취미" />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.discoveryCard,
              {
                backgroundColor: colors.brandSoft,
              },
            ]}>
            <Text style={[styles.discoveryLabel, { color: colors.brand }]}>
              📝 내가 남긴 피드백
            </Text>

            <Text style={[styles.discoveryTitle, { color: colors.text }]}>
              사진 산책은 이렇게 느꼈어요.
            </Text>

            <View style={styles.feedbackList}>
              <View style={styles.feedbackRow}>
                <Text
                  style={[styles.feedbackLabel, { color: colors.textSecondary }]}>
                  재미
                </Text>
                <Text style={[styles.feedbackValue, { color: colors.text }]}>
                  {enjoyment ? ENJOYMENT_LABELS[enjoyment] : '응답 없음'}
                </Text>
              </View>

              <View style={styles.feedbackRow}>
                <Text
                  style={[styles.feedbackLabel, { color: colors.textSecondary }]}>
                  난이도
                </Text>
                <Text style={[styles.feedbackValue, { color: colors.text }]}>
                  {difficulty ? DIFFICULTY_LABELS[difficulty] : '응답 없음'}
                </Text>
              </View>

              <View style={styles.feedbackRow}>
                <Text
                  style={[styles.feedbackLabel, { color: colors.textSecondary }]}>
                  다시 하기
                </Text>
                <Text style={[styles.feedbackValue, { color: colors.text }]}>
                  {repeatIntent
                    ? REPEAT_INTENT_LABELS[repeatIntent]
                    : '응답 없음'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.hiddenBranch}>
            <Text style={[styles.hiddenLabel, { color: colors.textSecondary }]}>
              다음에는 어떤 모습으로 자랄까요?
            </Text>

            <View style={styles.hiddenOptions}>
              <View
                style={[
                  styles.hiddenOption,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}>
                <Text style={styles.hiddenEmoji}>?</Text>
              </View>

              <View
                style={[
                  styles.hiddenOption,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}>
                <Text style={styles.hiddenEmoji}>?</Text>
              </View>
            </View>
          </View>

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
            <Text style={styles.primaryButtonText}>오늘 기록하러 가기</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

type GrowthStageProps = {
  emoji: string;
  label: string;
  active?: boolean;
};

function GrowthStage({
  emoji,
  label,
  active = false,
}: GrowthStageProps) {
  const colors = useTheme();

  return (
    <View style={styles.growthStage}>
      <View
        style={[
          styles.growthIcon,
          {
            backgroundColor: active
              ? colors.brandSoft
              : colors.backgroundElement,
            borderColor: active ? colors.brand : colors.border,
          },
        ]}>
        <Text style={styles.growthEmoji}>{emoji}</Text>
      </View>

      <Text
        style={[
          styles.growthLabel,
          {
            color: active ? colors.brand : colors.textSecondary,
          },
        ]}>
        {label}
      </Text>
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
    flexGrow: 1,
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
  gardenCard: {
    borderWidth: 1,
    borderRadius: Radius.large,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
  stageBadge: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  stageBadgeText: {
    ...Typography.caption,
    fontWeight: '700',
  },
  plantEmoji: {
    fontSize: 64,
  },
  hobbyTitle: {
    ...Typography.heading,
    textAlign: 'center',
  },
  hobbyDescription: {
    ...Typography.bodySmall,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: Spacing.one,
  },
  growthSection: {
    width: '100%',
    gap: Spacing.three,
  },
  sectionLabel: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  growthRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  growthStage: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  growthIcon: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthEmoji: {
    fontSize: 20,
  },
  growthLabel: {
    ...Typography.caption,
  },
  arrow: {
    marginTop: 12,
    fontSize: 16,
  },
  discoveryCard: {
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  discoveryLabel: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  discoveryTitle: {
    ...Typography.subheading,
  },
  feedbackList: {
    gap: Spacing.two,
  },
  feedbackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  feedbackLabel: {
    ...Typography.bodySmall,
  },
  feedbackValue: {
    ...Typography.bodySmall,
    flexShrink: 1,
    fontWeight: '600',
    textAlign: 'right',
  },
  hiddenBranch: {
    gap: Spacing.three,
  },
  hiddenLabel: {
    ...Typography.bodySmall,
    textAlign: 'center',
  },
  hiddenOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  hiddenOption: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderRadius: Radius.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenEmoji: {
    fontSize: 24,
    fontWeight: '700',
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
