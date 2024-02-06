import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import './UploadFile.css';


const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const [files, setFiles] = useState<File[]>([]);

    const [hover, setHover] = useState('#fda29b');

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
                            <th>Name</th>
                            <th>Size</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.name}</td>
                                <td>{(file.size / (1024 * 1024)).toFixed(2)} MB</td>
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
        </div>
    );
};

export default UploadFile;

