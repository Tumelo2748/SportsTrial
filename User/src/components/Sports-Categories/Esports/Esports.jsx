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

const Esports = () => {
  const history = useHistory();

  const [genre, setGenre] = useState("");
  const [experience, setExperience] = useState();
  const [gamesplayed, setGamesplayed] = useState();
  const [tournamentsplayed, setTournamentsPlayed] = useState();
  const [platform, setPlatform] = useState();

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();

    if (
      (genre === "",
      experience === "",
      gamesplayed === "",
      tournamentsplayed === "",
      platform === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Esports/info/${email}`);

    addDoc(Sportsinfo, {
      genre: genre,
      experience: experience,
      gamesplayed: gamesplayed,
      tournamentsplayed: tournamentsplayed,
      platform: platform,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setGenre("");
    setExperience("");
    setGamesplayed("");
    setTournamentsPlayed("");
    setPlatform("");

    history.push("/News");
  };

  return (
    <IonContent fullscreen>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For Esports</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>
            <IonItem lines="none" style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Genre</IonLabel>
              <IonSelect
                placeholder="Select Genre "
                value={genre}
                onIonChange={(e) => setGenre(e.target.value)}
              >
                <IonSelectOption value="Fighting">Fighting</IonSelectOption>
                <IonSelectOption value="Racing">Racing</IonSelectOption>
                <IonSelectOption value="Digital-Card">
                  Digital Card
                </IonSelectOption>
                <IonSelectOption value="Real-Time-Strategy">
                  Real-Time-Strategy
                </IonSelectOption>
                <IonSelectOption value="Fps">
                  First Person Shooter
                </IonSelectOption>
                <IonSelectOption value="Tps">
                  Third Person Shooter
                </IonSelectOption>
                <IonSelectOption value="Multiplayer">
                  Multiplayer Online Battle Arena
                </IonSelectOption>
                <IonSelectOption value="Sports">Sports</IonSelectOption>
              </IonSelect>
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

            <IonItem lines="none" style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Number of Games played</IonLabel>
              <IonInput
                autocomplete="off"
                placeholder="Number of Games played"
                type="number"
                value={gamesplayed}
                onIonChange={(e) => setGamesplayed(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem lines="none" style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Tournaments Played</IonLabel>
              <IonInput
                autocomplete="off"
                placeholder="Tournaments Played"
                type="number"
                value={tournamentsplayed}
                onIonChange={(e) => setTournamentsPlayed(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem lines="none" style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Gaming Platform</IonLabel>
              <IonSelect
                placeholder="Choose Platform"
                value={platform}
                onIonChange={(e) => setPlatform(e.target.value)}
              >
                <IonSelectOption value="Console">Console</IonSelectOption>
                <IonSelectOption value="Computer">Computer</IonSelectOption>
                <IonSelectOption value="Mobile">Mobile</IonSelectOption>
              </IonSelect>
            </IonItem>
            {/* <IonItem>
            <IonButton color='warning' onClick={() => TakePhoto()}> Take a Photo </IonButton>
            {cameraImage && <IonImg src={cameraImage} />}
            </IonItem> */}

            <IonButton
              expand="full"
              shape="round"
              routerLink="/EsportsApplicants"
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

export default Esports;
