import React from "react";
import Post from "./Post";
import Edit from "./Edit";

class PostDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  };

  render() {
    const { post_id, text } = this.props.post
    const { editFn, removeFn } = this.props
    return (
      <>
        {this.state.isEditing ? (
          <Edit
           //something goes here
            id={ post_id }
            text={ text }
            toggleEdit={ this.toggleEdit }
            editFn={ editFn }
          />
        ) : (
          <Post
          //something goes here
            id={ post_id }
            text={ text }
            toggleEdit={ this.toggleEdit }
            removeFn={ removeFn }
          />
        )}
      </>
    );
  }
}

export default PostDisplay;
