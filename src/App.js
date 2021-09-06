
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <News pageSize = {6} country ="in" category="business"/>
    </div>
  );
}
export default App;
