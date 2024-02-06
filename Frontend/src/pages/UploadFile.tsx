import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './UploadFile.css';


const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFiles([...files, file]); // Push the new file to the files state
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    return (
        <div>
            <Header />
            <div
                className={`drop-zone ${isDraggingOver ? 'drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {selectedFile ? (
                    <div>
                        {selectedFile.type.startsWith('image/') ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="File Preview"
                            />
                        ) : (
                            <p>{selectedFile.name}</p>
                        )}
                    </div>
                ) : (
                    <div>
                        <FontAwesomeIcon icon={faUpload} size="4x" />
                        <p>{isDraggingOver ? 'Drop to upload' : 'Drag and drop a file or click the button to upload a file.'}</p>
                    </div>
                )}
            </div>
            <div className="uploaded-files">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Date Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.name}</td>
                                <td>{(file.size / (1024 * 1024)).toFixed(2)} MB</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default UploadFile;

