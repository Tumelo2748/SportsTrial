import { IonContent, IonHeader, IonLabel, IonToolbar, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle } from "@ionic/react"
import { useEffect, useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router";

// firebase imports:
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";

const UserLandingPage = () => {

    const [data, setData] = useState([]);
    const tempData = [];
    const history = useHistory();

    useEffect(() => {

        Axios.get("https://newsapi.org/v2/top-headlines?country=za&category=sports&apiKey=bffe2f9c92254e2abb3b5a04708abe04")
        
        .then((response) => {

            for(let i = 1; i < 20; i++){
                //setData([...data, response.data.articles[i]])
                tempData.push(response.data.articles[i])
            }

            console.log(tempData)
            setData(tempData)

        }).catch((errorMessage) => console.log("error is :"+ errorMessage))
    
    }, [])

    const userLogOut = async() => {
        await signOut(auth)
        history.push('/login')
    }

    return(
        <IonContent>

            <IonHeader>
                <IonToolbar>
                    <IonLabel>user landing page</IonLabel>
                </IonToolbar>
            </IonHeader>

            <ion-button expand="full" color="success" onClick={userLogOut}>Log Out</ion-button>

            {
                data && data.map(record => {
                    return(
                        <IonCard>
                            <img alt="Silhouette of mountains" src={record.urlToImage} />
                            <IonCardHeader>
                                <IonCardTitle>{record.title}</IonCardTitle>
                                {/* <IonCardSubtitle>{record.description}</IonCardSubtitle> */}
                            </IonCardHeader>
        
                            {/* <IonCardContent>{record.content}</IonCardContent> */}
                        </IonCard>
                    )
                })
            }

        </IonContent>
    )
}

export default UserLandingPage;