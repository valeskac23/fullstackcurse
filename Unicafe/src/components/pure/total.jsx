
import PropTypes from 'prop-types';
import Statistics from './statistics';


const Total = ({total, good, neutral,bad}) => {

    if(total === 0){
        return(
            <>
            <h2>No Feedback Given</h2>                
            </>
        )
    }else{
        return (
           <div>
             <table>
             <thead>
                <tr>
                    <th>coment</th>
                    <th>value</th>
                </tr>
             </thead>
                <tbody>
                    <tr>
                        <td>
                        <Statistics text={"Good"} counter={good}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Statistics text={"Neutral"} counter={neutral}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Statistics text={"Bad"} counter={bad}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Statistics text={"total"} counter={total}/>
                        </td>                      
                    </tr>
                </tbody>               
            </table>
           </div>
        );
    }
    
};


Total.propTypes = {
    total : PropTypes.number,
    good : PropTypes.number,
    bad : PropTypes.number,
    neutral : PropTypes.number,
    

};


export default Total;
