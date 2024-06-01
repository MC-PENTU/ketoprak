'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const InputDataPage = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setFiles([...files, ...fileList]);
  };

  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Uploading files:', files);

    // Assuming upload is successful
    //toast.success('Upload successful');
    router.push('/home');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    setFiles([...files, ...fileList]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleAddTextInput = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleAddText = () => {
    if (titleInput.trim() === '' || textInput.trim() === '') {
      setShowAlert(true);
    }
    else{
      const newTextFile = {
        name: titleInput.trim() + '.txt', // Append ".txt" to the title input and trim any extra spaces
        content: textInput, // Use the text input as the file content (if needed)
      };
      setFiles([...files, newTextFile]); // Add the new text file to the list of files
      setTitleInput('');
      setTextInput(''); // Clear the text input
      setShowAlert(false);
      setShowModal(false); // Close the modal
    }
  };

  const handleTitleInputChange = (event) => {
    setTitleInput(event.target.value);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleCancel = () => {
    router.push('/home');
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <h1 style={styles.title}>Input Data</h1>
        <button style={styles.addButton} onClick={handleAddTextInput}>Add Text Input</button>
      </div>
      <div
        style={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p style={styles.dropText}>Drag & Drop to Upload or Browse File</p>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
        <label htmlFor="fileInput" style={styles.browseButton}>
          Browse File
        </label>
      </div>
      <p style={styles.dropLabel}>Files Uploaded</p>
      <div style={styles.filesContainer}>
        {files.length > 0 && (
          <ul style={styles.filesList}>
            {files.map((file, index) => (
              <li
                key={index}
                style={styles.fileListItem}
                onMouseEnter={() => setShowDeleteButton(index, true)}
                onMouseLeave={() => setShowDeleteButton(index, false)}
              >
                {file.name}
                {showDeleteButton === index && (
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteFile(index)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={styles.buttonsContainer}>
        <button style={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button style={styles.uploadButton} onClick={handleUpload}>
          Upload Data
        </button>
      </div>
      {showModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Add Text Input</h2>
            <input
              type="text"
              style={styles.titleInput}
              placeholder="Add title here..."
              value={titleInput}
              onChange={handleTitleInputChange}
            />
            <textarea
              style={styles.textArea}
              placeholder="Add text here..."
              value={textInput}
              onChange={handleTextInputChange}
            ></textarea>
            {showAlert && ( // Show alert only when showAlert is true
              <div style={styles.alert}>
                Title and text are required.
              </div>
            )}
            <div style={styles.modalButtonsContainer}>
              <button style={styles.cancelModalButton} onClick={handleCloseModal}>Cancel</button>
              <button style={styles.addModalButton} onClick={handleAddText}>Add Text</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    backgroundColor: '#00002E',
    color: 'white',
    padding: '20px',
    position: 'relative',
    height: '100vh'
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0',
  },
  addButton: {
    borderRadius: '12px',
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  dropZone: {
    border: '2px dashed white',
    borderRadius: '12px',
    padding:  '20px',
    marginTop: '20px',
    textAlign: 'center',
  },
  dropText: {
    fontFamily: 'Inter',
    fontSize: '16px',
    zIndex: '1', // Ensure the text is displayed above other elements
    marginBottom: '20px',
  },
  dropLabel: {
    fontFamily: 'Inter',
    fontSize: '28px',
    color: 'white',
    marginTop: '32px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  browseButton: {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    borderRadius: '12px',
    marginTop: '20px',
    border: 'none',
    cursor: 'pointer',
    zIndex: '1', // Ensure the button is displayed above other elements
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  cancelButton: {
    width: '160px', // Adjusted width for wider button
    backgroundColor: '#969696',
    color: 'white',
    borderRadius: '12px',
    marginRight: '10px',
    border: 'none',
    cursor: 'pointer',
    height: '40px',
    fontFamily : 'Inter',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  uploadButton: {
    width: '160px', // Adjusted width for wider button
    backgroundColor: '#7BC2FF',
    color: 'black',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    height: '40px',
    fontFamily : 'Inter',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  filesContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'white', // Set background color to white
    borderRadius: '12px', // Add border radius to match the box
    height: '200px', // Fixed height to contain the file list
    overflowY: 'auto', // Add overflow-y to enable scrolling if needed
  },
  filesList: {
    listStyleType: 'none', // Remove bullet points
    padding: '0', // Remove default padding
    margin: '0', // Remove default margin
  },
  fileListItem: {
    color: 'black', // Set text color to black
    borderBottom: '1px solid #ccc', // Add border at the bottom of each item
    padding: '8px', // Add padding to each item
    position: 'relative', // Make the list item position relative for absolute positioning of delete button
  },
  deleteButton: {
    position: 'absolute', // Position the delete button absolutely
    top: 0, // Align the delete button to the top of the list item
    right: '10px', // Align the delete button to the right of the list item
    backgroundColor: 'red', // Background color for the delete button
    color: 'white', // Text color for the delete button
    border: 'none', // Remove border from the delete button
    borderRadius: '50%', // Make the delete button circular
    padding: '5px', // Add padding to the delete button
    cursor: 'pointer', // Change cursor to pointer on hover
    display: 'none', // Initially hide the delete button
  },
  fileListItemHovered: {
    backgroundColor: '#f2f2f2', // Change background color when list item is hovered
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    zIndex: '9999', // Ensure the modal is displayed above other elements
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    width: '50%',
  },
  modalTitle: {
    fontSize: '32px',
    marginBottom: '20px',
    color: 'black'
  },
  textArea: {
    width: '100%',
    minHeight: '150px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontFamily: 'Inter',
    fontSize: '16px',
    color: 'black'
  },
  modalButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cancelModalButton: {
    backgroundColor: '#969696',
    color: 'white',
    borderRadius: '12px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  addModalButton: {
    backgroundColor: '#7BC2FF',
    color: 'black',
    borderRadius: '12px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  titleInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontFamily: 'Inter',
    fontSize: '16px',
    color: 'black'
  },
  alert: {
    color: 'red',
    marginBottom: '10px',
  }
};

export default InputDataPage;

