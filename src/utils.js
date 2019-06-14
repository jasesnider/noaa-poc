const getElementByTagName = (parsedXML, tagName, i) => {
  return parsedXML.getElementsByTagName(tagName)[i].childNodes[0].nodeValue
}

const buildCollectionItem = (parsedXML, names, nodeIndex) => {
  let item = {}

  for (let i = 0; i < names.length; i++) {
    const name = names[i].split(":")
    const tagName = getElementByTagName(parsedXML, name[1], nodeIndex)

    item[name[0]] = tagName
  }

  return item
}

export const XMLParserToJSON = (xml, iterator, names) => {
  const parser = new DOMParser()
  const parsedXML = parser.parseFromString(xml, "text/xml")
  const nodes = parsedXML.getElementsByTagName(iterator)
  let parsedDataToJSON = []

  for (let i = 0; i < nodes.length; i++) {
    parsedDataToJSON.push(buildCollectionItem(parsedXML, names, i))
  }

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  localStorage.setItem("storms_date", `${year}:${month}`)
  localStorage.setItem("storms_data", JSON.stringify(parsedDataToJSON))

  return parsedDataToJSON
}
