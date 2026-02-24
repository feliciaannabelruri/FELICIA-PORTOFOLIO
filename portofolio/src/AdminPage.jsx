// src/AdminPage.jsx
// ─────────────────────────────────────────────────────────────────
// Halaman /admin untuk edit portfolio secara online
// Akses: yoursite.com/#/admin
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import {
  supabase, signIn, signOut, getSession,
  getAllProjects, upsertProject, deleteProject,
  getSkills, upsertSkill, deleteSkill,
  getProjectCategories, upsertProjectCategory,
  getAllSettings, updateSetting,
  uploadProjectImage
} from './supabase.js';

// ─── COLORS & STYLES ─────────────────────────────────────────────
const A = {
  bg: '#0a0a0f',
  surface: 'rgba(255,255,255,0.05)',
  surfaceHover: 'rgba(255,255,255,0.09)',
  border: 'rgba(255,255,255,0.10)',
  accent: '#ff3cbe',
  purple: '#b03cff',
  green: '#3cff7a',
  red: '#ff4444',
  blue: '#3c9eff',
  orange: '#ff8c3c',
  text: '#ffffff',
  textSub: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.4)',
};
const mono = { fontFamily: "'DM Mono', monospace" };
const syne = { fontFamily: "'Syne', sans-serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };

const adminCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: #fff; font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #ff3cbe; border-radius: 2px; }
  input, textarea, select {
    background: rgba(255,255,255,0.07) !important;
    border: 1px solid rgba(255,255,255,0.15) !important;
    border-radius: 8px !important;
    color: #fff !important;
    padding: 10px 14px !important;
    font-size: 13px !important;
    font-family: 'DM Sans', sans-serif !important;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus, textarea:focus, select:focus {
    border-color: rgba(255,60,190,0.5) !important;
    box-shadow: 0 0 0 3px rgba(255,60,190,0.1) !important;
  }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25) !important; }
  select option { background: #1a1a2e; color: #fff; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin { to { transform: rotate(360deg); } }
  .admin-tab { cursor: pointer; transition: all 0.2s; }
  .admin-tab:hover { background: rgba(255,255,255,0.08) !important; }
  .admin-tab.active { background: rgba(255,60,190,0.15) !important; border-color: rgba(255,60,190,0.4) !important; color: #ff3cbe !important; }
  .admin-row:hover { background: rgba(255,255,255,0.06) !important; }
  @media (max-width: 768px) {
    .admin-sidebar { display: none !important; }
    .admin-main { padding: 16px !important; }
  }
`;

// ─── MINI COMPONENTS ─────────────────────────────────────────────
function Btn({ children, onClick, color = A.accent, small, danger, disabled, loading }) {
  const bg = danger ? A.red : color;
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: disabled ? 'rgba(255,255,255,0.1)' : `${bg}22`,
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.15)' : bg + '60'}`,
        color: disabled ? A.textMuted : bg,
        borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
        padding: small ? '6px 14px' : '10px 20px',
        fontSize: small ? 11 : 13,
        ...mono,
        textTransform: 'uppercase', letterSpacing: 1,
        transition: 'all 0.2s', whiteSpace: 'nowrap',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = bg + '33'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
      onMouseLeave={e => { e.currentTarget.style.background = bg + '22'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {loading ? <span style={{ display: 'inline-block', width: 12, height: 12, border: `2px solid ${bg}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
      {children}
    </button>
  );
}

function Label({ children }) {
  return <div style={{ ...mono, fontSize: 10, color: A.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>{children}</div>;
}

function Toast({ msg, type = 'success', onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const col = type === 'success' ? A.green : A.red;
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: '#1a1a2e', border: `1px solid ${col}50`, borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeIn 0.3s ease', boxShadow: `0 4px 20px ${col}20` }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: col }} />
      <span style={{ ...dmSans, fontSize: 13, color: A.textSub }}>{msg}</span>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ ...syne, fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{title}</h2>
      {subtitle && <p style={{ ...dmSans, fontSize: 13, color: A.textMuted }}>{subtitle}</p>}
    </div>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error: err } = await signIn(email, password);
    if (err) { setError(err.message); setLoading(false); }
    else onLogin();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: A.bg, padding: 20 }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: '40px 36px', width: '100%', maxWidth: 400, animation: 'fadeIn 0.4s ease' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ ...syne, fontSize: 28, fontWeight: 800, color: '#fff' }}>FA<span style={{ color: A.accent }}>_</span></div>
          <div style={{ ...mono, fontSize: 10, color: A.textMuted, textTransform: 'uppercase', letterSpacing: 3, marginTop: 6 }}>Admin Portal</div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <Label>Email</Label>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <Label>Password</Label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div style={{ ...dmSans, fontSize: 12, color: A.red, marginBottom: 16, padding: '8px 12px', background: A.red + '15', borderRadius: 6 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: `linear-gradient(135deg, ${A.accent}, ${A.purple})`, color: '#fff', border: 'none', borderRadius: 10, ...syne, fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, letterSpacing: 1 }}>
            {loading ? 'Logging in...' : 'Enter Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── PROJECTS TAB ─────────────────────────────────────────────────
function ProjectsTab({ toast }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const defaultForm = { title: '', description: '', category: '', link: '', image_url: '', sort_order: 0, is_visible: true };
  const [form, setForm] = useState(defaultForm);

  const load = async () => {
    setLoading(true);
    const { data } = await getAllProjects();
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p) => { setEditing(p.id); setForm({ ...p }); };
  const startNew = () => { setEditing('new'); setForm(defaultForm); };
  const cancel = () => { setEditing(null); setForm(defaultForm); };

  const handleUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProjectImage(file);
      setForm(f => ({ ...f, image_url: url }));
      toast('Image uploaded!', 'success');
    } catch (err) { toast('Upload failed: ' + err.message, 'error'); }
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const payload = editing === 'new' ? { ...form } : { ...form, id: editing };
    const { error } = await upsertProject(payload);
    if (error) toast('Error: ' + error.message, 'error');
    else { toast('Project saved!'); cancel(); await load(); }
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Hapus project ini?')) return;
    const { error } = await deleteProject(id);
    if (error) toast('Error: ' + error.message, 'error');
    else { toast('Project deleted!'); await load(); }
  };

  const categories = ['Web Development', 'UI/UX Design', 'Game Development', 'AI Platform', 'Marketing Campaign', 'Mobile App', 'Other'];

  return (
    <div>
      <SectionHeader title="Featured Projects" subtitle="Projects yang muncul di carousel portfolio" />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <Btn onClick={startNew} color={A.green}>+ Tambah Project</Btn>
      </div>

      {/* Form */}
      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${A.accent}40`, borderRadius: 14, padding: 24, marginBottom: 24, animation: 'fadeIn 0.2s ease' }}>
          <div style={{ ...syne, fontSize: 14, fontWeight: 700, color: A.accent, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
            {editing === 'new' ? 'New Project' : 'Edit Project'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <Label>Title</Label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" />
            </div>
            <div>
              <Label>Category</Label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                <option value="">Pilih kategori</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Description</Label>
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description" />
            </div>
            <div>
              <Label>Link (URL)</Label>
              <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <Label>Sort Order</Label>
              <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>

            {/* Image */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Image</Label>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="Paste URL atau upload" />
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                <Btn onClick={() => fileRef.current.click()} loading={uploading} color={A.blue} small>
                  {uploading ? 'Uploading...' : 'Upload'}
                </Btn>
              </div>
              {form.image_url && (
                <div style={{ marginTop: 10, width: 120, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <img src={form.image_url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            {/* Visible toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" checked={form.is_visible} onChange={e => setForm(f => ({ ...f, is_visible: e.target.checked }))} style={{ width: 'auto !important', accentColor: A.accent }} />
              <Label>Tampilkan di portfolio</Label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Btn onClick={save} loading={saving} color={A.green}>Simpan</Btn>
            <Btn onClick={cancel} color={A.textMuted}>Batal</Btn>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: A.textMuted }}>Loading...</div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ ...mono, fontSize: 11, color: A.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 2 }}>No projects yet</div>
              <Btn onClick={startNew} color={A.accent}>Tambah Project Pertama</Btn>
            </div>
          ) : projects.map((p, i) => (
            <div key={p.id} className="admin-row" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < projects.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'background 0.2s' }}>
              {/* Thumb */}
              <div style={{ width: 56, height: 40, borderRadius: 6, overflow: 'hidden', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }}>
                {p.image_url ? <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎨</div>}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...syne, fontSize: 14, fontWeight: 700, color: p.is_visible ? '#fff' : A.textMuted }}>{p.title}</div>
                <div style={{ ...mono, fontSize: 10, color: A.textMuted, marginTop: 2 }}>{p.category} · #{p.sort_order}</div>
              </div>
              {/* Status */}
              <div style={{ ...mono, fontSize: 9, color: p.is_visible ? A.green : A.textMuted, background: (p.is_visible ? A.green : A.textMuted) + '18', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase', flexShrink: 0 }}>
                {p.is_visible ? 'Visible' : 'Hidden'}
              </div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Btn small onClick={() => startEdit(p)} color={A.blue}>Edit</Btn>
                <Btn small danger onClick={() => remove(p.id)}>Hapus</Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SKILLS TAB ──────────────────────────────────────────────────
function SkillsTab({ toast }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const defaultForm = { label: '', value: 80, color: '#ff3cbe', sort_order: 0 };
  const [form, setForm] = useState(defaultForm);

  const colors = ['#ff3cbe', '#b03cff', '#3c9eff', '#3cff7a', '#ff8c3c', '#ff3c3c'];

  const load = async () => {
    setLoading(true);
    const { data } = await getSkills();
    setSkills(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (s) => { setEditing(s.id); setForm({ ...s }); };
  const startNew = () => { setEditing('new'); setForm(defaultForm); };
  const cancel = () => { setEditing(null); setForm(defaultForm); };

  const save = async () => {
    setSaving(true);
    const payload = editing === 'new' ? { ...form } : { ...form, id: editing };
    const { error } = await upsertSkill(payload);
    if (error) toast('Error: ' + error.message, 'error');
    else { toast('Skill saved!'); cancel(); await load(); }
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Hapus skill ini?')) return;
    const { error } = await deleteSkill(id);
    if (error) toast('Error: ' + error.message, 'error');
    else { toast('Skill deleted!'); await load(); }
  };

  return (
    <div>
      <SectionHeader title="Skills / Skill Tree" subtitle="XP bar skills yang muncul di section About" />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <Btn onClick={startNew} color={A.green}>+ Tambah Skill</Btn>
      </div>

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${A.purple}40`, borderRadius: 14, padding: 24, marginBottom: 24, animation: 'fadeIn 0.2s ease' }}>
          <div style={{ ...syne, fontSize: 14, fontWeight: 700, color: A.purple, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
            {editing === 'new' ? 'New Skill' : 'Edit Skill'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / 3' }}>
              <Label>Skill Name</Label>
              <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. Digital Marketing" />
            </div>
            <div>
              <Label>Value (%)</Label>
              <input type="number" min="0" max="100" value={form.value} onChange={e => setForm(f => ({ ...f, value: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <Label>Color</Label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {colors.map(c => (
                  <div key={c} onClick={() => setForm(f => ({ ...f, color: c }))} style={{ width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer', border: form.color === c ? '3px solid #fff' : '2px solid transparent', transition: 'all 0.2s' }} />
                ))}
                <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} style={{ width: '28px !important', height: '28px !important', padding: '0 !important', border: 'none !important', borderRadius: '50% !important', cursor: 'pointer' }} />
              </div>
            </div>
            <div>
              <Label>Sort Order</Label>
              <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>
          </div>

          {/* Preview */}
          <div style={{ marginTop: 16, padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
            <Label>Preview</Label>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 2 }}>{form.label || 'Skill Name'}</span>
              <span style={{ ...mono, fontSize: 11, color: form.color, fontWeight: 500 }}>{form.value}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${form.value}%`, background: form.color, borderRadius: 2, transition: 'width 0.5s', boxShadow: `0 0 10px ${form.color}90` }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Btn onClick={save} loading={saving} color={A.green}>Simpan</Btn>
            <Btn onClick={cancel} color={A.textMuted}>Batal</Btn>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: A.textMuted }}>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {skills.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: A.textMuted }}>
              <div style={{ ...mono, fontSize: 11, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 2 }}>No skills yet</div>
              <Btn onClick={startNew} color={A.accent}>Tambah Skill Pertama</Btn>
            </div>
          ) : skills.map(s => (
            <div key={s.id} className="admin-row" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', transition: 'background 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}80`, flexShrink: 0 }} />
                <span style={{ ...syne, fontSize: 13, fontWeight: 700, flex: 1 }}>{s.label}</span>
                <span style={{ ...mono, fontSize: 12, color: s.color, fontWeight: 500 }}>{s.value}%</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn small onClick={() => startEdit(s)} color={A.blue}>Edit</Btn>
                  <Btn small danger onClick={() => remove(s.id)}>Hapus</Btn>
                </div>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.value}%`, background: s.color, borderRadius: 2, boxShadow: `0 0 8px ${s.color}80` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CATEGORIES TAB ──────────────────────────────────────────────
function CategoriesTab({ toast }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const colorOptions = [
    { label: 'Pink', value: '#ff3cbe' }, { label: 'Purple', value: '#b03cff' },
    { label: 'Blue', value: '#3c9eff' }, { label: 'Green', value: '#3cff7a' },
    { label: 'Orange', value: '#ff8c3c' }, { label: 'Red', value: '#ff3c3c' },
  ];
  const iconOptions = ['trending', 'video', 'radio', 'users', 'code', 'flag', 'globe', 'sparkles', 'cpu', 'monitor', 'folder', 'briefcase'];

  const defaultForm = { id: '', title: '', description: '', color: '#ff3cbe', icon_key: 'folder', tags: '', modal_content: '', sort_order: 0 };
  const [form, setForm] = useState(defaultForm);

  const load = async () => {
    setLoading(true);
    const { data } = await getProjectCategories();
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (c) => {
    setEditing(c.id);
    setForm({ ...c, tags: (c.tags || []).join(', ') });
  };
  const cancel = () => { setEditing(null); setForm(defaultForm); };

  const save = async () => {
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    const { error } = await upsertProjectCategory(payload);
    if (error) toast('Error: ' + error.message, 'error');
    else { toast('Category saved!'); cancel(); await load(); }
    setSaving(false);
  };

  return (
    <div>
      <SectionHeader title="Project Categories" subtitle="6 kategori card + detail modal content" />

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${A.orange}40`, borderRadius: 14, padding: 24, marginBottom: 24, animation: 'fadeIn 0.2s ease' }}>
          <div style={{ ...syne, fontSize: 14, fontWeight: 700, color: A.orange, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>Edit: {editing}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <Label>Title</Label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Digital Marketing" />
            </div>
            <div>
              <Label>Icon</Label>
              <select value={form.icon_key} onChange={e => setForm(f => ({ ...f, icon_key: e.target.value }))}>
                {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Description (card preview)</Label>
              <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description untuk card" style={{ resize: 'vertical' }} />
            </div>
            <div>
              <Label>Tags (pisah dengan koma)</Label>
              <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Meta Ads, Google Ads, Analytics" />
            </div>
            <div>
              <Label>Color</Label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
                {colorOptions.map(c => (
                  <div key={c.value} onClick={() => setForm(f => ({ ...f, color: c.value }))} style={{ width: 24, height: 24, borderRadius: '50%', background: c.value, cursor: 'pointer', border: form.color === c.value ? '3px solid #fff' : '2px solid transparent' }} />
                ))}
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Modal Content (HTML — isi detail portfolio)</Label>
              <textarea rows={12} value={form.modal_content} onChange={e => setForm(f => ({ ...f, modal_content: e.target.value }))} placeholder="<h4>...</h4><div>...</div>" style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '12px !important' }} />
              <div style={{ ...mono, fontSize: 10, color: A.textMuted, marginTop: 6 }}>Tulis HTML untuk isi modal detail. Bisa copy dari App.jsx yang lama.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Btn onClick={save} loading={saving} color={A.green}>Simpan</Btn>
            <Btn onClick={cancel} color={A.textMuted}>Batal</Btn>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: A.textMuted }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {categories.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}30`, borderRadius: 12, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: c.color }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ ...syne, fontSize: 14, fontWeight: 700, color: '#fff' }}>{c.title}</div>
                  <div style={{ ...mono, fontSize: 10, color: A.textMuted, marginTop: 2 }}>{c.id}</div>
                </div>
                <Btn small onClick={() => startEdit(c)} color={A.blue}>Edit</Btn>
              </div>
              <div style={{ ...dmSans, fontSize: 12, color: A.textMuted, lineHeight: 1.5 }}>{c.description}</div>
              {c.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
                  {c.tags.map(t => <span key={t} style={{ ...mono, fontSize: 9, color: c.color, background: c.color + '18', padding: '2px 6px', borderRadius: 4 }}>{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS TAB ────────────────────────────────────────────────
function SettingsTab({ toast }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});

  const load = async () => {
    setLoading(true);
    const { data } = await getAllSettings();
    const obj = {};
    (data || []).forEach(s => { obj[s.key] = s.value; });
    setSettings(obj);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (key) => {
    setSaving(s => ({ ...s, [key]: true }));
    const { error } = await updateSetting(key, settings[key]);
    if (error) toast('Error: ' + error.message, 'error');
    else toast(`"${key}" updated!`);
    setSaving(s => ({ ...s, [key]: false }));
  };

  const settingFields = [
    { key: 'hero_subtitle', label: 'Hero Description', type: 'textarea', placeholder: 'Teks deskripsi di hero section' },
    { key: 'hero_tags', label: 'Hero Tags (JSON array)', type: 'textarea', placeholder: '["AI/ML Engineer","App Developer",...]' },
    { key: 'about_text_1', label: 'About Paragraph 1', type: 'textarea', placeholder: 'Paragraf pertama di section About' },
    { key: 'about_text_2', label: 'About Paragraph 2', type: 'textarea', placeholder: 'Paragraf kedua di section About' },
    { key: 'status', label: 'Status', type: 'select', options: ['Not Available', 'Available', 'Open to Work', 'Busy'] },
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: 40, color: A.textMuted }}>Loading...</div>;

  return (
    <div>
      <SectionHeader title="Content Settings" subtitle="Edit teks hero, about, dan status portfolio" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {settingFields.map(({ key, label, type, placeholder, options }) => (
          <div key={key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Label>{label}</Label>
              <Btn small onClick={() => save(key)} loading={saving[key]} color={A.green}>Simpan</Btn>
            </div>
            {type === 'textarea' ? (
              <textarea rows={3} value={settings[key] || ''} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} placeholder={placeholder} style={{ resize: 'vertical' }} />
            ) : type === 'select' ? (
              <select value={settings[key] || ''} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input value={settings[key] || ''} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} placeholder={placeholder} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────────────
export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ msg, type, id: Date.now() });

  // Check session on mount
  useEffect(() => {
    getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setSession(null);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: A.bg }}>
      <div style={{ ...mono, color: A.textMuted, fontSize: 12 }}>Loading...</div>
    </div>
  );

  if (!session) return <LoginScreen onLogin={() => {}} />;

  const tabs = [
    { key: 'projects', label: 'Projects', color: A.accent },
    { key: 'skills', label: 'Skills', color: A.purple },
    { key: 'categories', label: 'Categories', color: A.orange },
    { key: 'settings', label: 'Settings', color: A.blue },
  ];

  return (
    <>
      <style>{adminCSS}</style>

      {/* BG */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'radial-gradient(ellipse at 20% 20%, rgba(176,60,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,60,190,0.06) 0%, transparent 60%), #0a0a0f' }} />

      <div style={{ minHeight: '100vh', display: 'flex' }}>

        {/* SIDEBAR */}
        <div className="admin-sidebar" style={{ width: 220, background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', padding: '24px 16px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
          {/* Logo */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ ...syne, fontWeight: 800, fontSize: 20, color: '#fff' }}>FA<span style={{ color: '#ff3cbe' }}>_</span></div>
            <div style={{ ...mono, fontSize: 9, color: '#ff3cbe', textTransform: 'uppercase', letterSpacing: 3, marginTop: 2 }}>Admin Panel</div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {tabs.map(t => (
              <div
                key={t.key}
                className={`admin-tab${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
                style={{ ...dmSans, fontSize: 13, padding: '10px 14px', borderRadius: 8, border: '1px solid transparent', color: activeTab === t.key ? t.color : 'rgba(255,255,255,0.5)', fontWeight: activeTab === t.key ? 600 : 400 }}
              >
                {t.label}
              </div>
            ))}
          </div>

          {/* User + Logout */}
          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ ...mono, fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session?.user?.email}
            </div>
            <Btn onClick={handleLogout} color="#ff4444" small>Logout</Btn>
          </div>

          {/* Back to portfolio */}
          <a href="#/" style={{ ...mono, fontSize: 10, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', marginTop: 10, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>← Kembali ke Portfolio</a>
        </div>

        {/* MAIN */}
        <div className="admin-main" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          {/* Mobile header */}
          <div style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ ...syne, fontWeight: 800, fontSize: 18, color: '#fff' }}>FA<span style={{ color: '#ff3cbe' }}>_</span> Admin</div>
            <Btn onClick={handleLogout} color="#ff4444" small>Logout</Btn>
          </div>

          {/* Mobile tabs */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {tabs.map(t => (
              <div
                key={t.key}
                className={`admin-tab${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
                style={{ ...mono, fontSize: 10, padding: '6px 12px', borderRadius: 6, border: `1px solid ${activeTab === t.key ? t.color + '50' : 'rgba(255,255,255,0.12)'}`, color: activeTab === t.key ? t.color : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer' }}
              >
                {t.label}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div key={activeTab} style={{ animation: 'fadeIn 0.2s ease' }}>
            {activeTab === 'projects' && <ProjectsTab toast={showToast} />}
            {activeTab === 'skills' && <SkillsTab toast={showToast} />}
            {activeTab === 'categories' && <CategoriesTab toast={showToast} />}
            {activeTab === 'settings' && <SettingsTab toast={showToast} />}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}