import { useLocaleCtx } from "../components/Layout";
import { panel, panelH2 } from "../lib/ui";

export default function ReactDocsPage() {
  const { t } = useLocaleCtx();
  return (
    <main className="grid gap-4.5 max-md:gap-3">
      <section className={panel}>
        <h2 className={panelH2}>React</h2>
        <p className="text-[12.5px] text-dim">{t.docsSoon}</p>
      </section>
    </main>
  );
}
