import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { HeroeCard } from "../heroes/HeroeCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  // We can get the location by using the Hook (useLocation) or by destructuring
  const location = useLocation();

  //if q is undefined, it will be set to ''
  const { q = "" } = queryString.parse(location.search);
  const [formValues, handleInputChange] = useForm({
    //this is the name of the input
    heroeToSearch: q,
  });
  const { heroeToSearch } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${heroeToSearch}`);
    // heroesFiltered = getHeroesByName(heroeToSearch);
  };
  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="heroeToSearch"
              onChange={handleInputChange}
              value={heroeToSearch}
              placeholder="Enter your hero"
              className="form-control"
            />
            <button type="submit" className="btn btn-outline-primary btn-block">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === "" && <div className="alert alert-info">Search a hero</div>}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">
              No results for <b>{q}</b>
            </div>
          )}
          {heroesFiltered.map((hero) => (
            <HeroeCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
