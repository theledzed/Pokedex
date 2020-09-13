import axios from "axios";

export const listOfPokemons = pokemons => {
    return axios
      .get("http://pokeapi.co/api/v1/pokemon/")
      .then(res => {
          console.log('si entre al then');
          
        return res.data;
      })
      .catch(e => {
        console.log("errorLogin", e);
      });
  };
  