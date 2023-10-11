import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import React from 'react';

export function CKEditorComponent({ setData }) {
  const editorConfiguration = {
    toolbar: ['bold', 'italic'],
  };
  return (
    <div>
      <CKEditor editor={Editor} config={editorConfiguration} data='<p>Hello from CKEditor 5!</p>' />
    </div>
  );
}
