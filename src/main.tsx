import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeFirebase, collectStatisticsEvent } from "./services/firebase";

initializeFirebase()

collectStatisticsEvent("review_app_launch")

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
