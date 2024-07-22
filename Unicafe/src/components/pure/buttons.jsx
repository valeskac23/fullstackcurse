import PropTypes from 'prop-types';


const Button = ({text, onClick}) => {
    return (
        <div>
        <button onClick={onClick}>{text}</button>                
        </div>
    );
};


Button.propTypes = {
    text : PropTypes.string,
    onClick : PropTypes.func,

};


export default Button;
