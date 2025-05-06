import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

interface Attributes {}

@Component({
	tag: "Lava",
})
export class LavaComponent extends BaseComponent<Attributes, BasePart> implements OnStart {
	onStart() {
		if (this.instance) {
			this.instance.Touched.Connect((part) => part.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(100));
		}
	}
}
