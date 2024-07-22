//import PropTypes from 'prop-types';
import { useState } from 'react'
import Button from '../pure/button';


const Anedote = () => {

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0);
    const [voteCounter, setVoteCounter] = useState(new Uint8Array(8));
    const [maxVoteCount, setmaxVoteCount] = useState(0);
    const [maxVote, setMaxVote] = useState(0); 

    const [votecount, setVoteCount] = useState(0);
  


        function getRandom(min,max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);    
        }
        
        
        const randomClicks=()=>{
          const numRamdo = getRandom(0, anecdotes.length); 
           
          setSelected(numRamdo);  
        }

        const voteClicks = ()=>{

          const tempArray = [...voteCounter]; //crea un array temporal
          tempArray[selected] +=1;  
          
          const sumaVoto = Math.max(...tempArray); //alcula el numero maximo

          setVoteCounter(tempArray);
          setVoteCount(tempArray[selected]);
          setMaxVote(tempArray.indexOf(sumaVoto));
          setmaxVoteCount(sumaVoto);
          }

        /*
        const voteCopy =[...votecount];
        voteCopy[selected] += 1;

        const voteMax = Math.max(...voteCopy);

        setVoteCounter(voteCopy);
        setVoteCount(voteCopy[selected]);
        setMaxVote(voteCopy.indexOf(voteMax));
        setmaxVoteCount(voteMax);

        */

        
        
          return (
            <>
              {anecdotes[selected]}
            

              <p> has {votecount} votes</p>              
        
              <Button onClick={randomClicks}/>
              <button onClick={voteClicks}>Vote</button>

              <p>anecdotes with most vote</p>
              {anecdotes[maxVote]}
              <p>has {maxVoteCount} votes</p>
        
              
            </>
          )
};


Anedote.propTypes = {

};


export default Anedote;
