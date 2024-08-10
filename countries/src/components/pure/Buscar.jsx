import PropTypes from 'prop-types';


const Buscar = ({ ShowFullDetails, showDetails }) => {
    if (ShowFullDetails.length > 10) {
      return (
        <p>
          Too many matches, specify the filter
        </p>
      )
    } else if (ShowFullDetails.length <= 10 && ShowFullDetails.length > 1) {
      return (
        <ul>
          {ShowFullDetails.map((country, i) => 
            <li key={i}>
              {country.name.common} <button onClick={() => showDetails(country)}>
                show
              </button>
            </li>
          )}
        </ul>
      )
    } else if (ShowFullDetails.length === 1) {
      const country = ShowFullDetails[0]
      const languages = Object.values(country.languages)
      
      return (
        <div>
          <h2>
            {country.name.common}
          </h2>
          <p>
            capital {country.capital}
          </p>
          <p>
            area {country.area} km^2
          </p>
          <ul>
            {languages.map((language, i) => 
              <li key={i}>
                {language}
              </li>
            )}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
          
        </div>
      )
    } else {
      return null
    }
  }

  Buscar.propTypes = {
    ShowFullDetails : PropTypes.func,
    showDetails : PropTypes.func, 

};


export default Buscar;



