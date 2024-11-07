import { useState } from 'react'
import './App.css'
import { db } from "./firebase/firebaseConfig"; // Adjust path if necessary
import { doc, setDoc, getDoc } from "firebase/firestore";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Mahmoud Ismail</h1>
    </>
  )
}

export default App
