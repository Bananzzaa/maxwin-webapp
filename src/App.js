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
    image: '/img/bot.png'
  },
  {
    id: 'webapp',
    name: '📱 Telegram WebApp',
    description: 'Мини-приложения внутри Telegram. Магазины, аукционы, формы.',
    details: ['Каталоги и корзины', 'Привязка к боту', 'Работа с Telegram Stars'],
    image: '/img/web.png'
  },
  {
    id: 'backend',
    name: '⚙️ Backend/API',
    description: 'Серверная логика на FastAPI, Supabase, базы данных, интеграции.',
    details: ['Авторизация', 'Админ-панели', 'REST API и вебхуки'],
    image: '/img/backend.png'
  },
  {
    id: 'custom',
    name: '💡 Другое',
    description: 'Если у тебя что-то особенное — обсудим, придумаем, сделаем.',
    details: ['📬 Telegram для связи: ', '@maxwingift'],
    image: '/img/hui.png'
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
      console.error('[SUPABASE ERROR]', error.message, error.details);
      alert('❌ Ошибка при отправке. Попробуй позже.');
    } else {
      setSent(true);
    }
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
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <img src="/img/logo.png" alt="MaxWin Logo" style={{ width: 100, borderRadius: 20 }} />
          <h1 style={{ fontWeight: '700', fontSize: '26px', marginTop: 10 }}>MaxWin — Telegram WebApps под ключ</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Боты, магазины, аукционы и автоматизация под ваш проект</p>
        </div>

        {services.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s)}
            style={{
              marginBottom: 25,
              backgroundColor: '#fff',
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
              cursor: 'pointer',
              transition: '0.2s ease',
            }}
          >
            <img src={s.image} alt={s.name} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: 15 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{s.name}</h3>
              <p style={{ marginTop: 6, fontSize: 14, color: '#555' }}>{s.description}</p>
            </div>
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

      <input style={{ width: '100%', padding: 10, borderRadius: 12, border: '1px solid #ccc', marginBottom: 12 }} placeholder="Твоё имя" value={name} onChange={e => setName(e.target.value)} />
      <input style={{ width: '100%', padding: 10, borderRadius: 12, border: '1px solid #ccc', marginBottom: 12 }} placeholder="Telegram username" value={tgUser} onChange={e => setTgUser(e.target.value)} />
      <textarea style={{ width: '100%', padding: 10, borderRadius: 12, border: '1px solid #ccc', marginBottom: 12 }} placeholder="Опиши задачу" value={desc} onChange={e => setDesc(e.target.value)} rows="4" />

      <button onClick={sendOrder} style={buttonStyle}>✅ Отправить заказ</button><br />
      <button onClick={() => setSelected(null)} style={{ ...buttonStyle, backgroundColor: '#e0e0e0', color: '#333' }}>← Назад</button>
    </div>
  );
}

export default App;
