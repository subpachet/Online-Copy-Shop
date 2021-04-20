import React, { useState,useEffect } from 'react';
import Firebase from './Firebase';
import axios from "axios";
import { Card, Header,Form,Container,Radio,Input,Select,Dropdown, Checkbox} from 'semantic-ui-react'

const paperOptions = [
    { key: 0, text: 'A0', value: 'A0' },
    { key: 1, text: 'A1', value: 'A1' },
    { key: 2, text: 'A2', value: 'A2' },
    { key: 3, text: 'A3', value: 'A3' },
    { key: 4, text: 'A4', value: 'A4' },
    { key: 5, text: 'A5', value: 'A5' },
    { key: 6, text: 'A6', value: 'A6' },
    { key: 7, text: 'A7', value: 'A7' },
    { key: 8, text: 'A8', value: 'A8' },
    { key: 9, text: 'A9', value: 'A9' },
    { key: 10, text: 'A10', value: 'A10' }
  ]

  const pagesPerSheetOptions = [
      { key: 1, text: '1', value: 1},
      { key: 2, text: '2', value: 2},
      { key: 3, text: '4', value: 4},
      { key: 4, text: '6', value: 6},
      { key: 5, text: '9', value: 9},
      { key: 6, text: '16', value: 16}
  ]

  const paperTypeOptions = [
      { key: 1, text: 'Inkjet Printing Paper +0.5 Baht for each sheet', value: 'Inkjet'},
      { key: 2, text: 'Laser Printing Paper +1.0 Baht for each sheet', value: 'Laser'},
      { key: 3, text: 'Matte Paper +0.5 Baht for each sheet', value: 'Matte'},
      { key: 4, text: 'Bright White Paper +0.25 Baht for each sheet', value: 'Bright'},
      { key: 5, text: 'Glossy Paper +0.5 Baht for each sheet', value: 'Glossy'},
      { key: 6, text: 'Card Stock Paper +1.0 Baht for each sheet', value: 'Card'},
      { key: 7, text: 'Resume Paper +0.25 Baht for each sheet', value: 'Resume'}
  ]

  const coverPaperTypeOptions = [
    { key: 1, text: 'Inkjet Printing Paper +0.5 Baht', value: 'Inkjet'},
    { key: 2, text: 'Laser Printing Paper +1.0 Baht', value: 'Laser'},
    { key: 3, text: 'Matte Paper +0.5', value: 'Matte'},
    { key: 4, text: 'Bright White Paper +0.25 Baht', value: 'Bright'},
    { key: 5, text: 'Glossy Paper +0.5 Baht', value: 'Glossy'},
    { key: 6, text: 'Card Stock Paper +1.0 Baht', value: 'Card'},
    { key: 7, text: 'Resume Paper +0.25 Baht', value: 'Resume'}
]
  
  const bookBindingTypeOptions = [
    { key: 1, text: 'Staple top left corner +0 Baht', value: 'Staple'},
    { key: 2, text: 'Plastic ridge +5 Baht', value: 'Plastic'},
    { key: 3, text: 'Lac Scene +10 Baht', value: 'LacScene'},
    { key: 4, text: 'Wire Binding +20 Baht', value: 'Wire'},
    { key: 5, text: 'Spiral Binding +50 Baht', value: 'Spiral'},
  ]

  const coverPaperColorOptions = [
    { key: 1, text: 'White', value: 'White'},
    { key: 2, text: 'Black', value: 'Black'},
    { key: 3, text: 'Green', value: 'Green'},
    { key: 4, text: 'Red', value: 'Red'},
    { key: 5, text: 'Blue', value: 'Blue'},
    { key: 6, text: 'Yellow', value: 'Yellow'},
    { key: 7, text: 'Orange', value: 'Orange'},
    { key: 8, text: 'Lime', value: 'Lime'},
    { key: 9, text: 'Purple', value: 'Purple'},
    { key: 10, text: 'Cyan', value: 'Cyan'}
  ]

