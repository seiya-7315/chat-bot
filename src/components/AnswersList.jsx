import React from 'react';
import {Answer} from './index.js';

const AnswersList = (props) => {

    return(
        <div className="answer">
            {props.answers.map( (value, index) => {
                return <Answer 
                            content={value.content} key={index.toString()} 
                            select={props.select} nextId={value.nextId}
                        />
            })}
        </div>
    )
}

export default AnswersList;