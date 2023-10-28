import PropTypes from 'prop-types';
import '../styles/Welcome.scss';

export const Welcome = ({ userName }) => {
  return (
    <section className='welcome'>
        <h1>Bonjour <span className="userName">{userName}</span></h1>
        <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
    </section>
  );
}

Welcome.propTypes = {
  userName: PropTypes.string.isRequired,
};
