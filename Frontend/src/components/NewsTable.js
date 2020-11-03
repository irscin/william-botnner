import React from 'react';

const NewsTable = ({newsArray, handleAddNews, handleDeleteNews})=>{
    return (
        <div>
           <h1>Notícias</h1>
           {newsArray.map(e=>{
                return(
                <div key={e.id}>
                    <span>{e.title} | </span>
                    <span>{e.description}|  </span>
                    <span>{e.theme} | </span>
                    <span>{e.link} | </span>
                    <span>{e.img_url} | </span>
                    <button onClick={()=>handleAddNews(e.id)}>Editar</button>
                    <button onClick={()=>handleDeleteNews(e.id)}>Deletar</button>
                </div>
                )
            })}
        </div>
     )
}
export default NewsTable