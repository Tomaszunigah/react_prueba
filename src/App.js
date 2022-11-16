
import MiApi from './components/MiApi';

function App() {
  return (
    <div className="App">
      <header>
        <h1> Digimon DB</h1>     
        <h5>With this tool you can search Digimons by their Name or filter them by their evolution stage</h5>   
      </header>

      <div> <MiApi /> </div>

      <footer className='footer'>
        <h3 >@TomasZuñiga</h3>
      </footer>
      
    </div>
  );
}

export default App;
