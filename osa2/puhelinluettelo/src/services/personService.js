import axios from 'axios'
const baseUrl = '/api/persons'

const fetch = () => {
    const response = axios.get(baseUrl)
      return response.then(response => response.data)
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject);
    return request.then(response => response.data);
  };

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

export default { fetch, remove, create, update }