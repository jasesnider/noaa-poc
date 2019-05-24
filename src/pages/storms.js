import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getStorms } from "../api/storms"

class Storms extends Component {
  state = {
    stormData: [],
    filteredList: [],
  }

  componentDidMount() {
    getStorms(this)
  }

  filterList = e => {
    const value = e.target.value
    const { stormData } = this.state

    let list

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
    const { filteredList } = this.state

    return (
      <Layout>
        <SEO title="Storms" />
        <h1>Storms</h1>
        <input onChange={e => this.filterList(e)} />
        <ul>
          {filteredList &&
            filteredList.map((storm, i) => {
              const stormIndex = i
              const { stormName, year, stormReportURL, basin } = storm
              return (
                <React.Fragment key={stormIndex}>
                  <li>{stormName}</li>
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
                </React.Fragment>
              )
            })}
        </ul>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default Storms
