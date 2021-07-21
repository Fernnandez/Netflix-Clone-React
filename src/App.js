import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  // useEffect do filme principal e da lista de filmes
  useEffect(() => {
      const loadAll = async () => {
      // pegando a lista completa de filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);
 
      // Pegando o Featured
      let originals = list.filter(i=>i.slug==="originals");
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  //useEffects para monitor o scroll e mudar o header dinamicamente 
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return() =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      {/* Header */}
      <Header black={blackHeader}/>
      {/* Destaque */}
      {featuredData &&
      <FeaturedMovie item={featuredData}/>
      }
      {/* Listas */}
      {featuredData &&
        <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
        </section>
      }

      {/* Footer */}
      {featuredData &&
        <footer>
          Feito com <span role="img" aria-label="coração"> ❤️ </span> Por Angelo Fernandes <br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </footer>
      }
      {/* se nenhum filme foi carregado aparece o loading */}
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif" alt="carregando"></img>
        </div>
      }

    </div>
  );
};
