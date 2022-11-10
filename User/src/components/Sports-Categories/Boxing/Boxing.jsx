import {
  IonCard,
  IonCardContent,
  IonContent,
  IonButton,
  IonTextarea,
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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Database/firebaseConfig";
import { auth } from '../../Database/firebaseConfig';

import { getAuth } from "firebase/auth";
const Boxing = () => {
  const [height, setHeight] = useState("");
  const [bodyweight, setBodyWeight] = useState("");
  const [currentteam, setCurrentTeam] = useState();
  const [experience, setExperience] = useState();
  const [matchesplayed, setMatchesplayed] = useState();
  const [currentmanager, setCurrentManager] = useState();
  const [wins, setWins] = useState();
  const [losses, setLosses] = useState();
  const [managercontact, setManagerContact] = useState();
  const [description, setDescription] = useState();
  const [exerciseroutine, setExcerciseRoutine] = useState();
  const [speed, setSpeed] = useState();

  const history = useHistory();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (height === "",
      currentteam === "",
      experience === "",
      matchesplayed === "",
      wins === "",
      losses === "",
      exerciseroutine === "",
      speed === "",
      currentmanager === "",
      managercontact === "",
      description === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/BasketBall/info/${email}`);

    addDoc(Sportsinfo, {
      height: height ,
      bodyweight: bodyweight ,
      experience: experience ,
      matchesplayed: matchesplayed ,
      wins: wins ,
      losses: losses ,
      speed: speed ,
      exerciseroutine: exerciseroutine ,
      currentteam: currentteam ,
      currentmanager: currentmanager ,
      managercontact: managercontact ,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setHeight("");
    setBodyWeight("");
    setCurrentTeam("");
    setCurrentManager("");
    setManagerContact("");
    setExperience("");
    setMatchesplayed("");
    setSpeed("");
    setWins("");
    setLosses("");

    history.push("/News");
  };

  return (
    <IonContent fullscreen>
      <IonHeader className="" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For Boxing</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>


        <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>

        <IonItem style={{ marginTop: 8 }}>
          <IonLabel positon="stacked">Height</IonLabel>
          <IonInput
            type="text"
            value={height}
            onIonChange={(e) => setHeight(e.target.value)}
            placeholder="in Feet "
          ></IonInput>
        </IonItem>

        <IonItem style={{ marginTop: 8 }}>
          <IonLabel positon="stacked">Speed</IonLabel>
          <IonInput
            type="text"
            value={speed}
            onIonChange={(e) => setSpeed(e.target.value)}
            placeholder="in ms"
          ></IonInput>
        </IonItem>

        <IonItem style={{ marginTop: 8 }}>
          <IonLabel position="stacked">Select Experience</IonLabel>
          <IonSelect
            placeholder="Select Experience"
            value={experience}
            onIonChange={(e) => setExperience(e.target.value)}
          >
            <IonSelectOption value="Amateur">Amateur</IonSelectOption>
            <IonSelectOption value="Semi-Pro">Semi-Pro</IonSelectOption>
            <IonSelectOption value="Semi-Prop">Professional</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Current team</IonLabel>
          <IonInput
            type="text"
            value={currentteam}
            onIonChange={(e) => setCurrentTeam(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Body weight</IonLabel>
          <IonInput
            type="text"
            value={bodyweight}
            onIonChange={(e) => setBodyWeight(e.target.value)}
            placeholder="in kg"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Exercise routine:</IonLabel>
          <IonTextarea
            value={exerciseroutine}
            onIonChange={(e) => setExcerciseRoutine(e.target.value)}
            placeholder="Short describe your Exercise Routine"
            autoCapitalize="string"
          ></IonTextarea>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Number of matches played</IonLabel>
          <IonInput
            type="number"
            value={matchesplayed}
            onIonChange={(e) => setMatchesplayed(e.target.value)}
            placeholder="Matched played"
          ></IonInput>
        </IonItem>
        <IonItem>

        
          <IonLabel position="stacked">Wins</IonLabel>
          <IonInput
            type="number"
            value={wins}
            onIonChange={(e) => setWins(e.target.value)}
            placeholder="Wins"
          ></IonInput>
        </IonItem>

        <IonItem>        
          <IonLabel position="stacked">Losses</IonLabel>
          <IonInput
            type="number"
            value={losses}
            onIonChange={(e) => setLosses(e.target.value)}
            placeholder="Losses"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Current Manager name</IonLabel>
          <IonInput
            type="text"
            value={currentmanager}
            onIonChange={(e) => setCurrentManager(e.target.value)}
            placeholder="Manager Name"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Current Manager contact details
          </IonLabel>
          <IonInput
            type="text"
            value={managercontact}
            onIonChange={(e) => setManagerContact(e.target.value)}
            placeholder="Manager Contact"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Describe what boxing means to you.</IonLabel>
          <IonTextarea
            value={description}
            onIonChange={(e) => setDescription(e.target.value)}
            autoGrow="true"
            autoCapitalize="string"

          ></IonTextarea>
        </IonItem>

        <IonButton
          expand="full"
          shape="round"
          routerLink="/BoxingApplicants"
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

export default Boxing;
