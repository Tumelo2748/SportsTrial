import {
  IonCard,
  IonCardContent,
  IonContent,
  IonButton,
    IonHeader,
    IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
    IonSelectOption,
  IonSelect,
 } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../Database/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { auth } from '../../Database/firebaseConfig';
import { getAuth } from "firebase/auth";
const Rugby = () => {
  const [height, setHeight] = useState("");
  const [position, setPosition] = useState('');
  const [weight, setWeight] = useState('');
  const [strength, setStrength] = useState('');
  const [speed, setSpeed] = useState('');
  const [team, setTeam] = useState('');

  const history = useHistory();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (height === "",
      weight === "",
      position === "",
      strength === "",
      team === "",
      speed === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Rugby/info/${email}`);

    addDoc(Sportsinfo, {
      height : height,
      position :position,
      strength :strength,
      speed :speed,
      weight :weight,
      team :team,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setHeight("");
    setPosition("");
    setSpeed("");
    setWeight("");
    setStrength("");
    setTeam("");

    history.push("/News");
  
  };
  


    return (
      <IonContent>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For Rugby</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Current Soccer Team</IonLabel>
              <IonInput
                type="text"
                value={team}
                onIonChange={(e) => setTeam(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked"> Position</IonLabel>
              <IonSelect value={position}
                onIonChange={(e) => setPosition(e.target.value)}
              >
                <IonSelectOption> Hooker</IonSelectOption>
                <IonSelectOption> Right Prop</IonSelectOption>
                <IonSelectOption> Left Prop</IonSelectOption>
                <IonSelectOption> Left Lock</IonSelectOption>
                <IonSelectOption> Left Lock</IonSelectOption>
                <IonSelectOption> Left Flanker</IonSelectOption>
                <IonSelectOption> Left Flanker</IonSelectOption>
                <IonSelectOption> Number eight</IonSelectOption>
                <IonSelectOption> Scrum-half</IonSelectOption>
                <IonSelectOption> Fly-half</IonSelectOption>
                <IonSelectOption> Inside center</IonSelectOption>
                <IonSelectOption> Outside center</IonSelectOption>
                <IonSelectOption> Left Wing</IonSelectOption>
                <IonSelectOption> Right Wing</IonSelectOption>
                <IonSelectOption> Full-back</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Speed</IonLabel>
              <IonInput
                type="float"
                placeholder="in m/s"
                value={speed}
                onIonChange={(e) => setSpeed(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Power and Strength</IonLabel>
              <IonInput
                type="float"
               value={strength}
               onIonChange={(e) => setStrength(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Height</IonLabel>
              <IonInput
                type="number"
                value={height}
                onIonChange={(e) => setHeight(e.target.value)}
                placeholder="in m"
                
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Weight</IonLabel>
              <IonInput
                type="number"
                value={weight}
                placeholder="in kg"
                onIonChange={(e) => setWeight(e.target.value)}  
              />
            </IonItem>
            {/* <IonItem>
            <IonButton color='warning' onClick={() => TakePhoto()}> Take a Photo </IonButton>
            {cameraImage && <IonImg src={cameraImage} />}
            </IonItem> */}
            
              <IonButton
                expand="full"
                shape="round"
                onClick={registerhandler}
                style={{ marginTop: 20 }}
              >
                APPLY
              </IonButton>
            
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
    );
};

export default Rugby;
