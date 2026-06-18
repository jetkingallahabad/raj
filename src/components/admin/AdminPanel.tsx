import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import type {
  SiteSettings,
  HeroContent,
  AboutContent,
  AboutStat,
  Service,
  ServiceDetail,
  WhyUsItem,
  PortfolioItem,
  Testimonial,
  ProcessStep,
  ContactContent,
  SocialLink,
  NavLink,
  SectionHeader,
  ContactSubmission,
} from '../../lib/types';
import AdminLayout from './AdminLayout';
import type { AdminPage } from './AdminLayout';

export default function AdminPanel({ onLogout, onBackToSite }: { onLogout: () => void; onBackToSite: () => void }) {
  const [page, setPage] = useState<AdminPage>('dashboard');

  return (
    <AdminLayout currentPage={page} onPageChange={setPage} onLogout={onLogout} onBackToSite={onBackToSite}>
      {page === 'dashboard' && <DashboardPage />}
      {page === 'site-settings' && <SiteSettingsPage />}
      {page === 'hero' && <HeroPage />}
      {page === 'about' && <AboutPage />}
      {page === 'services' && <ServicesPage />}
      {page === 'service-details' && <ServiceDetailsPage />}
      {page === 'why-us' && <WhyUsPage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'testimonials' && <TestimonialsPage />}
      {page === 'process' && <ProcessPage />}
      {page === 'contact' && <ContactPage />}
      {page === 'social-links' && <SocialLinksPage />}
      {page === 'nav-links' && <NavLinksPage />}
      {page === 'section-headers' && <SectionHeadersPage />}
      {page === 'submissions' && <SubmissionsPage />}
    </AdminLayout>
  );
}

