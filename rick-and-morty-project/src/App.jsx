import { useEffect, useState } from 'react';
import axios from 'axios';
import Character from './components/Character';
import Table from './components/Table';

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    gender: '',
  });

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let pageNum = 1;
        let allResults = [];

        while (true) {
          const res = await axios.get(`https://rickandmortyapi.com/api/character`, {
            params: { page: pageNum }
          });

          allResults = [...allResults, ...res.data.results];
          if (!res.data.info.next) break;
          pageNum++;
        }

        setAllCharacters(allResults);
        setError('');
      } catch {
        setAllCharacters([]);
        setError('Veri alınırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

    fetchAllCharacters();
  }, []);

  useEffect(() => {
    let filtered = allCharacters.filter((char) => {
      return (
        char.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        char.status.toLowerCase().includes(filters.status.toLowerCase()) &&
        char.gender.toLowerCase().includes(filters.gender.toLowerCase())
      );
    });

    if (
      filtered.length === 0 &&
      (filters.name || filters.status || filters.gender)
    ) {
      setError('Karakter bulunamadı.');
    } else {
      setError('');
    }

    const sorted = [...filtered].sort((a, b) => {
      const valA = a.name.toLowerCase();
      const valB = b.name.toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    const startIndex = (page - 1) * itemsPerPage;
    const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);

    setCharacters(paginated);
  }, [allCharacters, page, filters, sortOrder, itemsPerPage]);

  const totalPages = Math.ceil(
    allCharacters.filter((char) =>
      char.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      char.status.toLowerCase().includes(filters.status.toLowerCase()) &&
      char.gender.toLowerCase().includes(filters.gender.toLowerCase())
    ).length / itemsPerPage
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Rick and Morty Karakterleri</h1>

      {/* Çoklu Filtre Alanı */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="İsme göre filtrele"
          value={filters.name}
          onChange={(e) => {
            setFilters({ ...filters, name: e.target.value });
            setPage(1);
          }}
        />
        <select
          value={filters.status}
          onChange={(e) => {
            setFilters({ ...filters, status: e.target.value });
            setPage(1);
          }}
        >
          <option value="">Durum (Tümü)</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={filters.gender}
          onChange={(e) => {
            setFilters({ ...filters, gender: e.target.value });
            setPage(1);
          }}
        >
          <option value="">Cinsiyet (Tümü)</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Sıralama */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Sıralama: </label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* Sayfa Boyutu */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Sayfa Boyutu: </label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          {[250, 300, 350, 400].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Hata Mesajı */}
      {error ? (
        <div style={{
          backgroundColor: '#ffcccc',
          color: '#cc0000',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontWeight: 'bold',
          border: '2px solid #cc0000',
          boxShadow: '0 0 8px #cc0000',
        }}>
          <strong>Hata:</strong> {error} Lütfen filtreyi kontrol edin ya da sonra tekrar deneyin.
        </div>
      ) : (
        <>
          {/* Karakter Tablosu */}
          <Table data={characters} onRowClick={setSelectedCharacter} />

          {/* Sayfalama */}
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              Önceki
            </button>
            <span style={{ margin: '0 1rem' }}>
              Sayfa {page} / {totalPages}
            </span>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              Sonraki
            </button>
          </div>

          {/* Detay */}
          <Character character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
        </>
      )}
    </div>
  );
}

export default App;
