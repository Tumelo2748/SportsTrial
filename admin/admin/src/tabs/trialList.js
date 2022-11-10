import { useState } from "react"
import {Container} from "react-bootstrap"
import { Form, Button, Card } from 'react-bootstrap'
import { useContext } from "react";
import UserContext from "../context";
import { useNavigate } from "react-router";

//firebase imports:
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../fb-config";

//icons import
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterListIcon from '@mui/icons-material/FilterList';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect } from "react";
import { async } from "@firebase/util";

const TrialList = () => {

    const {chosenSport, setSport} = useContext(UserContext)
    const[trials, setTrials] = useState([])
    //const[testData, setTestData] = useState('Tenis')
    const navigate = useNavigate();

    useEffect(() => {
    
            return () => {

                const getData = async() => {
    
                    const userCollectionRef = collection(db, `Manager/Trials/${chosenSport}`)
                    const data = await getDocs(userCollectionRef)
    
                    if(data){
                    
                        const record = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                        //const sport = record.map((doc) => doc.sports)
                        setTrials(record)
                                                
                    }
            
                    else{
                        console.log('file not found')
                    }
                }
                
                getData()
            }
            
    },[])

    const deleteTrial = async(id) => {
        alert(id)
        console.log(id)
        const userDoc = doc(db, "Manager", "Trials", "Soccer", id)
        await deleteDoc(userDoc)
        alert('done')
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

                        <li onClick={() => navigate("/tabs/trialList")} className="each-tab" id="selected"><FilterListIcon /><p>Trial List</p></li>

                        <li onClick={() => navigate("/tabs/createTrials")} className="each-tab"><CreateIcon /><p>Create Trials</p></li>

                        <li onClick={() => navigate("/tabs/settings")} className="each-tab"><SettingsIcon /><p>Settings</p></li>
                    </ul>

                    <div style={{flexDirection: "row"}}>
                        {/* <div className="trial-content">
                            <h2>pirates trials</h2>
                            <h5>location: Nort West</h5>
                            <h5>date: 25-05-2020</h5>
                            <button>delete</button>
                        </div> */}

                        {trials && trials.map((data) => {
                            return(
                                <div className="trial-content">
                                    <h2>{data.eventName}</h2>
                                    <h5>location: {data.eventLocation}</h5>
                                    <h5>date: {data.eventDate}</h5>
                                    <h5>{data.addInfo}</h5>
                                    <button onClick={() => deleteTrial(data.id)}>delete</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default TrialList;