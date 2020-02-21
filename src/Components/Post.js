import React from "react";

const Post = props => {
  console.log(props)
  console.log(props.text)
  return (
    <li className="post-container">
      <div>
        <p className="post-text">
          { props.text }
        </p>
      </div>
      <div className="post-buttons">
        <button
          className="input-container-button-small"
          onClick={ props.toggleEdit }
        >
          Edit
        </button>
        <button
          className="input-container-button-small"
          onClick={() => props.removeFn(props.id) }
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Post;
