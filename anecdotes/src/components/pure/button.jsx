
import PropTypes from 'prop-types';


const Button = ({onClick}) => {
    return (
        <div>
            <button onClick={onClick}>Next Anecdote</button>
        </div>
    );
};


Button.propTypes = {
    onClick: PropTypes.func,

};


export default Button;
