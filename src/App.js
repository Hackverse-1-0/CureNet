import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LandingPage from './components/Landingpage';
import Footer from './components/Footer';



function App() {
  return (
    <>
    <Header />
    <div className="App">
      <LandingPage />
      <Footer />
    </div>
    </>
  );
}

export default App;
