import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import './UploadFile.css';

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const [hover, setHover] = useState('#fda29b');
    const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress
    const course = localStorage.getItem('selectedCourse');
    const courseId = course ? JSON.parse(course).id : null;

    useEffect(() => {
        const getFiles = async () => {
            const response = await fetch('http://127.0.0.1:5000/courses/' + courseId + '/documents', {
                method: 'GET',
            });

            const json = await response.json();

            if (response.ok) {
                console.log('Files fetched: ' + json);
                console.log('Files before: ' + files);

                setFiles([...files, ...json]);
                console.log('Files after: ' + files)
            } else {
                console.error('Failed to fetch files');
            }
        }

        getFiles();
    }, [])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('document', file);

            try {
                const response = await fetch('http://127.0.0.1:5000/courses/' + courseId + '/documents', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Network error occurred', error);
            }

            setSelectedFile(file);
            setFiles([...files, file]); // Push the new file to the files state
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };
    return (
        <div>
            <Header />
            <div
                className={`drop-zone ${isDraggingOver ? 'drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={() => setIsDraggingOver(false)}
            >
                <div>
                    <FontAwesomeIcon icon={faUpload} size="4x" />
                    <p>{isDraggingOver ? 'Drop to upload' : 'Drag and drop a file or click the button to upload a file.'}</p>
                </div>
            </div>

            <div className="uploaded-files">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file: any, index: any) => (
                            <tr key={index}>
                                <td>{file.id}</td>
                                <td>{file.name}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="xl"
                                        color={hover}
                                        onMouseOver={() => {
                                            document.body.style.cursor = 'pointer'
                                        }}
                                        onMouseLeave={() => {
                                            document.body.style.cursor = 'default'
                                        }}
                                        onClick={() => handleRemoveFile(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                </div>
            )}
        </div>
    );
};

export default UploadFile;