function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    async function load() {
      const tables = ['services', 'why_us_items', 'portfolio_items', 'testimonials', 'process_steps', 'contact_submissions'];
      const results = await Promise.all(tables.map((t) => supabase.from(t).select('id', { count: 'exact', head: true })));
      const c: Record<string, number> = {};
      tables.forEach((t, i) => (c[t] = results[i].count ?? 0));
      setCounts(c);

      const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5);
      setSubmissions((data as ContactSubmission[]) ?? []);
    }
    load();
  }, []);

  const cards = [
    { label: 'Services', count: counts.services ?? 0, color: '#00e0ff' },
    { label: 'Why Us Items', count: counts.why_us_items ?? 0, color: '#f97316' },
    { label: 'Portfolio Items', count: counts.portfolio_items ?? 0, color: '#4ade80' },
    { label: 'Testimonials', count: counts.testimonials ?? 0, color: '#facc15' },
    { label: 'Process Steps', count: counts.process_steps ?? 0, color: '#a78bfa' },
    { label: 'Submissions', count: counts.contact_submissions ?? 0, color: '#ef4444' },
  ];

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Dashboard</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {cards.map((c) => (
          <div key={c.label} className="admin-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: c.color }}>{c.count}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div className="admin-card">
        <h3>Recent Submissions</h3>
        {submissions.length === 0 ? (
          <div className="admin-empty">No submissions yet</div>
        ) : (
          <table className="admin-submissions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.service || '-'}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('*').order('key');
    setSettings((data as SiteSettings[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateSetting = async (id: string, value: string) => {
    await supabase.from('site_settings').update({ value }).eq('id', id);
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Site Settings</h2>
      </div>
      <div className="admin-card">
        {settings.map((s) => (
          <div key={s.id} className="admin-form-group">
            <label>{s.key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
            <input
              defaultValue={s.value}
              onBlur={(e) => updateSetting(s.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function HeroPage() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('hero_content').select('*').limit(1).maybeSingle().then(({ data }) => {
      setHero(data as HeroContent | null);
      setLoading(false);
    });
  }, []);

  const update = async (field: keyof HeroContent, value: string) => {
    if (!hero) return;
    const updated = { ...hero, [field]: value };
    setHero(updated);
    await supabase.from('hero_content').update({ [field]: value }).eq('id', hero.id);
  };

  if (loading) return <div className="admin-empty">Loading...</div>;
  if (!hero) return <div className="admin-empty">No hero content. Create one first.</div>;

  const fields: { key: keyof HeroContent; label: string; type?: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'primary_btn_text', label: 'Primary Button Text' },
    { key: 'secondary_btn_text', label: 'Secondary Button Text' },
    { key: 'meta_1_number', label: 'Meta 1 Number' },
    { key: 'meta_1_label', label: 'Meta 1 Label' },
    { key: 'meta_2_number', label: 'Meta 2 Number' },
    { key: 'meta_2_label', label: 'Meta 2 Label' },
    { key: 'meta_3_number', label: 'Meta 3 Number' },
    { key: 'meta_3_label', label: 'Meta 3 Label' },
    { key: 'background_image', label: 'Background Image URL' },
  ];

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Hero Section</h2>
      </div>
      <div className="admin-card">
        {fields.map((f) => (
          <div key={f.key} className="admin-form-group">
            <label>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea defaultValue={hero[f.key]} onBlur={(e) => update(f.key, e.target.value)} />
            ) : (
              <input defaultValue={hero[f.key]} onBlur={(e) => update(f.key, e.target.value)} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function AboutPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [stats, setStats] = useState<AboutStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('about_content').select('*').limit(1).maybeSingle(),
      supabase.from('about_stats').select('*').order('sort_order'),
    ]).then(([aboutRes, statsRes]) => {
      setAbout(aboutRes.data as AboutContent | null);
      setStats((statsRes.data as AboutStat[]) ?? []);
      setLoading(false);
    });
  }, []);

  const updateAbout = async (field: keyof AboutContent, value: string) => {
    if (!about) return;
    setAbout({ ...about, [field]: value });
    await supabase.from('about_content').update({ [field]: value }).eq('id', about.id);
  };

  const updateStat = async (id: string, field: keyof AboutStat, value: string | number) => {
    await supabase.from('about_stats').update({ [field]: value }).eq('id', id);
    setStats(stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addStat = async () => {
    const maxOrder = stats.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('about_stats').insert({ number: '0', label: 'New Stat', sort_order: maxOrder + 1 }).select().single();
    if (data) setStats([...stats, data as AboutStat]);
  };

  const deleteStat = async (id: string) => {
    await supabase.from('about_stats').delete().eq('id', id);
    setStats(stats.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;
  if (!about) return <div className="admin-empty">No about content.</div>;

  const fields: { key: keyof AboutContent; label: string; type?: string }[] = [
    { key: 'section_title', label: 'Section Title' },
    { key: 'section_subtitle', label: 'Section Subtitle', type: 'textarea' },
    { key: 'heading', label: 'Heading' },
    { key: 'paragraph_1', label: 'Paragraph 1', type: 'textarea' },
    { key: 'paragraph_2', label: 'Paragraph 2', type: 'textarea' },
    { key: 'list_item_1', label: 'List Item 1' },
    { key: 'list_item_2', label: 'List Item 2' },
    { key: 'list_item_3', label: 'List Item 3' },
    { key: 'image_url', label: 'Image URL' },
  ];

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>About Section</h2>
      </div>
      <div className="admin-card">
        <h3>Content</h3>
        {fields.map((f) => (
          <div key={f.key} className="admin-form-group">
            <label>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea defaultValue={about[f.key]} onBlur={(e) => updateAbout(f.key, e.target.value)} />
            ) : (
              <input defaultValue={about[f.key]} onBlur={(e) => updateAbout(f.key, e.target.value)} />
            )}
          </div>
        ))}
      </div>
      <div className="admin-card">
        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Stats
          <button className="admin-btn admin-btn-primary" onClick={addStat}>+ Add Stat</button>
        </h3>
        {stats.map((stat) => (
          <div key={stat.id} className="admin-list-item">
            <div className="item-info" style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  defaultValue={stat.number}
                  style={{ width: '80px' }}
                  onBlur={(e) => updateStat(stat.id, 'number', e.target.value)}
                />
                <input
                  defaultValue={stat.label}
                  style={{ flex: 1 }}
                  onBlur={(e) => updateStat(stat.id, 'label', e.target.value)}
                />
              </div>
            </div>
            <div className="item-actions">
              <button className="delete-btn" onClick={() => deleteStat(stat.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});

  const load = useCallback(async () => {
    const { data } = await supabase.from('services').select('*').order('sort_order');
    setItems((data as Service[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('services').insert({
      icon: 'fas fa-laptop-code',
      title: 'New Service',
      description: 'Description here',
      bullet_1: 'Bullet 1',
      bullet_2: 'Bullet 2',
      bullet_3: 'Bullet 3',
      category: 'branding',
      sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as Service]);
  };

  const startEdit = (item: Service) => {
    setEditing(item.id);
    setEditForm(item);
  };

  const saveEdit = async () => {
    if (!editing) return;
    await supabase.from('services').update(editForm).eq('id', editing);
    setItems(items.map((s) => (s.id === editing ? { ...s, ...editForm } as Service : s)));
    setEditing(null);
    setEditForm({});
  };

  const deleteItem = async (id: string) => {
    await supabase.from('services').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Services</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Service</button>
      </div>
      {editing && (
        <div className="admin-card">
          <h3>Edit Service</h3>
          {(['icon', 'title', 'description', 'bullet_1', 'bullet_2', 'bullet_3', 'category', 'image_url', 'sort_order'] as const).map((f) => (
            <div key={f} className="admin-form-group">
              <label>{f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
              {['description', 'bullet_1', 'bullet_2', 'bullet_3'].includes(f) || f === 'image_url' ? (
                <textarea
                  value={editForm[f] ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, [f]: e.target.value })}
                />
              ) : (
                <input
                  value={editForm[f] ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, [f]: f === 'sort_order' ? Number(e.target.value) : e.target.value })}
                />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
            <button className="admin-btn admin-btn-secondary" onClick={() => { setEditing(null); setEditForm({}); }}>Cancel</button>
          </div>
        </div>
      )}
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info">
            <h4><i className={item.icon} style={{ marginRight: '8px', color: 'var(--accent)' }} />{item.title}</h4>
            <p>{item.category} | Order: {item.sort_order}</p>
          </div>
          <div className="item-actions">
            <button onClick={() => startEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function ServiceDetailsPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [details, setDetails] = useState<ServiceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ServiceDetail>>({});

  const load = useCallback(async () => {
    const [servicesRes, detailsRes] = await Promise.all([
      supabase.from('services').select('*').order('sort_order'),
      supabase.from('service_details').select('*'),
    ]);
    setServices((servicesRes.data as Service[]) ?? []);
    setDetails((detailsRes.data as ServiceDetail[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const getDetail = (serviceId: string) => details.find((d) => d.service_id === serviceId);
  const getService = (serviceId: string) => services.find((s) => s.id === serviceId);

  const startEdit = (detail: ServiceDetail) => {
    setEditing(detail.id);
    setEditForm(detail);
  };

  const saveEdit = async () => {
    if (!editing) return;
    await supabase.from('service_details').update(editForm).eq('id', editing);
    setDetails(details.map((d) => (d.id === editing ? { ...d, ...editForm } as ServiceDetail : d)));
    setEditing(null);
    setEditForm({});
  };

  const createDetail = async (serviceId: string) => {
    const service = getService(serviceId);
    if (!service) return;
    const { data } = await supabase.from('service_details').insert({
      service_id: serviceId,
      hero_title: service.title,
      hero_subtitle: '',
      overview: service.description,
      feature_1_title: service.bullet_1,
      feature_1_desc: '',
      feature_2_title: service.bullet_2,
      feature_2_desc: '',
      feature_3_title: service.bullet_3,
      feature_3_desc: '',
      feature_4_title: '',
      feature_4_desc: '',
      process_title: 'How We Work',
      process_step_1: '',
      process_step_2: '',
      process_step_3: '',
      process_step_4: '',
      cta_text: 'Ready to get started? Contact us today for a free consultation.',
    }).select().single();
    if (data) setDetails([...details, data as ServiceDetail]);
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  if (editing) {
    const fields: { key: keyof ServiceDetail; label: string; type?: string }[] = [
      { key: 'hero_title', label: 'Hero Title' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'overview', label: 'Overview', type: 'textarea' },
      { key: 'feature_1_title', label: 'Feature 1 Title' },
      { key: 'feature_1_desc', label: 'Feature 1 Description', type: 'textarea' },
      { key: 'feature_2_title', label: 'Feature 2 Title' },
      { key: 'feature_2_desc', label: 'Feature 2 Description', type: 'textarea' },
      { key: 'feature_3_title', label: 'Feature 3 Title' },
      { key: 'feature_3_desc', label: 'Feature 3 Description', type: 'textarea' },
      { key: 'feature_4_title', label: 'Feature 4 Title' },
      { key: 'feature_4_desc', label: 'Feature 4 Description', type: 'textarea' },
      { key: 'process_title', label: 'Process Section Title' },
      { key: 'process_step_1', label: 'Process Step 1', type: 'textarea' },
      { key: 'process_step_2', label: 'Process Step 2', type: 'textarea' },
      { key: 'process_step_3', label: 'Process Step 3', type: 'textarea' },
      { key: 'process_step_4', label: 'Process Step 4', type: 'textarea' },
      { key: 'cta_text', label: 'Call to Action Text', type: 'textarea' },
      { key: 'hero_image', label: 'Hero Image URL' },
    ];

    return (
      <>
        <div className="admin-header">
          <h2 style={{ margin: 0 }}>Edit Service Detail</h2>
        </div>
        <div className="admin-card">
          {fields.map((f) => (
            <div key={f.key} className="admin-form-group">
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  value={editForm[f.key] ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, [f.key]: e.target.value })}
                />
              ) : (
                <input
                  value={editForm[f.key] ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, [f.key]: e.target.value })}
                />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
            <button className="admin-btn admin-btn-secondary" onClick={() => { setEditing(null); setEditForm({}); }}>Cancel</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Service Detail Pages</h2>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
        Click Edit to change the content that appears when someone clicks &quot;Learn More&quot; on a service card.
      </p>
      {services.map((service) => {
        const detail = getDetail(service.id);
        return (
          <div key={service.id} className="admin-list-item">
            <div className="item-info">
              <h4><i className={service.icon} style={{ marginRight: '8px', color: 'var(--accent)' }} />{service.title}</h4>
              <p>{detail ? 'Detail page configured' : 'No detail page yet'}</p>
            </div>
            <div className="item-actions">
              {detail ? (
                <button onClick={() => startEdit(detail)}>Edit</button>
              ) : (
                <button onClick={() => createDetail(service.id)} style={{ color: '#4ade80' }}>Create</button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function WhyUsPage() {
  const [items, setItems] = useState<WhyUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WhyUsItem>>({});

  const load = useCallback(async () => {
    const { data } = await supabase.from('why_us_items').select('*').order('sort_order');
    setItems((data as WhyUsItem[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('why_us_items').insert({
      icon: 'fas fa-database', title: 'New Item', description: 'Description', sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as WhyUsItem]);
  };

  const startEdit = (item: WhyUsItem) => { setEditing(item.id); setEditForm(item); };

  const saveEdit = async () => {
    if (!editing) return;
    await supabase.from('why_us_items').update(editForm).eq('id', editing);
    setItems(items.map((s) => (s.id === editing ? { ...s, ...editForm } as WhyUsItem : s)));
    setEditing(null); setEditForm({});
  };

  const deleteItem = async (id: string) => {
    await supabase.from('why_us_items').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Why Choose Us</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Item</button>
      </div>
      {editing && (
        <div className="admin-card">
          <h3>Edit Item</h3>
          {(['icon', 'title', 'description', 'sort_order'] as const).map((f) => (
            <div key={f} className="admin-form-group">
              <label>{f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
              {f === 'description' ? (
                <textarea value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: e.target.value })} />
              ) : (
                <input value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: f === 'sort_order' ? Number(e.target.value) : e.target.value })} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
            <button className="admin-btn admin-btn-secondary" onClick={() => { setEditing(null); setEditForm({}); }}>Cancel</button>
          </div>
        </div>
      )}
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info">
            <h4><i className={item.icon} style={{ marginRight: '8px', color: '#f97316' }} />{item.title}</h4>
            <p>Order: {item.sort_order}</p>
          </div>
          <div className="item-actions">
            <button onClick={() => startEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PortfolioItem>>({});

  const load = useCallback(async () => {
    const { data } = await supabase.from('portfolio_items').select('*').order('sort_order');
    setItems((data as PortfolioItem[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('portfolio_items').insert({
      gradient_from: '#22d3ee', gradient_to: '#6366f1', title: 'New Case Study',
      description: 'Description', bullet_1: 'Result 1', bullet_2: 'Result 2', bullet_3: 'Result 3', sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as PortfolioItem]);
  };

  const startEdit = (item: PortfolioItem) => { setEditing(item.id); setEditForm(item); };

  const saveEdit = async () => {
    if (!editing) return;
    await supabase.from('portfolio_items').update(editForm).eq('id', editing);
    setItems(items.map((s) => (s.id === editing ? { ...s, ...editForm } as PortfolioItem : s)));
    setEditing(null); setEditForm({});
  };

  const deleteItem = async (id: string) => {
    await supabase.from('portfolio_items').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Portfolio</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Case Study</button>
      </div>
      {editing && (
        <div className="admin-card">
          <h3>Edit Case Study</h3>
          {(['title', 'description', 'gradient_from', 'gradient_to', 'bullet_1', 'bullet_2', 'bullet_3', 'image_url', 'sort_order'] as const).map((f) => (
            <div key={f} className="admin-form-group">
              <label>{f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
              {['description', 'image_url'].includes(f) ? (
                <textarea value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: e.target.value })} />
              ) : (
                <input value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: f === 'sort_order' ? Number(e.target.value) : e.target.value })} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
            <button className="admin-btn admin-btn-secondary" onClick={() => { setEditing(null); setEditForm({}); }}>Cancel</button>
          </div>
        </div>
      )}
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info">
            <h4>{item.title}</h4>
            <p>Order: {item.sort_order}</p>
          </div>
          <div className="item-actions">
            <button onClick={() => startEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({});

  const load = useCallback(async () => {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    setItems((data as Testimonial[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('testimonials').insert({
      quote: 'New testimonial', name: 'Client Name', role: 'Company', rating: 5, sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as Testimonial]);
  };

  const startEdit = (item: Testimonial) => { setEditing(item.id); setEditForm(item); };

  const saveEdit = async () => {
    if (!editing) return;
    await supabase.from('testimonials').update(editForm).eq('id', editing);
    setItems(items.map((s) => (s.id === editing ? { ...s, ...editForm } as Testimonial : s)));
    setEditing(null); setEditForm({});
  };

  const deleteItem = async (id: string) => {
    await supabase.from('testimonials').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Testimonials</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Testimonial</button>
      </div>
      {editing && (
        <div className="admin-card">
          <h3>Edit Testimonial</h3>
          {(['quote', 'name', 'role', 'avatar_url', 'rating', 'sort_order'] as const).map((f) => (
            <div key={f} className="admin-form-group">
              <label>{f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
              {f === 'quote' || f === 'avatar_url' ? (
                <textarea value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: e.target.value })} />
              ) : (
                <input
                  type={f === 'rating' ? 'number' : 'text'}
                  value={editForm[f] ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, [f]: f === 'rating' || f === 'sort_order' ? Number(e.target.value) : e.target.value })}
                  min={f === 'rating' ? 1 : undefined}
                  max={f === 'rating' ? 5 : undefined}
                />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
            <button className="admin-btn admin-btn-secondary" onClick={() => { setEditing(null); setEditForm({}); }}>Cancel</button>
          </div>
        </div>
      )}
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info">
            <h4>{item.name} - {item.role}</h4>
            <p>{item.quote.substring(0, 60)}...</p>
          </div>
          <div className="item-actions">
            <button onClick={() => startEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function ProcessPage() {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProcessStep>>({});

  const load = useCallback(async () => {
    const { data } = await supabase.from('process_steps').select('*').order('sort_order');
    setItems((data as ProcessStep[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('process_steps').insert({
      icon: 'fas fa-lightbulb', title: 'New Step', description: 'Description', sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as ProcessStep]);
  };

  const startEdit = (item: ProcessStep) => { setEditing(item.id); setEditForm(item); };

  const saveEdit = async () => {
    if (!editing) return;
    await supabase.from('process_steps').update(editForm).eq('id', editing);
    setItems(items.map((s) => (s.id === editing ? { ...s, ...editForm } as ProcessStep : s)));
    setEditing(null); setEditForm({});
  };

  const deleteItem = async (id: string) => {
    await supabase.from('process_steps').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Process Steps</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Step</button>
      </div>
      {editing && (
        <div className="admin-card">
          <h3>Edit Step</h3>
          {(['icon', 'title', 'description', 'sort_order'] as const).map((f) => (
            <div key={f} className="admin-form-group">
              <label>{f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
              {f === 'description' ? (
                <textarea value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: e.target.value })} />
              ) : (
                <input value={editForm[f] ?? ''} onChange={(e) => setEditForm({ ...editForm, [f]: f === 'sort_order' ? Number(e.target.value) : e.target.value })} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveEdit}>Save</button>
            <button className="admin-btn admin-btn-secondary" onClick={() => { setEditing(null); setEditForm({}); }}>Cancel</button>
          </div>
        </div>
      )}
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info">
            <h4>{item.title}</h4>
            <p>Order: {item.sort_order}</p>
          </div>
          <div className="item-actions">
            <button onClick={() => startEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function ContactPage() {
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('contact_content').select('*').limit(1).maybeSingle().then(({ data }) => {
      setContact(data as ContactContent | null);
      setLoading(false);
    });
  }, []);

  const update = async (field: keyof ContactContent, value: string) => {
    if (!contact) return;
    setContact({ ...contact, [field]: value });
    await supabase.from('contact_content').update({ [field]: value }).eq('id', contact.id);
  };

  if (loading) return <div className="admin-empty">Loading...</div>;
  if (!contact) return <div className="admin-empty">No contact content.</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Contact Information</h2>
      </div>
      <div className="admin-card">
        {(['phone', 'email', 'address'] as const).map((f) => (
          <div key={f} className="admin-form-group">
            <label>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
            <input defaultValue={contact[f]} onBlur={(e) => update(f, e.target.value)} />
          </div>
        ))}
        <div className="admin-form-group">
          <label>Google Maps Embed URL</label>
          <textarea
            defaultValue={contact.map_embed_url}
            onBlur={(e) => update('map_embed_url', e.target.value)}
            placeholder="Paste the embed URL from Google Maps (src attribute from iframe)"
            rows={3}
          />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Go to Google Maps, click Share, then Embed. Copy the src URL from the iframe code.
          </p>
        </div>
      </div>
    </>
  );
}

function SocialLinksPage() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from('social_links').select('*').order('sort_order');
    setItems((data as SocialLink[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('social_links').insert({
      icon: 'fab fa-link', url: '#', sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as SocialLink]);
  };

  const updateItem = async (id: string, field: keyof SocialLink, value: string | number) => {
    await supabase.from('social_links').update({ [field]: value }).eq('id', id);
    setItems(items.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const deleteItem = async (id: string) => {
    await supabase.from('social_links').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Social Links</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Link</button>
      </div>
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info" style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input defaultValue={item.icon} style={{ width: '160px' }} onBlur={(e) => updateItem(item.id, 'icon', e.target.value)} placeholder="Icon class" />
              <input defaultValue={item.url} style={{ flex: 1 }} onBlur={(e) => updateItem(item.id, 'url', e.target.value)} placeholder="URL" />
            </div>
          </div>
          <div className="item-actions">
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function NavLinksPage() {
  const [items, setItems] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from('nav_links').select('*').order('sort_order');
    setItems((data as NavLink[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addItem = async () => {
    const maxOrder = items.reduce((max, s) => Math.max(max, s.sort_order), 0);
    const { data } = await supabase.from('nav_links').insert({
      label: 'New Link', href: '#', sort_order: maxOrder + 1,
    }).select().single();
    if (data) setItems([...items, data as NavLink]);
  };

  const updateItem = async (id: string, field: keyof NavLink, value: string | number) => {
    await supabase.from('nav_links').update({ [field]: value }).eq('id', id);
    setItems(items.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const deleteItem = async (id: string) => {
    await supabase.from('nav_links').delete().eq('id', id);
    setItems(items.filter((s) => s.id !== id));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Navigation Links</h2>
        <button className="admin-btn admin-btn-primary" onClick={addItem}>+ Add Link</button>
      </div>
      {items.map((item) => (
        <div key={item.id} className="admin-list-item">
          <div className="item-info" style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input defaultValue={item.label} style={{ width: '140px' }} onBlur={(e) => updateItem(item.id, 'label', e.target.value)} placeholder="Label" />
              <input defaultValue={item.href} style={{ width: '120px' }} onBlur={(e) => updateItem(item.id, 'href', e.target.value)} placeholder="Href" />
              <input defaultValue={item.sort_order} type="number" style={{ width: '70px' }} onBlur={(e) => updateItem(item.id, 'sort_order', Number(e.target.value))} />
            </div>
          </div>
          <div className="item-actions">
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function SectionHeadersPage() {
  const [items, setItems] = useState<SectionHeader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('section_headers').select('*').order('section_key').then(({ data }) => {
      setItems((data as SectionHeader[]) ?? []);
      setLoading(false);
    });
  }, []);

  const update = async (id: string, field: keyof SectionHeader, value: string) => {
    await supabase.from('section_headers').update({ [field]: value }).eq('id', id);
    setItems(items.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Section Headers</h2>
      </div>
      {items.map((item) => (
        <div key={item.id} className="admin-card">
          <h3 style={{ textTransform: 'capitalize' }}>{item.section_key.replace(/_/g, ' ')}</h3>
          <div className="admin-form-group">
            <label>Title</label>
            <input defaultValue={item.title} onBlur={(e) => update(item.id, 'title', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Subtitle</label>
            <textarea defaultValue={item.subtitle} onBlur={(e) => update(item.id, 'subtitle', e.target.value)} />
          </div>
        </div>
      ))}
    </>
  );
}

function SubmissionsPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setItems((data as ContactSubmission[]) ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Contact Submissions</h2>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (
          <div className="admin-empty">No submissions yet</div>
        ) : (
          <table className="admin-submissions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.service || '-'}</td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.message || '-'}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
