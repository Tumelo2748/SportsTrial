import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { auth } from "../components/Database/firebaseConfig";
import { deleteUser } from "firebase/auth";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { storage } from "../components/Database/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { Camera, CameraResultType } from "@capacitor/camera";

const Settings = () => {
  const history = useHistory();
  const user = auth.currentUser;
  const [emailUpdate, setEmailUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [showImg, setShowImg] = useState("");

  const update = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User".displayName, 
      photoURL: "https://example.com/jane-q-user/profile.jpg".photoURL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

  };

  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    setUserPhoto(image.webPath);
    //  setShowImg(userPhoto);

    console.log(image.webPath);
  };

  const accountDelete = () => {
    console.log("wornking");

    deleteUser(user)
      .then(() => {
        alert("User deleted.");
        history.push("/");
      })
      .catch((error) => {
        alert("An error ocurred");
        // ...
      });
  };

  return (
    <IonContent>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sporting Trials</IonTitle>
          </IonToolbar>
          <IonList>
            <IonItem>
              <IonLabel>
                <a href="/Trials">Trials</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <a href="/News">News</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <a href="/Settings">Settings</a>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonHeader>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonAvatar className="Avatar">
          {/* <img
            alt="Silhouette of a person's head"
            src="https://library.sportingnews.com/styles/facebook_1200x630/s3/2021-11/harry-maguire-manchester-united-2021-22_p2t9jnwqa4t91hvpx0wtc5560.jpg?itok=r8cejvN5"
          /> */}

          <img onClick={()=>takePicture()}
          alt="Picture"
          src={userPhoto} 
        />
        </IonAvatar>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={emailUpdate}
            onIonChange={(e) => setEmailUpdate(e.target.value)}
            type="email"
            placeholder="email@domain.com"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            value={passwordUpdate}
            onIonChange={(e) => setPasswordUpdate(e.target.value)}
            type="text"
            placeholder="Update your Password"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            value={confirmPass}
            onIonChange={(e) => setConfirmPass(e.target.value)}
            type="text"
            placeholder="Confirm Password"
          ></IonInput>
        </IonItem>

        <IonButton onClick={update}>Update</IonButton>
        <IonButton onClick={accountDelete}>Delete</IonButton>
      </IonPage>
    </IonContent>
  );
};

export default Settings;
