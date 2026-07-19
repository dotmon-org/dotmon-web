import { focusRing } from "../lib/ui";
import { toast } from "./Toast";

interface Props {
  code: string;
  copyLabel: string;
  copiedMsg: string;
}

/** Code sample with a copy-to-clipboard button (docs pages) */
export default function CodeBlock({ code, copyLabel, copiedMsg }: Props) {
  return (
    <div className="relative min-w-0">
      <pre className="overflow-x-auto rounded-lg border border-line bg-bg p-3 pr-16 text-[12px] leading-[1.7] text-ink">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        title={copyLabel}
        aria-label={copyLabel}
        className={`absolute top-2 right-2 cursor-pointer rounded border border-line bg-panel2 px-1.5 py-0.5 font-mono text-[10px] text-dim hover:text-ink ${focusRing}`}
        onClick={() =>
          navigator.clipboard
            .writeText(code)
            .then(() => toast(copiedMsg))
            .catch(() => {})
        }
      >
        copy
      </button>
    </div>
  );
}
