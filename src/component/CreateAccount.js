import React,{ useState } from 'react';
import { Button,Form,Input } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Firebase from './Firebase';
import axios from 'axios';

function CreateAccount(){

    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [username,setUserName] = useState('');
    const [pw,setPassword] = useState('');
    const [repw,setRetypePassword] = useState('');
    const [phone,setPhone] = useState('');  

    const onSubmit = (e) =>{
        e.preventDefault();
        if(pw !== repw){
            alert("Your password doesn't match!")
        }
        else{
            Firebase.auth().createUserWithEmailAndPassword(email, pw)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user.uid);
                axios.post('https://oneline-copy-shop.herokuapp.com/user/create',{   id: user.uid,
                email :email,
                phone:phone,
                userName:username,
                password:pw,
                firstName:firstname,
                lastName:lastname
            },{
                headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }).then(response =>{
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
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
        }

    }

    return(
        
        <div id="my-container" className="ui grid middle aligned">
                <div className="row">
                    <div className="column">
                    <div className="ui text container segment">
                        <h1>Register your account</h1>
                    <Form onSubmit={onSubmit}>
                            
                            <Form.Group widths="equal">
                                <Form.Field label='Firstname:' value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} control='input' placeholder='Firstname' type='text' maxLength="200" required/>
                                <Form.Field label='Lastname:' value={lastname} onChange={(e)=>{setLastName(e.target.value)}} control='input' placeholder='Lastname' type='text'maxLength="200" required/>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field label='Email:' value={email} onChange={(e)=>{setEmail(e.target.value)}} control='input' placeholder='example@email.com' type="email" maxLength="100" required/>
                                <Form.Field label='Username:' value={username} onChange={(e)=>{setUserName(e.target.value)}} control='input' placeholder='Enter username' type="text" maxLength="100" required/>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field label='Password:' value={pw} onChange={(e)=>{setPassword(e.target.value)}} control='input' placeholder='Maximum of 12 characters' type="password" maxLength="12" required/>
                                <Form.Field label='Re-type your password:' value={repw} onChange={(e)=>{setRetypePassword(e.target.value)}} control='input' placeholder='Re-type password' type="password" maxLength="12" required/> 
                            </Form.Group>
                            {/* <Form.Field label='Phone number:'control='input' placeholder='0XXXXXXXXX' type="text" maxLength="10" width="5" required/> */}
                            <Form.Field inline type="text" maxLength="10" width="5" required>
                                <label>Phone number:</label>
                                <Input placeholder='0XXXXXXXXX' value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                            </Form.Field>
                             <Form.Field type="submit">
                                <Button inverted color='green'>
                                    Sign Up
                                </Button>
                            </Form.Field> 
                            
                        </Form>
                        {/* <p>New to our service? <Link to="/createaccount">Create New Account</Link> </p> */}
                    </div>
                
                </div>
            </div>
         </div>
        
    )
}
export default CreateAccount;