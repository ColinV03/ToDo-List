import './App.css';
import ToDo from "./Components/ToDo"
import firebase from 'firebase';
import firebaseConfig from './Components/Firebase';


firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ToDo/>
       </div>
      </header>
    </div>
  );
}

export default App;
