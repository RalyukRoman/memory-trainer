import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TextInput, Pressable}   from 'react-native';
import {SafeAreaView, SafeAreaProvider}     from 'react-native-safe-area-context';
import AsyncStorage                         from '@react-native-async-storage/async-storage';

import {ThemedText} from '../components/themed-text';
import {ThemedView} from '../components/themed-view';
import {useTheme}   from '../hooks/use-theme';

import {GAME_CONFIG, GAME_PHASES} from '../constants/game-values';
import {STORAGE_KEYS}             from '../constants/storage-keys';
import {SPACING, BORDER_RADIUS}   from '../constants/tokens';

export default function GamePage() {
  const theme = useTheme();

  const [level,   setLevel]   = useState(1);
  const [targets, setTargets] = useState([]);
  const [input,   setInput]   = useState('');
  const [phase,   setPhase]   = useState('GENERATE');

  const [timeLeft,  setTimeLeft]  = useState(GAME_CONFIG.DURATION_SECONDS);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(0);

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadHighScore().then();
  }, []);

  const loadHighScore = async () => {
    try {
      const rawScore = await AsyncStorage.getItem(
        STORAGE_KEYS.GAMEPLAY.HIGH_SCORE
      );

      if (rawScore !== null) {
        const loadedScore = parseInt(rawScore, 10);
        setHighScore(loadedScore);
      }
    }
    catch (err) {
      console.error('Error', err);
    }
  };

  const saveHighScore = async (targetScore) => {
    try {
      if (targetScore > highScore) {
        setHighScore(targetScore);

        await AsyncStorage.setItem(
          STORAGE_KEYS.GAMEPLAY.HIGH_SCORE,
          targetScore.toString()
        );
      }
    }
    catch (err) {
      console.error('Error', err);
    }
  };

  const generateNumbers = (currentLevel) => {
    const digitCount = GAME_CONFIG.BASE_DIGIT_COUNT + currentLevel;
    let result = [];

    for (let i = 0; i < digitCount; i++) {
      const randNumb = Math.floor(Math.random() * 10);
      result.push(randNumb);
    }

    return result;
  };

  const startRound = (newLevel = level) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const generated = generateNumbers(newLevel);
    setTargets(generated);

    const startTime = Date.now();
    const duration = GAME_CONFIG.DURATION_SECONDS;

    setInput('');
    setTimeLeft(duration);
    setPhase(GAME_PHASES.SHOW);

    timerRef.current = setInterval(() => {
      const passed = (Date.now() - startTime) / 1000;
      const nextTimeLeft = Math.max(0, duration - passed);

      setTimeLeft(nextTimeLeft);

      if (nextTimeLeft <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        setPhase(GAME_PHASES.CHECK);

        setTimeout(
          () => inputRef.current?.focus(),
          100
        );
      }
    }, 30);
  };

  const handleStartGame = () => {
    setLevel(1);
    setScore(0);

    startRound(1);
  };

  const handleSubmit = async () => {
    if (phase !== GAME_PHASES.CHECK) return;

    const formattedInput = input.trim().replace(/\s+/g, '');
    const gameNumberStr = targets.join();

    const _isCorrect = formattedInput === gameNumberStr;
    setIsCorrect(_isCorrect);

    setPhase(GAME_PHASES.RESULT);

    if (isCorrect) {
      const nextScore = score + 1;
      const nextLevel = level + 1;

      await saveHighScore(nextScore);

      setScore(nextScore);
      setLevel(nextLevel);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}>
        <ThemedView style={styles.main}>
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold" style={styles.headerTitle}>
              MEMORY TRAINER
            </ThemedText>

            <ThemedView type="backgroundSelected" style={styles.numbersBox}>
              <ThemedText style={styles.numbersText}>
                {phase === GAME_PHASES.SHOW
                  ? targets.join(' ')
                  : phase === GAME_PHASES.CHECK
                    ? '? '.repeat(targets.length).trim()
                    : targets.join(' ')}
              </ThemedText>
            </ThemedView>

            <ThemedText type="small" style={styles.timerText}>
              {phase === GAME_PHASES.SHOW
                  ? `${timeLeft.toFixed(2)}s`
                  : 'Hidden'}
            </ThemedText>

            <ThemedText type="small" style={styles.inputLabel}>
              Enter the numbers:
            </ThemedText>

            <TextInput
              ref={inputRef}
              style={[
                styles.input, {
                  color: theme.text,
                  backgroundColor: theme.background,
                  borderColor: theme.textSecondary,
                },
              ]}
              keyboardType="number-pad"
              value={input}
              onChangeText={setInput}
              editable={phase === GAME_PHASES.CHECK}
              onSubmitEditing={handleSubmit}
              placeholderTextColor={theme.textSecondary}
            />

            {phase === GAME_PHASES.CHECK ? (
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  { backgroundColor: theme.text },
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleSubmit}
              >
                <ThemedText style={[
                  styles.buttonText,
                  { color: theme.background }
                ]}>
                  SUBMIT
                </ThemedText>
              </Pressable>
            ) : phase === GAME_PHASES.RESULT ? (
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  { backgroundColor: theme.text },
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => (isCorrect
                  ? startRound()
                  : handleStartGame()
                )}
              >
                <ThemedText style={[
                  styles.buttonText,
                  { color: theme.background }
                ]}>
                  {isCorrect
                    ? 'NEXT LEVEL'
                    : 'TRY AGAIN'}
                </ThemedText>
              </Pressable>
            ) : (
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  { backgroundColor: theme.text },
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleStartGame}
              >
                <ThemedText style={[
                  styles.buttonText,
                  { color: theme.background }
                ]}>
                  START GAME
                </ThemedText>
              </Pressable>
            )}
          </ThemedView>

          <ThemedView style={styles.statsContainer}>
            <ThemedText type="small">     Current Score: {score}  </ThemedText>
            <ThemedText type="small">     Level: {level}          </ThemedText>
            <ThemedText type="smallBold"> Best Score: {highScore} </ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.FOUR,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    padding: SPACING.FOUR,
    gap: SPACING.THREE,
    borderRadius: BORDER_RADIUS.LG,
  },
  headerTitle: {
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  numbersBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.FOUR,
    paddingHorizontal: SPACING.THREE,
    borderRadius: SPACING.TWO,
  },
  numbersText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 6,
    fontFamily: 'monospace',
  },
  timerText: {
    opacity: 0.8,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginTop: SPACING.TWO,
  },
  input: {
    width: '100%',
    height: 48,
    textAlign: 'center',
    paddingHorizontal: SPACING.THREE,
    fontSize: 18,
    letterSpacing: 4,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.SM,
  },
  button: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.TWO,
    borderRadius: SPACING.TWO,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  feedbackText: {
    textAlign: 'center',
    marginTop: SPACING.ONE,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: SPACING.FIVE,
    gap: SPACING.ONE,
  },
});
