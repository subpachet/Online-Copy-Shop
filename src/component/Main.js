import React,{useState,useEffect} from "react";
import { Card, Header,Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Logo from '../Images/logo.png'
import Firebase from './Firebase';

function Main(){

  const [currentUser,setCurrentUser] = useState(null);

  useEffect(() =>{
    Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log(user);
          setCurrentUser(user)
          if(user.email==='admin@admin.com'){
            window.location.href="/admin"
          }
        } else {
          // No user is signed in.
          
        }
      });
},[currentUser])

  const Logout = () =>{
    Firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.href= "/"
    }).catch((error) => {
      // An error happened.
    });
  }
    return(
        <Container>
          <Header as='h2' icon textAlign='center'>
          <img width="1000px" src={Logo} className="centered"/>
          <Header.Content>Welcome to KU Copy Shop</Header.Content>
        </Header>
        <center>
          <Card.Group>
        <Card fluid as={Link} to="/checkorder" color='red' header='Check your order' />
        <Card fluid as={Link} to="/queue" color='orange' header='Create new order' />
        {/* <Card fluid color='yellow' header='Our services' /> */}
        {currentUser? <Card fluid  color='orange' header='Logout' onClick={Logout} />: <div></div>}

      </Card.Group>
      </center>
   </Container>
    )
}
export default Main;