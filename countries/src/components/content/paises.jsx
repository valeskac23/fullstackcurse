//import Buscar from "../pure/Buscar";
import { useState, useEffect } from "react";
//import Conexion from "../../services/conexion";
import axios from "axios";
import Buscar from "../pure/Buscar";


const Paises = () => {
    const [value, setValue] = useState(''); // obtine el valor del imput
    const [paises, setPaises] = useState([]); //areglo con todo los paises del servidor
    const [buscar, setBuscar] = useState([]); //Busca el pais que se introduce en el input
    const [SelectCountry, setSelectCountry] = useState(null);//seleciona el pais de la lista

    //conexion co el sevidor para los datos
    useEffect(() => {
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response =>{
            setPaises(response.data)
        })
        .catch((error)=>{
            console.error('Error al conetar', error);
            
        })
    }, []);

    useEffect(() => {
        if(value){
            const filtroBusqueda = paises.filter(pais => pais.name.common.toLowerCase().includes(value.toLowerCase()))
            setBuscar(filtroBusqueda);
        }else{
            setBuscar([]);
        }
        
    }, [value, paises]);
    

    

    const handleSearch = (e) => {
        setValue(e.target.value)
        setSelectCountry(null);
      }
    
      const showDetails = (pais) => {
        setSelectCountry(pais)
      }

      const ShowFullDetails = () =>{
        if(!SelectCountry){
            return null;
        }
        const pais = SelectCountry;
        const idioma = Object.values(pais.languages);
        return(
            <div>
                <h3>{pais.name.common}</h3>
                <p>Capital: {pais.capital}</p>
                <p>Area: {pais.area} km²</p>
                <h3>Languages:</h3>
                <ul>
                    {idioma.map((language, i) => (
                        <li key={i}>{language}</li>
                        ))}
                </ul>
                <img src={pais.flags.png} alt={`Flag of ${pais.name.common}`} width="100" />
      </div>
    )
    
      }



    return (
        <div>
            Find Contries:   <input value={value} onChange={handleSearch}/>

            <Buscar showDetails={showDetails} ShowFullDetails={ShowFullDetails}/>
            
        </div>
    );
}

export default Paises;
