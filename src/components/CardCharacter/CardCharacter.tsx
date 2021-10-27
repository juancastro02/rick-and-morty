import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./CardCharacter.css";

interface ChapterData {
  air_date: string,
  characters: string[],
  created:string,
  episode:string,
  id:number,
  name:string,
  url:string
}

const CardCharacter = ( card:any ): JSX.Element  => {

  const { episode, image, species, name, status, location } = card.cardData;

  const [chapterData, setChapterData] = useState<ChapterData | any>({});

  let locationSplit = location.url.split("/");
  let locationId = locationSplit[locationSplit.length - 1];

  //Looking for the chapter information

  const handleGetChapter = useCallback(async () => {
    const { data } = await axios.get(`${episode[0]}`);
    setChapterData(data);
  },[episode]);

  useEffect(() => {
    handleGetChapter();
  }, [handleGetChapter]);

  return (
    <div className="card-container">
      <div className="card-image-container">
        <img className="card-image" alt="" src={image} />
      </div>
      <div className="information-character-container">
        <span className="principal-title">
          {name.length > 30 ? name.slice(0, 25) + "..." : name}
        </span>
        <span className="secondary-title">
          Status: {status} - {species}
        </span>
        <span className="point-title "> Last known location: </span>
        <Link className="link-redirect" to={`/planet/${locationId}`}>
          <span className="secondary-title"> {location.name} </span>
        </Link>
        <span className="point-title ">First seen in:</span>
        <span className="secondary-title">
          {chapterData.name} ( {chapterData.air_date} )
        </span>
      </div>
    </div>
  );
};

export default CardCharacter;