function CreateNewOrder(props){
    const [uploadFile,setUploadFile] = useState(null);
    const [user,setUser] = useState(null);
    const [printingColor,setPrintingColor] = useState(1);
    const [printingType,setPrintingType] = useState(1);
    const [paperSize,setPaperSize] = useState("A4");
    const [paperType,setPaperType] = useState("");
    const [pagesPerSheet,setPagesPerSheet] = useState(1);
    const [bookBinding,setBookBinding] = useState(1);
    const [addCover,setAddCover] = useState(1);
    const [coverPaperColor,setCoverPaperColor] = useState("");
    const [bindingType,setBindingType] = useState("");
    const [coverPaperType,setCoverPaperType] = useState("");
    const [transparentCover,setTransparentCover] = useState("");
    const [numberOfCopies,setNumberOfCopies] = useState(0);
    

    useEffect(()=>{
        Firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(currentUser);
              // ...
            } else {
              // User is signed out
              // ...
             window.location.href="/"
            }
          });
    },[])

    const onFileChange = (e) => {
        console.log(e.target.files[0].name);
        setUploadFile(e.target.files[0]);
    }

    const UploadFile =(e) =>{
        e.preventDefault();
        console.log(uploadFile);
        console.log(paperSize)
        console.log({
            printingColorStatus: printingColor,
                    printingTypeStatus: printingType,
                    paperSize: paperSize,
                    pagesPerSheet: pagesPerSheet,
                    additionalPaperType: paperType,
                    bindingType: bindingType,
                    coverPaperColor: coverPaperColor,
                    additionalCoverPaper: coverPaperType,
                    transparentCover: transparentCover,
                    numberOfCopies: numberOfCopies
        })
        // File or Blob named mountains.jpg
        var file = uploadFile

        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
            };
        
            
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = Firebase.storage().ref().child('upload/' + file.name).put(file);

        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);

            axios.post('https://oneline-copy-shop.herokuapp.com/userprinting/create',
            {
                fileStorage:{
                    fileName :uploadFile.name,
                    path: downloadURL,
                    userID: user.uid
                },
                userPrintingStatus:{
                    printingColorStatus: printingColor,
                    printingTypeStatus: printingType,
                    paperSize: paperSize,
                    pagesPerSheet: pagesPerSheet,
                    additionalPaperType: paperType,
                    bindingType: bindingType,
                    coverPaperColor: coverPaperColor,
                    additionalCoverPaper: coverPaperType,
                    transparentCover: transparentCover,
                    numberOfCopies: numberOfCopies

                }
            }
            ).then(response =>{
                const {data} = response
              if(data.status.code === 1000){
                alert("Your request has been submitted!")
                window.location.href="/";
              }
              else{
                console.log(data.status.message)
              }
            })
        }).catch((error) => {
            console.log(error.message);
            console.log(error.code);
        });
    }


    const updatePaperSize = (e, { value }) => {console.log(value);setPaperSize(value)};
    const updatePagesPerSheet = (e, { value }) => {console.log(value);setPagesPerSheet(value)};
    const updatePaperType = (e, { value }) => {console.log(value);setPaperType(value)};
    const updateCoverPaperColor = (e, { value}) => {console.log(value);setCoverPaperColor(value)};
    const updateBindingType =  (e, { value }) => {console.log(value);setBindingType(value)};
    const updateCoverPaperType = (e, { value }) => {console.log(value);setCoverPaperType(value)};
    const updateTransparentCover = (e, { value }) => {console.log(value);setTransparentCover(value)};
    

    return(
        <Container>
            <Header as="h1">Create New Order</Header>
            <hr/>
            <Form onSubmit={UploadFile}>
                <Form.Field>
                    <label>UPLOAD YOUR FILE</label>
                    <input type="file" onChange={onFileChange} required/>
                </Form.Field>
                <Form.Field inline>
                    <label>Number of copies</label>
                    <input placeholder='Enter number' type="number" value={numberOfCopies} 
                    onChange={(e)=>{console.log(e.target.value);setNumberOfCopies(e.target.value)}} required/>
                </Form.Field>
                <Form.Group>
                    <label>Printing Color: </label>
                <Form.Field
                    control={Radio}
                    label='Black-White'
                    value = {1}
                    checked={printingColor === 1}
                    onChange={()=>{setPrintingColor(1)}}
                />
                <Form.Field
                    control={Radio}
                    label='Color'
                    value={2}
                    checked={printingColor === 2}
                    onChange={()=>{setPrintingColor(2)}}
                />
                </Form.Group>

                <Form.Group>
                    <label>Printing Type: </label>
                <Form.Field
                    control={Radio}
                    label='One-Sided'
                    value = {1}
                    checked={printingType === 1}
                    onChange={()=>{setPrintingType(1)}}
                />
                <Form.Field
                    control={Radio}
                    label='Two-Sided'
                    value={2}
                    checked={printingType === 2}
                    onChange={()=>{setPrintingType(2)}}
                />
                </Form.Group>
                <br/>
                <Form.Dropdown maxLength={10} width={5} required
                        label="Select Paper size"
                        placeholder='Select paper size...'
                        name="papersize"
                        onChange={updatePaperSize}
                        selection 
                        options={paperOptions} 
                        value={paperSize}
                        required
                    />

                <Form.Dropdown maxLength={10} width={5} required
                        label="Pages per sheet"
                        placeholder='Choose how many pages you want per sheet'
                        name="pagespersheet"
                        onChange={updatePagesPerSheet}
                        selection 
                        options={pagesPerSheetOptions} 
                        value={pagesPerSheet}
                        required
                    />
                <Form.Dropdown maxLength={10} width={5}
                        label="Additional Paper Type (Interior)"
                        placeholder='Select paper type...'
                        name="papertype"
                        onChange={updatePaperType}
                        selection 
                        options={paperTypeOptions} 
                        value={paperType}
                    />

                <Form.Group>
                    <label> Book binding? </label>
                <Form.Field
                    control={Radio}
                    label='No'
                    value = {1}
                    checked={bookBinding === 1}
                    onChange={()=>{setBookBinding(1)}}
                />
                <Form.Field
                    control={Radio}
                    label='Yes'
                    value={2}
                    checked={bookBinding === 2}
                    onChange={()=>{setBookBinding(2)}}
                />
                </Form.Group>

                {
                    bookBinding===2? <Form.Dropdown maxLength={10} width={5} required
                    label="Select Binding Types"
                    placeholder='Select binding type...'
                    name="bindingtype"
                    onChange={updateBindingType}
                    selection 
                    options={bookBindingTypeOptions} 
                    // value={paperType}
                    required
                />: <div></div>
                }

                <Form.Group>
                    <label> Add cover page? </label>
                <Form.Field
                    control={Radio}
                    label='No'
                    value = {1}
                    checked={addCover === 1}
                    onChange={()=>{setAddCover(1)}}
                />
                <Form.Field
                    control={Radio}
                    label='Yes'
                    value={2}
                    checked={addCover === 2}
                    onChange={()=>{setAddCover(2)}}
                />
                </Form.Group>

                {
                    addCover===2? <div>
                        <Form.Dropdown maxLength={10} width={5} required
                    label="Select Cover Paper Color"
                    placeholder='Select cover paper color...'
                    name="coverpapercolor"
                    onChange={updateCoverPaperColor}
                    selection 
                    options={coverPaperColorOptions} 
                    value={coverPaperColor}
                    required
                />

            <Form.Dropdown maxLength={10} width={5}
                    label="Additional Cover Paper"
                    placeholder='Select cover paper...'
                    name="coverpapertype"
                    onChange={updateCoverPaperType}
                    selection 
                    options={coverPaperTypeOptions} 
                    value={coverPaperType}
                />
            
            <Form.Group>
                <label> Add additional transparent back and front cover </label>
                <Form.Field
                    control={Checkbox}
                    label='+5 Baht'
                    value = {transparentCover}
                    checked={transparentCover ===1? true: false}
                    onChange={()=>{setTransparentCover(transparentCover ===1? 0: 1)}}
                />
            </Form.Group>
                    </div>: <div></div>
                }
                
                <button type="submit"> Upload File</button>
            </Form>
        </Container>
    )

    
}
export default CreateNewOrder;
