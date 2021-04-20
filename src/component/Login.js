import React,{ useState } from 'react';
import { Button, Icon,Form,Message,Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Firebase from './Firebase';
import firebase from "firebase/app";
import axios from 'axios';

function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const EmailLogin = (e)=>{
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            if(user.email==='admin@admin.com'){
                window.location.href="/admin"
              }
            else{
                window.location.href= "/"
            }
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    const GoogleLogin = (e) => {
        e.preventDefault();
        //...
        //sign in function
        var provider = new firebase.auth.GoogleAuthProvider();
        Firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            axios.post('https://oneline-copy-shop.herokuapp.com/user/create',{   id: user.uid,
                email :user.email,
                phone: "",
                userName:"",
                password:"",
                firstName:user.displayName.substr(0,user.displayName.indexOf(' ')),
                lastName:user.displayName.substr(user.displayName.indexOf(' ')+1)},{headers: {
                    'Access-Control-Allow-Origin': '*'
                  }})
                .then(response => {
                    console.log(response.data)
                    const {data} = response;
                    console.log(data);
                    if(data.status.code == 1000){
                        window.location.href = "/"
                    }
                    else{
                        alert(data.status.message);
                        user.delete().then(function() {
                            // User deleted.

                        }).catch(function(error) {
                            // An error happened.
                        })
                    }
                })

            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error)
            // ...
        });
    }


    return(
        <center>
            <Message warning>
                <Container>
                <Message.Header>You must sign in before you can do that!</Message.Header>
                <p>Create an account or sign in to use our service.</p>
                </Container>
            </Message>
            <div id="my-container" className="ui grid middle aligned">
                <div className="row">
                    <div className="column">
                    <div className="ui text container segment">
                        <Form onSubmit={EmailLogin}>
                            <Form.Field >
                                <input placeholder='Email' 
                                        type="email" 
                                        size='big' 
                                        onChange={(e)=>{setEmail(e.target.value)}} 
                                        value={email} 
                                        required
                                />
                            </Form.Field>
                            <Form.Field>
                                <input placeholder='Password' 
                                        type="password" 
                                        size='big' 
                                        onChange={(e)=>{setPassword(e.target.value)}} 
                                        value={password} 
                                        required
                                />
                            </Form.Field>
                            <Button color='blue' animated  fluid size='big'>
                                <Button.Content visible>Login</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='sign in' />
                                </Button.Content>
                            </Button>
                        </Form>
                        <hr/>
                        <p> or </p>
                        <hr/>
                        <Form onSubmit={GoogleLogin}>
                            <Button fluid size='big'  color='google plus' >
                                <Icon name='google plus' /> Sign in with Google
                            </Button>
                        </Form>
                        <br/>
                        
                        <hr/>
                        <p>New to our service? <Link to="/createaccount">Create New Account</Link> </p>
                    </div>
                
                </div>
            </div>
         </div>
     </center>
    )
}
export default Login;