import '../styles/filters.css'; 

function Filters({ filterType, filterValue, onTypeChange, onValueChange }) {
  return (
    <div className="filters-container">
      {/* Filtre türü seçimi */}
      <label htmlFor="filter-type">Filtre Türü:</label>
      <select id="filter-type" value={filterType} onChange={onTypeChange}>
        <option value="name">İsme Göre</option>
        <option value="status">Duruma Göre</option>
        <option value="gender">Cinsiyete Göre</option>
      </select>

      {/* İsme göre filtreleme input'u */}
      {filterType === 'name' && (
        <input
          type="text"
          placeholder="İsme göre filtrele"
          value={filterValue}
          onChange={onValueChange}
        />
      )}

      {/* Duruma göre filtreleme */}
      {filterType === 'status' && (
        <select value={filterValue} onChange={onValueChange}>
          <option value="">--Durum Seç--</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      )}

      {/* Cinsiyete göre filtreleme */}
      {filterType === 'gender' && (
        <select value={filterValue} onChange={onValueChange}>
          <option value="">--Cinsiyet Seç--</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      )}
    </div>
  );
}

export default Filters;
