// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvqFfJa6pt2L3ql2CpMa47OENqpwzpOY0",
  authDomain: "push-fa1dc.firebaseapp.com",
  projectId: "push-fa1dc",
  storageBucket: "push-fa1dc.firebasestorage.app",
  messagingSenderId: "469002509402",
  appId: "1:469002509402:web:abe9531d86dc1e6261cc63",
  measurementId: "G-NVV1K81YKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission == "granted"){
        const token = await getToken(messaging , {
            vapidKey : "BG3gyRRokZ_i76oDviiWt9FlKNR2atwc0Z4TQwJ52vZe3wfW9xnN6saQrxr_CO9OoZkPNl9SfQa3kM68JZ7FAH0"
        });
        console.log(token);
    }
};