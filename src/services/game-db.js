import * as SQLite from 'expo-sqlite';

class GameDatabase {
  constructor() {
    this.db = null;
  }

  async initializeDb() {
    if (this.db) return;

    try {
      this.db = await SQLite.openDatabaseAsync(
        'memory_trainer.db'
      );

      await this.db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS games (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          difficulty TEXT NOT NULL,
          score INTEGER DEFAULT 0,
          level INTEGER DEFAULT 1,
          status TEXT NOT NULL, -- 'IN_PROGRESS' | 'COMPLETED' | 'INTERRUPTED'
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
    catch (err) {
      console.error('Failed to initialize database:', err);
    }
  }

  async interruptGames() {
    await this.initializeDb();

    try {
      await this.db.runAsync(
        `UPDATE games 
         SET status = 'INTERRUPTED', 
             updated_at = CURRENT_TIMESTAMP 
         WHERE status = 'IN_PROGRESS';`
      );
    }
    catch (err) {
      console.error('Failed to interrupt games:', err);
    }
  }

  async createGame(difficulty) {
    await this.initializeDb();

    try {
      const result = await this.db.runAsync(
        `INSERT INTO games (difficulty, score, level, status) 
         VALUES (?, 0, 1, 'IN_PROGRESS');`,
        [difficulty]
      );

      return result.lastInsertRowId;
    }
    catch (err) {
      console.error('Failed to create game:', err);
      return null;
    }
  }

  async updateProgress(
    gameId, score, level
  ){
    if (!gameId) return;
    await this.initializeDb();

    try {
      await this.db.runAsync(
        `UPDATE games 
         SET score = ?, 
             level = ?, 
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?;`,
        [score, level, gameId]
      );
    }
    catch (err) {
      console.error('Failed to update progress:', err);
    }
  }

  async finishGame(
    gameId, score, level,
    status = 'COMPLETED'
  ){
    if (!gameId) return;
    await this.initializeDb();

    try {
      await this.db.runAsync(
        `UPDATE games 
         SET score = ?, 
             level = ?, 
             status = ?, 
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?;`,
        [score, level, status, gameId]
      );
    }
    catch (err) {
      console.error('Failed to finish game:', err);
    }
  }

  async getAllGames() {
    await this.initializeDb();

    try {
      return await this.db.getAllAsync(
        `SELECT * 
         FROM games 
         ORDER BY id DESC;`
      );
    }
    catch (err) {
      console.error('Failed to get all games:', err);
      return [];
    }
  }
}

export const gameDb = new GameDatabase();