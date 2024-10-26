import { describe, it, expect } from 'vitest';
import { getWeatherDescriptions } from './getWeatherDescriptions';

describe('getWeatherDescriptions', () => {
  it('should return correct descriptions for known weather codes', () => {
    const codes = [0, 1, 2, 3];
    const expectedDescriptions = ["Clear sky", "Mainly clear", "Partly cloudy", "Overcast"];
    expect(getWeatherDescriptions(codes)).toEqual(expectedDescriptions);
  });

  it('should return "Unknown condition" for unknown weather codes', () => {
    const codes = [999, 1000];
    const expectedDescriptions = ["Unknown condition", "Unknown condition"];
    expect(getWeatherDescriptions(codes)).toEqual(expectedDescriptions);
  });

  it('should return mixed descriptions for known and unknown weather codes', () => {
    const codes = [0, 999, 1, 1000];
    const expectedDescriptions = ["Clear sky", "Unknown condition", "Mainly clear", "Unknown condition"];
    expect(getWeatherDescriptions(codes)).toEqual(expectedDescriptions);
  });

  it('should return an empty array when input codes are empty', () => {
    const codes: number[] = [];
    const expectedDescriptions: string[] = [];
    expect(getWeatherDescriptions(codes)).toEqual(expectedDescriptions);
  });
});