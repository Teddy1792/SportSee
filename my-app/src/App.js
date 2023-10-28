import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { CustomRouter } from './components/CustomRouter.js'
import { Header } from './components/Header'
import { Nav } from './components/Nav'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <CustomRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;


//bien identifier les graphs à la base + custom avec les props
//commencer par récupérer les données en statique d'abord 