import {
  IonCard,
  IonCardContent,
  IonButton,
  IonToolbar,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";

import { db } from "../../Database/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useHistory } from "react-router";
import { auth } from "../../Database/firebaseConfig";
import { getAuth } from "firebase/auth";
const Hockey = () => {
  //variables:
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyfat, setBodyFat] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [goalScored, setGoalScored] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState("");

  const history = useHistory();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (height === "",
      weight === "",
      bodyfat === "",
      position === "",
      experience === "",
      goalScored === "",
      gamesPlayed === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Hockey/info/${email}`);

    addDoc(Sportsinfo, {
      height: height,
      weight: weight,
      bodyfat: bodyfat,
      position: position,
      experience: experience,
      goalScored: goalScored,
      gamesPlayed: gamesPlayed,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setHeight("");
    setWeight("");
    setBodyFat("");
    setPosition("");
    setExperience("");
    setGoalScored("");
    setGamesPlayed("");

    history.push("/News");
  };

  return (
    <IonContent>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying for Ice Hockey</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>
            {/* <IonLabel className="header-style">fill in the following</IonLabel> */}

            <IonItem>
              <IonLabel position="stacked">height in cm</IonLabel>
              <IonInput
                value={height}
                onIonChange={(e) => setHeight(e.target.value)}
                class="error"
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">weight in kg</IonLabel>
              <IonInput
                value={weight}
                onIonChange={(e) => setWeight(e.target.value)}
                class="error"
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">body fat in %</IonLabel>
              <IonInput
                value={bodyfat}
                onIonChange={(e) => setBodyFat(e.target.value)}
                class="error"
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Select position</IonLabel>
              <IonSelect
                value={position}
                onIonChange={(e) => setPosition(e.target.value)}
              >
                <IonSelectOption value="student">forward</IonSelectOption>
                <IonSelectOption value="facultyAdmin">defender</IonSelectOption>
                <IonSelectOption value="staff">goal tender</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Chose playing level</IonLabel>
              <IonSelect
                value={experience}
                onIonChange={(e) => setExperience(e.target.value)}
              >
                <IonSelectOption value="collage player">
                  Amature
                </IonSelectOption>
                <IonSelectOption value="collage player">
                  Semi-Pro
                </IonSelectOption>
                <IonSelectOption value="professional player">
                  professional player
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">number of goals</IonLabel>
              <IonInput
                value={goalScored}
                onIonChange={(e) => setGoalScored(e.target.value)}
                class="error"
                type="number"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">number of games played</IonLabel>
              <IonInput
                value={gamesPlayed}
                onIonChange={(e) => setGamesPlayed(e.target.value)}
                class="error"
                type="number"
              ></IonInput>
            </IonItem>

            <IonButton
              onClick={registerhandler}
              expand="full"
              shape="round"
              style={{ marginTop: 20 }}
            >
              Submit form
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  );
};

export default Hockey;
