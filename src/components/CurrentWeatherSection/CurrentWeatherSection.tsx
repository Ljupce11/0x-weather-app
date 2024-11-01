import { Fragment } from "react/jsx-runtime";

import { ErrorMessage } from "../shared/ErrorMessage";
import type { CurrentWeather, LocationData } from "../../types/types";
import { getWeatherDescriptions } from "../../helpers/getWeatherDescriptions/getWeatherDescriptions";

type Props = {
  currentWeather?: CurrentWeather;
  locationData?: LocationData;
}

export const CurrentWeatherSection = ({ currentWeather, locationData }: Props) => {
  return (
    <section className="header" aria-labelledby="current-weather">
      {
        currentWeather ?
          <Fragment>
            <h1 className="location">{locationData?.address?.city || "Current location"}</h1>
            <p className="temp" aria-label={`Current temperature is ${currentWeather.temp} degrees`}>{currentWeather.temp}</p>
            <div className="conditions" aria-live="polite">
              <p aria-label="Current conditions">
                {getWeatherDescriptions([currentWeather.cond])}
              </p>
              <p aria-label={`High ${currentWeather.range.max}, Low ${currentWeather.range.min}`}>
                H:{currentWeather.range.max} L:{currentWeather.range.min}
              </p>
            </div>
          </Fragment>
          :
          <ErrorMessage msg="Something went wrong" />
      }
    </section>
  )
}