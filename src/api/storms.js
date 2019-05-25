import axios from "axios"
import { stormsBuilder } from "../builders"

export const getStorms = setStormsToState => {
  return axios
    .get("https://cors.io/?https://www.nhc.noaa.gov/TCR_StormReportsIndex.xml")
    .then(function(response) {
      const data = response.data

      if (data) {
        const storms = stormsBuilder(data)
        setStormsToState(storms)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}
