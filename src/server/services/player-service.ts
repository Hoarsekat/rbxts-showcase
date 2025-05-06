import { CollectionService, Players } from "@rbxts/services";
import { Service, OnStart } from "@flamework/core";

@Service({})
export class PlayerService implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player: Player) => {
			CollectionService.AddTag(player, "Player");
		});
	}
}
