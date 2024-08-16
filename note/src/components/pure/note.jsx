//import React from 'react';
import PropTypes from 'prop-types';


const Note = ({content, important, toggleImportance}) => {
    const label = important ? 'make not important' : 'make important';

    return (
        <div>
            <ul>
             <li>{content}</li> 
             <button onClick={toggleImportance}>{label}</button>
            </ul> 
            
        </div>
    );
};


Note.propTypes = {
    content : PropTypes.string,
    important : PropTypes.bool,
    toggleImportance : PropTypes.func,

};


export default Note;
