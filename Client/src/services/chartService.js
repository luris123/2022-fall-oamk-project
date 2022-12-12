import axios from "axios";
const baseUrl = "http://localhost:3001";

const getAllDatasets = async () => {
    return await axios.get(baseUrl + "/datasets");
}

const exportedObject = { getAllDatasets }

export default exportedObject;