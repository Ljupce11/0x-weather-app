export const getLocationURL = (coords: { latitude: number; longitude: number } | null, isOffline: boolean) =>
  coords && !isOffline
    ? `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
    : null;

export const getWeatherURL = (coords: { latitude: number; longitude: number } | null, isOffline: boolean) =>
  coords && !isOffline
    ? `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Stockholm`
    : null;

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as Error & { status?: number; info?: { message: string } };
    error.status = res.status;
    error.info = { message: 'An error occurred while fetching the data.' };
    throw error;
  }

  // Attempt to parse JSON response, fallback to text if it fails
  try {
    const data = await res.json();
    if (url.includes('open-meteo')) {
      localStorage.setItem('data', JSON.stringify(data));
    }
    return data;
  } catch {
    return await res.text();
  }
};