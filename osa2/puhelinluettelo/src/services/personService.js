import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const fetch = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

export default { fetch, remove, create, update }