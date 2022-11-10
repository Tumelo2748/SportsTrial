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
import { auth } from "../../Database/firebaseConfig";
import { getAuth } from "firebase/auth";
const Golf = () => {
  const history = useHistory();

  const [gamesplayed, setGamesPlayed] = useState("");
  const [avgpoints, setAvgpoints] = useState("");
  const [totalpoints, setTotalpoints] = useState("");
  const [pointsgained, setPointsGained] = useState("");
  const [pointslossed, setPointslossed] = useState("");
  const [experience, setExperience] = useState("");
  const [matchesplayed, setMatchesplayed] = useState("");

  const Apply = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (gamesplayed === "",
      avgpoints === "",
      experience === "",
      gamesplayed === "",
      totalpoints === "",
      pointsgained === "",
      pointslossed === "",
      matchesplayed === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Golfinfo/${email}`);

    addDoc(Sportsinfo, {
      gamesplayed: gamesplayed ,
      avgpoints: avgpoints ,
      experience: experience ,
      totalpoints: totalpoints ,
      pointsgained: pointsgained ,
      pointslossed: pointslossed ,
      matchesplayed: matchesplayed ,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setAvgpoints("");
    setGamesPlayed("");
    setExperience("");
    setPointsGained("");
    setPointslossed("");
    setExperience("");
    setMatchesplayed("");

    history.push("/News");
  };

  return (
    <IonContent fullscreen>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For Golf</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Games Played</IonLabel>
              <IonInput
                placeholder="Enter Number of Games Played"
                value={gamesplayed}
                onIonChange={(e) => setGamesPlayed(e.target.value)}
                class="error"
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem lines="none" style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Select Experience</IonLabel>
              <IonSelect
                placeholder="Select Experience"
                value={experience}
                onIonChange={(e) => setExperience(e.target.value)}
              >
                <IonSelectOption value="Amateur">Amateur</IonSelectOption>
                <IonSelectOption value="Semi-Pro">Semi-Pro</IonSelectOption>
                <IonSelectOption value="Semi-Prop">
                  Professional
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Average Points</IonLabel>
              <IonInput
                placeholder="What is your Average Points"
                value={avgpoints}
                onIonChange={(e) => setAvgpoints(e.target.value)}
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Total Points</IonLabel>
              <IonInput
                placeholder="What is your Total Points"
                value={totalpoints}
                onIonChange={(e) => setTotalpoints(e.target.value)}
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Points Gained</IonLabel>
              <IonInput
                placeholder="How many Points Have you Gained"
                value={pointsgained}
                onIonChange={(e) => setPointsGained(e.target.value)}
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Points Lost</IonLabel>
              <IonInput
                placeholder="How many Points Have you Lost "
                value={pointslossed}
                onIonChange={(e) => setPointslossed(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonButton
              expand="full"
              shape="round"
              routerLink="/GolfApplicants"
              onClick={Apply}
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

export default Golf;
