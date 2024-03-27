//import React from 'react';
import { useDropzone } from 'react-dropzone';

function DialogForm() {
  //props
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container" style={{ padding: '20px', border: '1px dashed #ccc' }}>
      <div {...getRootProps({ className: 'dropzone', style: dropzoneStyles })}>
        <input {...getInputProps()} />
        <p style={{ textAlign: 'center' }}>Drag n drop some files here, or click to select files</p>
      </div>
      <aside style={{ marginTop: '20px' }}>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

<DialogForm />;

const dropzoneStyles = {
  border: '2px dashed #007bff',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default DialogForm;
