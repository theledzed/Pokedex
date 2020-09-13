import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Button, Modal, Tag } from "antd";
import PokemonDetailModal from "./PokemonDetail/pokemonDetail";
import "react-alice-carousel/lib/alice-carousel.css";
import "antd/dist/antd.css";
import "../App.css";

const PokemonList = () => {
  const [pokemonsList, setPokemonsList] = useState(null);
  const [pokemonDetail, setpokemonDetail] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(null);

  
/**
 * I get the list of pokemons
 */
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        return response.json();
      })
      .then((pokemonList) => {
        setPokemonsList(pokemonList.results);
      });
  }, []);


/**
 * ColorTagConfigure-  I change the color of the tag ("type") depending on the pokemon shown
 * @param {string} type - Pokemon type from API
 */
  const ColorTagConfigure = (type) => {
    let colorTag = "blue";
    if (type.type.name == "grass") {
      colorTag = "green";
    } else if (type.type.name == "poison") {
      colorTag = "purple";
    } else if (type.type.name == "fire") {
      colorTag = "volcano";
    } else if (type.type.name == "water") {
      colorTag = "blue";
    } else if (type.type.name == "bug") {
      colorTag = "lime";
    } else if (
      type.type.name == "dark" ||
      type.type.name == "dragon" ||
      type.type.name == "flying"
    ) {
      colorTag = "geekblue";
    } else if (type.type.name == "electric") {
      colorTag = "gold";
    } else if (type.type.name == "ice") {
      colorTag = "cyan";
    }
    return colorTag;
  };
  const responsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 3,
    },
  };

  return (
    <div>
      <div className="caruselContent">
        <AliceCarousel
          infinite={false}
          responsive={responsive}
          mouseDragEnabled
        >
          {pokemonsList
            ? pokemonsList.map((item, index) => {
                return (
                  <div className="card-develop">
                    <div className="card-header">
                      <p className="developSection">{`# ${index + 1} `}</p>
                    </div>
                    <div className="content-card">
                      <div className="img-content">
                        <img
                          src={`https://pokeres.bastionbot.org/images/pokemon/${
                            index + 1
                          }.png`}
                          alt="pokemonImage"
                        />
                      </div>
                      <p>{item.name.toUpperCase()}</p>
                      <Button
                        onClick={() => {
                          fetch(item.url)
                            .then((response) => {
                              return response.json();
                            })
                            .then((pokemons) => {
                              setpokemonDetail(pokemons)
                              setIsOpenModal(true)
                            });
                        }}
                      >
                        Detalle
                      </Button>
                    </div>
                  </div>
                );
              })
            : null}
        </AliceCarousel>
      </div>
      <Modal
        footer={null}
        title={
          pokemonDetail ? (
            <div className="card-header">
              <p>{pokemonDetail.name.toUpperCase()}</p>
              <p>
                {pokemonDetail.types.map((type) => {
                  return (
                    <Tag color={ColorTagConfigure(type)}>
                      {type.type.name.toUpperCase()}
                    </Tag>
                  );
                })}
              </p>
            </div>
          ) : (
            ""
          )
        }
        centered
        visible={isOpenModal}
        onCancel={() => setIsOpenModal(!isOpenModal)}
      >
        {pokemonDetail ? <PokemonDetailModal details={pokemonDetail} /> : null}
      </Modal>
    </div>
  );
};

export default PokemonList;
