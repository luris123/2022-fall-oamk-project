import axios from 'axios'
const baseUrl = 'http://localhost:3001'

//pitääkö hakea uusi token ainakun tekee jotain??

const createView = async (settings) => {

  const user = JSON.parse(window.localStorage.getItem('loggedUser'));

  const response = await axios.post(baseUrl + '/users/newView',
    settings,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    }
  );
  return response.data;
}

const getView = async (url) => {

  /*const object = {
    "url": url
  }

  const response = await axios.get(baseUrl + '/users/getVisualization', object);
  return response.data; */
}


const exportedObject = { createView, getView }

export default exportedObject 