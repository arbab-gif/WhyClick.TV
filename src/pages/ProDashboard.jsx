import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/whyclick-logo.png';

// ── STAT CARDS DATA ───────────────────────────────────────────────────────────
const STATS = [
  {
    id: 'revenue',
    label: 'REVENUE THIS MONTH',
    value: '£580.00',
    sub: 'April 2026',
    iconBg: '#e8f5e9',
    iconColor: '#2e7d32',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M7 12h10M9 18h6" />
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12" />
      </svg>
    ),
  },
  {
    id: 'outstanding',
    label: 'TOTAL OUTSTANDING',
    value: '£255.00',
    sub: 'Across 2 accounts',
    iconBg: '#fffbeb',
    iconColor: '#d97706',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'failed',
    label: 'FAILED PAYMENTS',
    value: '1',
    sub: 'Require immediate action',
    iconBg: '#fef2f2',
    iconColor: '#dc2626',
    subColor: '#dc2626',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
  },
  {
    id: 'subscriptions',
    label: 'ACTIVE SUBSCRIPTIONS',
    value: '3',
    sub: 'Businesses billing normally',
    iconBg: '#f3e8ff',
    iconColor: '#7c3aed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

// ── RECENT TRANSACTIONS ────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { id: 1, name: 'Dr. Ali Awan',      plan: 'Pro Plan',    amount: '£145.00', date: '12 Apr 2026', status: 'paid' },
  { id: 2, name: 'Jade Monroe',       plan: 'Starter Plan',amount: '£75.00',  date: '10 Apr 2026', status: 'paid' },
  { id: 3, name: 'Sophie Laurent',    plan: 'Pro Plan',    amount: '£145.00', date: '9 Apr 2026',  status: 'paid' },
  { id: 4, name: 'Elena Vasquez',     plan: 'Starter Plan',amount: '£75.00',  date: '8 Apr 2026',  status: 'failed' },
  { id: 5, name: 'Osteria Nolita',    plan: 'Business Plan',amount: '£255.00',date: '5 Apr 2026',  status: 'outstanding' },
  { id: 6, name: 'Marcus Cole',       plan: 'Starter Plan',amount: '£75.00',  date: '3 Apr 2026',  status: 'paid' },
];

const STATUS_STYLE = {
  paid:        { bg: '#e8f5e9', color: '#2e7d32', label: 'Paid' },
  failed:      { bg: '#fef2f2', color: '#dc2626', label: 'Failed' },
  outstanding: { bg: '#fffbeb', color: '#d97706', label: 'Outstanding' },
};

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #f0f0ee',
      borderRadius: 14,
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flex: 1,
      minWidth: 0,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: stat.iconBg,
        display: 'grid', placeItems: 'center',
        color: stat.iconColor,
      }}>
        {stat.icon}
      </div>

      {/* Text */}
      <div>
        <div style={{ font: '600 10px/1 Inter', letterSpacing: '0.06em', color: '#9ca3af', marginBottom: 6 }}>
          {stat.label}
        </div>
        <div style={{ font: '700 24px/1 Inter', letterSpacing: '-0.02em', color: '#111827', marginBottom: 5 }}>
          {stat.value}
        </div>
        <div style={{ font: '400 12px/1 Inter', color: stat.subColor || '#9ca3af' }}>
          {stat.sub}
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
export default function ProDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0ee',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <img src={logo} alt="whyclick.tv" style={{ height: 40, width: 'auto', cursor: 'pointer' }} onClick={() => navigate('/')} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
            <span style={{ font: '500 13px/1 Inter', color: '#6b7280' }}>Active</span>
          </div>
          <div style={{ width: 1, height: 20, background: '#e5e7eb' }} />
          <button
            onClick={() => navigate('/pro/signin')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid #e5e7eb', background: 'transparent',
              font: '500 13px/1 Inter', color: '#6b7280', cursor: 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log out
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, padding: '32px', maxWidth: 1200, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Page title */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: '0 0 4px', font: '700 22px/1.2 Inter', letterSpacing: '-0.02em', color: '#111827' }}>
            Dashboard
          </h1>
          <p style={{ margin: 0, font: '400 14px/1 Inter', color: '#9ca3af' }}>
            Billing overview · April 2026
          </p>
        </div>

        {/* ── 4 Stat Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}>
          {STATS.map(stat => <StatCard key={stat.id} stat={stat} />)}
        </div>

        {/* ── Recent Transactions ── */}
        <div style={{
          background: '#fff',
          border: '1px solid #f0f0ee',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {/* Table header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0ee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, font: '600 15px/1 Inter', color: '#111827' }}>Recent Transactions</h2>
            <span style={{ font: '400 13px/1 Inter', color: '#6b7280' }}>April 2026</span>
          </div>

          {/* Column headings */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
            padding: '10px 24px',
            background: '#f9fafb',
            borderBottom: '1px solid #f0f0ee',
          }}>
            {['Professional', 'Plan', 'Amount', 'Date', 'Status'].map(h => (
              <span key={h} style={{ font: '600 11px/1 Inter', letterSpacing: '0.05em', color: '#9ca3af', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {TRANSACTIONS.map((tx, i) => {
            const s = STATUS_STYLE[tx.status];
            return (
              <div key={tx.id} style={{
                display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                padding: '16px 24px',
                borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid #f9fafb' : 'none',
                alignItems: 'center',
                transition: 'background .1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ font: '500 14px/1 Inter', color: '#111827' }}>{tx.name}</span>
                <span style={{ font: '400 13px/1 Inter', color: '#6b7280' }}>{tx.plan}</span>
                <span style={{ font: '600 14px/1 Inter', color: '#111827' }}>{tx.amount}</span>
                <span style={{ font: '400 13px/1 Inter', color: '#9ca3af' }}>{tx.date}</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '4px 10px', borderRadius: 999,
                  background: s.bg, color: s.color,
                  font: '500 12px/1 Inter',
                  width: 'fit-content',
                }}>{s.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
