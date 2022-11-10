import {
  IonImg,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonRow,
  IonToolbar,
  IonCard,
  
} from "@ionic/react";
import Tennis from "../components/images/Tennis.jpg";
import Soccer from "../components/images/Soccer.jpg";
import Golf from "../components/images/Golf.jpg";
import Hockey from "../components/images/Hockey.jpg";
import Basketball from "../components/images/BasketBall.jpg";
import VolleyBall from "../components/images/Volleyball.jpg";
import Netball from "../components/images/Netball.jpg";
import Rugby from "../components/images/Rugby.jpg";
import Esports from "../components/images/E-sports.jpg";
import Boxing from "../components/images/Boxing.jpg";
import "./Sports.css"
import { db } from "../components/Database/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router";
import { useContext } from "react";
import UserContext from "../components/Sports-Categories/context";


const Sports = () => {
  
  const history = useHistory();
  const{userInfo, setUserInfo} = useContext(UserContext)
    

  const chosenSports = (e, sport) => {
   
    e.preventDefault();   

    switch(sport){
      case "soccer":
          console.log(userInfo)
          history.push('./Soccer')
          break
      
      case "basketball":
          //alert("you chose basketball")
          history.push('./Basketball')
          break

      case "boxing":
          //alert('you chose boxing')
          history.push('./Boxing')
          break
          
      case "Esport":
          //alert("you chose E-sport")
          history.push('./Esports')
          break

      case "golf":
          //alert('you chose golf')
          history.push('./Golf')
          break
          
      case "Hockey":
          //alert("you chose ice_hockey")
          history.push('./Hockey')
          break

      case "netball":
          history.push('./NetBall')
          
          break
              
      case "rugby":
          //alert("you chose Rugby")
          history.push('./Rugby')
          break

      case "tennis":
          //alert('you chose tenis')
          history.push('./Tennis')
          break
                  
      case "volleyball":
          //alert("you chose volleyball")
          history.push('./VolleyBall')
          break

      default:
          alert('error')
  }

    // alert('Image clicked');
  };
  return (

    <IonContent>
            <IonHeader>
                <IonToolbar mode="ios">
                    <IonLabel >Choose Sports</IonLabel>
                </IonToolbar>
            </IonHeader>

            <IonGrid>

                <IonRow>
                    <IonCol onClick={ (e) => chosenSports(e, 'soccer') 
                  
                  }>
                        <IonCard className="card-style">
                            <IonImg alt="Soccer" src={Soccer}  />
                            <h4>Soccer</h4>
                        </IonCard>
                    </IonCol>

                    <IonCol onClick={(e) => chosenSports(e, 'basketball')}>
                        <IonCard>
                            <IonImg alt="BasketBall" src={Basketball} />
                            <h4>Basketball</h4>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol onClick={(e) => chosenSports(e, 'boxing')}>
                        <IonCard>
                            <IonImg alt="Boxing" src={Boxing} />
                            <h4>Boxing</h4>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard onClick={(e) => chosenSports(e, 'Esport')}>
                            <IonImg alt="Esports" src={Esports} />
                            <h4>Esports</h4>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol onClick={(e) => chosenSports(e, 'tennis')}>
                        <IonCard>
                            <IonImg alt="Tennis" src={Tennis} />
                            <h4>Tennis</h4>
                        </IonCard>
                    </IonCol>

                    <IonCol onClick={(e) => chosenSports(e, 'volleyball')}>
                        <IonCard>
                            <IonImg alt="VolleyBall" src={VolleyBall} />
                            <h4>Volleyball</h4>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol onClick={(e) => chosenSports(e, 'Hockey')}>
                        <IonCard>
                            <IonImg alt="Hockey" src={Hockey} />
                            <h4>Hockey</h4>
                        </IonCard>
                    </IonCol>

                    <IonCol onClick={(e) => chosenSports(e, 'golf')}>
                        <IonCard>
                            <IonImg alt="Golf" src={Golf} />
                            <h4>Golf</h4>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol onClick={(e) => chosenSports(e, 'netball')}>
                        <IonCard>
                            <IonImg alt="NetBall" src={Netball} />
                            <h4>Netball</h4>
                        </IonCard>
                    </IonCol>

                    <IonCol onClick={(e) => chosenSports(e, 'rugby')}>
                        <IonCard>
                            <IonImg alt="Rugby" src={Rugby} />
                            <h4>Rugby</h4>
                        </IonCard>
                    </IonCol>
                </IonRow>

            </IonGrid>

        </IonContent>
  );
};

export default Sports;
