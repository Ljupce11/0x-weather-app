import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { handleLocationError } from './handleLocationError';

describe('handleLocationError', () => {
  const mockSetLocationCoords = vi.fn();
  const mockAlert = vi.fn();
  const originalAlert = globalThis.alert;

  beforeAll(() => {
    globalThis.alert = mockAlert;
  });

  afterAll(() => {
    globalThis.alert = originalAlert;
  });

  beforeEach(() => {
    localStorage.clear();
    mockSetLocationCoords.mockClear();
    mockAlert.mockClear();
  });

  it('should use cached data if available', () => {
    const cachedData = { latitude: 10, longitude: 20 };
    localStorage.setItem('data', JSON.stringify(cachedData));
    const error = { code: 0 } as GeolocationPositionError;

    handleLocationError(error, mockSetLocationCoords);

    expect(mockSetLocationCoords).toHaveBeenCalledWith(cachedData);
  });

  it('should not use cached data if not available', () => {
    const error = { code: 0 } as GeolocationPositionError;

    handleLocationError(error, mockSetLocationCoords);

    expect(mockSetLocationCoords).not.toHaveBeenCalled();
  });

  it('should alert "User denied the request for Geolocation." for PERMISSION_DENIED', () => {
    const error = { code: 1, PERMISSION_DENIED: 1 } as GeolocationPositionError;

    handleLocationError(error, mockSetLocationCoords);

    expect(mockAlert).toHaveBeenCalledWith("User denied the request for Geolocation.");
  });

  it('should alert "Location information is unavailable." for POSITION_UNAVAILABLE', () => {
    const error = { code: 2, POSITION_UNAVAILABLE: 2 } as GeolocationPositionError;

    handleLocationError(error, mockSetLocationCoords);

    expect(mockAlert).toHaveBeenCalledWith("Location information is unavailable.");
  });

  it('should alert "The request to get user location timed out." for TIMEOUT', () => {
    const error = { code: 3, TIMEOUT: 3 } as GeolocationPositionError;

    handleLocationError(error, mockSetLocationCoords);

    expect(mockAlert).toHaveBeenCalledWith("The request to get user location timed out.");
  });

  it('should alert "An unknown error occurred." for unknown error codes', () => {
    const error = { code: 999 } as GeolocationPositionError;

    handleLocationError(error, mockSetLocationCoords);

    expect(mockAlert).toHaveBeenCalledWith("An unknown error occurred.");
  });
});