// src/components/HourlyForecastSection/HourlyForecastSection.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { HourlyForecastSection } from "./HourlyForecastSection";
import type { Forecast } from "../../types/types";

describe("HourlyForecastSection", () => {
  const mockForecast: Forecast = {
    hourly: [
      { datetime: new Date().toISOString(), temperature: "15°", conditions: 2 },
      { datetime: new Date().toISOString(), temperature: "16°", conditions: 2 },
    ],
  };

  it("renders correctly with forecast data", () => {
    render(<HourlyForecastSection forecast={mockForecast} />);

    expect(screen.getByText("HOURLY FORECAST")).toBeInTheDocument();
    expect(screen.getByText("Now")).toBeInTheDocument();
    expect(screen.getByText("15°")).toBeInTheDocument();
    expect(screen.getByText("16°")).toBeInTheDocument();
    expect(screen.getAllByText(/Thunder/i)).toHaveLength(2);
  });

  it("renders error message when forecast is missing", () => {
    render(<HourlyForecastSection />);

    const elements = screen.getAllByText("Something went wrong");
    elements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});