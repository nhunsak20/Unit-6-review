import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from 'axios'
import PostDisplay from "./PostDisplay";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      userInput: ""
    };
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
      axios.get(`/api/posts/${this.props.user.id}`).then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data
        })
      }).catch(err => {
        console.log(err)
      })
  };

  handleChange = e => {
    this.setState({
      userInput: e.target.value
    })
  };

  sumbitNewPost = () => {
    axios.post(`/api/posts/${this.props.user.id}`, {post: this.state.userInput}).then(() => {
      this.getPosts()
    }).catch(err => {
      console.log(err)
    })
    this.resetInput()
  };

  handleEdit = (post_id, text) => {
    axios.put(`/api/posts/${post_id}`, { text }).then(() => {
      this.getPosts()
    }).catch(err => {
      console.log(err)
    })
  };

  handleDelete = post_id => {
    axios.delete(`/api/posts/${post_id}`).then(()=> {
      this.getPosts()
    }).catch(err => {
      console.log(err)
    })
  };

  resetInput() {
    this.setState({
      userInput: ''
    })
  }

  render() {
    console.log(this.props.user)
    const mappedPosts = this.state.posts.map((post, index) => {
      return (
        <PostDisplay
          key={index}
          editFn={this.handleEdit}
          removeFn={this.handleDelete}
          post={post}
        />
      );
    });
    return (
      <>
        <div className="input-container">
          <textarea
            id="new-post"
            cols="60"
            rows="2"
            placeholder="New post..."
            value={ this.state.userInput }
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <button onClick={ this.sumbitNewPost } className="input-container-button">
            Post
          </button>
        </div>

        <section className="app-body">
          <div className="padding"/>
          <ul className="flex-vertical-center post-feed">{mappedPosts}</ul>
        </section>
      </>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return {
    user
  }
}

export default connect(mapStateToProps)(Dashboard);
