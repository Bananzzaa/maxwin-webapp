import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tdjtytelczdlkgahgojv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkanR5dGVsY3pkbGtnYWhnb2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDMwOTQsImV4cCI6MjA2MjcxOTA5NH0.5BlORDUbpYp8rAAwacb56XrW3dtEbTarDpFtf9VsWiI'
);

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    if (authorized) fetchOrders();
  }, [authorized]);

  if (!authorized) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial', minHeight: '100vh' }}>
        <h2>🔐 Вход в админку MaxWin</h2>
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, width: 250, fontSize: 14 }}
        />
        <br /><br />
        <button onClick={() => setAuthorized(password === 'maxwingod')} style={{ padding: '10px 20px', fontSize: 15 }}>
          Войти
        </button>
        {password && password !== 'maxwingod' && <p style={{ color: 'red' }}>❌ Неверный пароль</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial', minHeight: '100vh', background: '#f2f2f7' }}>
      <h2 style={{ marginBottom: 20 }}>📋 Заявки клиентов</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: '#fff', borderRadius: 12 }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>Услуга</th>
              <th style={thStyle}>Имя</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Описание</th>
              <th style={thStyle}>Дата</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td style={tdStyle}>{order.service}</td>
                <td style={tdStyle}>{order.name}</td>
                <td style={tdStyle}>@{order.telegram_username}</td>
                <td style={tdStyle}>{order.description}</td>
                <td style={tdStyle}>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  fontWeight: 600,
  fontSize: 14
};

const tdStyle = {
  border: '1px solid #eee',
  padding: '10px',
  fontSize: 14
};
