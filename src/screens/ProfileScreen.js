import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 