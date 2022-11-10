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
import { db, users } from "../../Database/firebaseConfig";
import { addDoc, collection, where } from "firebase/firestore";
import { useHistory } from "react-router";
import { auth } from "../../Database/firebaseConfig";
import { getAuth } from "firebase/auth";

const Volleyball = () => {
  const [approachTouch, setApproachTouch] = useState("");
  const [standingReach, setStandingReach] = useState("");
  const [blockTouch, setBlockTouch] = useState("");
  const [dominantHand, setDominantHand] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [future, setFuture] = useState("");
  const [membership, setMembership] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [importance, setImportance] = useState("");
  const [background, setbackground] = useState("");
  const history = useHistory();
  const [exercise, setExercise] = useState("");

  const registerhandler = (e) => {
    const auth = getAuth();
    const email = auth.email;
    e.preventDefault();
    if (
      (height === "",
      position === "",
      experience === "",
      approachTouch === "",
      standingReach === "",
      future === "",
      importance === "",
      weight === "",
      exercise === "",
      blockTouch === "",
      dominantHand === "",
      background === "")
    ) {
      return;
    }
    const Sportsinfo = collection(db, `User/Sports/Volleyball/info/${email}`);

    addDoc(Sportsinfo, {
      height: height,
      position: position,
      experience: experience,
      approachTouch: approachTouch,
      standingReach: standingReach,
      future: future,
      importance: importance,
      exercise: exercise,
      blockTouch: blockTouch,
      dominantHand: dominantHand,
      background: background,
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
    setApproachTouch("");
    setWeight("");
    setDominantHand("");
    setbackground("");
    setFuture("");
    setImportance("");
    setStandingReach("");
    setExercise("");

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
            <IonItem>
              <IonLabel position="stacked">Height (cm)</IonLabel>
              <IonInput
                value={height}
                placeholder="Enter text"
                onIonChange={(e) => setHeight(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Weight (kg)</IonLabel>
              <IonInput
                value={weight}
                placeholder="Enter text"
                onIonChange={(e) => setWeight(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Dominant hand </IonLabel>
              <IonInput
                value={dominantHand}
                placeholder="Left or right "
                onIonChange={(e) => setDominantHand(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Block Touch</IonLabel>
              <IonInput
                value={blockTouch}
                placeholder="Enter text"
                onIonChange={(e) => setBlockTouch(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Standing Reach</IonLabel>
              <IonInput
                value={standingReach}
                placeholder="Enter text"
                onIonChange={(e) => setStandingReach(e.target.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Approach Touch</IonLabel>
              <IonInput
                value={approachTouch}
                onIonChange={(e) => setApproachTouch(e.target.value)}
                placeholder="Enter text"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Playing Position </IonLabel>
            </IonItem>
            <IonItem>
              <IonSelect
                value={position}
                onIonChange={(e) => setPosition(e.target.value)}
                placeholder="Select Playing Position"
              >
                <IonSelectOption>Outside hitter</IonSelectOption>
                <IonSelectOption>Opposite</IonSelectOption>
                <IonSelectOption>Setter</IonSelectOption>
                <IonSelectOption>Middle blocker</IonSelectOption>
                <IonSelectOption>Libero</IonSelectOption>
                <IonSelectOption>Defensive specialist </IonSelectOption>
                <IonSelectOption>Serving specialist.</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Membership type </IonLabel>
            </IonItem>
            <IonItem>
              <IonSelect
                value={membership}
                placeholder="Select Membership type"
                onIonChange={(e) => setMembership(e.target.value)}
              >
                <IonSelectOption>Senior</IonSelectOption>
                <IonSelectOption>A-Grade</IonSelectOption>
                <IonSelectOption>B-Grade</IonSelectOption>
                <IonSelectOption>C-Grade</IonSelectOption>
                <IonSelectOption>Affiliate</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Exercise Routine</IonLabel>
            </IonItem>
            <IonItem>
              <IonSelect
                value={exercise}
                placeholder="Select Exercise Routine"
                onIonChange={(e) => setExercise(e.target.value)}
              >
                <IonSelectOption>Once a week </IonSelectOption>
                <IonSelectOption>Three times a week</IonSelectOption>
                <IonSelectOption>Everyday</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">How far will you go </IonLabel>
            </IonItem>
            <IonItem>
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
              <IonLabel position="stacked">Netball experience</IonLabel>
            </IonItem>
            <IonItem>
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
              <IonLabel position="stacked"> Netball history </IonLabel>
              <IonTextarea
                value={background}
                onIonChange={(e) => setbackground(e.target.value)}
                placeholder="Type here"
              ></IonTextarea>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">What's important to you?</IonLabel>
            </IonItem>
            <IonItem>
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

export default Volleyball;
