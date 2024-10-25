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
    <div className="header">
      {
        currentWeather ?
          <Fragment>
            <div className="location">{locationData?.address?.city || "Current location"}</div>
            <div className="temp">{currentWeather.temp}</div>
            <div className="conditions">
              {getWeatherDescriptions([currentWeather.cond])}
              <br />
              H:{currentWeather.range.max} L:{currentWeather.range.min}
            </div>
          </Fragment>
          :
          <ErrorMessage msg="Something went wrong" />
      }
    </div>
  )
}