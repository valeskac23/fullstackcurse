import PropTypes from 'prop-types';


const Statistics = ({text,counter}) => {
    
    return (
        <div>
            <h3>{text}: {counter}</h3>            
        </div>
    );
};


Statistics.propTypes = {
    text : PropTypes.string,
    counter : PropTypes.number,

};


export default Statistics;
