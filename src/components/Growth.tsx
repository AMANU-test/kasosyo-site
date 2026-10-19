/** Seed → sprout → plant, for the three "how to start" steps. */
export function Growth({ stage }: { stage: 1 | 2 | 3 }) {
  const leaf = '#4f9d52'
  const leafLight = '#6cb86c'
  const stem = '#3d8a45'
  return (
    <svg viewBox="0 0 80 80" className="size-full" aria-hidden>
      {/* sky glow */}
      <circle cx="40" cy="44" r="30" fill="var(--color-teal-tint)" />
      {stage === 3 && <circle cx="62" cy="16" r="7" fill="var(--color-mangga)" opacity=".9" />}

      {/* plant, drawn before the soil so the soil covers its base */}
      {stage === 1 && (
        <g>
          <path d="M40 66 q-2 4 1 8" stroke="#7a5233" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <ellipse cx="40" cy="59" rx="9.5" ry="6.5" transform="rotate(-18 40 59)" fill="#c9893d" />
          <path d="M34.5 59.5 q5 -5 11 -3" stroke="#e6b26a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {stage === 2 && (
        <g>
          <path d="M40 66 C40 58 40 52 41 44" stroke={stem} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M41 46 C33 45 28 39 28 35 C35 35 40 39 41 46 Z" fill={leaf} />
          <path d="M41 46 C49 45 54 40 54 36 C47 36 42 40 41 46 Z" fill={leafLight} />
        </g>
      )}
      {stage === 3 && (
        <g>
          <path d="M40 66 C39 52 41 36 40 20" stroke={stem} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M40 54 C31 54 25 48 24 43 C32 42 38 47 40 54 Z" fill={leaf} />
          <path d="M40 46 C49 46 55 40 56 35 C48 34 42 39 40 46 Z" fill={leafLight} />
          <path d="M40 36 C32 36 27 31 26 26 C33 25 39 30 40 36 Z" fill={leafLight} />
          <path d="M40 29 C47 29 52 24 53 20 C46 19 41 23 40 29 Z" fill={leaf} />
          <circle cx="40" cy="17" r="5.5" fill="var(--color-coral)" />
          <circle cx="40" cy="17" r="2.2" fill="var(--color-mangga)" />
        </g>
      )}

      {/* soil */}
      <path d="M8 66 C20 58 60 58 72 66 L72 72 C60 76 20 76 8 72 Z" fill="#8b5e3c" />
      <path d="M8 66 C20 58 60 58 72 66 C60 63 20 63 8 66 Z" fill="#a8744d" />
      <circle cx="24" cy="69" r="1.2" fill="#6f4a2f" />
      <circle cx="55" cy="70" r="1.4" fill="#6f4a2f" />
    </svg>
  )
}
