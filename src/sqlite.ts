import connect, { sql } from "@databases/sqlite";
import { Config } from "./config";

export class Sqlite {

    constructor(
        private config: Config,
    ){}

  private readonly db = connect(this.config.dbPath);

  public async initialise() {
    await this.db.query(sql`
        CREATE TABLE IF NOT EXISTS weights (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            weight REAL NOT NULL,
            name TEXT NOT NULL,
            date DATE NOT NULL
        );`);
  }
  public async writeWeight(name: string, weight: number, date: Date) {
    await this.db.query(sql`
        INSERT INTO weights (weight, name, date) 
        VALUES (${name}, ${weight}, ${date.getTime()/1000});`);
  }
}
