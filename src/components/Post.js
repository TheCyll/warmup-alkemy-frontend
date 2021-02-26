import React from 'react';

export const Post = ({ post, toggleDetails }) => {  

  return (
    <div className="modal post flex-container">
      <div className="close-modal" onClick={ toggleDetails }>X</div> 
      <h3>Details</h3>
      <span className="ids">
        <i>ID: {post.id}</i>
        <i>User ID: {post.userId}</i>
      </span>
      <div className="content-container flex-container">
        <h5>{post.title}</h5>
        <p>{post.body}</p>
      </div>
      <button className="button accept" onClick={ toggleDetails }>OK</button>  
    </div>
  )
}
