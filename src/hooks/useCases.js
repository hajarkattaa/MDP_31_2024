// hooks/useCases.js
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';

export const useCases = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const casesRef = ref(db, 'cases');

    const unsubscribe = onValue(casesRef, (snapshot) => {
      const data = snapshot.val();
      setCases(data ? Object.values(data) : []);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return cases;
};
