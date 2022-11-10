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
  const [team, setTeam] = useState("");
  const [primaryPosition, setPrimaryPosition] = useState("");
  const [secondaryPosition, setSecondaryPosition] = useState("");
  const [expLevel, setExpLevel] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const history = useHistory();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (height === "",
      weight === "",
      expLevel === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Tennis/info/${email}`);

    addDoc(Sportsinfo, {
      height: height,
      weight: weight,
      expLevel: expLevel,
      
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setHeight("");
    setExpLevel("");
    setTeam("");
    setWeight("");
    history.push("/News");
  };

  return (
    <IonContent>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For Tennis</IonTitle>
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
                <IonLabel position="floating">Experience Level</IonLabel>
                <IonSelect
                  value={expLevel}
                  onIonChange={(e) => setExpLevel(e.target.value)}
                  placeholder="Select Experience"
                >
                  <IonSelectOption> Beginner</IonSelectOption>
                  <IonSelectOption> Semi-pro</IonSelectOption>
                  <IonSelectOption> Professional</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Height</IonLabel>
                <IonInput
                  type="number"
                  placeholder="in feet"
                  value={height}
                  onIonChange={(e) => setHeight(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Weight</IonLabel>
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
