import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
function PokemonCard({ url, name }) {
  const [info, setInfo] = useState();
  const [abilities, setAbilities] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setImageUrl(data.sprites.front_default);
        setAbilities(data.abilities);
      });
  }, [url, name]);

  return (
    <>
      {info && (
        <Col>
          <Card>
            <Card.Img src={imageUrl} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text as="div">
                Abilities:
                <ul>
                  {abilities?.map((ability, index) => {
                    return <li key={index}>{ability.ability.name}</li>;
                  })}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  );
}

export { PokemonCard };
