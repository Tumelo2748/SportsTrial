import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonIcon,
  IonCardSubtitle,
  IonCardHeader,
} from "@ionic/react";

import { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { auth } from "../components/Database/firebaseConfig";
import { signOut } from "firebase/auth";
import { logOut } from "ionicons/icons";
import "./News.css"
const News = () => {
  
  const [data, setData] = useState([]);
  const tempData = [];
  const history = useHistory();

  

  useEffect(() => {
    Axios.get(
      "https://newsapi.org/v2/top-headlines?country=za&category=sports&apiKey=19bf8e30add14e2599c3ebc566385c11"
    )

      .then((response) => {
        for (let i = 1; i < 10; i++) {
          //setData([...data, response.data.articles[i]])
          tempData.push(response.data.articles[i]);
        }

        console.log(tempData);
        setData(tempData);
      })
      .catch((errorMessage) => console.log("error is :" + errorMessage));
  }, []);

  const userLogOut = async () => {
    await signOut(auth);
    history.push("/login");
  };

  return (
    <IonContent>
      <IonMenu contentId="main-content">

        <IonHeader>
          <IonToolbar>
            <IonTitle>Sporting Trials</IonTitle>
          </IonToolbar>
          <IonList>
            <IonItem>
              <IonLabel>
                <a href="/Trials">Trials</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <a href="/News">News</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <a href="/Settings">Settings</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={logOut} size="medium" onClick={userLogOut}></IonIcon>
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
            <IonTitle>News</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>

      

        <div className="Api">
          {data &&
            data.map((record) => {
              return (
                <IonCard>
                  <img alt="Silhouette of mountains" src={record.urlToImage} />
                  <IonCardHeader>
                    <IonCardSubtitle>{record.title}</IonCardSubtitle>
                    {/* <IonCardSubtitle>{record.description}</IonCardSubtitle> */}
                  </IonCardHeader>

                  {/* <IonCardContent>{record.content}</IonCardContent> */}
                </IonCard>
              );
            })}
        </div>
        
      
    </IonContent>
  );
};

export default News;
