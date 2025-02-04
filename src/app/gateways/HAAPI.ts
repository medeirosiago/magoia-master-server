import config from "config";
import dotenv from "dotenv";

dotenv.config();

const piUrl = config.get("raspberrypi.baseUrl");
const token = process.env.HA_TOKEN;

/**
 * Controls entities in Home Assistant by domain and entity ID.
 *
 * This function allows turning on or off any entity in Home Assistant by specifying its domain,
 * entity ID(s), and desired status (on or off).
 *
 * @param {string | string[]} entityId - The entity ID or an array of entity IDs to control (e.g., "light.luz", ["light.luz1", "light.luz2"]).
 * @param {string} haDomain - The domain of the entity to control (e.g., "light", "switch", "fan").
 * @param {string} status - The action to perform, either "on" or "off".
 *
 * @returns {Promise<Object>} - A promise that resolves with the response from the Home Assistant API.
 *
 * @throws {Error} - Throws an error if the API call fails.
 *
 * @example
 * // Turn on a light
 * turnByEntityAndDomain("light.luz", "light", "on");
 *
 * @example
 * // Turn off multiple switches
 * turnByEntityAndDomain(["switch.lamp", "switch.fan"], "switch", "off");
 */
export const turnByEntityAndDomain = async (
  entityId: string | string[],
  haDomain: string,
  status: string,
) => {
  try {
    const url = `${piUrl}/services/${haDomain}/turn_${status}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entity_id: entityId }),
    });


    return response.status;
  } catch (error) {
    console.error("Failed to turn on light:", error);
    throw error;
  }
};
