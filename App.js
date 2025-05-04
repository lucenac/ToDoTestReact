import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './assets/src/screens';


export default function App() {
  return (
    <>  
      <HomeScreen/>
      <StatusBar 
      style="light"
      backgroundColor="trasparent"
      translucent
      />
    </>
  );
}