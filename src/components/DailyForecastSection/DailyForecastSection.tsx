import { Rain } from "../../weather/Rain";
import type { Forecast } from "../../types/types";
import { ErrorMessage } from "../shared/ErrorMessage";
import { formatDate } from "../../helpers/formatDate/formatDate";

type Props = {
  forecast?: Forecast;
}

export const DailyForecastSection = ({ forecast }: Props) => {
  return (
    <div className="daily">
      <div className="daily-title">7-DAY FORECAST</div>
      <div className="daily-list">
        {
          forecast ?
            forecast.daily?.map(({ datetime, range: { min, max }, newRange }) => (
              <div key={self.crypto.randomUUID()} className="daily-row">
                <div className="daily-time">{formatDate(datetime)}</div>

                <div className="daily-conditions">
                  <Rain />
                  <span className="probability">60%</span>
                </div>

                <div className="daily-range">
                  <span className="daily-min">{min}°</span>
                  <span className="range">
                    <span className="range-meter" style={{ left: `${newRange.min}%`, right: `${newRange.max}%` }} />
                    <span className="range-current" />
                  </span>
                  <span className="daily-max">{max}°</span>
                </div>
              </div>
            ))
            :
            <ErrorMessage msg="Something went wrong" />
        }
      </div>
    </div>
  )
}