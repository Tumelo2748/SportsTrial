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
import "../SportsCategories.css";
import { auth } from "../../Database/firebaseConfig";
import { getAuth } from "firebase/auth";

const BasketBall = () => {
  const [height, setHeight] = useState("");
  const [position, setPosition] = useState();
  const [experience, setExperience] = useState();
  const [gamesplayed, setGamesplayed] = useState();
  const [tournamentsplayed, setTournamentsPlayed] = useState();
  const [dominanthand, setDominantHand] = useState();
  const [confidence, setConfidence] = useState();
  const [speed, setSpeed] = useState();
  const [details, setDetails] = useState(null);
  const history = useHistory();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;

    e.preventDefault();

    if (
      height === "" ||
      position === "" ||
      experience === "" ||
      gamesplayed === "" ||
      tournamentsplayed === "" ||
      dominanthand === "" ||
      confidence === "" ||
      speed === ""
    ) {
      alert("all data is required");
    }

    const Sportsinfo = collection(db, `User/Sports/BasketBall/info/${email}`);

    addDoc(Sportsinfo, {
      height: height,
      position:  position,
      experience: experience,
      gamesplayed: gamesplayed,
      tournamentsplayed: tournamentsplayed,
      dominanthand: dominanthand,
      confidence: confidence,
      speed: speed,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setHeight("");
    setPosition("");
    setExperience("");
    setGamesplayed("");
    setTournamentsPlayed("");
    setDominantHand("");
    setConfidence("");
    setSpeed("");

    history.push("/News");
  };

  return (
    <IonContent fullscreen>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For BasketBall</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Height</IonLabel>

              <IonInput
                autocomplete="off"
                placeholder="Height"
                type="number"
                value={height}
                onIonChange={(e) => setHeight(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Select Position</IonLabel>
              <IonSelect
                placeholder="Select Position"
                value={position}
                onIonChange={(e) => setPosition(e.target.value)}
              >
                <IonSelectOption value="center">Center(C)</IonSelectOption>
                <IonSelectOption value="powerforward">
                  Power Forward(PF)
                </IonSelectOption>
                <IonSelectOption value="smallforward">
                  Small Forward(SF)
                </IonSelectOption>
                <IonSelectOption value="pointguard">
                  Point Guard(PG)
                </IonSelectOption>
                <IonSelectOption value="shootingguard">
                  Shooting Guard(SG)
                </IonSelectOption>
                <IonSelectOption value="hybrid">Hybrid</IonSelectOption>
              </IonSelect>
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
                <IonSelectOption value="Semi-Prop">
                  Professional
                </IonSelectOption>
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

            <IonItem style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Dominant hand (L/R)</IonLabel>
              <IonSelect
                placeholder="Select Your Dominant Hand"
                value={dominanthand}
                onIonChange={(e) => setDominantHand(e.target.value)}
              >
                <IonSelectOption value="Right">Right</IonSelectOption>
                <IonSelectOption value="Left">Left</IonSelectOption>
                <IonSelectOption value="Hybrid">Hybrid</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Confidence</IonLabel>
              <IonSelect
                placeholder="How Confident Are You?"
                value={confidence}
                onIonChange={(e) => setConfidence(e.target.value)}
              >
                <IonSelectOption value="Not Confident">
                  Not Confident
                </IonSelectOption>
                <IonSelectOption value="Moderate">Moderate</IonSelectOption>
                <IonSelectOption value="Very Confident">
                  Very Confident
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">What is your Speed</IonLabel>
              <IonInput
                position="stacked"
                placeholder="in m/s"
                value={speed}
                onIonChange={(e) => setSpeed(e.target.value)}
              />
            </IonItem>

            {/* <IonItem>
            <IonButton color='warning' onClick={() => TakePhoto()}> Take a Photo </IonButton>
            {cameraImage && <IonImg src={cameraImage} />}
            </IonItem> */}

            <IonButton
              expand="full"
              shape="round"
              routerLink="/BasketBallApplicants"
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

export default BasketBall;
