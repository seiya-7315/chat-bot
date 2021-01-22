import React from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => (
    createStyles({
        "button": {
            borderColor: 'coral',
            backgroundColor: "#fff",
            color: 'coral',
            fontWight: 600,
            marginBottom: "8px",
            "&:hover": {
                backgroundColor: "coral",
                color: "#fff"
            }
        }
    })
));

const Answer = (props) => {

    const classes = useStyles();

    return(
        <Button variant="outlined" 
                className={classes.button}
                onClick={() => props.select(props.content, props.nextId)}
        >
            {props.content}
        </Button>
    )
}

export default Answer;