import '../styles/character.css';

function Character({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Durum: {character.status}</p>
      <p>Cinsiyet: {character.gender}</p>
      <p>Tür: {character.species}</p>
      <button onClick={onClose}>Kapat</button>
    </div>
  );
}

export default Character;
