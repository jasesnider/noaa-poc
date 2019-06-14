import axios from "axios"
import { stormsBuilder } from "../builders"

export const getStorms = setStormsToState => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  const stormsDataDate = localStorage.getItem("storms_date")

  if (stormsDataDate === `${year}:${month}`) {
    setStormsToState(JSON.parse(localStorage.getItem("storms_data")))
  } else {
    return axios
      .get(
        "https://cors.io/?https://www.nhc.noaa.gov/TCR_StormReportsIndex.xml"
      )
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
}
