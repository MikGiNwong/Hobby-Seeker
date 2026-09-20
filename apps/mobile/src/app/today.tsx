import { useRef, useState } from 'react';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  type LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import { useDailyEntryStore } from '@/stores/daily-entry-store';
import { useMissionStore } from '@/stores/mission-store';

export default function TodayScreen() {
  const colors = useTheme();
  const [draft, setDraft] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollViewHeightRef = useRef(0);
  const entryInputLayoutRef = useRef({ y: 0, height: 0 });
  const isEntryInputFocusedRef = useRef(false);
  const activeMission = useMissionStore((state) => state.activeMission);
  const entries = useDailyEntryStore((state) => state.entries);
  const addEntry = useDailyEntryStore((state) => state.addEntry);
  const trimmedDraft = draft.trim();
  const canSubmit = trimmedDraft.length > 0;
  const latestEntry = entries[entries.length - 1];

  const scrollEntryInputIntoView = () => {
    const { y, height } = entryInputLayoutRef.current;
    const scrollViewHeight = scrollViewHeightRef.current;

    if (scrollViewHeight === 0) {
      return;
    }

    scrollViewRef.current?.scrollTo({
      y: Math.max(0, y + height + Spacing.three - scrollViewHeight),
      animated: true,
    });
  };

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    scrollViewHeightRef.current = event.nativeEvent.layout.height;

    if (isEntryInputFocusedRef.current) {
      scrollEntryInputIntoView();
    }
  };

  const handleEntryInputLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    entryInputLayoutRef.current = { y, height };
  };

  const handleEntryInputFocus = () => {
    isEntryInputFocusedRef.current = true;
    scrollEntryInputIntoView();
  };

  const submitEntry = () => {
    if (!canSubmit) {
      return;
    }

    const createdAt = new Date().toISOString();

    addEntry({
      id: `daily-entry-${Date.now()}`,
      content: trimmedDraft,
      createdAt,
    });
    setDraft('');
    router.push('/recommendation');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoidingView}>
          <ScrollView
            ref={scrollViewRef}
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            keyboardShouldPersistTaps="handled"
            onLayout={handleScrollViewLayout}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.brand, { color: colors.brand }]}>
              Hobby-Seeker
            </Text>

            <Text style={[styles.title, { color: colors.text }]}>
              오늘은 어떤 하루였나요?
            </Text>

            <Text
              style={[
                styles.description,
                { color: colors.textSecondary },
              ]}>
              일상을 조금씩 들려주세요.{'\n'}
              당신에게 맞는 취미의 씨앗을 찾아볼게요.
            </Text>
          </View>

          {activeMission?.status === 'active' && (
            <View
              style={[
                styles.activeMissionCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}>
              <Text
                style={[
                  styles.activeMissionLabel,
                  { color: colors.brand },
                ]}>
                🌱 진행 중인 미션
              </Text>

              <Text
                style={[
                  styles.activeMissionTitle,
                  { color: colors.text },
                ]}>
                {activeMission.title}
              </Text>

              <Text
                style={[
                  styles.activeMissionDescription,
                  { color: colors.textSecondary },
                ]}>
                약 {activeMission.estimatedMinutes}분
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/mission')}
                style={({ pressed }) => [
                  styles.missionButton,
                  {
                    borderColor: colors.brand,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <Text
                  style={[
                    styles.missionButtonText,
                    { color: colors.brand },
                  ]}>
                  미션 이어하기
                </Text>
              </Pressable>
            </View>
          )}

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

              <Text
                style={[
                  styles.seedDescription,
                  { color: colors.textSecondary },
                ]}>
                작은 이야기들이 쌓이면 새로운 취미의 씨앗이 보여요.
              </Text>
            </View>
          </View>

          {latestEntry && (
            <View
              style={[
                styles.latestEntry,
                { backgroundColor: colors.backgroundElement },
              ]}>
              <Text style={[styles.latestEntryLabel, { color: colors.brand }]}>
                최근 남긴 이야기
              </Text>
              <Text style={[styles.latestEntryContent, { color: colors.text }]}>
                {latestEntry.content}
              </Text>
            </View>
          )}

          <TextInput
            multiline
            value={draft}
            onChangeText={setDraft}
            onBlur={() => {
              isEntryInputFocusedRef.current = false;
            }}
            onFocus={handleEntryInputFocus}
            onLayout={handleEntryInputLayout}
            placeholder="오늘 마음에 남은 순간을 편하게 적어보세요."
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.entryInput,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <Pressable
            accessibilityRole="button"
            disabled={!canSubmit}
            onPress={submitEntry}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.brand,
                opacity: !canSubmit ? 0.4 : pressed ? 0.85 : 1,
              },
            ]}>
            <Text style={styles.primaryButtonText}>이야기 남기기</Text>
          </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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

  activeMissionCard: {
    borderWidth: 1,
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  activeMissionLabel: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  activeMissionTitle: {
    ...Typography.subheading,
  },
  activeMissionDescription: {
    ...Typography.bodySmall,
  },
  missionButton: {
    minHeight: 44,
    marginTop: Spacing.two,
    borderWidth: 1,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  missionButtonText: {
    ...Typography.bodySmall,
    fontWeight: '700',
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
  latestEntry: {
    borderRadius: Radius.medium,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  latestEntryLabel: {
    ...Typography.caption,
    fontWeight: '700',
  },
  latestEntryContent: {
    ...Typography.bodySmall,
  },
  entryInput: {
    ...Typography.body,
    minHeight: 120,
    borderWidth: 1,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    textAlignVertical: 'top',
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
