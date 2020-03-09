import React, { useState } from "react";
import { submitPost } from "services/posts/api";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import "./submitform.css";
import { Redirect } from "react-router-dom";

export interface SubmitFormProps {
  loggedIn: boolean;
}

const SubmitForm: React.FC<SubmitFormProps> = ({ loggedIn }) => {
  const [state, setState] = useState({
    isLoading: false,
    title: "",
    uri: "",
    type: "article",
    submitted: false
  });

  async function onSubmit() {
    setState(Object.assign({}, state, { isLoading: true }));
    let res = await submitPost(state.title, state.uri, state.type);
    setState(Object.assign({}, state, { isLoading: false }));
    let body = await res.json();
    // Handle
    if (res.ok) {
      setState(Object.assign({}, state, { submitted: true }));
      alert("Post successfully submitted!");
      setState(
        Object.assign({}, state, { isLoading: false, title: "", uri: "" })
      );
    } else alert("Try again");
  }

  if (loggedIn === false) return <Redirect to="/" />;
  else {
    return (
      <div id="form-submission">
        <h3 className="section-heading">Submit a new post.</h3>
        <form autoComplete="off">
          <div className="input-div">
            <TextField
              className="input"
              label="Title"
              value={state.title}
              onChange={e =>
                setState(Object.assign({}, state, { title: e.target.value }))
              }
            />
          </div>
          <div className="input-div">
            <TextField
              className="input"
              label="URI"
              value={state.uri}
              onChange={e =>
                setState(Object.assign({}, state, { uri: e.target.value }))
              }
            />
          </div>
          <div className="input-div">
            <InputLabel>
              <Select
                className="input"
                labelId="type"
                id="select"
                value={state.type}
                onChange={e =>
                  setState(Object.assign({}, state, { type: e.target.value }))
                }
              >
                <MenuItem value="blog">Blog</MenuItem>
                <MenuItem value="article">Article</MenuItem>
              </Select>
            </InputLabel>
          </div>
          <div id="button">
            <Button color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
};

export default SubmitForm;
