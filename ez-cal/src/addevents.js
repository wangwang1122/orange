import React, { useState} from "react";
import Popup from "reactjs-popup";
import "./index.css";
import {Card,Content, Message,Select, Delete,Field,Label,Input,Icon,Button,Control,FontAwesomeIcon } from "rbx";

const Addevents=() =>{

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
      <Input size="normal" type="text" placeholder="Add title" />
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
          <Select.Container fullwidth>
            <Select>
              <Select.Option >time1</Select.Option>
              <Select.Option >time2</Select.Option>
              <Select.Option >time3</Select.Option>
            </Select>
          </Select.Container>
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
          <Select.Container fullwidth>
            <Select>
              <Select.Option >time1</Select.Option>
              <Select.Option >time2</Select.Option>
              <Select.Option >time3</Select.Option>
            </Select>
          </Select.Container>
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
        <Input type="text" placeholder="Normal sized input" />
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