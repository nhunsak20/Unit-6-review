import React from "react";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postInput: props.text
    };
  }

  handleCancel = () => {
    this.setState({
      postInput: this.props.text
    })
    this.props.toggleEdit()
  };  

  handleChange = event => {
    console.log('hit')
    this.setState({
      postInput: event.target.value
    })
  };

  render() {
    const { id, editFn, toggleEdit } = this.props
    return (
      <li className="post-container">
        <div>
          <input
            className="post-text"
            value={ this.state.postInput }
            onChange={ this.handleChange }
          />
        </div>
        <div className="post-buttons">
            <button
              className="input-container-button-small"
              onClick={() => this.handleCancel() }
            >
              Cancel
            </button>
            <button
              className="input-container-button-small"
              onClick={() => {
                editFn(id, this.state.postInput)
                toggleEdit()
              }}
            >
              Save
            </button>
        </div>
      </li>
    );
  }
}

export default Edit;
