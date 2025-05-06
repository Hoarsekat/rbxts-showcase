import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

const DAMAGE: number = 10;
const INTERVAL: number = 0.5;

interface Attributes {}

@Component({
	tag: "Sand",
})
export class SandComponent extends BaseComponent<Attributes, BasePart> implements OnStart {
	onStart() {
		const touchingHumanoids = new Set<Humanoid>();

		if (this.instance) {
			// Touched connection
			this.instance.Touched.Connect((otherPart: BasePart) => {
				const parent = otherPart.Parent;
				if (!parent) return;

				const humanoid = parent.FindFirstChild("Humanoid") as Humanoid | undefined;
				if (humanoid) {
					touchingHumanoids.add(humanoid);
				}
			});

			// Touched ended connection
			this.instance.TouchEnded.Connect((otherPart: BasePart) => {
				const parent = otherPart.Parent;
				if (!parent) return;

				const humanoid = parent.FindFirstChild("Humanoid") as Humanoid | undefined;
				if (humanoid) {
					touchingHumanoids.delete(humanoid);
				}
			});

			// Spawn loop to check if humanoids are touching it
			task.spawn(() => {
				while (task.wait(INTERVAL) !== undefined) {
					for (const humanoid of touchingHumanoids) {
						humanoid.TakeDamage(DAMAGE);
					}
				}
			});
		}
	}
}
