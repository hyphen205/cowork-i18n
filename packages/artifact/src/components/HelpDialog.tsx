import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HelpDialogProps {
  onClose: () => void;
}

interface Row {
  keys: string[];
  description: string;
}

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-[11px] font-semibold uppercase tracking-wider text-soft">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.description} className="flex items-center justify-between gap-3 text-[13px]">
            <span className="font-display text-ink">{r.description}</span>
            <span className="flex gap-1 font-mono">
              {r.keys.map((k) => (
                <kbd
                  key={k}
                  className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-sm border border-line bg-canvas px-1.5 text-[11px] font-medium text-soft"
                >
                  {k}
                </kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HelpDialog({ onClose }: HelpDialogProps) {
  const { t } = useTranslation();

  const HOVER_SHORTCUTS: Row[] = [
    { keys: ['E', 'Enter'], description: t('helpDialog.shortcuts.openCard') },
    { keys: ['C'], description: t('helpDialog.shortcuts.archiveCard') },
    { keys: ['L'], description: t('helpDialog.shortcuts.openLabels') },
    { keys: ['M'], description: t('helpDialog.shortcuts.openOwner') },
    { keys: ['D'], description: t('helpDialog.shortcuts.setDueDate') },
    { keys: ['1', '–', '9', '0'], description: t('helpDialog.shortcuts.toggleLabelByNumber') },
  ];
  const BOARD_SHORTCUTS: Row[] = [
    { keys: ['/'], description: t('helpDialog.shortcuts.focusSearch') },
    { keys: ['N'], description: t('helpDialog.shortcuts.newTaskInInbox') },
    { keys: ['A'], description: t('helpDialog.shortcuts.toggleShowArchived') },
    { keys: ['?'], description: t('helpDialog.shortcuts.thisHelp') },
  ];
  const MODAL_SHORTCUTS: Row[] = [
    { keys: ['T'], description: t('helpDialog.shortcuts.editTitle') },
    { keys: ['Space'], description: t('helpDialog.shortcuts.assignToMe') },
    { keys: ['L'], description: t('helpDialog.shortcuts.toggleLabels') },
    { keys: ['M'], description: t('helpDialog.shortcuts.toggleOwner') },
    { keys: ['C'], description: t('helpDialog.shortcuts.archive') },
    { keys: ['D'], description: t('helpDialog.shortcuts.editDueDate') },
    { keys: ['Esc'], description: t('helpDialog.shortcuts.closePopup') },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('helpDialog.title')}
      data-testid="help-dialog"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border border-line bg-canvas p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-medium text-ink">{t('helpDialog.title')}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('helpDialog.close')}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-soft hover:bg-paper"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Section title={t('helpDialog.sections.hoverCard')} rows={HOVER_SHORTCUTS} />
          <Section title={t('helpDialog.sections.board')} rows={BOARD_SHORTCUTS} />
          <Section title={t('helpDialog.sections.inCard')} rows={MODAL_SHORTCUTS} />
        </div>
        <footer className="mt-5 border-t border-line pt-3 text-[12px] text-soft">
          Press <kbd className="rounded-sm border border-line bg-paper px-1 font-mono">Esc</kbd>{' '}
          {t('helpDialog.footerSuffix')}
        </footer>
      </div>
    </div>
  );
}
