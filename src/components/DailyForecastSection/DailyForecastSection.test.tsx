// src/components/DailyForecastSection/DailyForecastSection.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { DailyForecastSection } from "./DailyForecastSection";
import type { Forecast } from "../../types/types";

describe("DailyForecastSection", () => {
  const mockForecast: Forecast = {
    daily: [
      {
        datetime: "2023-10-01",
        range: { min: '10', max: '20' },
        newRange: { min: 10, max: 20 }
      },
      {
        datetime: "invalidDate",
        range: { min: '15', max: '25' },
        newRange: { min: 15, max: 25 }
      }
    ]
  };

  it("renders correctly with forecast data", () => {
    render(<DailyForecastSection forecast={mockForecast} />);

    expect(screen.getByText("7-DAY FORECAST")).toBeInTheDocument();
    expect(screen.getByText("10°")).toBeInTheDocument();
    expect(screen.getByText("20°")).toBeInTheDocument();
    expect(screen.getByText("15°")).toBeInTheDocument();
    expect(screen.getByText("25°")).toBeInTheDocument();
    expect(screen.getAllByText("60%").length).toBe(2);
  });

  it("renders error message when forecast is missing", () => {
    render(<DailyForecastSection />);

    const elements = screen.getAllByText("Something went wrong");
    elements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  it("renders ErrorIcon when date is invalid", () => {
    render(<DailyForecastSection forecast={mockForecast} />);

    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  });
});