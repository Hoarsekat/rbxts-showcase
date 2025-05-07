import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/slices";
import { PlayerData } from "shared/slices/players";

export const selectPlayerBalance = (playerId: string) => {
	return (state: SharedState) => {
		return state.players.balance[playerId];
	};
};

export const selectPlayerStage = (playerId: string) => {
	return (state: SharedState) => {
		return state.players.stage[playerId];
	};
};

export const selectPlayerData = (playerId: string) => {
	return createSelector(
		selectPlayerBalance(playerId),
		selectPlayerStage(playerId),
		(balance, stage): PlayerData | undefined => {
			if (!balance || !stage) {
				return;
			}

			return { balance, stage };
		},
	);
};
