import { useEffect, useRef, useState } from "react"
import {Container} from "react-bootstrap"
import { Button, Card } from 'react-bootstrap'
import Axios from "axios";
import UserContext from "../context";
import { useNavigate } from "react-router";


//firebase imports
import { auth } from "../fb-config";
import { signOut } from "firebase/auth";

//icons import
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterListIcon from '@mui/icons-material/FilterList';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";

const HomeTab = () => {

    const [data, setData] = useState([]);
    const[entireApi, setEntireApi] = useState([])
    const tempData = [];
    let newsData= [];
    const[currentShow, setCurrentShow] = useState(1);
    const navigate = useNavigate();

    const {chosenSport, setSport} = useContext(UserContext)

    useEffect(() => {
        
        Axios.get("https://newsapi.org/v2/top-headlines?country=za&category=sports&apiKey=800a276f9ed9484bba074b66096a5570")
        
        .then((response) => {

            for(let i = 0; i < 20; i++){

                tempData.push(response.data.articles[i])
            }
            
            newsData.push(response.data.articles[0])
            setEntireApi(tempData)
            //console.log(tempData)
            setData(newsData)
            
        }).catch((errorMessage) => console.log("error is :"+ errorMessage))

        setSport(chosenSport)
        console.log(chosenSport)
    }, [])

    const previous = () => {
        
        if(currentShow > 0){
            setCurrentShow(prevVal => prevVal - 1)
            console.log('the current show is: ' + currentShow)
            newsData = [];
            newsData.push(entireApi[currentShow])
            setData(newsData)
            
        }
        else{
            alert('no prvious iteams')
        }
    }

    const nextItem = () => {
        
        if(currentShow < 20){
            setCurrentShow(prevVal => prevVal + 1)
            console.log('the current show is: ' + currentShow)
            newsData = [];
            newsData.push(entireApi[currentShow])
            setData(newsData)
        }
        else{
            alert('no other iteams')
        }
    }

    const handleSignOut = async () => {
        await signOut(auth)
        navigate('/')
      }

    return(
        <>

            <nav>
                <div className="Header"><strong>Management System</strong></div>

                <div style={{display: "flex"}}>
                    <ul className="all-tabs" >
                        <li onClick={() => navigate("/tabs/profile")} className="each-tab"><AccountCircleIcon /><p>Profile</p></li>

                        <li id="selected" onClick={() => navigate("/tabs/home")} className="each-tab"><HomeIcon /><a><p>Home</p></a></li>

                        <li onClick={() => navigate("/tabs/players")} className="each-tab"><GroupsIcon /><p>Players</p></li>

                        <li onClick={() => navigate("/tabs/trialList")} className="each-tab"><FilterListIcon /><p>Trial List</p></li>

                        <li onClick={() => navigate("/tabs/createTrials")} className="each-tab"><CreateIcon /><p>Create Trials</p></li>

                        <li onClick={() => navigate("/tabs/settings")} className="each-tab"><SettingsIcon /><p>Settings</p></li>

                        <li onClick={handleSignOut} className="each-tab"><LogoutIcon /><p>Sign Out</p></li>
                    </ul>

                    <div className="api-data">

                    {data && data.map(record => {
                        return(
                            <div className="card-style">
                                
                                <Card style={{ width: '23rem' }}>
                                    <Card.Img variant="top" src={record.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{record.title}</Card.Title>
                                        <Card.Text>{record.description}</Card.Text>
                                    </Card.Body>
                                </Card>

                            </div>
                        )
                    })}

                    <div className="bottons-style">
                        <Button onClick={previous} style={{margin: "15px"}}>Prev</Button>
                        <Button onClick={nextItem}>Next</Button>
                    </div>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default HomeTab;