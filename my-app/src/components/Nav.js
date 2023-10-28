import '../styles/Nav.scss';
import iconMeditating from '../img/icon-meditating.svg';
import iconSwimming from '../img/icon-swimming.svg';
import iconCycling from '../img/icon-cycling.svg';
import iconLifting from '../img/icon-lifting.svg';

export function Nav() {
  return (
    <nav>
      <div className="navIcons">
        <img className='navIcon' src={ iconMeditating } alt='méditation' />
        <img className='navIcon' src= { iconSwimming } alt='nage' />
        <img className='navIcon' src={ iconCycling } alt='vélo' />
        <img className='navIcon' src={ iconLifting } alt='musculation' />
      </div>
      <small>Copyright, SportSee 2020</small>
    </nav>
  );
}