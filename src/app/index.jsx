import {useState, useEffect, useRef}                  from 'react';
import {StyleSheet, TextInput, Pressable, View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider}               from 'react-native-safe-area-context';
import AsyncStorage                                   from '@react-native-async-storage/async-storage';

import {useTheme} from '../hooks/use-theme';

import {GAME_CONFIG, GAME_PHASES} from '../constants/game-values';
import {STORAGE_KEYS}             from '../constants/storage-keys';
import {SPACING, BORDER_RADIUS}   from '../constants/tokens';

export default function GamePage() {
  const theme = useTheme();

  const [level,   setLevel]   = useState(1);
  const [targets, setTargets] = useState([]);
  const [input,   setInput]   = useState('');
  const [phase,   setPhase]   = useState('IDLE');

  const [timeLeft,  setTimeLeft]  = useState(GAME_CONFIG.DURATION);
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
    const duration = GAME_CONFIG.DURATION;

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

        setPhase(GAME_PHASES.INPUT);

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
    if (phase !== GAME_PHASES.INPUT) return;

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
        <View style={styles.main}>
          <View style={[
            styles.card,
            { backgroundColor: theme.backgroundElement }
          ]}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              MEMORY TRAINER
            </Text>

            <View style={[
              styles.numbersBox,
              { backgroundColor: theme.backgroundSelected }
            ]}>
              <Text style={[styles.numbersText, { color: theme.text }]}>
                {phase === GAME_PHASES.SHOW
                  ? targets.join(' ')
                  : phase === GAME_PHASES.INPUT
                    ? '? '.repeat(targets.length).trim()
                    : targets.join(' ')}
              </Text>
            </View>

            <Text style={[styles.timerText, { color: theme.text }]}>
              {phase === GAME_PHASES.SHOW
                ? `${timeLeft.toFixed(2)}s`
                : 'Hidden'}
            </Text>

            <Text style={[styles.inputLabel, { color: theme.text }]}>
              Enter the numbers:
            </Text>

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
              editable={phase === GAME_PHASES.INPUT}
              onSubmitEditing={handleSubmit}
              placeholderTextColor={theme.textSecondary}
            />

            {phase === GAME_PHASES.INPUT ? (
              <Pressable
                style={({pressed}) => [styles.button, {
                  backgroundColor: theme.text,
                  opacity: pressed ? 0.8 : 1,
                }]}
                onPress={handleSubmit}
              >
                <Text style={[
                  styles.buttonText,
                  { color: theme.background }
                ]}>
                  SUBMIT
                </Text>
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
                <Text style={[
                  styles.buttonText,
                  { color: theme.background }
                ]}>
                  {isCorrect
                    ? 'NEXT LEVEL'
                    : 'TRY AGAIN'}
                </Text>
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
                <Text style={[
                  styles.buttonText,
                  { color: theme.background }
                ]}>
                  START GAME
                </Text>
              </Pressable>
            )}
          </View>

          <View style={styles.statsContainer}>
            <Text style={[
              styles.textSmall,
              { color: theme.text }
            ]}>
              Current Score: {score}
            </Text>

            <Text style={[
              styles.textSmall,
              { color: theme.text }
            ]}>
              Level: {level}
            </Text>

            <Text style={[
              styles.textSmallBold,
              { color: theme.text }
            ]}>
              Best Score: {highScore}
            </Text>
          </View>
        </View>
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
    padding: SPACING.four,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    padding: SPACING.four,
    gap: SPACING.three,
    borderRadius: BORDER_RADIUS.lg,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  numbersBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.four,
    paddingHorizontal: SPACING.three,
    borderRadius: SPACING.two,
  },
  numbersText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 6,
    fontFamily: 'monospace',
  },
  timerText: {
    fontSize: 14,
    opacity: 0.8,
  },
  inputLabel: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: SPACING.two,
  },
  input: {
    width: '100%',
    height: 48,
    textAlign: 'center',
    paddingHorizontal: SPACING.three,
    fontSize: 18,
    letterSpacing: 4,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
  },
  button: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.two,
    borderRadius: SPACING.two,
  },
  buttonText: {
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  textSmall: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  textSmallBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: SPACING.five,
    gap: SPACING.one,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});