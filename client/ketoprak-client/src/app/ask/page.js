'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const router = useRouter();

  

  // Function to handle search query input
  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = () => {
    // Perform search based on the query (e.g., fetch data from API)
    // Set the search result state with the retrieved data
    // For demonstration purposes, let's assume searchResult is set with some dummy data
    const dummySearchResult = [
      {
        imageUrl: '/graph.jpeg', // Image URL
        entities: [
          { id: 1, name: 'John F. Kennedy', relation: 'The victim' },
          { id: 2, name: 'Lee Harvey Oswald', relation: 'The shooter' },
          { id: 3, name: 'National Archive', relation: 'Released by' },
          { id: 4, name: 'Joe Biden', relation: 'Joe Biden' },
          { id: 2, name: 'Crowds', relation: 'Smiled at' },
          // Add more entities as needed
        ],
      },
      // Add more search results as needed
    ];
    setQuery('Assassination of John F. Kennedy');
    setSearchResult(dummySearchResult);
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={query}
          onChange={handleSearchInputChange}
        />
        <button style={styles.searchButton} onClick={handleSearchSubmit}>
          <Image src='/search.png' alt="Search Icon" width={24} height={24} />
        </button>
      </div>
      <div style={styles.resultContainer}>
        {searchResult && searchResult.map((item, index) => (
          <div key={index} style={styles.resultItem}>
            <div style={styles.imageContainer}>
              <Image src={item.imageUrl} alt={`Image ${index + 1}`} width={500} height={500} />
            </div>
            <div style={styles.tableContainer}>
              {/* Placeholder for Table component */}
              <div style={styles.table}>
                <div style={styles.tableRow}>
                  <div style={styles.tableHeader}>No.</div>
                  <div style={styles.tableHeader}>Entity</div>
                  <div style={styles.tableHeader}>Relation</div>
                </div>
                {item.entities.map(entity => (
                  <div style={styles.tableRow} key={entity.id}>
                    <div style={styles.tableCell}>{entity.id}</div>
                    <div style={styles.tableCell}>{entity.name}</div>
                    <div style={styles.tableCell}>{entity.relation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {searchResult && (
      <div style={styles.backButtonContainer}>
        <button style={styles.backButton} onClick={() => router.push('/home')}>
          Back
        </button>
      </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#00002E',
    color: 'white',
    height: '100vh',
    paddingLeft: '15%',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: '1050px',
    height: '60px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginRight: '10px',
    fontFamily: 'Inter',
    fontSize: '16px',
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  resultItem: {
    display: 'flex',
    marginBottom: '20px',
    width: '1050px',
  },
  imageContainer: {
    width: '500px',
    marginRight: '20px',
  },
  tableContainer: {
    flex: 1,
    width: '500px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '10px',
    height: '100%', // Ensure the table fills the container height
  },
  tableRow: {
    display: 'flex',
    borderBottom: '1px solid #ccc',
  },
  tableHeader: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#333',
    color: 'white',
  },
  tableCell: {
    flex: 1,
    padding: '8px',
    borderBottom: '1px solid #ccc',
  },
  backButtonContainer: {
    right: '15%',
  },
  backButton: {
    backgroundColor: '#969696',
    color: 'white',
    borderRadius: '12px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    width:'160px'
  },
  
};

export default SearchPage;

