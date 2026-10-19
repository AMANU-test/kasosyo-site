import { Coins, Store, Sprout, Wallet } from 'lucide-react'
import { useT } from '../state'

/** "Paano gumagana": your money → pool → nano-entrepreneurs → dividends back + impact. */
export function MoneyFlow() {
  const { t } = useT()
  const coin = (cx: number, cy: number, fill: string) => <circle cx={cx} cy={cy} r={7.5} fill={fill} stroke="#fff" strokeWidth={2} />
  return (
    <svg viewBox="0 0 358 250" className="h-auto w-full" role="img" aria-labelledby="flow-title">
      <title id="flow-title">
        {t(
          'Ang ipon mo ay sumasama sa KaSosyo pool. Ang pool ang sumusuporta sa mga nano-negosyo. Bumabalik sa iyo ang dividends, at lumalago ang komunidad.',
          'Your savings join the KaSosyo pool. The pool supports nano-businesses. Dividends come back to you, and the community grows.',
        )}
      </title>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-teal)" />
        </marker>
      </defs>

      {/* forward arrows */}
      <path d="M94 80 H124" stroke="var(--color-teal)" strokeWidth={2.5} markerEnd="url(#arrow)" />
      <path d="M234 80 H264" stroke="var(--color-teal)" strokeWidth={2.5} markerEnd="url(#arrow)" />

      {/* return loop */}
      <path d="M306 176 C306 246 52 246 52 148" fill="none" stroke="var(--color-mangga)" strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" markerEnd="url(#arrow)" />

      {/* Ikaw */}
      <circle cx={52} cy={80} r={38} fill="var(--color-teal-tint)" />
      <Wallet x={36} y={64} width={32} height={32} color="var(--color-teal)" strokeWidth={1.75} />
      <text x={52} y={138} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--color-ink)">{t('Ikaw', 'You')}</text>

      {/* Pool */}
      <circle cx={179} cy={80} r={50} fill="var(--color-teal)" />
      {coin(160, 62, 'var(--color-mangga)')}
      {coin(184, 52, 'var(--color-sexy-x)')}
      {coin(203, 70, 'var(--color-mangga)')}
      {coin(150, 86, 'var(--color-sexy-e)')}
      {coin(174, 80, 'var(--color-mangga)')}
      {coin(198, 96, 'var(--color-sexy-y)')}
      {coin(166, 104, 'var(--color-mangga)')}
      {coin(186, 116, 'var(--color-sexy-s)')}
      {coin(143, 110, 'var(--color-mangga)')}
      <text x={179} y={150} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--color-ink)">KaSosyo pool</text>
      <text x={179} y={165} textAnchor="middle" fontSize={11} fill="var(--color-muted)">{t('pinagsama-samang ipon', 'pooled savings')}</text>

      {/* Nano-negosyo */}
      <circle cx={306} cy={80} r={38} fill="var(--color-mangga-soft)" />
      <Store x={290} y={64} width={32} height={32} color="var(--color-sexy-x)" strokeWidth={1.75} />
      <circle cx={334} cy={50} r={14} fill="var(--color-teal-tint)" stroke="#fff" strokeWidth={2} />
      <Sprout x={325} y={41} width={18} height={18} color="var(--color-teal)" strokeWidth={2} />
      <text x={306} y={138} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--color-ink)">{t('Nano-negosyo', 'Nano-business')}</text>
      <text x={306} y={153} textAnchor="middle" fontSize={11} fill="var(--color-muted)">{t('+ epekto sa', '+ impact on the')}</text>
      <text x={306} y={166} textAnchor="middle" fontSize={11} fill="var(--color-muted)">{t('komunidad', 'community')}</text>

      {/* return chip */}
      <rect x={104} y={208} width={150} height={34} rx={17} fill="var(--color-mangga)" />
      <Coins x={116} y={216} width={18} height={18} color="var(--color-ink)" strokeWidth={2} />
      <text x={140} y={230} fontSize={12.5} fontWeight={700} fill="var(--color-ink)">{t('Dividends sa iyo', 'Dividends to you')}</text>
    </svg>
  )
}
