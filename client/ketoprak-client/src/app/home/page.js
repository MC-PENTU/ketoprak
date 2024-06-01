'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const [language, setLanguage] = useState('English');

  const translations = {
    English: {
      goodMorning: 'Good morning, Kevin!',
      inputText: 'INPUT DATA',
      askText: 'ASK!',
    },
    Indonesia: {
      goodMorning: 'Selamat pagi, Kevin!',
      inputText: 'MASUKKAN DATA',
      askText: 'TANYA!',
    },
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'English' ? 'Indonesia' : 'English');
  };

  const handleAskButton = () => {
    router.push('/ask');
  };

  const handleInputDataButton = () => {
    router.push('/input-data');
  };

  return (
    <div style={styles.container}>
      <div style={styles.languageButtonContainer}>
        <button style={styles.languageButton} onClick={handleLanguageChange}>
          <Image
            src={language === 'English' ? '/uk_flag.png' : '/indonesia_flag.png'}
            alt={language === 'English' ? 'English Flag' : 'Indonesia Flag'}
            width={30}
            height={20}
          />
          <span style={styles.languageButtonText}>{language === 'English' ? 'English' : 'Indonesia'}</span>
        </button>
      </div>
      <h1 style={styles.heading}>{translations[language].goodMorning}</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleAskButton}>
          <Image src="/ask.png" alt="Ask Icon" width={170} height={170} />
          <span style={styles.label}>{translations[language].askText}</span>
        </button>
        <button style={styles.button} onClick={handleInputDataButton}>
          <Image src="/input_data.png" alt="Input Data Icon" width={170} height={170} />
          <span style={styles.label}>{translations[language].inputText}</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#00002E',
    color: 'white',
  },
  heading: {
    fontSize: '48px',
    marginBottom: '60px',
    fontFamily: 'Inter',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '300px',
    height: '300px',
    backgroundColor: 'white',
    border: '2px solid white',
    borderRadius: '12px',
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#00002E',
    textDecoration: 'none',
  },
  label: {
    fontFamily: 'Inter',
    fontSize: '32px',
    fontWeight: 'bold',
    marginTop: '20px'
  },
  languageButtonContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  languageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: '12px',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
    fontFamily: 'Inter',
    fontSize: '16px',
    textDecoration: 'none',
  },
  languageButtonText: {
    marginLeft: '5px',
  },
};

export default HomePage;
