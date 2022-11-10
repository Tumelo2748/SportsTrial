import { useEffect, useState } from "react"
import {Container} from "react-bootstrap"
import { Form, Button, Card } from 'react-bootstrap'
import { useContext } from "react";
import UserContext from "../context";
import { useNavigate } from "react-router";

//firebase imports:
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage, db } from "../fb-config";
import { addDoc, getDocs, collection, doc } from "firebase/firestore";

//icons import
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterListIcon from '@mui/icons-material/FilterList';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {

    const {chosenSport, setSport} = useContext(UserContext)
    const {userEmail} = useContext(UserContext)
    const[personalInfo, setPersonalInfo] = useState([])
    const navigate = useNavigate();
    const imageRef = ref(storage, "profile/manager/");
    const[imageSrc, setImageSrc] = useState('')

 useEffect(() => {

    listAll(imageRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setImageSrc(url)
            })
        })
    })
    console.log("image name is "+ typeof(imageRef))
    
    const getPersonalInfo = async() => {
        const userCollectionRef = collection(db, `Manager/Personal/${userEmail}`)
        const data = await getDocs(userCollectionRef)
        // console.log(data.docs)

        if(data){
            // setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            const record = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setPersonalInfo(record) 
            //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))   
        }

        else{
            console.log('file not found')
        }
    }
    getPersonalInfo()

 },[])

    return(
        <>
            
            <nav>
                <div className="Header"><strong>Management System</strong></div>

                <div style={{display: "flex"}}>
                    <ul className="all-tabs" >
                        <li id="selected" onClick={() => window.location.pathname = ("/tabs/profile")} className="each-tab"><AccountCircleIcon /><p>Profile</p></li>

                        <li onClick={() => navigate("/tabs/home")} className="each-tab"><HomeIcon /><a><p>Home</p></a></li>

                        <li onClick={() => navigate("/tabs/players")} className="each-tab"><GroupsIcon /><p>Players</p></li>

                        <li onClick={() => navigate("/tabs/trialList")} className="each-tab"><FilterListIcon /><p>Trial List</p></li>

                        <li onClick={() => navigate("/tabs/createTrials")} className="each-tab"><CreateIcon /><p>Create Trials</p></li>

                        <li onClick={() => navigate("/tabs/settings")} className="each-tab"><SettingsIcon /><p>Settings</p></li>
                    </ul>


                    <div className="container-profile">
                        <div className="profile-image">
                            <img className="profile-image" src={imageSrc} alt="profile image" />
                        </div>

                        {personalInfo && personalInfo.map((user) => {
                            return(

                            <div>
                            <table style={{marginTop: "5"}}>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{user.Fname}</td>
                                </tr>

                                <tr>
                                    <td>Surname</td>
                                    <td>{user.surname}</td>
                                </tr>

                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>

                                <tr>
                                    <td>Team Name</td>
                                    <td>{user.teamName}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Button id="delete-button" className="w-100" variant="dark">Edit <EditIcon style={{marginLeft: "10px"}}/></Button>
                        </div>    
                        
                            )
                        })}
                    </div>
                </div>
                
            </nav>

        </>
    )
}

export default Profile;