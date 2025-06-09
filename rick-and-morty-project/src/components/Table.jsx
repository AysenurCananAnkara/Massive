import '../styles/table.css';

function Table({ data, onRowClick }) {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Resim</th>
          <th>İsim</th>
          <th>Durum</th>
          <th>Cinsiyet</th>
        </tr>
      </thead>
      <tbody>
        {data.map((char) => (
          <tr key={char.id} onClick={() => onRowClick(char)}>
            <td><img src={char.image} alt={char.name} /></td>
            <td>{char.name}</td>
            <td>{char.status}</td>
            <td>{char.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
