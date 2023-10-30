'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function DarkLightToggle({ initialTheme, className }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const COLORS = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    root.setAttribute('data-color-theme', nextTheme);

    Object.entries(COLORS).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  const Icon = theme === 'light' ? Sun : Moon;

  return (
    <button className={className} onClick={handleClick}>
      <Icon size="1.5rem" />
    </button>
  );
}

export default DarkLightToggle;
