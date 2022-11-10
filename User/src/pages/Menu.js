import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import {settingsOutline} from 'ionicons/icons'

const Menu = () => {
    return ( 
        <>
        <IonContent>
          
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Sporting Trials</IonTitle>
            </IonToolbar>
            <IonList>
                <IonItem>
                    <IonLabel><a href="/Trials">Trials</a></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel><a href="/News">News</a></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                      <IonIcon icon={settingsOutline}/>
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
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          
        </IonPage>
        

        </IonContent>
      </>
     );
}
 
export default Menu;