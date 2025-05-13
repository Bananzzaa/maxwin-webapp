import React, { useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tdjtytelczdlkgahgojv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkanR5dGVsY3pkbGtnYWhnb2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDMwOTQsImV4cCI6MjA2MjcxOTA5NH0.5BlORDUbpYp8rAAwacb56XrW3dtEbTarDpFtf9VsWiI'
);

const services = [
  {
    id: 'bot',
    name: '🤖 Telegram-бот',
    description: 'Автоматизация, заявки, чаты, кнопки, интеграции.',
    details: ['Онлайн-команды', 'Кастомные админки', 'Webhook/API связка'],
    image: 'https://i.imgur.com/5QnJX0w.png'
  },
  {
    id: 'webapp',
    name: '📱 Telegram WebApp',
    description: 'Мини-приложения внутри Telegram. Магазины, аукционы, формы.',
    details: ['Каталоги и корзины', 'Привязка к боту', 'Работа с Telegram Stars'],
    image: 'https://i.imgur.com/ugMU09f.png'
  },
  {
    id: 'backend',
    name: '⚙️ Backend/API',
    description: 'Серверная логика на FastAPI, Supabase, базы данных, интеграции.',
    details: ['Авторизация', 'Админ-панели', 'REST API и вебхуки'],
    image: 'https://i.imgur.com/lU9I4i2.png'
  },
  {
    id: 'custom',
    name: '💡 Другое',
    description: 'Если у тебя что-то особенное — обсудим, придумаем, сделаем.',
    details: ['📬 Telegram для связи: ', '@maxwingift'],
    image: 'https://i.imgur.com/yV4XFAK.png'
  },
];

function App() {
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [tgUser, setTgUser] = useState('');
  const [desc, setDesc] = useState('');
  const [sent, setSent] = useState(false);

  const sendOrder = async () => {
    const payload = {
      service: selected.name,
      name,
      telegram_username: tgUser,
      description: desc,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('orders').insert(payload);
    if (error) {
      alert('❌ Ошибка при отправке. Попробуй позже.');
    } else {
      setSent(true);
    }
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 16,
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    marginBottom: '12px',
    fontSize: '15px'
  };

  const buttonStyle = {
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '16px',
    backgroundColor: '#007aff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 10
  };

  if (sent) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial', background: '#f2f2f7', minHeight: '100vh', textAlign: 'center' }}>
        <h2>✅ Заявка отправлена!</h2>
        <p>Мы скоро с тобой свяжемся ✉️</p>
        <button onClick={() => { setSelected(null); setSent(false); }} style={buttonStyle}>← Назад</button>
      </div>
    );
  }

  if (!selected) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial', background: '#f2f2f7', minHeight: '100vh' }}>
        <h1 style={{ fontWeight: '600', fontSize: '22px', marginBottom: 20 }}>🎯 MaxWin — выбери услугу</h1>
        {services.map((s) => (
          <div key={s.id} onClick={() => setSelected(s)} style={cardStyle}>
            <strong>{s.name}</strong>
            <p style={{ marginTop: 6, fontSize: '14px', color: '#555' }}>{s.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial', background: '#f2f2f7', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{selected.name}</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>{selected.description}</p>
      <ul style={{ fontSize: '14px', marginBottom: 10 }}>
        {selected.details.map((d, i) => (
          <li key={i}>🔹 {d}</li>
        ))}
      </ul>
      <img src={selected.image} alt="preview" style={{ width: '100%', borderRadius: '12px', marginBottom: 15 }} />

      <input style={inputStyle} placeholder="Твоё имя" value={name} onChange={e => setName(e.target.value)} />
      <input style={inputStyle} placeholder="Telegram username" value={tgUser} onChange={e => setTgUser(e.target.value)} />
      <textarea style={inputStyle} placeholder="Опиши задачу" value={desc} onChange={e => setDesc(e.target.value)} rows="4" />

      <button onClick={sendOrder} style={buttonStyle}>✅ Отправить заказ</button><br />
      <button onClick={() => setSelected(null)} style={{ ...buttonStyle, backgroundColor: '#e0e0e0', color: '#333' }}>← Назад</button>
    </div>
  );
}

export default App;
