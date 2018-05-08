import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginResident} from '../../../../../redux/ducks/userReducer';
import axios from 'axios';

class CreateWorkorder extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
      urgency: '',
    };
  }

  handleContent = e => {
    this.setState({
      content: e.target.value,
    });
  };

  handleUrgency = e => {
    this.setState({
      urgency: e.target.value,
    });
  };

  submit = () => {
    axios
      .post('/workorder/addWorkorder', {
        content: this.state.content,
        urgency: this.state.urgency,
      })
      .then();
  };

  render() {
    return (
      <div>
        <h1>Submit a Maintenance Request</h1>
        <form onSubmit={() => this.submit()}>
          <div className="radio">
            <label>Priority</label>
            <br />
            <div onChange={e => this.handleUrgency(e)} value={this.state.urgency}>
              <input type="radio" value="Low Priority" name="Priority" required /> Low Priority
              <input type="radio" value="Routine" name="Priority" /> Routine
              <input type="radio" value="Urgent" name="Priority" /> Urgent
            </div>
            <br />
            <div>
              <label> Content </label>
              <br />
              <textarea
                name="content"
                onChange={e => this.handleContent(e)}
                value={this.state.content}
                id="exampleFormControlTextarea1"
                rows="12"
                type="message"
                required
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateWorkorder;
