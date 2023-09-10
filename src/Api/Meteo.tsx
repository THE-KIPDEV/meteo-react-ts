const API_KEY = "5ff88cbacc8d0187928fa523449a3753";
import { Meteo } from '../Type/meteo.type';

export async function getMeteoByLatLng(lat: number, lng: number): Promise<Meteo | undefined> {
  try {
    const meteoResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&lang=fr&&appid=${API_KEY}&units=metric`
    );
    const meteoData = await meteoResponse.json();
    return meteoData;
  } catch (error) {
    console.log(error);
  }
}
