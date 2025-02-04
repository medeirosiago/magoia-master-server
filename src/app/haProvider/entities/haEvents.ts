// Enums para os tipos de mensagens
export enum MessageType {
	AUTH = "auth",
	SUBSCRIBE_EVENTS = "subscribe_events",
	SUBSCRIBE_TRIGGER = "subscribe_trigger",
	UNSUBSCRIBE_EVENTS = "unsubscribe_events",
	FIRE_EVENT = "fire_event",
	CALL_SERVICE = "call_service",
	GET_STATES = "get_states",
	GET_CONFIG = "get_config",
	GET_SERVICES = "get_services",
	GET_PANELS = "get_panels",
	PING = "ping",
	VALIDATE_CONFIG = "validate_config",
	EVENT = "event",
}

// Interfaces reutilizáveis

export interface Context {
	id: string;
	parent_id: string | null;
	user_id: string | null;
}

export interface State<T> {
	entity_id: string;
	state: string;
	attributes: T;
	last_changed: string; // ISO Date String
	last_reported: string; // ISO Date String
	last_updated: string; // ISO Date String
	context: Context;
}

export interface EventData<T> {
	entity_id: string;
	old_state: State<T> | null;
	new_state: State<T> | null;
}

export interface Event<T> {
	event_type: string;
	data: EventData<T>;
	origin: "LOCAL" | "REMOTE";
	time_fired: string; // ISO Date String
	context: Context;
}

// Interface base genérica

export interface BaseMessage {
	id: number;
	type: MessageType;
}

// Interfaces específicas por tipo

// Auth
export interface AuthMessage extends BaseMessage {
	type: MessageType.AUTH;
	access_token: string;
}

// Subscribe Events
export interface SubscribeEventsMessage extends BaseMessage {
	type: MessageType.SUBSCRIBE_EVENTS;
	event_type: string; // Ex.: "state_changed"
}

// Subscribe Trigger
export interface SubscribeTriggerMessage extends BaseMessage {
	type: MessageType.SUBSCRIBE_TRIGGER;
	trigger: {
			platform: "state";
			entity_id: string;
			from: string;
			to: string;
	};
}

// Unsubscribe Events
export interface UnsubscribeEventsMessage extends BaseMessage {
	type: MessageType.UNSUBSCRIBE_EVENTS;
	subscription: number;
}

// Fire Event
export interface FireEventMessage extends BaseMessage {
	type: MessageType.FIRE_EVENT;
	event_type: string;
	event_data: Record<string, any>;
}

// Call Service
export interface CallServiceMessage extends BaseMessage {
	type: MessageType.CALL_SERVICE;
	domain: string;
	service: string;
	service_data?: Record<string, any>;
	target?: {
			entity_id?: string;
			[key: string]: any;
	};
}

// Get States
export interface GetStatesMessage extends BaseMessage {
	type: MessageType.GET_STATES;
}

// Get Config
export interface GetConfigMessage extends BaseMessage {
	type: MessageType.GET_CONFIG;
}

// Get Services
export interface GetServicesMessage extends BaseMessage {
	type: MessageType.GET_SERVICES;
}

// Get Panels
export interface GetPanelsMessage extends BaseMessage {
	type: MessageType.GET_PANELS;
}

// Ping
export interface PingMessage extends BaseMessage {
	type: MessageType.PING;
}

// Validate Config
export interface ValidateConfigMessage extends BaseMessage {
	type: MessageType.VALIDATE_CONFIG;
	trigger: {
			platform: "state";
			entity_id: string;
			from: string;
			to: string;
	};
}

// Event State Changed
export interface EventStateChanged<T> extends BaseMessage {
	type: MessageType.EVENT;
	event: {
			event_type: "state_changed";
			data: EventData<T>;
			origin: "LOCAL" | "REMOTE";
			time_fired: string; // ISO Date String
			context: Context;
	};
}
