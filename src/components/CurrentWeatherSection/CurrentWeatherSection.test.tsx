// src/components/CurrentWeatherSection/CurrentWeatherSection.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { CurrentWeatherSection } from "./CurrentWeatherSection";
import type { CurrentWeather, LocationData } from "../../types/types";

describe("CurrentWeatherSection", () => {
  const mockCurrentWeather: CurrentWeather = {
    temp: "12°",
    cond: 3,
    range: { min: '20°', max: '30°' },
    location: {
      latitude: 55.5828299,
      longitude: 12.9770669
    }
  };

  const mockLocationData: LocationData = {
    address: { city: "Test City" },
  };

  it("renders correctly with currentWeather and locationData", () => {
    render(<CurrentWeatherSection currentWeather={mockCurrentWeather} locationData={mockLocationData} />);

    expect(screen.getByText("Test City")).toBeInTheDocument();
    expect(screen.getByText("12°")).toBeInTheDocument();
    const element = screen.getByText(/overcast/i); // Using regex to match case-insensitively
    expect(element).toBeInTheDocument();
  });

  it("renders error message when currentWeather is missing", () => {
    render(<CurrentWeatherSection />);

    const elements = screen.getAllByText("Something went wrong");
    elements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  it("renders 'Current location' when locationData is missing", () => {
    render(<CurrentWeatherSection currentWeather={mockCurrentWeather} />);

    expect(screen.getByText("Current location")).toBeInTheDocument();
    expect(screen.getByText("12°")).toBeInTheDocument();
    const element = screen.getByText(/overcast/i); // Using regex to match case-insensitively
    expect(element).toBeInTheDocument();
  });
});