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


export default { getAllDatasets, getV1Data }
