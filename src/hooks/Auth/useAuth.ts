import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
