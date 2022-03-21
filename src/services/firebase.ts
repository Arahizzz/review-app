import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

export function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCmj1PpjYhrf32PGnW_-42c6aszHXJ9nmw",
        authDomain: "review-poster.firebaseapp.com",
        projectId: "review-poster",
        storageBucket: "review-poster.appspot.com",
        messagingSenderId: "754596621601",
        appId: "1:754596621601:web:bcf3dc56ecf10de2f42260",
        measurementId: "G-0FYZEEPZW8"
    };
    initializeApp(firebaseConfig);
}

export function collectStatisticsEvent(
    eventName: string,
    params: { [key: string]: string | number | boolean } = {}
) {
    const analytics = getAnalytics();
    logEvent(analytics, eventName, params)
}
