import { createProducer } from "@rbxts/reflex";
import { PlayerStage, PlayerStageType, PlayerData } from "./types";

export interface StageState {
	readonly [player: string]: PlayerStage | undefined;
}

const initialState: StageState = {};

export const stageSlice = createProducer(initialState, {
	loadPlayerData: (state, player: string, data: PlayerData) => ({
		...state,
		[player]: data.stage,
	}),

	closePlayerData: (state, player: string) => ({
		...state,
		[player]: undefined,
	}),

	changeStage: (state, player: string, stageType: PlayerStageType, amount: number) => {
		const stage = state[player];

		return {
			...state,
			[player]: stage && {
				...stage,
				[stageType]: stage[stageType] + amount,
			},
		};
	},
});
