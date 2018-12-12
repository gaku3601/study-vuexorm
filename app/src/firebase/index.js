import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from './config'

const firebaseApp = firebase.initializeApp(config)
const settings = {timestampsInSnapshots: true}
firebaseApp.firestore().settings(settings)

// instance propertyの登録
export const firestore = firebaseApp.firestore()
export const auth = firebaseApp.auth()
