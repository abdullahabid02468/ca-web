import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    fetch('/api/contacts').then(res => res.json()).then(setMessages);
  }, []);

  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages([msg, ...messages]);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map(m => (
          <li key={m._id}>
            <strong>{m.name}</strong> ({m.email})
            <p>{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
