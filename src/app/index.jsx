import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View }                         from 'react-native';
import { SafeAreaView }                             from 'react-native-safe-area-context';
import { useFocusEffect }                           from 'expo-router';

import GameNumberDisplay from '../components/game-page/game-number-display';
import GameInfo          from '../components/game-page/game-info';
import GameBar           from '../components/game-page/game-bar';
import GameScoreBoard    from '../components/game-page/game-score-board';
import GameTopBar        from '../components/game-page/game-top-bar';

import ThemedText from "../components/ui/themed-text";
import ThemedView from '../components/ui/themed-view';

import { gameDb }                        from '../services/game-db';
import { settingsService }               from '../services/settings-service';
import { scoreService }                  from '../services/score-service';
import { gameCalculator }                from '../services/game-calculator';
import { BORDER_RADIUS, SPACING }        from '../constants/tokens';
import { DEFAULT_SETTINGS, GAME_PHASES } from '../constants/game-values';

export default function GamePage() {
  const [gameConfig, setGameConfig] = useState(DEFAULT_SETTINGS.config);
  const [difficulty, setDifficulty] = useState(DEFAULT_SETTINGS.difficulty);

  const [level,    setLevel]    = useState(1);
  const [sequence, setSequence] = useState([]);
  const [input,    setInput]    = useState('');
  const [phase,    setPhase]    = useState(GAME_PHASES.IDLE);

  const [timeLeft,  setTimeLeft]  = useState(DEFAULT_SETTINGS.config.initialDuration);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(0);

  const timerRef  = useRef(null);
  const inputRef  = useRef(null);
  const gameIdRef = useRef(null);

  useEffect(() => {
    gameDb.interruptGames().then();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGameConfigs().then();
    }, [])
  );

  const loadGameConfigs = async () => {
    const { difficulty: activeDiff, config: activeConfig } =
      await settingsService.loadSettings();

    if (
      activeDiff !== difficulty     &&
      phase !== GAME_PHASES.IDLE    &&
      phase !== GAME_PHASES.RESULT  &&
      phase !== GAME_PHASES.STOPPED
    ) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (gameIdRef.current) {
        await gameDb.finishGame(
          gameIdRef.current,
          score,
          level,
          'INTERRUPTED'
        );

        gameIdRef.current = null;
      }

      setPhase(GAME_PHASES.STOPPED);
    }

    const loadedScore = await scoreService.loadHighScore(activeDiff);

    setDifficulty(activeDiff);
    setGameConfig(activeConfig);
    setHighScore(loadedScore);
  };

  const startRound = (
    newLevel = level
  ) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const generated = gameCalculator.generateSequence(newLevel, gameConfig);
    const duration = gameCalculator.calculateDuration(newLevel, gameConfig);

    const startTime = Date.now();

    setSequence(generated);
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
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, 30);
  };

  const handleStartGame = async () => {
    setLevel(1);
    setScore(0);

    gameIdRef.current = await gameDb.createGame(difficulty);
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
      const nextScore = score + gameConfig.pointsPerLevel;
      const nextLevel = level + 1;

      const updatedHighScore = await scoreService.saveHighScore(
        difficulty,
        nextScore,
        highScore
      );

      setHighScore(updatedHighScore);
      setScore(nextScore);
      setLevel(nextLevel);
    }
  };

  return (
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