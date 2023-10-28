import '../styles/Header.scss';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.svg';
import logoBackground from '../img/logo-background.svg';

export function Header() {
  return (
    <header>
            <NavLink to={"/"} className='textHeader'>
                <div className='logo '>
                    <div className='logoImg'>
                        <img className='img1' alt="logo du site Kasa" src={logo} />
                        <img className='img2' alt="background du logo du site Kasa" src={logoBackground} />
                    </div>
                        <p className='text-logo'>SportSee</p>
                </div>
            </NavLink>
            <NavLink 
                to="/" 
                className="text-accueil textHeader" 
            >
                Accueil
            </NavLink>
            <NavLink 
                to="/profil" 
                className="text-profil textHeader" 
            >
                Profil
            </NavLink>
            <NavLink 
                to="/reglage" 
                className="text-reglage textHeader" 
            >
                Réglage
            </NavLink>
            <NavLink 
                to="/communaute" 
                className="text-communaute textHeader" 
            >
                Communauté
            </NavLink>
    </header>
  );
}