import React, { useState} from "react";
import Popup from "reactjs-popup";
import "./index.css";
import { Delete,Field,Label,Button,Control,FontAwesomeIcon } from "rbx";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


  class Newaddevents extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        event: '',
        starttime: '2019-10-26T10:30',
        endtime: '2019-10-26T11:30',
        description: 'aa',
    };
    this.handleEvent=this.handleEvent.bind(this);
    this.handleStarttime=this.handleStarttime.bind(this);
    this.handleEndtime=this.handleEndtime.bind(this);
    this.handleDescription=this.handleDescription.bind(this);
    this.upload=this.upload.bind(this);
    }
    handleEvent(eventa) {
        this.setState({
            event:eventa.target.value
        })
    }
    handleStarttime(eventa) {
        this.setState({
            starttime:eventa.target.value
        })
    }
    handleEndtime(eventa) {
        this.setState({
            endtime:eventa.target.value
        })
    }
    handleDescription(eventa) {
        this.setState({
            description:eventa.target.value
        })
    }
    
    upload(){

    }


    render(){
        console.log(this.state.description);
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

    <TextField
        id="event-title"
        width=" 250" 
        onChange={this.handleEvent}
        margin="normal"
        placeholder="Add event"

      />    
      </Control>
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
          
        <TextField
        id="datetime-local"
        type="datetime-local"
        value={this.state.starttime}
        onChange={this.handleStarttime}
        
        width=" 250"       
         InputLabelProps={{
        shrink: true,
        }}
      />

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
        <TextField
        id="datetime-local"
        type="datetime-local"
        // defaultValue="2019-10-24T10:30"
        value={this.state.endtime}
        onChange={this.handleEndtime}
        
        width=" 250"  
        InputLabelProps={{
          shrink: true,
        }}
        />
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
      <TextField
        id="event-title"
        width=" 250" 
        onChange={this.handleDescription}
        margin="normal"
        placeholder="Description"
      />    
      </Control>
    </Field>
  </Field.Body>
</Field>

<Field kind="addons" align="right">
<Control>
<Button color="info" onClick={this.upload}>Save</Button>
</Control>
</Field>

</form>)}
</Popup>
    )
    }
}

export default Newaddevents;