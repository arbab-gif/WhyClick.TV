import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/whyclick-logo.png';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const REVENUE = [320, 480, 210, 560, 390, 720, 580, 640, 410, 780, 520, 580];

const TRANSACTIONS = [
  { id: 'INV-0041', client: 'Sarah Mitchell',  service: 'Deep Clean – 3 bed',     amount: 140, status: 'paid',    date: '10 May 2026' },
  { id: 'INV-0040', client: 'James Thornton',  service: 'End of Tenancy Clean',   amount: 255, status: 'pending', date: '8 May 2026'  },
  { id: 'INV-0039', client: 'Priya Sharma',    service: 'Regular Clean – 2 bed',  amount: 85,  status: 'paid',    date: '6 May 2026'  },
  { id: 'INV-0038', client: 'Daniel Fraser',   service: 'Office Clean',           amount: 200, status: 'failed',  date: '4 May 2026'  },
  { id: 'INV-0037', client: 'Emma Caldwell',   service: 'Deep Clean – 2 bed',     amount: 115, status: 'paid',    date: '2 May 2026'  },
];

const STATUS_STYLES = {
  paid:    { bg: 'var(--green-soft)',  color: 'var(--green)',  label: 'Paid'    },
  pending: { bg: '#fef3c7',           color: '#d97706',       label: 'Pending' },
  failed:  { bg: '#fee2e2',           color: '#ef4444',       label: 'Failed'  },
};

const maxRev = Math.max(...REVENUE);

