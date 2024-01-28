import { auth } from '../../lib/firebase';
import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';

const reauthenticate = async (currentPassword: string) => {
  if (auth) {
    const user = auth.currentUser;

    if (user?.email) {
      const promise = await signInWithEmailAndPassword(auth, user.email, currentPassword);
      return promise;
    }
  }
};

export const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;

  if (user) {
    console.log('Start Reauthenticate');
    await reauthenticate(currentPassword);
    console.log('Reauthenticated');

    await updatePassword(user, newPassword);
    console.log('Password change successfully!');
  }
};
