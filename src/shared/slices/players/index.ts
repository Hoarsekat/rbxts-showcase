import { combineProducers } from "@rbxts/reflex";
import { balanceSlice } from "./balance";
import { stageSlice } from "./stage";

export * from "./balance";
export * from "./stage";
export * from "./types";
export * from "./utils";

export const playersSlice = combineProducers({
	balance: balanceSlice,
	stage: stageSlice,
});
