import React,{ useEffect, useState } from 'react';
import { Icon,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Firebase from './Firebase';
import axios from 'axios';

function QueueRemaining(props){
    const [currentUser,setCurrentUser] = useState(null);
    const [queue,setQueue] = useState(0);

    useEffect((props) =>{
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              console.log(user);
              setCurrentUser(user)
            } else {
              // No user is signed in.
              window.location.href ="/login"
            }
          });

          axios.get("https://oneline-copy-shop.herokuapp.com/queue",{headers: {
            'Access-Control-Allow-Origin': '*'}
          },)
          .then(response =>{
            console.log(response.data)
            const {data} = response;
            console.log(data);
            if(data.status.code == 1000){
                setQueue(data.data.totalRemaining)
            }
          })
    })

    if(currentUser){
        return (
            <center>
               <div id="my-container" className="ui grid middle aligned">
                <div className="row">
                    <div className="column">
                    <div className="ui text container segment">
                       <h3>There are</h3>
                       <h1 style={{color: "red"}}>{queue}</h1>
                       <h3>queues remaining</h3>
                    </div>
                    <Button basic color='green' animated as={Link} to="/createorder">
                        <Button.Content visible>Proceed to create your order</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    </div>
                </div>
                </div>
            </center>
         
        )
    }
    return(
        <div></div>
    )
}
export default QueueRemaining;