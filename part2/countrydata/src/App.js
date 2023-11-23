import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const api_key = process.env.REACT_APP_API_KEY

  const Weather = ({ name }) => {
    const [myweat, setMyweat] = useState(null)
    useEffect(() => {

      const params = {
        access_key: api_key,
        query: name
      }

      axios.get('http://api.weatherstack.com/current', { params })
        .then(resp => {
          if (resp.statusText === "OK") {
            if ( resp.data.success == false) return;
            setMyweat(resp.data)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }, [])

    return (
      <div>
        {
          myweat &&
          (
            <>
              <h2>Wheater in {name}</h2>
              <div><b>temperature:</b> {myweat.current.temperature} Celcius</div>
              <div><img src={myweat.current.weather_icons[0]} alt={name} /></div>

              <div><b>wind:</b> {myweat.current.wind_speed} direction {myweat.current.wind_dir}</div>
            </>

          )
        }
      </div>
    )
  }

  const Country = ({ country }) => {



    return (
      <>
        <h1>{country.name.common}</h1>

        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {
            Object.keys(country.languages).map((key) => (
              <li key={key}>{country.languages[key]}</li>
            ))

          }

          <img src={country.flags.png} alt={country.name.common} />
        </ul>

        <Weather name={country.name.common} />
      </>
    )
  }

  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (find != '') {
      axios.get(`https://restcountries.com/v3.1/name/${find}`).then(resp => {
        if (resp.statusText === "OK" && resp.data.length > 0)
          setCountries(resp.data);
      }).catch(e => {
        console.log(e);
      })

    }
  }, [find])


  return (
    <div>
      find countries <input onChange={(e) => setFind(e.target.value)} />
      {
        countries.length == 0 ? '' :
          countries.length == 1 ? <Country country={countries[0]} /> :
            countries.length > 10 ? <div>Too many matches, specify another filter</div> :
              countries.map((country) => <div key={country.idd.suffixes[0]}>{country.name.common} <button onClick={() => setFind(country.name.common)}>show</button></div>)
      }
    </div>
  );
}

export default App;
