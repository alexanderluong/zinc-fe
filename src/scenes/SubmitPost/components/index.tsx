import React from "react";
import { submitPost } from "services/posts/api";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import "./submitform.css";

export interface SubmitFormProps {}

export interface SubmitFormState {
  isLoading: boolean;
  title: string;
  uri: string;
  type: string;
  submitted: boolean;
}

class SubmitForm extends React.Component<SubmitFormProps, SubmitFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      title: "",
      uri: "",
      type: "article",
      submitted: false
    };
  }

  handleTitle(e: any) {
    this.setState({ title: e.target.value });
  }

  handleURI(e: any) {
    this.setState({ uri: e.target.value });
  }

  handleType(e: any) {
    this.setState({ type: e.target.value });
  }

  async onSubmit() {
    this.setState({ isLoading: true });
    console.log(this.state);
    let res = await submitPost(
      this.state.title,
      this.state.uri,
      this.state.type
    );
    this.setState({ isLoading: false });
    let body = await res.json();
    // Handle
    if (res.ok) {
      console.log(body);
      this.setState({ submitted: true });
    } else alert("Try again");
  }

  render() {
    return (
      <div id="form-submission">
        <h3>Submit a new post.</h3>
        <form autoComplete="off">
          <div className="input-div">
            <TextField
              className="input"
              label="Title"
              value={this.state.title}
              onChange={this.handleTitle.bind(this)}
            />
          </div>
          <div className="input-div">
            <TextField
              className="input"
              label="URI"
              value={this.state.uri}
              onChange={this.handleURI.bind(this)}
            />
          </div>
          <div className="input-div">
            <InputLabel>
              <Select
                className="input"
                labelId="type"
                id="select"
                value="article"
                onChange={this.handleType.bind(this)}
              >
                <MenuItem value="blog">Blog</MenuItem>
                <MenuItem value="article">Article</MenuItem>
              </Select>
            </InputLabel>
          </div>
          <div id="button">
            <Button color="primary" onClick={this.onSubmit.bind(this)}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SubmitForm;
