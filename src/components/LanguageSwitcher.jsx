import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import '../styles/layout.css';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'rw', label: 'Kinyarwanda' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const selectedLang = languages.find(l => l.code === (i18n.language || 'en')) || languages[0];

  return (
    <div className="language-switcher-container" ref={dropdownRef}>
      <button 
        className="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <Globe className="icon-sm lang-globe-icon" />
        <span className="lang-text">{selectedLang.label}</span>
        <ChevronDown className="icon-sm lang-chevron-icon" />
      </button>

      {isOpen && (
        <div className="language-dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-dropdown-item ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              type="button"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
