//import PropTypes from 'prop-types';
import Note from "../pure/note";
import {useState, useEffect  } from "react";

//import axios from 'axios';

import noteService from "../../services/note"


const NotesCont = () => {

    const [notas, setNotas] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);


     
    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotas(initialNotes)
        })
    }, [])

      /**if(showAll){
        console.log(notas);
      }else{
        console.log(notas.filter(N=>N.important === true));
      }*/

    
    const notesToShow = showAll ? notas: notas.filter(N => N.important);

    const addNote = (e) => {   
         e.preventDefault()   
         const noteObject = {
            content: newNote,
            important: Math.random() < 0.5, 
            
          }
        /**
         * Crea una nueva nota en el servidor
         * con el metodo post llama al servidor con la url
         * enviando un objeto
         
          axios    
          .post('http://localhost:3001/notes', noteObject)    
          .then(response => {     
            setNotas(notas.concat(response.data))
            setNewNote('')
          })*/

        noteService
          .create(noteObject)
          .then(returnedNote => {
            setNotas(notas.concat(returnedNote))
            setNewNote('')
          })
        
    }

    const handleNoteChange = (e) => {       
        setNewNote(e.target.value)  
    }  
    
    const toggleImportanceOf = (id) => {   
      console.log(`importance of ${id} needs to be toggled`);

      //const url = `http://localhost:3001/notes/${id}` se llama a la url de cada nota individual
      
      const note = notas.find(n => n.id === id) //se busca la nota por el id
      
      const changedNote = { ...note, important: !note.important };

      /**Después de esto creamos un nuevo objeto que es una copia exacta de la nota anterior, 
      excepto por la propiedad important que tiene su valor cambiado (de true a false o de false a true)
      
      axios.put(url, changedNote).then(response => { Luego, la nueva nota se envía con una solicitud PUT al backend donde reemplazará el objeto anterior.
        setNotas(notas.map(note => note.id !== id ? note : response.data))})*/

        noteService
        .update(id, changedNote)
        .then(returnedNote => {setNotas(notas.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => { 
          console.error('error en la nota', error)
            alert( `the note '${note.content}' was already deleted from server`)
          setNotas(notas.filter(n => n.id !== id))
        })
      }
    return (
        <div>
            <h1>Notes</h1>
            {notas.map(nota =>
            <Note 
                key={nota.id}
                content={nota.content}
                important={nota.important}
                toggleImportance={() => toggleImportanceOf(nota.id)}
                />
                
            )} 

            <form onSubmit={addNote}>        
                <input  value={newNote} onChange={handleNoteChange}/>        
                <button type="submit">save</button> 
            </form> 

           <h2>Notas Filtradas</h2>

           <div>        
                <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }</button>
           </div>


           

            {notesToShow.map(N => 
            <Note 
                key={N.id} 
                content={N.content}
                important={false}
                toggleImportance={() => toggleImportanceOf(N.id)}
                />
            )}        
        </div>
    );
};


NotesCont.propTypes = {

};


export default NotesCont;
