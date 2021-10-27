import React, { useState } from "react";
import axios from "axios";
import "./FormView.css";
import CardCharacter from "../CardCharacter/CardCharacter";

// Interfaces of the React states

interface Character {
  name:string,
  status: string,
  gender:string
}

interface Location {
  name: string,
  url: string
}

interface Origin {
  name: string,
  url: string
}

interface Data {
  created: string,
  episode: string[],
  gender: string,
  image:string,
  id:number,
  location:Location,
  name:string,
  origin: Origin,
  species: string,
  status: string,
  type:string,
  url: string

}

interface Pagination {
  pages: number[],
  count:number,
  next:string,
  prev:string
}


const FormView = (): JSX.Element  => {
  const [character, setCharacter] = useState<Character>({
    name: "",
    status: "",
    gender: "",
  });
  const [data, setData] = useState<Data | any>({});
  const [currentPage, setCurrentPage] = useState<number | any>(1);
  const [pagination, setPagination] = useState<Pagination>({
    pages: [],
    count: 0,
    next: "",
    prev: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSearch = async (i?: any | undefined, url?: string | null) => {

    setLoading(true);

    const { name, status, gender } = character;

    let path:string | any = `https://rickandmortyapi.com/api/character/?page=${i}&name=${name}&status=${status}&gender=${gender}`;

    if (url !== null) {
      path = url;
    }

    setCurrentPage(i);

    try {
      const { data } = await axios.get(path);

      setError(false);
      setData(data.results);

      const { pages, next, prev } = data.info;

      // Creating a new array with the following pages of the pagination

      const pagesArr = (start:number, stop:number, step:number) =>
        Array.from(
          { length: (stop - start) / step + 1 },
          (_, interval) => start + interval * step
        );

      let totalPages = pagesArr(i, i + 2, 1);

      //cutting the array so that it only has the following values ​​from the pagination

      if (totalPages.indexOf(pages) >= 0) {
        totalPages.splice(totalPages.indexOf(pages) + 1);
      }

      let paginationData = {
        pages: totalPages,
        count: pages,
        next,
        prev,
      };

      setPagination(paginationData);

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      setPagination({
        pages: [],
        count: 0,
        next: "",
        prev: "",
      });
    }
  };

  // HandleChange of the character information

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setCharacter({
      ...character,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <div className="form">
        <input
          name="name"
          type="text"
          className="form-control"
          placeholder="Name of the character"
          onChange={handleChange}
        />
        <select
          name="status"
          onChange={handleChange}
          className="select"
          id="standard-select"
        >
          <option value="">--- status ---</option>
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>

        <select
          name="gender"
          onChange={handleChange}
          className="select"
          id="standard-select"
        >
          <option value="">--- gender ---</option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="genderless">genderless</option>
          <option value="unknown">unknown</option>
        </select>
        <button onClick={() => handleSearch(1, null)} className="search-button">
          search
        </button>
      </div>

      <span className="focus"></span>

      <div className="form-cards-container">
        {data.length > 0 && !loading && !error ? (
          data.map((e: Data) => <CardCharacter key={e.id} cardData={e} />)
        ) : loading && !error ? (
          <div className="loading1"></div>
        ) : error ? (
          <h1 className="error-message">
            There was an error or no results were found, please try again
          </h1>
        ) : null}
      </div>

      <div className="pagination-container">
        <div className="pagination">
          <ul className="crumbs">
            {pagination.prev && (
              <li>
                <button
                  className="crumb crumb__prev"
                  onClick={() => handleSearch(currentPage - 1, pagination.prev)}
                >
                  Previous
                </button>
              </li>
            )}
            {pagination.pages.map((e: number) => (
              <li key={e}>
                <button
                  className={
                    currentPage === e ? "crumb crumb__active" : "crumb"
                  }
                  onClick={() => handleSearch(e, null)}
                >
                  {e}
                </button>
              </li>
            ))}
            {pagination.next && (
              <li>
                <button
                  className="crumb crumb__next"
                  onClick={() => handleSearch(currentPage + 1, pagination.next)}
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormView;
