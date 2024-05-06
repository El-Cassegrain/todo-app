import Checklist from './components/Checklist'
import './styles.css'
import { useState, useEffect } from 'react'

function App() {

  const [theme, setTheme] = useState(false); // Défaut : thème clair

  useEffect(() => {
    // Fonction pour détecter le thème du navigateur
    const detectTheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme(theme); // Si le thème sombre est préféré, mettez à jour le thème
      }else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme(!theme); // Si le thème sombre est préféré, mettez à jour le thème
      }
    };

    // Appel initial pour détecter le thème
    detectTheme();

    // Écoute des modifications de thème
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addListener(detectTheme);

    // Nettoyage
    return () => {
      darkModeQuery.removeListener(detectTheme);
    };
  }, []);

  function toggleColorTheme(){
    setTheme(!theme)
  }

  return (
    <div id="main-container" className={`-z-10 h-100 ${theme ? "light-mode" : "dark-mode"}`}>
      <div className="h-[20vh] md:h-[28vh]  bg-cover bg-no-repeat absolute top-0 w-screen left-0" id="bg-top">
      </div>

      <div className="main-content h-100 container-content pt-10 px-5 relative">
        <h1 className='text-3xl font-bold uppercase tracking-widest'>ToDo</h1>
        <button onClick={toggleColorTheme} className='absolute top-10 right-5'>{theme ? <img src="/img/icon-moon.svg" alt="" /> : <img src="/img/icon-sun.svg" alt="" />}</button>
      
        <div className="content mt-10">
          <Checklist theme={theme}/>
        </div>
        
      
      </div>
    </div>
  )
}

export default App
