import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title, items }) => {

  const [scrollX, setScrollX] = useState(0); 

  const handleLeftArrow = () =>{
    // scrollando metade da tela do usuário 
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0){
      x = 0
    }
    setScrollX(x);
  };
  const handleRightArrow = () =>{
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 200;
    if((window.innerWidth - listW) > x){
      //diminuindo um pouco o tamanho pra não exceder o limite contando com o padding tbm
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>

      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
          marginLeft: scrollX,
          // fazendo com que cada linha tenha o tamanho especifico necessário para não quebrar
          width: items.results.length * 200
        }}>
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div className="movieRow--item">
                <img
                  src={`http://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
