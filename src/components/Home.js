import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_URI } from '../config/config';
import FormPost from './FormPost';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [firstMount, setFirstMount] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
    
  });

  const closeModule = (e) => {
    if( modalRef.current === e.target ){
      setShowModal(false);
    }
  }

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }  

  const handleSubmit = async ( values ) => {
    const { data } = await axios.post(`${API_URI}/posts`, values); 

    posts.unshift(data);    
    
    setCount(count + 1);
    toggleModal();
  }

  return (
    <main className="flex-container main">
      <div className="info-container flex-container">
        <h1>Posts</h1>
        <p>You can view all your posts here</p>
      </div>
      { showModal ? (          
        <div className="form-container" ref={ modalRef } onClick={ closeModule }>          
          <FormPost toggleModal={ toggleModal } onHandleSubmit={ handleSubmit }/>
        </div> 
        ): null      
      }
            
      <div className="card-container flex-container">
      <button className="button create" onClick={ toggleModal }>Create</button>
      { posts.map((post) => {
          return (
            <div className="card flex-container" key={post.id}>
              <h3>{ post.title }</h3>
              <span>
                <button className="button details">Details</button>
                <button className="button edit">Edit</button>
                <button className="button delete">Delete</button>
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