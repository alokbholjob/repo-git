import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeScreen.css';
import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';


const HomeScreen = (props) => {
    let history = useHistory();

    const [existingPlayerId, setExistingPlayerId] = useState();
    const [editMode, setEditMode] = useState(false);

    const [records, setRecords] = useState({
        name: '',
        age: '', gender: '', country: '',
        vaccinationStatus: '', catagory: '',
        previousMedalHistory: { gold: 0, silver: 0, bronze: 0 }
    }
    );


    useEffect(() => {

        // update record fetch api call
        let playerId = props.history.location.playerId;
        console.log("playerId", playerId);

        if (playerId) {
            setExistingPlayerId(playerId)
            setEditMode(true)
            fetch(`https://6130765d5fc50700175f18e9.mockapi.io/api/olympic/${parseInt(playerId)}`)
                .then(result => { return result.json() })
                .then(response => {
                    console.log("Data for player", response);
                    setRecords({
                        name: response.name, age: response.age, gender: response.gender, country: response.country,
                        vaccinationStatus: response.vaccinationStatus, catagory: response.catagory,
                        previousMedalHistory: {
                            gold: parseInt(response.previousMedalHistory.gold),
                            silver: parseInt(response.previousMedalHistory.silver),
                            bronze: parseInt(response.previousMedalHistory.bronze)
                        }
                    })

                })
        }


    }, [])


    const createRecord = () => {
        // e.preventDefault(); //written to prevent the refresh browser effect(if the form is in <form> tag)
        console.log("records", records);
        let data = records;
        //let allData = localStorage.getItem("tableData");
        //let newData = [];

        //method: "POST" api call 
        //fetch("1-url",{2-request-option{a-method,b-headers,c-body}}).then(response)/.catch(error)
        fetch("https://6130765d5fc50700175f18e9.mockapi.io/api/olympic", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)  //body will take request json
        })
            .then(result => { return result.json() })
            .then(response => {
                history.push("DetailScreen");
                //pushing the data to the table i.e DetailScreen component
                console.log("response", response);
            }).catch(error => {
                console.log("Error in adding player", error)
                alert("Error in adding player")
            })  //api end


        // if (allData) {
        //     //receives string type data converts to type array, checks if data is already there or not 
        //     newData = [...JSON.parse(allData), data];
        // }
        // else {
        //     console.log("hi", allData);
        //     newData = [data]; //the array has no data, we are pushing new record to the array
        // }
        // localStorage.setItem("tableData", JSON.stringify(newData));
        // history.push("DetailScreen");

        //fetch-api "PUT" 
    }

    const updateRecord = () => {

        let data = records;
        //  `within `back-tick ` element-called  TEMPLATE STRING LITERAL`
        fetch(`https://6130765d5fc50700175f18e9.mockapi.io/api/olympic/${parseInt(existingPlayerId)}`, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)  //body will take request json
        }).then(result => result.json())
            .then(response => {
                alert("Record has been updated succesfully")
                props.history.push('/DetailScreen');
            }).catch(error => {
                console.log("Error", error)
                alert("Something went wrong while updating")
            })
    }



    const onRegistrationComplete = (e) => {
        e.preventDefault();
        if (editMode === true) {
            updateRecord();
        }
        if (editMode === false) {
            createRecord();
        }
    }


    const onDelete = (e) => {
        e.preventDefault();
        //delete api
        fetch(`https://6130765d5fc50700175f18e9.mockapi.io/api/olympic/${parseInt(existingPlayerId)}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(result => { return result.json() })
            .then(response => {
                console.log("response", response);
                alert("Record has been deleted succesfully")
                props.history.push("/DetailScreen");
            }).catch(error => {
                console.log("error", error)
                alert("Something went wrong")
            })

    }


    return (
        <>
            <div className="main">
                <Navbar bg="dark" expand="lg" className="navBar">
                    <Navbar.Brand href="/" className="text-success">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/AboutScreen" className="text-success">About</Nav.Link>
                            <Nav.Link href="/ContactScreen" className="text-success">Contact</Nav.Link>
                        </Nav>
                        <Form className="d-flex ms-auto">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                
                <Container className="mainDiv">
                    <div className='d-flex flex-column align-items-center'>
                        <h2>Olympic Participant Details</h2>
                        <Form style={{ width: '500px' }}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder="Participant's Name" value={records.name} onChange={(e) => { setRecords({ ...records, name: e.target.value }) }} />
                                <Form.Label>Age</Form.Label>
                                <Form.Control type='number' placeholder="Participant's Age" value={records.age} onChange={(e) => { setRecords({ ...records, age: e.target.value }) }} />
                            </Form.Group>

                            <Form.Group>
                                <Row>
                                    <Form.Label>Gender</Form.Label>

                                    <Col>
                                        <Form.Check type="radio" checked={records.gender === "Male"} name="gender" value="Male" label="Male" onChange={(e) => { setRecords({ ...records, gender: e.target.value }) }} />
                                    </Col>

                                    <Col>
                                        <Form.Check type="radio" checked={records.gender === "Female"} name="gender" value="Female" label="Female" onChange={(e) => { setRecords({ ...records, gender: e.target.value }) }} />
                                    </Col>
                                    <Col>
                                        <Form.Check type="radio" checked={records.gender === "Others"} name="gender" value="Others" label="Others" onChange={(e) => { setRecords({ ...records, gender: e.target.value }) }} />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control as='select' onChange={(e) => { setRecords({ ...records, country: e.target.value }) }} >
                                    <option value=''>{records ? records.country : "Select a country"}</option>
                                    <option selected={records.country === "India"} value='India'>India</option>
                                    <option selected={records.country === "China"} value='China'>China</option>
                                    <option selected={records.country === "Russia"} value='Russia'>Russia</option>
                                    <option selected={records.country === "Japan"} value='Japan'>Japan</option>
                                    <option selected={records.country === "USA"} value='USA'>USA</option>
                                    <option selected={records.country === "Germany"} value='Germany'>Germany</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Row>
                                    <Form.Label>Vaccination Status </Form.Label>
                                    <Col>
                                        <Form.Check type="radio" checked={records.vaccinationStatus === "Vaccinated"} name="vaccinationStatus" value="Vaccinated" label="Complete"
                                            onChange={(e) => { setRecords({ ...records, vaccinationStatus: e.target.value }) }} />
                                    </Col>
                                    <Col>
                                        <Form.Check type="radio" checked={records.vaccinationStatus === "Partially Vaccinated"} name="vaccinationStatus" value="Partially Vaccinated" label="Partially"
                                            onChange={(e) => { setRecords({ ...records, vaccinationStatus: e.target.value }) }} />
                                    </Col>

                                    <Col>
                                        <Form.Check type="radio" checked={records.vaccinationStatus === "Not Vaccinated"} name="vaccinationStatus" value="Not Yet" label="Not Yet"
                                            onChange={(e) => { setRecords({ ...records, vaccinationStatus: e.target.value }) }} />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Catagory</Form.Label>
                                <Form.Control as='select' onChange={(e) => { setRecords({ ...records, catagory: e.target.value }) }} >
                                    <option value=''>{records ? records.catagory : "Select a catagory"}</option>
                                    <option selected={records.catagory === "Basket Ball"} value='Basket Ball'>Basket Ball</option>
                                    <option selected={records.catagory === "Tennis"} value='Tennis'>Tennis</option>
                                    <option selected={records.catagory === "Foot Ball"} value='Foot Ball'>Foot Ball</option>
                                    <option selected={records.catagory === "Javelin"} value='Javelin'>Javelin</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Previous Medal History</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>GOLD</Form.Label>
                                        <Form.Control type='text' onChange={(e) => { setRecords({ ...records, previousMedalHistory: { ...records.previousMedalHistory, gold: e.target.value } }) }}
                                            value={records.previousMedalHistory.gold} />
                                    </Col>

                                    <Col>
                                        <Form.Label>SILVER</Form.Label>
                                        <Form.Control type='text' onChange={(e) => { setRecords({ ...records, previousMedalHistory: { ...records.previousMedalHistory, silver: e.target.value } }) }}
                                            value={records.previousMedalHistory.silver} />
                                    </Col>

                                    <Col>
                                        <Form.Label>BRONZE</Form.Label>
                                        <Form.Control type='text' onChange={(e) => { setRecords({ ...records, previousMedalHistory: { ...records.previousMedalHistory, bronze: e.target.value } }) }}
                                            value={records.previousMedalHistory.bronze} />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button styles={{}} type='submit' onClick={onRegistrationComplete} variant="outline-success" id="buttoncss"> {editMode ? "Update" : "Register"}</Button>
                            {editMode ? <Button type="submit" onClick={onDelete} variant="outline-success"> Delete</Button> : null}
                        </Form>
                    </div>
                </Container>
            </div>
            {/* <div className="para" >
    
               <p>

               A paragraph is a <p>RAKESK </p> series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
               <p>
               A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. ... Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point.
               </p>
            </div> */}
        </>
    )
}
export default HomeScreen;
