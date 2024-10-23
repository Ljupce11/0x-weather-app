import { Fragment } from "react/jsx-runtime";

import { ErrorMessage } from "../shared/ErrorMessage";
import type { CurrentWeather } from "../../types/types";
import { getWeatherDescriptions } from "../../helpers/getWeatherDescriptions/getWeatherDescriptions";

type Props = {
  currentWeather: CurrentWeather;
}

export const CurrentWeatherSection = ({ currentWeather }: Props) => {
  return (
    <div className="header">
      {
        currentWeather ?
          <Fragment>
            <div className="location">{currentWeather.location.name}</div>
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