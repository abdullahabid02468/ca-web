import React, { useEffect, useState } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('/api/blogs').then(res => res.json()).then(setPosts);
  }, []);

  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setForm({ title: '', content: '' });
    }
  };

  return (
    <div>
      <h1>Blog</h1>
      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {posts.map(p => (
          <li key={p._id}>
            <strong>{p.title}</strong>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
