import React from 'react';

const EditNews = ({onSubmit, newsTitle, newsDescription, newsTheme, newsLink, newsIMG_URL, handleNewsChange}) => {
    return(
        <form onSubmit={onSubmit} id="form">
        <div>
          Título: <input id='title' value={newsTitle} onChange={handleNewsChange}/>
          Descrição: <input id='description' value={newsDescription} onChange={handleNewsChange}/>
          Tema: <input id='theme' value={newsTheme} onChange={handleNewsChange}/>
          Link: <input id='link' value={newsLink} onChange={handleNewsChange}/>
          Link da imagem: <input id='img_url' value={newsIMG_URL} onChange={handleNewsChange}/>
        </div>
        <div>
          <button type="submit">Editar</button>
        </div>
      </form>
    )
}

export default EditNews