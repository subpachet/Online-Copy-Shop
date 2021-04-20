import React,{useState,useEffect} from "react";
import { Card, Header,Container,Menu,Segment, Table, Form,Button, Input } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Logo from '../Images/logo.png'
import Firebase from './Firebase';
import axios from 'axios';

const StatusOptions = [
    { key: 1, text: 'In Queue', value: "IN QUEUE"},
    { key: 2, text: 'In Progress', value: "INPROGRESS"},
    { key: 3, text: 'Finished', value: "FINISHED"},
    { key: 4, text: 'Picked Up', value: "PICKED_UP"}
]

function EditCostStatus(props){

    const [fileName,setFileName] = useState(null);
    const [status,setStatus] = useState("");
    const [cost,setCost] = useState(0);
    const [numberOfCopies,setNumberOfCopies] = useState("");
    const [bindingType,setBindingType] = useState("");
    const [additionalPaperType,setAdditionalPaperType] = useState("");
    const [additionalCoverPaper,setAdditionalCoverPaper] = useState("");
    

    useEffect(()=>{
        axios.get('https://oneline-copy-shop.herokuapp.com/userprintingstatus/'+props.match.params.statusid)
        .then(response =>{
            console.log(response.data)
            const {data} = response;
            console.log(data);
            if(data.status.code == 1000){
                setFileName(data.data.fileName)
                setStatus(data.data.status);
                setCost(data.data.cost);
                setNumberOfCopies(data.data.numberOfCopies);
                setBindingType(data.data.bindingType);
                setAdditionalPaperType(data.data.additionalPaperType);
                setAdditionalCoverPaper(data.data.additionalCoverPaper);
            }
        })
    },[]);

    const updatStatus = (e, { value }) => {console.log(value);setStatus(value)};

    const onUpdateCostStatus = (e) =>{
        e.preventDefault();
        axios.patch('https://oneline-copy-shop.herokuapp.com/edit/coststatus/'+props.match.params.statusid,
        {
            cost: cost,
            status: status
        }
        ).then(response=>{
            console.log(response.data)
            const {data} = response;
            console.log(data);
            if(data.status.code == 1000){
                alert("Update status and cost");
                window.location.href= "/admin"
            }
        })
    }
    
    
    return(
        <Container>
            <br/>
            <Segment>
                <h2>Printing Detail</h2>
                <hr/>
                <p>Filename : {fileName}</p>
                
                <Form onSubmit={onUpdateCostStatus}>
                    <Form.Dropdown maxLength={10} width={5} required
                            label="Update Status"
                            placeholder='Select Status...'
                            name="status"
                            onChange={updatStatus}
                            selection 
                            options={StatusOptions} 
                            value={status}
                            required
                        />
                    <Form.Group>
                    <Input label="cost" type="number" value={cost} onChange={(e)=>{console.log(cost);setCost(e.target.value)}}/>
                    </Form.Group>
                    <h3>Detail:</h3>
                    <h4>Number of copies: {numberOfCopies}
                     <br></br> Additional Paper Type: {additionalPaperType}
                     <br></br> Binding Type: {bindingType}
                     <br></br> Additional Cover Paper: {additionalCoverPaper}
                    </h4>


                    <button type="submit" className="ui teal basic button"> Update </button>
                </Form>
            </Segment>
        </Container>
    )

    
}
export default EditCostStatus;