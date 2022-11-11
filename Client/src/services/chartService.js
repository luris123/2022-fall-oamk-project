import axios from "axios";
const baseUrl = "http://localhost:3001";

const getAllDatasets = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data)
  }

const getV1Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v1data)
}

const getV2Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v2data)
}

const getV3Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v3data)
}

const getV4Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v4data)
}

const getV5Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v5data)
}

const getV6Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v6data)
}

const getV7Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v7data)
}

const getV8Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v8data)
}

const getV9Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v9data)
}

const getV10Data = () => {
    const request = axios.get(baseUrl + "/datasets");
    return request.then(response => response.data.v10data)
}

const exportedObject = { getAllDatasets, getV1Data, getV2Data, getV3Data, getV4Data, getV5Data, getV6Data, getV7Data, getV8Data, getV9Data, getV10Data }

export default exportedObject
