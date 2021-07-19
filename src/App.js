import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null); 

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

  return (
    <div className="page">
      {/* Header */}
      {/* Destaque */}
        {featuredData &&
        <FeaturedMovie item={featuredData}/>
        }
      {/* Listas */}
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      {/* Footer */}
    </div>
  );
};
