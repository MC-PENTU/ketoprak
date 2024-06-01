'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const SearchPage = () => {
  const [searchBar, setSearchBar] = useState('');
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const router = useRouter();

  

  // Function to handle search query input
  const handleSearchInputChange = (event) => {
    setSearchBar(event.target.value);
    console.log('Query:', event.target.value)
  };

  // Function to handle search submission
  const handleSearchSubmit = () => {
    // Perform search based on the query (e.g., fetch data from API)
    // Set the search result state with the retrieved data
    // For demonstration purposes, let's assume searchResult is set with some dummy data
    setQuery(searchBar.toLowerCase());
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
    ];
    const dummySearchResult2 = [
      {
        imageUrl: '/mexico.jpg', // Image URL
        entities: [
          { id: 1, type: 'Shooting', frequency: '120' },
          { id: 2, type: 'Bombing', frequency: '30' },
          { id: 3, type: 'Kidnapping', frequency: '29' },
          { id: 4, type: 'Arson', frequency: '10' },
          { id: 2, type: 'Hijacking', frequency: '2' },
          // Add more entities as needed
        ],
      },
    ];
    if (query.includes('john')) setSearchResult(dummySearchResult);
    if (query.includes('mexico')) setSearchResult(dummySearchResult2);
    console.log(query)
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={searchBar}
          onChange={handleSearchInputChange}
        />
        <button style={styles.searchButton} onClick={handleSearchSubmit}>
          <Image src='/search.png' alt="Search Icon" width={24} height={24} />
        </button>
      </div>
      <div style={styles.resultContainer}>
        {searchResult && query.includes('john') && searchResult.map((item, index) => (
          <div key={index} style={styles.resultItem}>
            <div style={styles.imageContainer}>
              <Image src={item.imageUrl} alt={`Image ${index + 1}`} width={500} height={500} />
            </div>
            <div style={styles.tableContainer}>
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
       {searchResult && query.includes('colombia') && (
        <div style={styles.infoBox}>
          <div style={styles.infoBoxContent}>
            <div style={styles.whiteBox}>
              <p style={{ marginBottom: '1em' }}>
                Colombia has faced significant challenges related to terrorism, primarily due to groups like the Revolutionary Armed Forces of Colombia (FARC) and the National Liberation Army (ELN). These organizations have historically engaged in violent acts, including bombings, assassinations, and massacres, targeting civilians and security forces alike. One of the deadliest attacks in recent memory occurred on January 17, 2019, in Bogotá, the nation's capital. A car bomb exploded outside a police academy, claiming the lives of 22 people. This brazen act, attributed to the ELN, underscored the ongoing security threats faced by Colombia.
              </p>
              <p style={{ marginBottom: '1em' }}>
                The attack in Bogotá highlighted the persistent challenges to peace and stability despite significant efforts to negotiate peace agreements and reduce violence. While progress has been made, pockets of conflict remain, particularly in remote rural areas. The Colombian government has undertaken extensive measures to address these issues, including dismantling illicit networks, promoting socio-economic development, and enhancing security measures. However, the complex nature of terrorism in Colombia necessitates continued vigilance and collaboration among various stakeholders.
              </p>
              <p>
                Despite the lingering threat of terrorism, Colombia has demonstrated resilience in its pursuit of peace and stability. The nation's commitment to addressing the root causes of conflict and fostering reconciliation reflects a determination to overcome the challenges posed by militant groups. As Colombia continues its journey towards lasting peace, sustained efforts in tackling terrorism and promoting inclusive development will be crucial in ensuring a more secure and prosperous future for all its citizens.
              </p>
            </div>
          </div>
        </div>
      )}
      {searchResult && query.includes('mexico') && searchResult.map((item, index) => (
          <div key={index} style={styles.resultItem}>
            <div style={styles.imageContainer}>
              <Image src={item.imageUrl} alt={`Image ${index + 1}`} width={500} height={500} />
            </div>
            <div style={styles.tableContainer}>
              <div style={styles.table}>
                <div style={styles.tableRow}>
                  <div style={styles.tableHeader}>No.</div>
                  <div style={styles.tableHeader}>Type</div>
                  <div style={styles.tableHeader}>Frequency</div>
                </div>
                {item.entities.map(entity => (
                  <div style={styles.tableRow} key={entity.id}>
                    <div style={styles.tableCell}>{entity.id}</div>
                    <div style={styles.tableCell}>{entity.type}</div>
                    <div style={styles.tableCell}>{entity.frequency}</div>
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
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    color: 'black',
    width: '1050px',
    textAlign: 'justify',
  },  
};

export default SearchPage;

