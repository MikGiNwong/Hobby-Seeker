import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MaxContentWidth,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Enjoyment = 'low' | 'medium' | 'high';
type Difficulty = 'easy' | 'good' | 'hard';
type RepeatIntent = 'no' | 'maybe' | 'yes';

export default function FeedbackScreen() {
  const colors = useTheme();

  const [enjoyment, setEnjoyment] = useState<Enjoyment | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [repeatIntent, setRepeatIntent] = useState<RepeatIntent | null>(null);

  const canSubmit =
    enjoyment !== null &&
    difficulty !== null &&
    repeatIntent !== null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.eyebrow, { color: colors.brand }]}>
              활동 피드백
            </Text>

            <Text style={[styles.title, { color: colors.text }]}>
              사진 산책은{'\n'}어땠나요?
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              솔직하게 알려주세요. 다음 활동을 더 잘 찾는 데 도움이 돼요.
            </Text>
          </View>

          <View style={styles.questions}>
            <View style={styles.question}>
              <Text style={[styles.questionTitle, { color: colors.text }]}>
                재미있었나요?
              </Text>

              <View style={styles.options}>
                <Option
                  label="😕 별로였어요"
                  selected={enjoyment === 'low'}
                  onPress={() => setEnjoyment('low')}
                />
                <Option
                  label="🙂 괜찮았어요"
                  selected={enjoyment === 'medium'}
                  onPress={() => setEnjoyment('medium')}
                />
                <Option
                  label="😄 재미있었어요"
                  selected={enjoyment === 'high'}
                  onPress={() => setEnjoyment('high')}
                />
              </View>
            </View>

            <View style={styles.question}>
              <Text style={[styles.questionTitle, { color: colors.text }]}>
                난이도는 어땠나요?
              </Text>

              <View style={styles.options}>
                <Option
                  label="너무 쉬웠어요"
                  selected={difficulty === 'easy'}
                  onPress={() => setDifficulty('easy')}
                />
                <Option
                  label="적당했어요"
                  selected={difficulty === 'good'}
                  onPress={() => setDifficulty('good')}
                />
                <Option
                  label="어려웠어요"
                  selected={difficulty === 'hard'}
                  onPress={() => setDifficulty('hard')}
                />
              </View>
            </View>

            <View style={styles.question}>
              <Text style={[styles.questionTitle, { color: colors.text }]}>
                다시 해보고 싶나요?
              </Text>

              <View style={styles.options}>
                <Option
                  label="아니요"
                  selected={repeatIntent === 'no'}
                  onPress={() => setRepeatIntent('no')}
                />
                <Option
                  label="아마도"
                  selected={repeatIntent === 'maybe'}
                  onPress={() => setRepeatIntent('maybe')}
                />
                <Option
                  label="네"
                  selected={repeatIntent === 'yes'}
                  onPress={() => setRepeatIntent('yes')}
                />
              </View>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={!canSubmit}
            style={[
              styles.submitButton,
              {
                backgroundColor: colors.brand,
                opacity: canSubmit ? 1 : 0.4,
              },
            ]}>
            <Text style={styles.submitButtonText}>피드백 남기기</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

type OptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function Option({ label, selected, onPress }: OptionProps) {
  const colors = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: selected
            ? colors.brandSoft
            : colors.surface,
          borderColor: selected
            ? colors.brand
            : colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <Text
        style={[
          styles.optionText,
          {
            color: selected
              ? colors.brand
              : colors.text,
          },
        ]}>
        {label}
      </Text>
    </Pressable>
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
  questions: {
    gap: Spacing.four,
  },
  question: {
    gap: Spacing.two,
  },
  questionTitle: {
    ...Typography.body,
    fontWeight: '700',
  },
  options: {
    gap: Spacing.two,
  },
  option: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: Radius.medium,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  optionText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  submitButton: {
    minHeight: 56,
    marginTop: 'auto',
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  submitButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});