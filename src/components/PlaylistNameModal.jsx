import React, { useState } from 'react';

function PlaylistNameModal({ onSave, onCancel }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleSave = () => {
    if (playlistName.trim()) {
      onSave(playlistName);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '300px',
        width: '100%',
      }}>
        <h2 style={{ padding: '1.5rem' }}>Đặt tên cho Playlist</h2>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Nhập tên playlist"
          style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: 4,}}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <button style={{padding: 6, borderRadius: 4, marginRight: 20}} onClick={handleSave}>Lưu</button>
            <button style={{padding: 6, borderRadius: 4}} onClick={onCancel}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistNameModal;