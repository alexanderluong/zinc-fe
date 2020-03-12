import React, { useState } from "react";
import { submitPost } from "services/posts/api";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid
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
    submitted: false,
    error: {
      title_error: false,
      uri_error: false,
      title: "",
      uri: ""
    }
  });

  function uriIsValid(uri: string) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(uri);
  }

  async function onSubmit() {
    let error = {
      title_error: false,
      uri_error: false,
      title: "",
      uri: ""
    };

    if (state.uri === "") {
      error.uri_error = true;
      error.uri = "Please enter a valid link.";
    } else if (!uriIsValid(state.uri)) {
      error.uri_error = true;
      error.uri =
        "Link must be formatted with URI encoding. (ie. starts with https:// or http://)";
    }

    if (state.title === "") {
      error.title_error = true;
      error.title = "Please enter a title for the article.";
    }

    if (error.title_error || error.uri_error) {
      setState(
        Object.assign({}, state, {
          error: error
        })
      );
      return;
    }

    setState(Object.assign({}, state, { isLoading: true }));
    let res = await submitPost(state.title, state.uri, state.type);
    setState(Object.assign({}, state, { isLoading: false }));
    // Handle
    if (res.ok) {
      setState(Object.assign({}, state, { submitted: true }));
      alert("Post successfully submitted!");
    } else {
      let body = await res.json();
      console.log(body);
      if (body.type === "OperationalError") {
        error.title_error = true;
        error.title =
          'Article "' + state.title + '" has already been submitted.';
      } else if (body.type === "SchemaValidationError") {
        for (let req_error of body.meta.errors) {
          if (req_error.keyword === "format") {
            error.uri_error = true;
            error.title_error = true;
            error.title = "Please check the formatting of your submission.";
          }
        }
      }
    }
    setState(Object.assign({}, state, { error: error }));
  }

  if (loggedIn === false) return <Redirect to="/" />;
  else {
    return (
      <div id="form-submission">
        <h3 className="section-heading">Submit a new post.</h3>
        <form autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.title_error}
                  helperText={state.error.title}
                  className="input"
                  label="Title"
                  value={state.title}
                  onChange={e =>
                    setState(
                      Object.assign({}, state, { title: e.target.value })
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.uri_error}
                  helperText={state.error.uri}
                  className="input"
                  label="Link"
                  value={state.uri}
                  onChange={e =>
                    setState(Object.assign({}, state, { uri: e.target.value }))
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div className="input-div">
                <InputLabel>
                  <Select
                    className="input"
                    labelId="type"
                    id="select"
                    value={state.type}
                    onChange={e =>
                      setState(
                        Object.assign({}, state, { type: e.target.value })
                      )
                    }
                  >
                    <MenuItem value="blog">Blog</MenuItem>
                    <MenuItem value="article">Article</MenuItem>
                  </Select>
                </InputLabel>
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div id="button">
                <Button color="primary" variant="contained" onClick={onSubmit}>
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
};

export default SubmitForm;
