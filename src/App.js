import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import New from './pages/new/New';
import Edit from './pages/edit/Edit';
import Show from './pages/show/Show';
import Profile from './pages/profile/Profile';
import blogsFromFile from './data/data';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import "./App.css";

function App() {
  const [blogs,setBlogs] = useState([])
  const [isHomePage, setIsHomePage] = useState(true)
  function showHeaderImg(){
    setIsHomePage(true)
  }
  function removeHeaderImg(){
    setIsHomePage(false)
  }
  function addNewBlog(newBlog){
    const date = new Date()
    setBlogs(prevBlogs => {
      return [...prevBlogs, {...newBlog, id:Math.floor(Math.random()*100), date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`} ]
    })
  }
  function removeBlog(blogId){
    setBlogs( prevBlogs => {
      return prevBlogs.filter(prevBlog => prevBlog.id !== blogId)
    })
  }
  function editBlog(editedBlog) {
    const date = new Date();
    setBlogs((prevBlogs) => {
      return prevBlogs.map((prevBlog) => {
        if (prevBlog.id === editedBlog.id) {
          prevBlog = {
            ...prevBlog,
            ...editedBlog,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          };
        }
        return prevBlog;
      });
    });
  }
  useEffect(()=>{
    //fetch blogs from the server
    setBlogs(blogsFromFile);
    console.log(blogs);
  },[])
  return (
    <>
      <Header isHomePage={isHomePage}/>
      <Routes>
        <Route path="/" element={<Home blogs={blogs} showHeaderImg={showHeaderImg}/>}></Route>
        <Route path="/new" element={<New addNewBlog={addNewBlog} removeHeaderImg={removeHeaderImg}/>}></Route>
        <Route path="/edit/:id" element={<Edit blogs={blogs} editBlog={editBlog} removeHeaderImg={removeHeaderImg}/>}></Route>
        <Route path="/show/:id" element={<Show blogs={blogs} removeHeaderImg={removeHeaderImg} removeBlog={removeBlog}/>}></Route>
        <Route path="/profile/:id" element={<Profile removeHeaderImg={removeHeaderImg} blogs={blogs}/>}></Route>
        <Route path='/login' element={<Login removeHeaderImg={removeHeaderImg}/>}></Route>
        <Route path='/signup' element={<SignUp removeHeaderImg={removeHeaderImg}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
