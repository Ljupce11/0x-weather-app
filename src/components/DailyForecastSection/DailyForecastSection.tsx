import { Rain } from "../../weather/Rain";
import type { Forecast } from "../../types/types";
import { ErrorIcon } from "../../weather/ErrorIcon";
import { ErrorMessage } from "../shared/ErrorMessage";
import { formatDate } from "../../helpers/formatDate/formatDate";

type Props = {
  forecast?: Forecast;
}

export const DailyForecastSection = ({ forecast }: Props) => {
  return (
    <section className="daily" aria-labelledby="daily-forecast-title">
      <header className="daily-title">
        <p>7-DAY FORECAST</p>
      </header>
      <div className="daily-list">
        {
          forecast ?
            forecast.daily?.map(({ datetime, range: { min, max }, newRange }) => (
              <article key={self.crypto.randomUUID()} className="daily-row">
                <time className="daily-time" dateTime={datetime} aria-label={`Forecast for ${formatDate(datetime)}`}>
                  {
                    formatDate(datetime) === 'invalidDate' ?
                      <ErrorIcon msg="Invalid date" /> :
                      formatDate(datetime)
                  }
                </time>

                <div className="daily-conditions" aria-label="Rain probability">
                  <Rain />
                  <span className="probability" aria-label="60 percent chance of rain">60%</span>
                </div>

                <div className="daily-range" aria-label={`Temperature range from ${min}° to ${max}°`}>
                  <span className="daily-min">{min}°</span>
                  <span className="range">
                    <span className="range-meter" style={{ left: `${newRange.min}%`, right: `${newRange.max}%` }} />
                    <span className="range-current" />
                  </span>
                  <span className="daily-max">{max}°</span>
                </div>
              </article>
            ))
            :
            <ErrorMessage msg="Something went wrong" />
        }
      </div>
    </section>
  )
}