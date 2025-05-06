import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

const RunService = game.GetService("RunService");

interface Spinner extends Model {
	Base: BasePart;
	Spinner: BasePart;
}

interface Attributes {
	rotationSpeed: number;
}

@Component({
	tag: "Spinner",
	defaults: {
		rotationSpeed: 5,
	},
})
export class SpinnerComponent extends BaseComponent<Attributes, Spinner> implements OnStart {
	onStart() {
		if (this.instance) {
			const attachment0 = new Instance("Attachment", this.instance.Base);
			attachment0.Axis = new Vector3(0, 1, 0);

			const attachment1 = new Instance("Attachment", this.instance.Spinner);
			attachment1.Position = attachment1.Position.sub(new Vector3(0, 1, 0));
			attachment1.Axis = new Vector3(0, 1, 0);

			const hingeConstraint = new Instance("HingeConstraint", this.instance.Base);
			hingeConstraint.Attachment0 = attachment0;
			hingeConstraint.Attachment1 = attachment1;
			hingeConstraint.ActuatorType = Enum.ActuatorType.Motor;
			hingeConstraint.MotorMaxTorque = math.huge;
			hingeConstraint.AngularVelocity = this.attributes.rotationSpeed;
		}
	}
}
