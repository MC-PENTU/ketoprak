'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

const HomePage = () => {
  const router = useRouter();

  // Function to handle navigation to the "/input-data" route
  const handleInputDataClick = () => {
    router.push('/input-data'); // Navigate to the "/input-data" route
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Good morning, Kevin!</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleInputDataClick}> {/* Add onClick event handler */}
          <Image src="/ask.png" alt="Ask Icon" width={170} height={170} />
          <span style={styles.label}>ASK!</span>
        </button>
        <button style={styles.button} onClick={handleInputDataClick}> {/* Add onClick event handler */}
          <Image src="/input_data.png" alt="Input Data Icon" width={170} height={170} />
          <span style={styles.label}>INPUT DATA</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
    backgroundColor: 'white', // Set background color to white
    border: '2px solid white',
    borderRadius: '12px',
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#00002E', // Set text color to navy
    textDecoration: 'none', // Remove underline from text
  },
  label: {
    fontFamily: 'Inter',
    fontSize: '32px',
    fontWeight: 'bold',
    marginTop: '20px'
  },
};

export default HomePage;
