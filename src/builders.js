import { XMLParserToJSON } from "./utils"

export const stormsBuilder = xml => {
  const iterator = "row"
  const names = [
    "stormName:StormName",
    "stormReportURL:StormReportURL",
    "year:Year",
    "basin:Basin",
  ]

  return XMLParserToJSON(xml, iterator, names)
}
