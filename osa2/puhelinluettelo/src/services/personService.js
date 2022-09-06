import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const fetch = () => {
    const response = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        name: 'Non-existing Person',
        number: '123123',
      }
      return response.then(response => response.data.concat(nonExisting))
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