import { useState } from 'react'
import { THEME_NAMES, tokens } from '@carbon/echarts-theme'
import type { CarbonThemeName, ThemeKey } from '@carbon/echarts-theme'
import { VARIANTS, DEFAULT_SLUG } from './variants'
import { LineChart } from './LineChart'

const THEME_OPTIONS = Object.entries(THEME_NAMES) as [ThemeKey, CarbonThemeName][]

// Read ?variant=<slug> from the URL so the StackBlitz link can pre-select a chart.
function readVariantParam(): string {
  try {
    return new URLSearchParams(window.location.search).get('variant') ?? DEFAULT_SLUG
  } catch {
    return DEFAULT_SLUG
  }
}

export function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>('white')
  const [slug, setSlug] = useState<string>(readVariantParam)
  const { background, textPrimary, borderSubtle01 } = tokens[themeKey]

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '1rem',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        background,
        color: textPrimary,
      }}
    >
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <label>
          Chart variant{' '}
          <select value={slug} onChange={(e) => setSlug(e.target.value)}>
            {VARIANTS.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Carbon theme{' '}
          <select value={themeKey} onChange={(e) => setThemeKey(e.target.value as ThemeKey)}>
            {THEME_OPTIONS.map(([key]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          border: `1px solid ${borderSubtle01}`,
          borderRadius: 4,
          padding: '0.5rem',
        }}
      >
        <LineChart slug={slug} theme={THEME_NAMES[themeKey]} />
      </div>
    </div>
  )
}
