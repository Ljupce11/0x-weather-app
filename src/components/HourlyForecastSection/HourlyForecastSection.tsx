import { Thunder } from "../../weather/Thunder";
import type { Forecast } from "../../types/types";
import { ErrorMessage } from "../shared/ErrorMessage";

type Props = {
  forecast?: Forecast;
}

export const HourlyForecastSection = ({ forecast }: Props) => {
  return (
    <section className="forecast" aria-labelledby="hourly-forecast">
      <header className="forecast-title">
        <p>HOURLY FORECAST</p>
      </header>
      <div className="scroller" aria-live="polite">
        <div className="forecast-list">
          {
            forecast ?
              forecast.hourly?.map(({ datetime, temperature }, index) => (
                <article key={self.crypto.randomUUID()} className="forecast-item">
                  <span>{index === 0 ? 'Now' : new Date(datetime).getHours().toString().padStart(2, '0')}</span>
                  <span>
                    <Thunder />
                  </span>
                  <span>{temperature}</span>
                </article>
              ))
              :
              <ErrorMessage msg="Something went wrong" />
          }
        </div>
      </div>
    </section>
  )
}