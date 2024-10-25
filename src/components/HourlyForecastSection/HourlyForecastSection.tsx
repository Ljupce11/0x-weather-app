import { Thunder } from "../../weather/Thunder";
import type { Forecast } from "../../types/types";
import { ErrorMessage } from "../shared/ErrorMessage";

type Props = {
  forecast?: Forecast;
}

export const HourlyForecastSection = ({ forecast }: Props) => {
  return (
    <div className="forecast">
      <div className="forecast-title">HOURLY FORECAST</div>
      <div className="scroller">
        <div className="forecast-list">
          {
            forecast ?
              forecast.hourly?.map(({ datetime, temperature }, index) => (
                <div key={self.crypto.randomUUID()} className="forecast-item">
                  <span>{index === 0 ? 'Now' : new Date(datetime).getHours().toString().padStart(2, '0')}</span>
                  <span>
                    <Thunder />
                  </span>
                  <span>{temperature}</span>
                </div>
              ))
              :
              <ErrorMessage msg="Something went wrong" />
          }
        </div>
      </div>
    </div>
  )
}