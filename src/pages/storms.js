import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getStorms } from "../api/storms"
import "../styles/storms.css"

class Storms extends Component {
  state = {
    stormData: [],
    filteredList: [],
    isLoading: true,
  }

  setStormsToState = stormData => {
    this.setState({ stormData, isLoading: false })
  }

  renderRecordList(filteredList) {
    return (
      <div>
        {filteredList &&
          filteredList.map((storm, i) => {
            const stormIndex = i
            const { stormName, year, stormReportURL, basin } = storm
            return (
              <div className="record-wrapper" key={stormIndex}>
                <div className="record-name">{stormName}</div>
                <ul>
                  <li>
                    <a
                      href={stormReportURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${stormName} Report`}
                    </a>
                  </li>
                  <li>{year}</li>
                  <li>{basin}</li>
                </ul>
              </div>
            )
          })}
      </div>
    )
  }

  componentDidMount() {
    getStorms(this.setStormsToState)
  }

  filterList(e) {
    const value = e.target.value
    const { stormData } = this.state

    let list = stormData

    if (!!value) {
      list = stormData.filter(storm => {
        const { year, basin, stormName, stormReportURL } = storm
        const s = `${year}${basin}${stormName}${stormReportURL}`

        return s.indexOf(value) > -1
      })
      this.setState({ filteredList: list })
    } else {
      return
    }
  }

  render() {
    const { filteredList, stormData, isLoading } = this.state

    return (
      <Layout>
        <SEO title="Storms" />
        <h1>Storms</h1>
        <div>This is pulling data from the NOAA historical storm records.</div>
        <div> Search by typing in a year, ocean or name to get started</div>
        {isLoading && <div>Loading... </div>}
        <div className="search-input-wrapper">
          <input
            onChange={e => this.filterList(e)}
            placeholder={isLoading ? "Getting storm data" : "Search Storms"}
            disabled={isLoading}
          />
          <span>
            {` Found: ${filteredList.length} of ${stormData.length} records`}
          </span>
        </div>
        {!isLoading && this.renderRecordList(filteredList)}

        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default Storms
