import { RunService, Players } from "@rbxts/services";
import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

interface Attributes {}

@Component({
	tag: "Player",
})
export class PlayerComponent extends BaseComponent<Attributes, Player> implements OnStart {
	onStart() {
		// Initial character setup
		if (this.instance.Character) {
			this.setupCharacter(this.instance.Character);
		}

		// Connection for player respawns
		this.instance.CharacterAdded.Connect((character: Model) => this.setupCharacter(character));
	}

	/* 
		For now, this method will only be available for studio tests.
		Roblox has a strange bug where studio forces R15 characters during playtests.
	*/
	setupCharacter(character: Model) {
		// Refer to above comment
		if (RunService.IsStudio()) {
			const description = Players.GetHumanoidDescriptionFromUserId(this.instance.UserId);
			const humanoid: Humanoid = character.WaitForChild("Humanoid") as Humanoid;

			RunService.Stepped.Wait();

			humanoid.ApplyDescription(description);
			print(`<Studio> Setup ${this.instance.Name}'s character`);
		}
	}
}
