import React, { useState,useEffect } from 'react';
import Firebase from './Firebase';
import axios from "axios";
import { Icon, Image, Item,Container,Dropdown, Menu, Segment } from 'semantic-ui-react'

function CheckOrder(props){

    const [currentUser,setUser] = useState(null);
    const [printingOrder,setPrintingOrder] = useState([]);
    const [totalPrint,setTotalPrint] = useState(0);

    useEffect(()=>{
        Firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(currentUser);
              axios.get('https://oneline-copy-shop.herokuapp.com/checkorder/'+currentUser.uid, {headers: {
                'Access-Control-Allow-Origin': '*'
              }})
              .then(response=> {
                    console.log(response.data)
                    const {data} = response;
                    console.log(data);
                    if(data.status.code == 1000){
                        setTotalPrint(data.data.totalRemaining)
                        setPrintingOrder(data.data.printingList)
                    }
                })
              // ...
            } else {
              // User is signed out
              // ...
             window.location.href="/"
            }
          });
    },[]);

    return (
        <Container>
            <br/>
            <Menu attached='top'>
                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                        <div className='ui transparent icon'>
                            <p>Your total order: {totalPrint}</p>
                            {/* <i className='search link icon' /> */}
                        </div>
                        <div className='results' />
                    </div>
                </Menu.Menu>
                </Menu>

                <Segment attached='bottom'>
                    <Item.Group divided>
                        {
                            printingOrder.map((order,index)=> <Item>
                            <Item.Content>
                                <Item.Header as='a'>{order.fileName}</Item.Header>
                                <Item.Meta>Cost: {order.cost} Baht</Item.Meta>
                                <Item.Description>
                                    {
                                        <p className={order.status ==="IN_QUEUE"? 'red': 
                                        order.status ==="INPROGRESS"? 'blue': 'green'}>{order.status}</p>
                                    }
                                </Item.Description>
                                <Item.Extra>Paper size: {order.paperSize}
                            <br></br> Number of copies: {order.numberOfCopies}
                            <br></br> Pages per sheet: {order.pagesPerSheet}
                            <br></br> <h2>Queue number {order.id}</h2>
                                </Item.Extra>
                            </Item.Content>
                        </Item>)
                        }
                    </Item.Group>
                </Segment>
        </Container>
    )

}

export default CheckOrder;