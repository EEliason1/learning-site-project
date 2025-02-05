import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="file-upload">
      <div {...getRootProps()} className="border-2 border-dashed p-4 text-center">
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
    </div>
  );
};

export default FileUpload;
