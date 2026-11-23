import { useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons';

interface CopyCommandProps {
  command: string;
  copyLabel: string;
  copiedLabel: string;
  buttonOnly?: boolean;
}

export function CopyCommand({ command, copyLabel, copiedLabel, buttonOnly = false }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked in insecure context; keep button usable without throwing
    }
  };

  const button = (
    <button
      type="button"
      className={`cmd-copy-btn${copied ? ' is-copied' : ''}`}
      onClick={onCopy}
      aria-label={copied ? copiedLabel : copyLabel}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? copiedLabel : copyLabel}</span>
    </button>
  );

  if (buttonOnly) {
    return button;
  }

  return (
    <div className="cmd-box">
      <code className="cmd-text">{command}</code>
      {button}
    </div>
  );
}
