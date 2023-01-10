import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Navigation } from "./components/Navigation";
import { PokemonCard } from "./components/PokemonCard";
import Container from "react-bootstrap/Container";

const LIMIT = 10;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    fetch(pokeApi)
      .then((res) => res.json())
      .then((data) => {
        setAllPokemons(data.results);
        setFilteredPokemons(data.results);
      });
  }, []);

  function onChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value, "gi");
    const filtered = allPokemons.filter((pokemon) => pokemon.name.match(regex));

    setFilteredPokemons(filtered);
  }

  return (
    <div data-testid="app">
      <Navigation />
      <div className="d-flex justify-content-center mb-4">
        <InputGroup className="w-50 ">
          <Button variant="outline-secondary" id="button-addon1">
            Search
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            onChange={onChange}
          />
        </InputGroup>
      </div>

      <Container>
        <Row xs={1} md={4} className="g-4">
          {filteredPokemons?.map((pokemon, index) => {
            return (
              <PokemonCard key={index} url={pokemon.url} name={pokemon.name} />
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export { App };
