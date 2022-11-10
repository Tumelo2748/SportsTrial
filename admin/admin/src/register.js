import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import './style.css'
import { Form, Button, Card } from 'react-bootstrap'
import {Container} from "react-bootstrap"
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "./context";

//firebase imports:
import { auth, db } from "./fb-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "./fb-config";
import { ref, uploadBytes } from "firebase/storage";


const Register = () => {

    //show errors:
    const[passwordErr, setPasswordErr] = useState(false)

    const[teamName, setTeamName] = useState("")
    const[fName, setFname] = useState("")
    const[surname, setSurname] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[sport, setMySport] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[profileImg, setProfileImg] = useState("")
    
    const {chosenSport, setSport} = useContext(UserContext)
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const{setUserEmail} = useContext(UserContext)

    const HandleSubmit = () => {
        
        if(!profileImg || !password || !email || !confirmPassword || !teamName || !fName || !surname || !sport){
            //alert('email and passwords are required')
            setValidated(true)
        }
        else{

            if(password !== confirmPassword){
                //setPasswordErr(true)
                alert("password do not match")
            }

            else{
                //aconsole.log(sport)
                setSport(sport)
                setUserEmail(email)
                // register user:
                const Register = async() => {
                    try{
                        const user = await createUserWithEmailAndPassword(auth, email, password);
                        console.log(user)
                    } catch(error){
                        console.log(error.message);
                    }
                }
    
                Register()

                // store personal information: 
                const addData = async() => {
                    console.log('running...')
                    const userCollectionRef = collection(db, `Manager/Personal/${email}`)
                    try{
  
                        await addDoc(userCollectionRef, { Fname: fName, email: email, surname: surname, teamName: teamName, sports: sport })
                        console.log("data added")

                    }
                    catch{
                        console.log('unable to add data to the database')
                    }
                   
                }
    
                addData()

                //upload profile image:
                const imageRef = ref(storage, `profile/manager/${email}`);
                uploadBytes(imageRef, profileImg).then(() => {
                    alert("image uploaded")
                    navigate('/tabs/home')
                })
            }     
        }

        
    }

    return(
        <>
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>

        <Card className='w-100' style={{ maxWidth: "700px"}}>
            <Card.Body>
                <h2 className="text-center mb-4">Create Account</h2>

                <Form noValidate validated={validated}>

                    <Form.Group id="file">
                        <CgProfile /> 
                        <Form.Control type="file" placeholder="enter first name" onChange={(e) => setProfileImg(e.target.files[0])} required/>
                    </Form.Group>

                    <Form.Group id="name">
                        <Form.Label>first name</Form.Label>
                        <Form.Control type="text" placeholder="enter first name" onChange={(e) => setFname(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group id="surname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="enter Last name" onChange={(e) => setSurname(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>email</Form.Label>
                        <Form.Control type="text" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} required/>
                    </Form.Group>

                    <Form.Label>select sport</Form.Label>
                    <Form.Select onChange={(e) => setMySport(e.target.value)} aria-label="Default select example">
                        
                        <option value="Tenis">Tenis</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Esports">E-Sports</option>
                        <option value="Hockey">Hockey</option>
                        <option value="Boxing">Boxing</option>
                        <option value="Golf">Golf</option>
                        <option value="Netball">Netball</option>
                        <option value="Rugby">Rugby</option>
                    </Form.Select>

                    <Form.Group id="Team name">
                        <Form.Label>Team name</Form.Label>
                        <Form.Control type="text" placeholder="enter team name" onChange={(e) => setTeamName(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control  type="text" placeholder="enter passwords" onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label>confirm password</Form.Label>
                        <Form.Control className="show-Error" type="text" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </Form.Group><br />  

                    <Button className="w-100" onClick={HandleSubmit}>Register</Button>

                </Form>
            </Card.Body>
        </Card>
        </Container>

        </>
    )
}

export default Register;