import {
  IonContent,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../Database/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../Database/firebaseConfig";
import { getAuth } from "firebase/auth";
const Netball = () => {
  const [future, setFuture] = useState("");
  const [exerciseRoutine, setExerciseRoutine] = useState("");
  const [membership, setMembership] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [importance, setImportance] = useState("");
  const [background, setbackground] = useState("");
  const history = useHistory();
  const [weight, setWeight] = useState("");
  const [currentteam, setCurrentTeam] = useState("");
  const [height, setHeight] = useState("");

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (future === "",
      exerciseRoutine === "",
      membership === "",
      weight === "",
      position === "",
      experience === "",
      background === "",
      height === "",
      currentteam === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Netball/info/${email}`);

    addDoc(Sportsinfo, {
      future: future,
      exerciseRoutine: exerciseRoutine,
      membership: membership,
      weight: weight,
      position: position,
      experience: experience,
      background: background,
      height: height,
      currentteam: currentteam,
    })
      .then((response) => {
        console.log(response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setHeight("");
    setFuture("");
    setExerciseRoutine("");
    setMembership("");
    setCurrentTeam("");
    setbackground("");
    setWeight("");
    setHeight("");
    setExperience("");
    history.push("/News");
  };

  return (
    <IonContent>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar">
          <IonTitle>Applying For NetBall</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="header">
        <h2>Fill in Information</h2>
      </div>

      <div className="wrapper">
        <IonCard className="form-wrapper">
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Height (cm)</IonLabel>
              <IonInput
                value={height}
                placeholder="Enter text"
                onIonChange={(e) => setHeight(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="sttacked">Weight (kg)</IonLabel>
              <IonInput
                value={weight}
                placeholder="Enter text"
                onIonChange={(e) => setWeight(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked"> Position</IonLabel>
              <IonSelect
                value={position}
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
              <IonSelect
                value={position}
                onIonChange={(e) => setPosition(e.target.value)}
                placeholder="Select Playing Position"
              >
                <IonSelectOption>GS: Goal Shooter</IonSelectOption>
                <IonSelectOption>GA: Goal Attack</IonSelectOption>
                <IonSelectOption>WA: Wing Attack</IonSelectOption>
                <IonSelectOption>C: Centre</IonSelectOption>
                <IonSelectOption>WD: Wing Defence</IonSelectOption>
                <IonSelectOption>GD: Goal Defence </IonSelectOption>
                <IonSelectOption>GK: Goal Keeper</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Membership type</IonLabel>
              <IonSelect
                value={membership}
                placeholder="Select Membership type"
                onIonChange={(e) => setMembership(e.target.value)}
              >
                <IonSelectOption> Senior</IonSelectOption>
                <IonSelectOption> A-Grade</IonSelectOption>
                <IonSelectOption> B-Grade</IonSelectOption>
                <IonSelectOption> C-Grade</IonSelectOption>
                <IonSelectOption> Affiliate</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Exercise Routine </IonLabel>
              <IonSelect
                value={exerciseRoutine}
                placeholder="Select Exercise Routine"
                onIonChange={(e) => setExerciseRoutine(e.target.value)}
              >
                <IonSelectOption> Everyday</IonSelectOption>
                <IonSelectOption> Once a week</IonSelectOption>
                <IonSelectOption> Three times a week</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>How far will you go</IonLabel>
              <IonSelect
                value={future}
                placeholder="Where do you see yourself going"
                onIonChange={(e) => setFuture(e.target.value)}
              >
                <IonSelectOption> Locally </IonSelectOption>
                <IonSelectOption> Interstate </IonSelectOption>
                <IonSelectOption> Internationally </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Volleyball experience</IonLabel>
              <IonSelect
                value={experience}
                placeholder="Experience level"
                onIonChange={(e) => setExperience(e.target.value)}
              >
                <IonSelectOption> New to the game </IonSelectOption>
                <IonSelectOption> School/Varsity </IonSelectOption>
                <IonSelectOption> Social League </IonSelectOption>
                <IonSelectOption> Competitive League </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel> Netball Background</IonLabel>
              <IonTextarea
                value={background}
                position="floating"
                onIonChange={(e) => setbackground(e.target.value)}
                placeholder="Type here"
              ></IonTextarea>
            </IonItem>

            <IonItem>
              <IonLabel>What's important to you?</IonLabel>
              <IonSelect
                value={importance}
                placeholder="Why is it important to you?"
                onIonChange={(e) => setImportance(e.target.value)}
              >
                <IonSelectOption> Fitness </IonSelectOption>
                <IonSelectOption> Skill development </IonSelectOption>
                <IonSelectOption> Fun </IonSelectOption>
                <IonSelectOption> Winning </IonSelectOption>
                <IonSelectOption> Court-time </IonSelectOption>
                <IonSelectOption> Other </IonSelectOption>
              </IonSelect>
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
export default Netball;
