const BASE_URL = "http://raspberrypi.local:3333"; // Altere para a URL do seu backend

// Função para ligar todas as luzes
export const turnLightsOn = async (): Promise<any> => {
  console.log("urlbase", `${BASE_URL}/all_lights/on`);

  try {
    await fetch(`${BASE_URL}/api/ha/all_lights/on`, {
      method: "POST",
    });

    return true;
  } catch (error: any) {
    console.error(`${BASE_URL}/api/ha/all_lights/on`, { ...error });
    throw error;
  }
};

// Função para desligar todas as luzes
export const turnLightsOff = async (): Promise<any> => {
  try {
    await fetch(`${BASE_URL}/api/ha/all_lights/off`, {
      method: "POST",
    });

    return true;
  } catch (error: any) {
    console.error("Erro ao desligar as luzes:", error.message);
    throw error;
  }
};
