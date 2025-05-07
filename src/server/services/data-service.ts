import { Players } from "@rbxts/services";
import { Service, OnStart } from "@flamework/core";
import { createCollection } from "@rbxts/lapis";
import { selectPlayerData } from "shared/selectors";
import { store } from "server/store";
import { PlayerData, defaultPlayerData } from "shared/slices/players";
import { t } from "@rbxts/t";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlayerDataSchema = PlayerData & Record<string, any>;

const validate: t.check<PlayerData> = t.strictInterface({
	balance: t.strictInterface({
		coins: t.number,
	}),
	stage: t.strictInterface({
		stage: t.number,
	}),
});

const collection = createCollection<PlayerDataSchema>("data-v1", {
	defaultData: defaultPlayerData,
	validate: validate,
});

@Service({})
export class DataService implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => {
			this.loadPlayerData(player);
			this.createLeaderstats(player);
		});

		for (const player of Players.GetPlayers()) {
			this.loadPlayerData(player);
			this.createLeaderstats(player);
		}
	}

	private createLeaderstats(player: Player) {
		const leaderstats = new Instance("Folder", player);
		leaderstats.Name = "leaderstats";

		const coins = new Instance("NumberValue", leaderstats);
		coins.Name = "Coins";

		const stage = new Instance("NumberValue", leaderstats);
		stage.Name = "Stage";

		const unsubscribe = store.subscribe(selectPlayerData(player.Name), (save) => {
			if (typeOf(save?.balance) === "number" && typeOf(save?.stage) === "number") {
				coins.Value = (save?.balance ?? 0) as number;
				stage.Value = (save?.stage ?? 0) as number;
			}
		});
		Players.PlayerRemoving.Connect((player) => {
			if (player === player) unsubscribe();
		});
	}

	async loadDefaultData(player: Player) {
		store.loadPlayerData(player.Name, defaultPlayerData);

		Promise.fromEvent(Players.PlayerRemoving, (p) => p === player).then(() => {
			store.closePlayerData(player.Name);
		});
	}

	async loadPlayerData(player: Player) {
		if (player.UserId < 0) {
			return this.loadDefaultData(player);
		}

		try {
			const document = await collection.load(`${player.UserId}`);

			if (!player.IsDescendantOf(Players)) {
				return;
			}

			const unsubscribe = store.subscribe(selectPlayerData(player.Name), (data) => {
				if (data) document.write(data);
			});

			Promise.fromEvent(Players.PlayerRemoving, (p) => p === player).then(() => {
				document.close();
				unsubscribe();
				store.closePlayerData(player.Name);
			});

			store.loadPlayerData(player.Name, document.read());
		} catch (err) {
			warn(`Failed to load data for ${player.Name}: ${err}`);
			this.loadDefaultData(player);
		}
	}
}
