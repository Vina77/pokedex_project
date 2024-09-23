import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Grid2 } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { Skeletons } from "../components/Skeletons";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemon();
  }, []);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getPokemon = () => {
    var endpoints = [];
    for (var i = 1; i < 152; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((err) => console.log(err));
  };

  const filterPokemon = (pkmn_name) => {
    var filteredPokemons = [];
    if (pkmn_name === "") {
      getPokemon();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(pkmn_name)) {
        filteredPokemons.push(pokemons[i]);
      }
      setPokemons(filteredPokemons);
    }
  };

  return (
    <div>
      <Navbar filterPokemon={filterPokemon} />
      <Container maxWidth="lx">
        <Grid2 container spacing={10}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={key}>
                <PokemonCard
                  pkmn_name={capitalizeFirstLetter(pokemon.data.name)}
                  pkmn_image={pokemon.data.sprites.front_default}
                  pkmn_types={pokemon.data.types}
                />
              </Grid2>
            ))
          )}
        </Grid2>
      </Container>
    </div>
  );
};
