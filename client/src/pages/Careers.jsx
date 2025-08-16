import React, { useEffect, useState } from 'react';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', location: '' });

  useEffect(() => {
    fetch('/api/jobs').then(res => res.json()).then(setJobs);
  }, []);

  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newJob = await res.json();
      setJobs([newJob, ...jobs]);
      setForm({ title: '', description: '', location: '' });
    }
  };

  return (
    <div>
      <h1>Careers</h1>
      <form onSubmit={submit}>
        <input
          placeholder="Job title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {jobs.map(j => (
          <li key={j._id}>
            <strong>{j.title}</strong> - {j.location}
            <p>{j.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
