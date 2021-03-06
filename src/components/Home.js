import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_URI } from '../config/config';
import FormPost from './FormPost';
import { Post } from './Post';
import { DeleteAlert } from './utilities/DeleteAlert';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [firstMount, setFirstMount] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [onePost, setOnePost] = useState({});

  const modalRef = useRef();  

  useEffect(() => {

    const getPosts = async () => {
      try { 
        const { data } = await axios.get(`${API_URI}/posts`);                           
        setPosts(data.reverse());
      } catch(err) {        
        if(err) {
          throw new Error(err.message);
        }
      }  
    }

    if( firstMount ){
      setFirstMount(false);
      getPosts();   
    } 

  }, [count]);

  const closeModule = (e) => {
    if( modalRef.current === e.target ){
      setShowModal(false);
      setShowDetails(false);
      setShowEdit(false);
      setShowDelete(false);
    }
  }

  const toggleForm = () => {    
    setShowModal(prev => !prev);    
  }  

  const toggleDetails = (post) => { 
    setOnePost(post);   
    setShowDetails(prev => !prev);
  }

  const toggleEdit = (post) => {
    setOnePost(post); 
    setShowEdit(prev => !prev);
  }
  const toggleDelete = (post) => {
    setOnePost(post); 
    setShowDelete(prev => !prev);
  }

  const handleSubmit = async ( values ) => {
    try {
      const { data } = await axios.post(`${API_URI}/posts`, values); 
      posts.unshift(data);    
      
      setCount(count + 1);
      toggleForm();
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleSubmitEdit = async ( values ) => {
    
    if ( values.id > 100) {      
      const editedPosts = posts.map((item) => { return item.id === values.id ? values : item; })
      setPosts(editedPosts); 
      
      setCount(count + 1);
      toggleEdit();
      return;    
    }   
    try {
      const { data } = await axios.put(`${API_URI}/posts/${values.id}`, values);          

      const editedPosts = posts.map((item) => { return item.id === values.id ? data : item; });
      setPosts(editedPosts); 
      
      setCount(count + 1);
      toggleEdit();
    } catch (error) {
      throw new Error(error);
    }
  }

  const handleDelete = async ( post ) => {
    try {  
      await axios.delete(`${API_URI}/posts/${post.id}`);

      const index = posts.indexOf(post);      
      if (index > -1) {        
        posts.splice(index, 1);
      }

      setCount(count + 1);
      toggleDelete();
      
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <main className="flex-container main">
      <div className="info-container flex-container">
        <h1>Posts</h1>
        <p>You can view all your posts here</p>
      </div>
      { showModal ? (          
        <div className="modal-container" ref={ modalRef } onClick={ closeModule }>          
          <FormPost toggleForm={ toggleForm } onHandleSubmit={ handleSubmit }/>
        </div> 
        ): null      
      } 
      { showDetails && (
          <div className="modal-container" ref={ modalRef } onClick={ closeModule }>
            <Post post={ onePost } toggleDetails={ toggleDetails }/>
          </div>
        )
      }      
      {
        showEdit && (
          <div className="modal-container" ref={ modalRef } onClick={ closeModule }>          
            <FormPost initValuesPost={ onePost } toggleForm={ toggleEdit } onHandleSubmit={ handleSubmitEdit }/>
          </div> 
        )
      }
      {
        showDelete && (
          <div className="modal-container" ref={ modalRef } onClick={ closeModule }> 
            <DeleteAlert post={ onePost } toggleDelete={ toggleDelete } handleDelete={ handleDelete } />         
          </div> 
        )
      }         
            
      <div className="card-container flex-container">
      <button className="button create" onClick={ toggleForm }>Create</button>
      { posts.map((post) => {
          return (            
            <div className="card flex-container main" key={ post.id }>              
              <h3>{ post.title }</h3>
              <span>
                <button className="button details" onClick={ () => toggleDetails(post) }>Details</button>
                <button className="button edit" onClick={ () => toggleEdit(post) }>Edit</button>
                <button className="button delete" onClick={ () => toggleDelete(post) }>Delete</button>
              </span>              
            </div>          
          )          
        })
      }
      </div>

    </main>
  )
}

export default Home;