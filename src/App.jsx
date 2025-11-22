import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SvgMap from './SvgMap'
import getCountryCode from './specialCases'

function App() {
  const [countryElement, setCountryElement] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);

  function clickHandler(event) {
    const id = event.target.id;
    const info = getCountryCode(id);

    if(countryElement != null){
    console.log(event.target.id);
    countryElement.style.fill = '#c0c0c0';
      if(countryElement.id === "Large masses of water"){
        countryElement.style.fill = 'blue';
      }
    }

    setCountryElement(event.target);
    event.target.style.fill = 'red';

    // Handle Russia and the ocean
    if(info?.type === "special"){
      setCountryDetails({
        name: info.name,
        population: "N/A",
        area: "N/A"
      });
    }
  }

  useEffect(() => {
    if (countryElement != null) {
      const info = getCountryCode(countryElement.id);

      if(info?.type === "special") return;

      fetch('https://restcountries.com/v3.1/alpha/' + countryElement.id)
        .then((response) => response.json())
        .then((data) => {
          const countryObj = {
            name: data[0].name.common,
            area: data[0].area,
            population: data[0].population,
          };
          setCountryDetails(countryObj);
        })
        .catch((error) => console.error('Error fetching joke:', error));
    }
  }, [countryElement]);

  return (
    <div>
    <h1>Country Info</h1>
    {countryDetails && (
      <div>
        <p>ID: {countryElement.id}</p>
          <p>Name: {countryDetails.name}</p>
          <p>Population: {countryDetails.population}</p>
          <p>Area: {countryDetails.area}</p>
          </div>
    )}

    <div onClick={clickHandler}>
      <SvgMap></SvgMap>
    </div>
  </div>
  );
}

export default App
