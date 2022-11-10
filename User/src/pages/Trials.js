import { IonCardContent,IonCardSubtitle,IonCardTitle,IonCard, IonCardHeader, IonContent, IonButtons, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../components/Database/firebaseConfig";

const Trials = () => {

  const[availableTrials, setAvailableTrials] = useState('')

  useEffect(() => {

    const getData = async() => {
      console.log('running')
      const userCollectionref = collection(db, "Manager/Trials/Soccer")
      const data = await getDocs(userCollectionref)

      if(data){
        
        const record = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setAvailableTrials(record)
        //console.log(record)
      }
      else{
        console.log('file not found')
      }
    }
    getData()

  },[])

    return ( 
        <IonContent>
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Sporting Trials</IonTitle>
            </IonToolbar>
            <IonList>
                <IonItem>
                    <IonLabel><a href="/Trials">Trials</a></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel><a href="/News">News</a></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel><a href="/Settings">Settings</a></IonLabel>
                </IonItem>
               
            </IonList>
          </IonHeader>
          
        </IonMenu>
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle>Trials</IonTitle>
            </IonToolbar>
          </IonHeader>
          
          

          {availableTrials && availableTrials.map((data) => {
            return(
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{data.eventName}</IonCardTitle>
                  <IonCardSubtitle>{data.eventLocation}</IonCardSubtitle>
                  <IonCardContent>{data.eventDate} {data.addInfo}</IonCardContent>
                  
                </IonCardHeader>
              </IonCard>
            )
          })}

        </IonPage>
      </IonContent>
     );
}
 
export default Trials;