import axios from "axios";
const baseUrl = "http://localhost:3001";

const getAllDatasets = () => {
    return axios.get(baseUrl + "/datasets")
}

const exportedObject = { getAllDatasets }

export default exportedObject
