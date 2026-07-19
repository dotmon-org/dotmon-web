import { useLocaleCtx } from "../components/Layout";
import { panel, panelH2 } from "../lib/ui";

export default function CliDocsPage() {
  const { t } = useLocaleCtx();
  return (
    <main className="grid gap-4.5 max-md:gap-3">
      <section className={panel}>
        <h2 className={panelH2}>CLI</h2>
        <p className="text-[12.5px] text-dim">{t.docsSoon}</p>
      </section>
    </main>
  );
}
