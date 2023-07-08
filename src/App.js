
import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';


function App() {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);
  
  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get("https://raw.githubusercontent.com/hengkiardo/restcountries/master/resources/countriesV1.json")
      setCountries(response.data);
    };
    loadCountries();
  }, []);

  console.log(countries);

  const searchCountries = (text) => {
    if (!text){
      setCountryMatch([]);
    } else {
      let matches = countries.filter((country) => {
        const regex = new RegExp(`${text}`, "gi");
        return typeof country.name.common === "string" && country.name.common.toLowerCase().match(regex) ||
               typeof country.capital === "string" && country.capital.toLowerCase().match(regex);
      });
      if (matches.length > 0) {
        const languages = matches[0].languages;
        const languageNames = Object.values(languages);
        console.log(languageNames); // ["Dari", "Pashto", "Turkmen"]
      }
      setCountryMatch(matches);
    }
  };
  

  return (
    <div className="App">
      <h2>Country & Capital Search</h2>
      <div className="input-group flex-nowrap">
  <input 
    type="text" 
    className="form-control" 
    placeholder="Username" 
    aria-label="Username" 
    aria-describedby="addon-wrapping"
    onChange={(e) => searchCountries(e.target.value)}
  />

    </div>
    <br />
    {countryMatch && countryMatch.map((item, index) => {
      return (
      <div className="row justify-content-center" key={index}>
  <div className="col-sm-6 mb-3 mb-sm-0">
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">{`${item.name.common}`}</h5>
        <p className="card-text">Ibu Kota: {item.capital}</p>
        <p className="card-text">Bahasa: {Object.values(item.languages).join(', ')}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  </div>
  )})}
    </div>
  );
}

export default App;
