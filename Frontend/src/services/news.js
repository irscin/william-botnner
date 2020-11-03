import axios from 'axios'
const baseUrl = 'http://localhost:3006/news/'
const getNews = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}
const postNews = async news => {
    const response = await axios.post(baseUrl, news)
    return response
}
const putNews = async(news, id) => {
    const response = await axios.put(baseUrl+id, news)
    return response
}
const deleteNews = async id => {
    const response = await axios.delete(baseUrl+id)
    return response
}

export {getNews, postNews, putNews, deleteNews}