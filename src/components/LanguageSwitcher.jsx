import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import '../styles/layout.css';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Globe className="icon-sm" style={{ color: 'var(--canlens-silver)' }} />
      <select
        value={i18n.language || 'en'}
        onChange={handleLanguageChange}
        style={{
          background: 'transparent',
          border: '1px solid var(--canlens-light-gray)',
          color: 'var(--canlens-white)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '14px',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <option value="en" style={{ background: 'var(--canlens-dark-gray)' }}>English</option>
        <option value="ar" style={{ background: 'var(--canlens-dark-gray)' }}>العربية</option>
        <option value="rw" style={{ background: 'var(--canlens-dark-gray)' }}>Kinyarwanda</option>
      </select>
    </div>
  );
}
