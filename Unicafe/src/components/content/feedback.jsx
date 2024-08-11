import { useState } from "react";
import Button from "../pure/buttons";
import Total from "../pure/total";


const Feedback = () => {
    //inicializacion del estado del componente
    const [total, setTotal] = useState(0); 

    const [good, setGood] = useState(0); 
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [promedio, setpromedio] = useState(0);
    const [positiveProm, setpositiveProm] = useState(0);


    /**
     * Calcula el numero de clicks que recibe la opción 
     * good en los comentarios *****
     */
    const handleGoodClicks=()=>{
        const upGood =(good + 1);
        setGood(upGood);
        setTotal(upGood + bad + neutral);
        calcularPromedio()
        
    }

    /**
     * Calcula el numero de clicks que recibe la opción 
     * Neutral en los comentarios
     */
    const handleNeutralClicks=()=>{
        const upNeutral = (neutral + 1)
        setNeutral(upNeutral);
        setTotal(good + upNeutral + bad);  
        calcularPromedio()    
    }


    const calcularPromedio = () =>{
        const sum = (((good*1) + (bad*-1) + neutral)/total);
        const positive = ((good*1)/total);
        setpromedio(sum); 
        setpositiveProm(positive);
    }
    /**
     * Calcula el numero de clicks que recibe la opción 
     * BAD en los comentarios
     */
    const handleBadClicks=()=>{
        const upBad = (bad + 1);
        setBad(upBad); 
        setTotal(good + upBad + neutral);  
        calcularPromedio()
           
    }

   
    return (
        <>
            <h1>Give Feedback</h1>
            
            <Button onClick={handleGoodClicks} text={'Good'}/>
            <Button onClick={handleNeutralClicks} text={'Neutral'} />
            <Button onClick={handleBadClicks} text={'Bad'} />
        
            <h1>Statistics</h1> 

            <Total good={good} total={total} bad={bad} neutral={neutral}/> 

            
            <h3>Promedio: {promedio}</h3>  
            <h3>promedio positivo: {positiveProm} %</h3>       
        </>
        )
}

export default Feedback;
