import React from 'react';

export const DeleteAlert = ({ post, toggleDelete, handleDelete }) => {  
 
  return (
    <div className="modal delete-alert flex-container">
      <div className="close-modal" onClick={ toggleDelete }>X</div> 
      <h3>Alert</h3>      
      <div className="content-container flex-container">
        <h5>Do you want delete this post?</h5>        
      </div>
      <button className="button delete" onClick={ () => handleDelete(post) }>Delete</button>  
    </div>
  )
}
