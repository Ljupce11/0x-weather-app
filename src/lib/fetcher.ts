export const getLocationURL = (coords: { latitude: number; longitude: number } | null) =>
  coords
    ? `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
    : null;

export const getWeatherURL = (coords: { latitude: number; longitude: number } | null) =>
  coords
    ? `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Stockholm`
    : null;

export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await fetch(url);

  console.log('HELLO');
  if (!res.ok) {

    const error: any = new Error('An error occurred while fetching the data.');
    error.status = res.status;

    // Try to parse JSON error response, fallback to text if it fails
    try {
      error.info = await res.json();
    } catch {
      error.info = { message: res.statusText || 'Unexpected error' };
    }
    throw error;
  }

  // Attempt to parse JSON response, fallback to text if it fails
  try {
    return await res.json() as T;
  } catch {
    return await res.text() as unknown as T;
  }
};