import {
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../Database/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../Database/firebaseConfig";

import { getAuth } from "firebase/auth";
const Soccer = () => {
  const [currentteam, setCurrentTeam] = useState("");
  const [primaryposition, setPrimaryPosition] = useState();
  const [secondposition, setSecondPosition] = useState();
  const [experience, setExperience] = useState();
  const [gamesplayed, setGamesplayed] = useState();
  const [tournamentsplayed, setTournamentsPlayed] = useState();
  const [weight, setWeight] = useState();

  const history = useHistory();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (currentteam === "",
      primaryposition === "",
      secondposition === "",
      experience === "",
      gamesplayed === "",
      tournamentsplayed === "",
      weight === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Soccer`);

    addDoc(Sportsinfo, {
      currentteam: currentteam,
      primaryposition: primaryposition,
      secondposition: secondposition,
      experience: experience,
      gamesplayed: gamesplayed,
      tournamentsplayed: tournamentsplayed,
      weight: weight,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setCurrentTeam("");
    setPrimaryPosition("");
    setSecondPosition("");
    setExperience("");
    setGamesplayed("");
    setTournamentsPlayed("");
    setWeight("");
    history.push("/News");
  };

  return (
    <IonContent>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For Soccer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Current Soccer Team</IonLabel>
                <IonInput
                  type="text"
                  value={currentteam}
                  onIonChange={(e) => setCurrentTeam(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Primary Position</IonLabel>
                <IonSelect
                  value={primaryposition}
                  onIonChange={(e) => setPrimaryPosition(e.target.value)}
                >
                  <IonSelectOption> Striker</IonSelectOption>
                  <IonSelectOption> Right Winger</IonSelectOption>
                  <IonSelectOption> Left Winger</IonSelectOption>
                  <IonSelectOption> Midfielder</IonSelectOption>
                  <IonSelectOption> Right Back</IonSelectOption>
                  <IonSelectOption> Left Back</IonSelectOption>
                  <IonSelectOption> Goal Keeper</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Second Position</IonLabel>
                <IonSelect
                  value={secondposition}
                  onIonChange={(e) => setSecondPosition(e.target.value)}
                >
                  <IonSelectOption> Striker</IonSelectOption>
                  <IonSelectOption> Right Winger</IonSelectOption>
                  <IonSelectOption> Left Winger</IonSelectOption>
                  <IonSelectOption> Midfielder</IonSelectOption>
                  <IonSelectOption> Right Back</IonSelectOption>
                  <IonSelectOption> Left Back</IonSelectOption>
                  <IonSelectOption> Goal Keeper</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem style={{ marginTop: 8 }}>
                <IonLabel position="stacked">Number of Games played</IonLabel>
                <IonInput
                  autocomplete="off"
                  placeholder="Number of Games played"
                  type="number"
                  value={gamesplayed}
                  onIonChange={(e) => setGamesplayed(e.target.value)}
                ></IonInput>
              </IonItem>

              <IonItem style={{ marginTop: 8 }}>
                <IonLabel position="stacked">
                  How Many Tournaments Have You Played
                </IonLabel>
                <IonInput
                  autocomplete="off"
                  placeholder="Tournaments Played"
                  type="number"
                  value={tournamentsplayed}
                  onIonChange={(e) => setTournamentsPlayed(e.target.value)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Experience Level</IonLabel>
                <IonSelect
                  value={experience}
                  onIonChange={(e) => setExperience(e.target.value)}
                >
                  <IonSelectOption> Beginner</IonSelectOption>
                  <IonSelectOption> Semi-pro</IonSelectOption>
                  <IonSelectOption> Professional</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Height</IonLabel>
                <IonInput type="number" placeholder="in m" />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Weight</IonLabel>
                <IonInput
                  type="number"
                  placeholder="in kg"
                  value={weight}
                  onIonChange={(e) => setWeight(e.target.value)}
                />
              </IonItem>

              <IonButton
                expand="full"
                shape="round"
                routerLink="/SoccerApplicants"
                onClick={registerhandler}
                style={{ marginTop: 20 }}
              >
                APPLY
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  );
};

export default Soccer;
