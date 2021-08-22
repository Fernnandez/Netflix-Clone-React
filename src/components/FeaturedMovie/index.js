import React from "react";
import "./FeaturedMovie.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ item }) => {
	let firstdate = new Date(item.first_air_date);
	let genres = [];
	// pegando os nomes de todos os gêneros do objeto e jogando pra um array de gêneros
	for (let i in item.genres) {
		genres.push(item.genres[i].name);
	}

	//verificando se a descrição é grande e se for diminuir o tamanho e concatena com os ...
	let description = item.overview;
	if (description.length > 200) {
		description = description.substring(0, 200) + "...";
	}

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
						<div className="featured--points">
							{item.vote_average} pontos
						</div>
						<div className="featured--year">
							{firstdate.getFullYear()}
						</div>
						<div className="featured--season">
							{item.number_of_seasons} temporada
							{item.number_of_seasons != 1 ? "s" : ""}
						</div>
					</div>
					<div className="featured--description">{description}</div>
					<div className="featured--buttons">
						<a
							href={`/watch/${item.id}`}
							className="featured--watchbutton"
						>
							► Assistir
						</a>
						<a
							href={`/list/add/${item.id}`}
							className="featured--addbutton"
						>
							+ Minha Lista
						</a>
					</div>
					{/* separando por uma virgula e um espaço com o join */}
					<div className="featured--genres">
						<strong>Gêneros</strong> {genres.join(", ")}
					</div>
				</div>
			</div>
		</section>
	);
};
