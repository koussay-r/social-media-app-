import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import FriendsRequestsList from './FriendsRequestsList'
import UserInfo from './userInfo'
import Posts from './Posts'
import pfp from './../../assets/pfp1.jpg'
import { AuthenticatedContext } from '../../App'
import axios from 'axios'
export default function Mainprofile() {
  const [nightDayMode,setNightDayMode,auth, setAuth, UserData, setUserData,posts,setPosts] =React.useContext(AuthenticatedContext);
  useEffect(() => {
    const handleFetchingPostst=async()=>{
      try{
        const res=await axios.post(`http://localhost:9000/posts/`,{userId:"0"})
        console.log(res.data);
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    handleFetchingPostst();
  },[UserData])
  useEffect(()=>{
    if(nightDayMode===false){
      document.body.style.backgroundColor="#f3f3f3"
     }else{
       document.body.style.backgroundColor="#18191a"
     }
  },[nightDayMode])
  return (
    <>
    <div className='md:flex block mx-auto  gap-16 md:justify-center mt-5 mw-28'>
      <div id="userInfoComponent">
    <UserInfo/>    
      </div>
    <div  id='userInfoComponent1'  className=' w-[350px] block mx-auto md:mx-0 md:mt-0 mt-5 md:w-[40%]'>
    <CreatePost/>
    {
      posts.length!==0
      &&(posts.map(item=>{
        return(
          <Posts key={item._id} comments={item.comments} picture={item.picture} currentUser={UserData._id} UsersLikes={item.UsersLikes} userId={item.userId} pfp={pfp} likes={item.likes} _id={item._id} caption={item.caption} Location={item.Location} name={item.user}/>
        )
      }))
    }
    </div>
    <div>
      <FriendsRequestsList/>
    </div>
    </div>
    </>
  )
}