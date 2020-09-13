import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import "./index.css";
import "antd/dist/antd.css";

const PokemonDetailModal = (props) => {
  const [stats, setStats] = useState(null);
  console.log(props);

  useEffect(() => {
    if (props.details) {
      setStats(props.details.stats);
    }
  }, [props.details]);

  return (
    <div className="modal-content-detail" >
      <p>Weight: {props.details.weight} KG </p>
      <p>Height: {props.details.height} M</p>
      <Radar
        options={{
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `${props.details.name} stats`.toUpperCase(),
          },
          scale: {
            reverse: false,
            ticks: {
              beginAtZero: true,
            },
          },
        }}
        data={{
          labels: [
            "HP",
            "Attack",
            "Defense",
            "Special-attack",
            "Special-defense",
            "Speed",
          ],
          datasets: [
            {
              label: "Stats",
              backgroundColor: "rgba(59, 132, 206, 0.6)",
              data: stats
                ? [
                    stats[0].base_stat,
                    stats[1].base_stat,
                    stats[2].base_stat,
                    stats[3].base_stat,
                    stats[4].base_stat,
                    stats[5].base_stat,
                  ]
                : [],
            },
          ],
        }}
      />
    </div>
  );
};

export default PokemonDetailModal;
