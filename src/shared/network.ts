import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	start(): void;
}

interface ServerToClientEvents {
	broadcast(actions: unknown): void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
