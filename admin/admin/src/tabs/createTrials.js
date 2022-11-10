import { useState } from "react"
import {Container} from "react-bootstrap"
import { Form, Button, Card } from 'react-bootstrap'
import '../tab.css';
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../context";

//firebase imports
import { addDoc, collection } from "firebase/firestore";
import { db } from "../fb-config";

//icons import
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterListIcon from '@mui/icons-material/FilterList';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';

const CreateTrials = () => {

    const {chosenSport, setSport} = useContext(UserContext)
    const[eventData, setEventDate] = useState('')
    const[eventLocation, setEventLocation] = useState('')
    const[eventName, setEventName] = useState('')
    const[additionalInfo, setAdditionalInfo] = useState('')
    const trialCollectionRef = collection(db, `Manager/Trials/${chosenSport}`)
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);

    const HandleSubmit = () => {
        if(!eventData || !eventLocation || !eventName || !additionalInfo){
            setValidated(true)
        }
        else{

            const addData = async() => {
                console.log('running...')

                try{

                    await addDoc(trialCollectionRef, { eventName: eventName, eventLocation: eventLocation, eventDate: eventData, addInfo: additionalInfo })
                    alert("trials created")

                    setEventDate('')
                    setEventLocation('')
                    setEventName('')
                    setAdditionalInfo('')
                }
                catch{
                    console.log('unable to add data to the database')
                }              
            }
            addData()
        }
    }

    return(
        <>
            <nav>
                <div className="Header"><strong>Management System</strong></div>

                <div style={{display: "flex"}}>
                    <ul className="all-tabs" >
                        <li onClick={() => navigate("/tabs/profile")} className="each-tab"><AccountCircleIcon /><p>Profile</p></li>

                        <li onClick={() => navigate("/tabs/home")} className="each-tab"><HomeIcon /><a><p>Home</p></a></li>

                        <li onClick={() => navigate("/tabs/players")} className="each-tab"><GroupsIcon /><p>Players</p></li>

                        <li onClick={() => navigate("/tabs/trialList")} className="each-tab"><FilterListIcon /><p>Trial List</p></li>

                        <li onClick={() => navigate("/tabs/createTrials")} className="each-tab" id="selected"><CreateIcon /><p>Create Trials</p></li>

                        <li onClick={() => navigate("/tabs/settings")} className="each-tab"><SettingsIcon /><p>Settings</p></li>
                    </ul>

                    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "75vh"}}>

                    <Card className='w-100' style={{ maxWidth: "700px"}}>

                        <Card.Body>
                            <h2 className="text-center mb-4">Create Trial</h2>

                            <Form noValidate validated={validated}>

                                <Form.Group>
                                    <Form.Label>trial name:</Form.Label>
                                    <Form.Control value={eventName} type="text" onChange={(e) => setEventName(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>date</Form.Label>
                                    <Form.Control value={eventData} type="date" onChange={(e) => setEventDate(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>location of event</Form.Label>
                                    <Form.Control value={eventLocation} type="text" onChange={(e) => setEventLocation(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>additional info</Form.Label>
                                    <Form.Control value={additionalInfo} as="textarea" type="text" onChange={(e) => setAdditionalInfo(e.target.value)} required/>
                                </Form.Group><br />

                                <Button className="w-100" onClick={HandleSubmit}>Post Trial</Button>
                            </Form>
                            
                        </Card.Body>
                        
                    </Card>

                    </Container>
                </div>
            </nav>

        </>
    )
}

export default CreateTrials;