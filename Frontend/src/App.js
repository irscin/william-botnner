import './App.css';
import loginService from './services/login'
import {deleteNews, getNews, postNews, putNews} from './services/news'
import NewsTable from './components/NewsTable'
import FormNews from './components/FormNews'
import React, {useState} from 'react'

function App() {
  //TODO mudar o estado padrão de authenticated para falso
  const [authenticated, setAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [errorMsg, setErrorMsg] = useState()
  const [newsArray, setNewsArray] = useState([])
  const [wantEditNews, setWantEditNews] = useState(false)
  const [wantAddNews, setWantAddNews] = useState(false)
  const [newsTitle, setNewsTitle] = useState('')
  const [newsDescription, setNewsDescription] = useState('')
  const [newsTheme, setNewsTheme] = useState('Esportes')
  const [newsLink, setNewsLink] = useState('')
  const [newsIMG_URL, setNewsIMG_URL] = useState('')
  const [newsID, setNewsID] = useState('')

  const authenticate = async (event)=>{
    event.preventDefault()
    try{
      const result = await loginService.login({pin})
      if(result==='OK'){
        setAuthenticated(true)
        getNews().then(results=>setNewsArray(results))
        setNotificationMessage('Logado')
      }
    }catch(e){
      setNotificationMessage('PIN incorreto')
    }
  }

  const Notification = (prop)=>{
    if(prop.message===null || prop.message===undefined){
        return null
    }
    return(
        <div className='error'>
            {prop.message}
        </div>
    )
}

  const setNotificationMessage = (message) => {
    setErrorMsg(message)
      setTimeout(()=>{
        setErrorMsg(null)
    }, 2000)
  }

  const handlePinChange = (event)=>{
    setPin(event)
  }

  const handleAddNews = (e) =>{
    setWantEditNews(true)
    setNewsID(e)
  }

  const handleAddClickButton = () => {
    setWantAddNews(true)
  }

  const handleNewsChange = (event) => {
    const value=event.target.value
    switch(event.target.id){
      case 'title':
        setNewsTitle(value)
        break
      case 'description':
        setNewsDescription(value)
        break
      case 'theme':
        setNewsTheme(value)
        break
      case 'link':
        setNewsLink(value)
        break
      default:
        setNewsIMG_URL(value)
        break
    }
  }

  const editNews = async (event)=>{
    event.preventDefault();
    const tmp = {
      title: newsTitle,
      description: newsDescription,
      theme: newsTheme,
      link: newsLink,
      img_url: newsIMG_URL
    }
    let result = await putNews(tmp, newsID)
    backToTable()
    if(result.status===200){
      setNotificationMessage('Notícia atualizada')
    }else{
      setNotificationMessage('Deu algum erro')
    }

  }

  const handleDeleteNews = async (event) => {
    console.log(event);
    const result = await deleteNews(event)
    if(result.status===204){
      setNotificationMessage('Notícia apagada')
    }else{
      setNotificationMessage('Deu erro')
    }
    backToTable()
  }

  const addNews = async (event)=>{
    event.preventDefault();
    const tmp = {
      title: newsTitle,
      description: newsDescription,
      theme: newsTheme,
      link: newsLink,
      img_url: newsIMG_URL
    }
    console.log(tmp);
    let result = await postNews(tmp)
    backToTable()
    if(result.status===200){
      setNotificationMessage('Notícia postada')
    }else{
      setNotificationMessage('Deu algum erro')
    }
  }

  const backToTable = () => {
    setWantEditNews(false)
    setWantAddNews(false)
    setNewsTitle('')
    setNewsDescription('')
    setNewsTheme('Esportes')
    setNewsLink('')
    setNewsIMG_URL('')
    getNews().then(results=>setNewsArray(results))
  }

  return (
    <div className="App">
      <h1>ADMIN PANEL</h1>
      <Notification message={errorMsg}/>
      {(() => {
        if (authenticated===false) {
          return(
            <form onSubmit={authenticate}>
              <input type='password' value={pin} onChange={({target})=>handlePinChange(target.value)}/>
              <button type='submit'>Login</button>
            </form>
          )
        }else if(authenticated===true && wantEditNews===false && wantAddNews===false){
          return(
            <div>
              <NewsTable newsArray={newsArray} handleAddNews={handleAddNews} handleDeleteNews={handleDeleteNews}/>
              <button className='fab' onClick={handleAddClickButton}>ADD</button>
            </div>
          )
        }else if(wantAddNews===true && wantEditNews===false){
          return(
            <FormNews onSubmit={addNews} newsTitle={newsTitle} newsDescription={newsDescription} newsTheme={newsTheme} newsLink={newsLink} newsIMG_URL={newsIMG_URL} handleNewsChange={handleNewsChange}/>
          )
        }else if(wantEditNews===true && wantAddNews===false){
          return(
            <FormNews onSubmit={editNews} newsTitle={newsTitle} newsDescription={newsDescription} newsTheme={newsTheme} newsLink={newsLink} newsIMG_URL={newsIMG_URL} handleNewsChange={handleNewsChange}/>
          )
        }
      })()}
    </div>
  );
  
}

export default App;
