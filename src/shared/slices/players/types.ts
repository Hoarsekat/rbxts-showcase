export interface PlayerData {
	readonly balance: PlayerBalance;
	readonly stage: PlayerStage;
}

export interface PlayerBalance {
	readonly coins: number;
}

export type PlayerBalanceType = keyof PlayerBalance;

export interface PlayerStage {
	readonly stage: number;
}

export type PlayerStageType = keyof PlayerStage;
