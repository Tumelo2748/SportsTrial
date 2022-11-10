import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context";

//firebase imports
import { getDocs, collection } from "firebase/firestore";
import { db } from "../fb-config";

//icons import
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterListIcon from '@mui/icons-material/FilterList';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect } from 'react';
import { useState } from 'react';

const Players = () => {

    const navigate = useNavigate();
    const[users, setUsers] = useState([])
    const {chosenSport, setSport} = useContext(UserContext)

    useEffect(() => {

        const getData = async() => {
    
            const userCollectionRef = collection(db, `User/Sports/${chosenSport}`)
            const data = await getDocs(userCollectionRef)

            if(data){
            
                const record = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                //const sport = record.map((doc) => doc.sports)
                setUsers(record)
                                        
            }
    
            else{
                console.log('file not found')
            }
        }
        
        getData()

    },[])

    return(
        <>
        
            <nav>
                <div className="Header"><strong>Management System</strong></div>

                <div style={{display: "flex"}}>
                    <ul className="all-tabs" >
                        <li onClick={() => navigate("/tabs/profile")} className="each-tab"><AccountCircleIcon /><p>Profile</p></li>

                        <li onClick={() => navigate("/tabs/home")} className="each-tab"><HomeIcon /><a><p>Home</p></a></li>

                        <li onClick={() => navigate("/tabs/players")} className="each-tab" id="selected"><GroupsIcon /><p>Players</p></li>

                        <li onClick={() => navigate("/tabs/trialList")} className="each-tab"><FilterListIcon /><p>Trial List</p></li>

                        <li onClick={() => navigate("/tabs/createTrials")} className="each-tab"><CreateIcon /><p>Create Trials</p></li>

                        <li onClick={() => navigate("/tabs/settings")} className="each-tab"><SettingsIcon /><p>Settings</p></li>
                    </ul>

                    

                    
                        <div >
                        <table striped bordered hover className='table-players'>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>surname</th>
                                    <th>email</th>
                                    <th>contact</th>
                                    <th>location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => {
                                    return(

                                        <tr>
                                            <td>{user.name}</td>
                                            <td>{user.surname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td>{user.location}</td> 
                                        </tr>
                                    
                                )})}
                            </tbody>
                        </table>
                    </div> 
                        
                    
                </div>
            </nav>

        </>
    )
}

export default Players;