import React, {useEffect, useState} from 'react';
import gsap from 'gsap';
import './styles/App.scss';
import Header from './components/Header';
import Home from './pages/home';
import CaseStudies from './pages/caseStudies';
import Approach from './pages/approach';
import Services from './pages/services';
import About from './pages/about';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation';

//routes 
const routes = [
  {path: '/', name: 'Home', Component: Home},
  {path: '/case-studies', name: 'Case Studies', Component: CaseStudies},
  {path: '/approach', name: 'Approach', Component: Approach},
  {path: '/services', name: 'Services', Component: Services},
  {path: '/about-us', name: 'About', Component: About}
];

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
};

function App() {
  //Prevents flashing
  gsap.to('body', 0, {css: {visibility: "visible"}});
     
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    //Grab inner height of window for window for mobile reasons when dealing with vh
    let vh = dimensions.height * 0.01;
    //Set css variable vh
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  
    //Setting Dimensions 
      const debounceHandleResize = debounce(function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        });
      }, 1000)

      window.addEventListener('resize', debounceHandleResize)
     
      return () => {
        window.removeEventListener("resize", debounceHandleResize);
      }
  })
  
  return (
    <>
      <Header dimensions={dimensions}/>
      <div className="App">
        {routes.map(({path, Component}) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </div>
      <Navigation />
    </>
  )
}

export default App;
