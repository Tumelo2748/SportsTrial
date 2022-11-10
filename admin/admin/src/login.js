import { useEffect, useState } from "react";
import { Form, Button, Card } from 'react-bootstrap'
import {Container} from "react-bootstrap"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "./context";

//firebase imports:
import { auth, db } from "./fb-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDocs, collection } from "firebase/firestore";

const Login = (props) => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [validated, setValidated] = useState(false);
    const[user, setUser] = useState([])
    const navigate = useNavigate();

    const {chosenSport, setSport} = useContext(UserContext)
    const {setUserEmail} = useContext(UserContext)

    const getData = async() => {

        const userCollectionRef = collection(db, `Manager/Personal/${email}`)
        const data = await getDocs(userCollectionRef)
        setUserEmail(email)
        // console.log(data.docs)

        if(data){
            // setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            const record = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            const sport = record.map((doc) => doc.sports)
            //console.log(sport)
            setSport(sport)
            navigate('/tabs/trialList')

        }

        else{
            console.log('file not found')
        }

    }
    

    const HandleSubmit = async() => {
        
        if(!email || !password){
            alert('all fields are required')
            setValidated(true)
        }

        else{
            getData()

            try{
                const user = await signInWithEmailAndPassword(auth, email, password);
                if(user) {
                    alert('welcome')
                    
                }
                else{
                    alert('incorrect password or email')
                }
            } catch(error){
                console.log("error ocured");
            } 
        }
    }

    return(

        <>
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>

            <Card className='w-100' style={{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">login</h2>

                    <Form noValidate validated={validated}>
                        <Form.Group id="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="email" onChange={(e) => setPassword(e.target.value)} required/>
                        </Form.Group><br />

                        <Button className="w-100" onClick={HandleSubmit}>submit</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">dont have an account?<Link to="/register">create</Link> </div>
            </Card>

            </Container>
        </>
    )
}

export default Login;