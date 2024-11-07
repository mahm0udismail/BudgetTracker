// useFirestore.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

export const useFirestore = () => {
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (snap) => {
      let fetched = snap.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      let budgetValues = snap.docs.map((doc) => doc.data().amount);
console.log(fetched)
      setItems(fetched);
      setBudget(
        budgetValues.length > 0 ? budgetValues.reduce((acc, curr) => acc + curr, 0) : 0
      );
    });

    return unsubscribe;
  }, []);

  const addItem = async (item, amount) => {
    await addDoc(collection(db, 'items'), {
      ...item,
      amount,
    });
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return { items, addItem, budget, deleteItem };
};
