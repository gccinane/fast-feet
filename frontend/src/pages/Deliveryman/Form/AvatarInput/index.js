import React, { useState, useRef, useEffect } from 'react';
import { FiImage } from 'react-icons/fi';
import { useField } from '@unform/core';

import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput({ currentAvatar }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;
    setFile(id);
    console.tron.log(file);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {currentAvatar && !preview ? (
          <img src={currentAvatar} alt="avatar" />
        ) : preview ? (
          <img src={preview} alt="avatar" />
        ) : (
          <FiImage size={50} color="#d2d2d2" />
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
