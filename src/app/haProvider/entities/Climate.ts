/**
 * Representa uma entidade de controle de clima.
 */
export interface Climate {
	/**
	 * ID único da entidade no sistema (ex.: "climate.ar").
	 */
	entity_id: string;

	/**
	 * Estado atual do dispositivo. Pode ser "off", "auto", "cool", "fan_only", ou "dry".
	 */
	state: HvacMode;

	/**
	 * Atributos adicionais associados à entidade.
	 */
	attributes: ClimateAttributes;
}

/**
* Modos de operação HVAC.
*/
export enum HvacMode {
	OFF = "off",
	AUTO = "auto",
	COOL = "cool",
	FAN_ONLY = "fan_only",
	DRY = "dry",
}

/**
* Modos de ventilação suportados.
*/
export enum FanMode {
	AUTO = "auto",
	HIGH = "high",
	MID = "mid",
	LOW = "low",
}

/**
* Atributos da entidade de clima.
*/
export interface ClimateAttributes {
	/**
	 * Modos de operação suportados pela entidade.
	 */
	hvac_modes: HvacMode[];

	/**
	 * Temperatura mínima configurável em graus Celsius.
	 */
	min_temp: number;

	/**
	 * Temperatura máxima configurável em graus Celsius.
	 */
	max_temp: number;

	/**
	 * Incremento permitido para ajuste de temperatura alvo.
	 */
	target_temp_step: number;

	/**
	 * Modos de ventilação suportados.
	 */
	fan_modes: FanMode[];

	/**
	 * Temperatura atual medida pelo dispositivo em graus Celsius.
	 */
	current_temperature: number;

	/**
	 * Temperatura alvo configurada em graus Celsius.
	 */
	temperature: number;

	/**
	 * Modo de ventilação atualmente ativo.
	 */
	fan_mode: FanMode;

	/**
	 * Nome amigável da entidade.
	 */
	friendly_name: string;

	/**
	 * Recursos suportados pela entidade representados como bitmask.
	 */
	supported_features: number;
}
