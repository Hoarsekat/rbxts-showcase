import { createBroadcaster } from "@rbxts/reflex";
import { Events } from "server/network";
import { slices } from "shared/slices";

export function broadcasterMiddleware() {
	const broadcaster = createBroadcaster({
		producers: slices,
		dispatch: async (player, actions) => {
			Events.broadcast(player, actions);
		},
	});

	Events.start.connect((player) => {
		return broadcaster.start(player);
	});

	return broadcaster.middleware;
}
