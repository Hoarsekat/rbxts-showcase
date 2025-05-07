import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

interface Attributes {}

@Component({
	tag: "Lava",
})
export class LavaComponent extends BaseComponent<Attributes, BasePart> implements OnStart {
	onStart() {
		// part.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(100)
		if (this.instance) {
			this.instance.Touched.Connect((otherPart: BasePart) => {
				const parent = otherPart.Parent;
				if (!parent) return;

				const humanoid = parent.FindFirstChild("Humanoid") as Humanoid | undefined;
				if (humanoid && humanoid.Health > 0) {
					humanoid.TakeDamage(humanoid.MaxHealth);
				}
			});
		}
	}
}