export default function ProDashboard() {
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const statCards = [
    {
      label: 'Revenue This Month',
      value: '£580.00',
      delta: '+12%',
      up: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      label: 'Total Outstanding',
      value: '£255.00',
      delta: '1 invoice',
      up: null,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      ),
    },
    {
      label: 'Failed Payments',
      value: '1',
      delta: 'Needs action',
      up: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
    },
    {
      label: 'Active Subscriptions',
      value: '3',
      delta: 'All active',
      up: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--line-2)',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', display: 'block' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Notification bell */}
          <button style={{ position: 'relative', color: 'var(--ink-3)', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '1.5px solid var(--bg)' }} />
          </button>

          {/* Avatar menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 10px 5px 5px', borderRadius: 40,
                border: '1px solid var(--line)', background: 'var(--bg)',
              }}
            >
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}>
                <span style={{ font: '600 13px/1 Inter', color: 'var(--accent)' }}>S</span>
              </div>
              <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Sarah's Cleaning</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {showMenu && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'var(--bg)', border: '1px solid var(--line)',
                borderRadius: 12, padding: '6px 0', minWidth: 180,
                boxShadow: 'var(--shadow-md)', zIndex: 100,
                animation: 'fadeSlideDown .12s ease',
              }}>
                {[
                  { label: 'My Profile',    icon: '👤' },
                  { label: 'Settings',      icon: '⚙️' },
                  { label: 'Billing',       icon: '💳' },
                ].map(item => (
                  <button key={item.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', font: '400 14px/1 Inter', color: 'var(--ink-2)', background: 'none', textAlign: 'left' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ fontSize: 15 }}>{item.icon}</span>{item.label}
                  </button>
                ))}
                <div style={{ height: 1, background: 'var(--line-2)', margin: '6px 0' }} />
                <button
                  onClick={() => navigate('/pro/signin')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', font: '400 14px/1 Inter', color: '#ef4444', background: 'none', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page body */}
      <div style={{ flex: 1, maxWidth: 1100, width: '100%', margin: '0 auto', padding: '36px 24px 60px' }}>

        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: '0 0 4px', font: '700 24px/1.2 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>Dashboard</h1>
          <p style={{ margin: 0, font: '400 14px/1 Inter', color: 'var(--ink-3)' }}>May 2026 — all figures in GBP</p>
        </div>

        {/* ── Stat cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16, marginBottom: 28,
        }}>
          {statCards.map((card, i) => (
            <div key={i} style={{
              background: 'var(--bg)', border: '1px solid var(--line)',
              borderRadius: 16, padding: '22px 24px',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-3)' }}>{card.label}</span>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: card.up === false ? '#fee2e2' : card.up === true ? 'var(--accent-soft)' : 'var(--bg-alt)',
                  color: card.up === false ? '#ef4444' : card.up === true ? 'var(--accent)' : 'var(--ink-3)',
                  display: 'grid', placeItems: 'center',
                }}>
                  {card.icon}
                </div>
              </div>
              <div>
                <div style={{ font: '700 28px/1 Inter', letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 6 }}>{card.value}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  font: '500 12px/1 Inter',
                  color: card.up === false ? '#ef4444' : card.up === true ? 'var(--green)' : 'var(--ink-3)',
                }}>
                  {card.up === true && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>}
                  {card.up === false && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>}
                  {card.delta}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Monthly Revenue Chart ── */}
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--line)',
          borderRadius: 16, padding: '28px 28px 24px', marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ font: '600 16px/1.2 Inter', color: 'var(--ink)', marginBottom: 4 }}>Monthly Revenue</div>
              <div style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>Jan – Dec 2025 · GBP</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent)' }} />
              Revenue
            </div>
          </div>

          {/* Chart area */}
          <div style={{ position: 'relative' }}>
            {/* Y-axis gridlines */}
            {[0, 25, 50, 75, 100].map(pct => (
              <div key={pct} style={{
                position: 'absolute', left: 0, right: 0,
                bottom: `calc(${pct}% + 28px)`,
                borderTop: pct === 0 ? '1.5px solid var(--line)' : '1px dashed var(--line-2)',
                zIndex: 0,
              }}>
                {pct > 0 && (
                  <span style={{
                    position: 'absolute', left: 0, top: -9,
                    font: '400 11px/1 Inter', color: 'var(--ink-3)',
                    transform: 'translateX(-100%) translateX(-8px)',
                    whiteSpace: 'nowrap',
                  }}>
                    £{Math.round(maxRev * pct / 100)}
                  </span>
                )}
              </div>
            ))}

            {/* Bars */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 10,
              height: 260, paddingBottom: 28, paddingLeft: 40,
              position: 'relative', zIndex: 1,
            }}>
              {REVENUE.map((val, i) => {
                const heightPct = (val / maxRev) * 100;
                const isHovered = hoveredBar === i;
                const isCurrent = i === 11; // Dec = last, current month highlight

                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div style={{
                        position: 'absolute',
                        bottom: `calc(${heightPct}% + 34px)`,
                        background: 'var(--ink)', color: '#fff',
                        font: '600 12px/1.4 Inter', padding: '6px 10px',
                        borderRadius: 8, whiteSpace: 'nowrap', zIndex: 10,
                        pointerEvents: 'none',
                        transform: 'translateX(0)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}>
                        £{val}<br />
                        <span style={{ font: '400 11px/1.4 Inter', opacity: 0.7 }}>{MONTHS[i]} 2025</span>
                      </div>
                    )}

                    {/* Bar */}
                    <div style={{
                      width: '100%', maxWidth: 40,
                      height: `${heightPct}%`,
                      minHeight: 8,
                      borderRadius: '6px 6px 3px 3px',
                      background: isHovered
                        ? 'var(--accent)'
                        : isCurrent
                          ? 'var(--accent)'
                          : 'oklch(0.88 0.06 40)',
                      opacity: isHovered ? 1 : isCurrent ? 1 : 0.75,
                      transition: 'background .15s, opacity .15s, height .3s ease',
                      cursor: 'pointer',
                    }} />

                    {/* Month label */}
                    <div style={{ font: '400 11px/1 Inter', color: isHovered ? 'var(--ink)' : 'var(--ink-3)', marginBottom: 0, transition: 'color .15s' }}>
                      {MONTHS[i]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Recent Transactions ── */}
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--line)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          <div style={{ padding: '22px 24px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line-2)' }}>
            <div style={{ font: '600 16px/1 Inter', color: 'var(--ink)' }}>Recent Transactions</div>
            <button style={{ font: '500 13px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr auto auto',
            gap: 12, padding: '10px 24px',
            font: '500 11px/1 Inter', color: 'var(--ink-3)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            borderBottom: '1px solid var(--line-2)', background: 'var(--bg-alt)',
          }}>
            <span>Invoice</span>
            <span>Client</span>
            <span>Service</span>
            <span style={{ textAlign: 'right' }}>Amount</span>
            <span>Status</span>
          </div>

          {TRANSACTIONS.map((tx, i) => {
            const st = STATUS_STYLES[tx.status];
            return (
              <div key={tx.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr auto auto',
                gap: 12, padding: '16px 24px',
                borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--line-2)' : 'none',
                alignItems: 'center',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <div>
                  <div style={{ font: '500 13px/1 Inter', color: 'var(--ink)', marginBottom: 3 }}>{tx.id}</div>
                  <div style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)' }}>{tx.date}</div>
                </div>
                <div style={{ font: '400 14px/1 Inter', color: 'var(--ink-2)' }}>{tx.client}</div>
                <div style={{ font: '400 13px/1.3 Inter', color: 'var(--ink-3)' }}>{tx.service}</div>
                <div style={{ font: '600 14px/1 Inter', color: 'var(--ink)', textAlign: 'right' }}>£{tx.amount}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '4px 10px', borderRadius: 20,
                  background: st.bg, color: st.color,
                  font: '500 12px/1 Inter',
                }}>
                  {st.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
