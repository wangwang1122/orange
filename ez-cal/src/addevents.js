import React, { useState} from "react";
import Popup from "reactjs-popup";
import "./index.css";
import {Card,Content, Message,Select, Delete,Field,Label,Input,Icon,Button,Control,FontAwesomeIcon } from "rbx";
<<<<<<< Updated upstream

const Addevents=() =>{

=======
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250,
    },
    inputtextField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250,
      height: 20,
    },
  }));
  

const Addevents=() =>{

    const classes = useStyles();

    const [values, setValues] = React.useState({
        event: '',
        starttime: '2019-10-26T10:30',
        endtime: '2019-10-26T11:30',
        description: '',
      });

console.log(values);
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
    
>>>>>>> Stashed changes
    return (
        <Popup trigger={open => (<Button >{open ? "" : ""}</Button>)} modal>
                  {close => (
<form>
<Field kind="addons" align="right">
<Control>
<Delete as="button" onClick={close} />
</Control>
</Field>
<Field horizontal>
<Field.Label size="normal">
      <Label></Label>
</Field.Label>
<Field.Body>
      <Field>
    <Control>
<<<<<<< Updated upstream
      <Input size="normal" type="text" placeholder="Add title" />
    </Control>
=======

    <TextField
        id="event-title"
        className={classes.inputtextField}
        onChange={handleChange('event')}
        margin="normal"
        placeholder="Add event"

      />    
      </Control>
>>>>>>> Stashed changes
    </Field>
    </Field.Body>
</Field>


<Field horizontal>
    <Field.Label size="normal">
      <Label>Start Time</Label>
    </Field.Label>
    <Field.Body>
      <Field>
        <Control expanded>
<<<<<<< Updated upstream
          <Select.Container fullwidth>
            <Select>
              <Select.Option >time1</Select.Option>
              <Select.Option >time2</Select.Option>
              <Select.Option >time3</Select.Option>
            </Select>
          </Select.Container>
=======
          
        <TextField
        id="datetime-local"
        type="datetime-local"
        value={values.starttime}
        onChange={handleChange('starttime')}

        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

>>>>>>> Stashed changes
        </Control>
      </Field>
    </Field.Body>
  </Field>

<Field horizontal>
    <Field.Label size="normal">
      <Label>End Time</Label>
    </Field.Label>
    <Field.Body>
      <Field>
        <Control expanded>
<<<<<<< Updated upstream
          <Select.Container fullwidth>
            <Select>
              <Select.Option >time1</Select.Option>
              <Select.Option >time2</Select.Option>
              <Select.Option >time3</Select.Option>
            </Select>
          </Select.Container>
=======
        <TextField
        id="datetime-local"
        type="datetime-local"
        // defaultValue="2019-10-24T10:30"
        
        value={values.endtime}
        
        onChange={handleChange('endtime')}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        />
>>>>>>> Stashed changes
        </Control>
      </Field>
    </Field.Body>
  </Field>

<Field horizontal>
  <Field.Label size="normal">
    <Label>Description</Label>
  </Field.Label>
  <Field.Body>
    <Field>
      <Control>
<<<<<<< Updated upstream
        <Input type="text" placeholder="Normal sized input" />
=======
      <TextField
        id="event-title"
        className={classes.inputtextField}
        onChange={handleChange('description')}
        // margin="normal"
        placeholder="Description"

      />    
>>>>>>> Stashed changes
      </Control>
    </Field>
  </Field.Body>
</Field>

<Field kind="addons" align="right">
<Control>
<Button color="info" onClick={close}>Save</Button>
</Control>
</Field>

</form>)}
</Popup>
    )

};



export default Addevents;