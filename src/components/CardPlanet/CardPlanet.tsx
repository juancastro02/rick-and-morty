import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CardPlanet.css";

interface Params {
  id:string
}

interface DataLocation {
  created: string,
  dimension: string,
  id: number,
  name: string,
  residents: string[],
  type:string,
  url:string
}

const CardPlanet = (): JSX.Element  => {
  const [dataLocation, setDataLocation] = useState<DataLocation | any>({});

  //Getting the id of the params

  let { id }:Params = useParams();

  const handleGetData = useCallback(async () => {

    // Getting the location information

    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/location/${id}`
    );
    setDataLocation(data);
  },[id]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return (
    <div className="card-planet-container">
      <div className="card-planet-contain">
        <h1 className="title-location">Location information</h1>
        <span className="information-location-questions">Name:</span>
        <span className="information-location"> {dataLocation.name}</span>
        <span className="information-location-questions">
          Dimension: 
        </span>
        <span className="information-location">{dataLocation.dimension}</span>
        <span className="information-location-questions">Type: </span>
        <span className="information-location">{dataLocation.type}</span>
        <span className="information-location-questions">
          Residents:
        </span>
        <span className="information-location">
         {dataLocation.residents?.length}
        </span>
        <Link to="/">
          <button className="btn-location">GO HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default CardPlanet;
