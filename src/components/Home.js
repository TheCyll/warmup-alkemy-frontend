import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URI } from '../config/config';
import FormPost from './FormPost';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [firstMount, setFirstMount] = useState(true);


  useEffect(() => {

    const getPosts = async () => {
      try { 
        const { data } = await axios.get(`${API_URI}/posts`);
        console.log(data);        
        setPosts(data);
      } catch(err) {        
        if(err) {
          throw new Error(err.message);
        }
      }  
    }

    if( firstMount ){
      getPosts();   
      setFirstMount(false);
    }    
  });

  return (
    <main className="flex-container main">
      <div className="info-container flex-container">
        <h1>Posts</h1>
        <p>You can view all your posts here</p>
      </div>
      <div className="form-container">
        <FormPost />        
      </div>
      <div className="card-container flex-container">
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