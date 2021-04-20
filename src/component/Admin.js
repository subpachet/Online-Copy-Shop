import React,{useState,useEffect} from "react";
import { Card, Header,Container,Menu,Segment, Table, Form,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Logo from '../Images/logo.png'
import Firebase from './Firebase';
import axios from 'axios';

function Admin(){

    const [printingList,setPrintingOrder] = useState([]);
    const [cost,setCost] = useState(0);
    useEffect(()=>{
        
        axios.get('https://oneline-copy-shop.herokuapp.com/unpickupprinting')
        .then(response=> {
            console.log(response.data)
            const {data} = response;
            console.log(data);
            if(data.status.code == 1000){
                setPrintingOrder(data.data.printingList)
            }
        });
        // ...
    },[])
    
    const handleItemClick = (e, { name }) => {
        
        Firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.href= "/"
        }).catch((error) => {
            // An error happened.
        });
          
    };

    const onsetCostSubmit =(e,{index}) =>{
        console.log(index);
        console.log(e.target.value);
    }

    return(
        <Container>
            <Menu pointing secondary>
          
                <Menu.Menu position='right'>
                    <Menu.Item
                    name='logout'
                    onClick={handleItemClick}
                />
          </Menu.Menu>
        </Menu>

        <Segment>
        <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Queue Number</Table.HeaderCell>
        <Table.HeaderCell>Cost</Table.HeaderCell>
        <Table.HeaderCell>View File</Table.HeaderCell>
        <Table.HeaderCell>Printing Color</Table.HeaderCell>
        <Table.HeaderCell>Printing Type</Table.HeaderCell>
        <Table.HeaderCell>Paper size</Table.HeaderCell>
        <Table.HeaderCell>No. of copies</Table.HeaderCell>
        <Table.HeaderCell>Add. Paper Type</Table.HeaderCell>
        <Table.HeaderCell>Add. Cover Paper Type</Table.HeaderCell>
        <Table.HeaderCell>Cover Paper Color</Table.HeaderCell>
        <Table.HeaderCell>Binding Type</Table.HeaderCell>
        <Table.HeaderCell>Trans. Cover</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
          printingList.map((key,index) => {return (<Table.Row>
          <Table.Cell>
            <Header as='h2' textAlign='center'>
              {key.id}
            </Header>
          </Table.Cell>
          <Table.Cell singleLine>{key.cost}</Table.Cell>
          <Table.Cell>
          <a href={key.filePath} className="ui button">Download</a>
          </Table.Cell>
          <Table.Cell>
          {key.printingColorStatus}
          </Table.Cell>
          <Table.Cell >
            {key.printingTypeStatus}
          </Table.Cell>
          <Table.Cell >
            {key.paperSize}
          </Table.Cell>
          <Table.Cell>
            {key.numberOfCopies}
          </Table.Cell>
          <Table.Cell>
            {key.additionalPaperType}
          </Table.Cell>
          <Table.Cell>
            {key.additionalCoverPaper}
          </Table.Cell>
          <Table.Cell>
            {key.coverPaperColor}
          </Table.Cell>
          <Table.Cell>
            {key.bindingType}
          </Table.Cell>
          <Table.Cell>
            {key.transparentCover}
          </Table.Cell>
          <Table.Cell>
            <p className={key.status ==="IN_QUEUE"? 'red': key.status ==="INPROGRESS"? 'blue': 'green'}>{key.status}</p>
          </Table.Cell>
          <Table.Cell>
            <Button inverted color='green' as={Link} to={'/edit/coststatus/'+key.id}>
                Edit cost or status
            </Button>
          </Table.Cell>
        </Table.Row>)})
      }
      
    </Table.Body>
    </Table>
        </Segment>
        </Container>
    )
}
export default Admin;