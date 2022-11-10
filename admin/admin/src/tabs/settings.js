import { useState } from "react"
import {Container} from "react-bootstrap"
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from "react-router";

//firebase imports
import { deleteUser } from "firebase/auth";
import { auth } from "../fb-config";

//icons import
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterListIcon from '@mui/icons-material/FilterList';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {

    const[emailUpdate, setEmailUpdate] = useState('')
    const[passwordUpdate, setPasswordUpdate] = useState('')
    const[confirmPass, setConfirmPass] = useState('')
    const navigate = useNavigate();

    const update = () => {

    }

    const accountDelete = () => {
        console.log('wornking')

        const user = auth.currentUser;

        deleteUser(user).then(() => {
            alert("User deleted.")
            navigate('/')
        }).catch((error) => {
            alert("An error ocurred")
        // ...
        });
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

                        <li onClick={() => navigate("/tabs/createTrials")} className="each-tab"><CreateIcon /><p>Create Trials</p></li>

                        <li onClick={() => navigate("/tabs/settings")} className="each-tab" id="selected"><SettingsIcon /><p>Settings</p></li>
                    </ul>

                    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "75vh"}}>

                    <Card className='w-100' style={{ maxWidth: "700px"}}>

                        <Card.Body>
                            <h2 className="text-center mb-4">update information</h2>

                            
                            <Form>
                                <Form.Group>
                                    <Form.Label>email</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setEmailUpdate(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>password</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPasswordUpdate(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>confirm password</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setConfirmPass(e.target.value)} required/>
                                </Form.Group><br />

                                <Button className="w-100" onClick={update}>Update</Button><br />

                                <Button variant="danger" id="delete-button" className="w-100" onClick={accountDelete}>delete Account</Button>
                            </Form>
                            
                        </Card.Body>
                        
                    </Card>

                    </Container>
                </div>
            </nav>

        </>
    )
}

export default Settings;