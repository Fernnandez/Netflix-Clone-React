import React from "react";
import "./FeaturedMovie.css";

export default ({ item }) => {
  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
    <div className="featured--vertical">
        <div className="featured--horizontal">
            <div className="featured--name">{item.original_name}</div>
            <div className="featured--info">
                <div className="feature--points">{item.vote_average} pontos</div>
                <div className="feature--year">2999</div>
                <div className="feature--season">{item.number_of_seasons} temporada{item.number_of_seasons != 1 ? "s" : ""}</div>
            </div>  
            <div className="featured--description">{item.overview}</div>
            <div className="featured--buttons"></div>
            <div className="featured--genres"><strong>Gêneros</strong> ...</div>
        </div>
    </div>
    </section>
  );
};
