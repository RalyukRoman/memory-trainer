import { useState, useEffect, useRef }    from 'react';
import { StyleSheet, View }               from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GameNumberDisplay from '../components/game-page/game-number-display';
import GameInfo          from '../components/game-page/game-info';
import GameBar           from '../components/game-page/game-bar';
import GameScoreBoard    from '../components/game-page/game-score-board';
import GameTopBar        from '../components/game-page/game-top-bar';

import ThemedText        from "../components/ui/themed-text";
import ThemedView        from '../components/ui/themed-view';

import { GAME_CONFIG, GAME_PHASES } from '../constants/game-values';
import { STORAGE_KEYS }             from '../constants/storage-keys';
import { SPACING, BORDER_RADIUS }   from '../constants/tokens';

export default function GamePage() {
  const [level,    setLevel]    = useState(1);
  const [sequence, setSequence] = useState([]);
  const [input,    setInput]    = useState('');
  const [phase,    setPhase]    = useState(GAME_PHASES.IDLE);

  const [timeLeft,  setTimeLeft]  = useState(GAME_CONFIG.DURATION);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(0);

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadHighScore().then();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
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
      console.error('Error loading high score:', err);
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
      console.error('Error saving high score:', err);
    }
  };

  const generateSequence = (currentLevel) => {
    const digitCount = GAME_CONFIG.BASE_DIGIT_COUNT + currentLevel;
    let result = [];

    for (let i = 0; i < digitCount; i++) {
      const randDigit = Math.floor(Math.random() * 10);
      result.push(randDigit);
    }

    return result;
  };

  const startRound = (newLevel = level) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const generated = generateSequence(newLevel);
    setSequence(generated);

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
    const sequenceStr = sequence.join('');

    const isInputCorrect = formattedInput === sequenceStr;
    setIsCorrect(isInputCorrect);

    setPhase(GAME_PHASES.RESULT);

    if (isInputCorrect) {
      const nextScore = score + 1;
      const nextLevel = level + 1;

      await saveHighScore(nextScore);

      setScore(nextScore);
      setLevel(nextLevel);
    }
  };

  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <GameTopBar />

          <View style={styles.main}>
            <ThemedView variant="element" style={styles.card}>
              <ThemedText variant="header">
                MEMORY TRAINER
              </ThemedText>

              <GameNumberDisplay
                phase={phase}
                digits={sequence}
              />

              <GameInfo
                phase={phase}
                timeLeft={timeLeft}
                isCorrect={isCorrect}
              />

              <GameBar
                input={input}
                setInput={setInput}
                inputRef={inputRef}
                phase={phase}
                isCorrect={isCorrect}
                onSubmit={handleSubmit}
                onStartGame={handleStartGame}
                onNextRound={() => startRound(level)}
                onRestartGame={handleStartGame}
              />
            </ThemedView>

            <GameScoreBoard
              score={score}
              level={level}
              highScore={highScore}
            />
          </View>
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.four,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: SPACING.three,
    padding: SPACING.four,
    borderRadius: BORDER_RADIUS.lg,
  },
});