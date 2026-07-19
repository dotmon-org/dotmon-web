import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useLocale } from "../i18n";
import { focusRing } from "../lib/ui";
import ToastHost from "./Toast";

/** Locale bundle shared with pages through the router outlet */
export type LocaleCtx = ReturnType<typeof useLocale>;

export function useLocaleCtx() {
  return useOutletContext<LocaleCtx>();
}

const navLink = ({ isActive }: { isActive: boolean }) =>
  `rounded ${focusRing} ${isActive ? "text-acid" : "text-dim hover:text-ink"}`;

export default function Layout() {
  const ctx = useLocale();
  const { locale, setLocale, t } = ctx;
  const prefix = locale === "ja" ? "/ja" : "";

  return (
    <div className="mx-auto max-w-[1020px]">
      <header className="mb-5.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1.5 text-[11px] tracking-[0.35em] text-acid uppercase">
              pixel monster maker
            </div>
            <h1 className="text-[clamp(22px,3.6vw,32px)] font-bold tracking-[0.04em]">
              <NavLink to={prefix === "" ? "/" : "/ja/"} className={focusRing}>
                dottomon
              </NavLink>
              <span className="animate-blink text-acid motion-reduce:animate-none">
                _
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-3 font-mono text-[12.5px]">
              <NavLink
                to={prefix === "" ? "/" : "/ja/"}
                end
                className={navLink}
              >
                {t.navPlayground}
              </NavLink>
              <NavLink to={`${prefix}/react`} className={navLink}>
                React
              </NavLink>
              <NavLink to={`${prefix}/cli`} className={navLink}>
                CLI
              </NavLink>
            </nav>
            <button
              type="button"
              className={`flex-none cursor-pointer rounded-lg border border-line bg-panel2 px-3 py-1.5 font-mono text-[11px] text-ink ${focusRing}`}
              onClick={() => setLocale(locale === "en" ? "ja" : "en")}
            >
              {locale === "en" ? "日本語" : "English"}
            </button>
          </div>
        </div>
      </header>

      <Outlet context={ctx} />

      <footer className="mt-4.5 text-center text-[11px] text-dim">
        {t.footerMade}{" "}
        <a
          className="underline hover:text-acid"
          href="https://github.com/dottomon-org/dottomon"
          target="_blank"
          rel="noreferrer"
        >
          dottomon
        </a>{" "}
        ·{" "}
        <a
          className="underline hover:text-acid"
          href="https://www.npmjs.com/package/dottomon"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </footer>
      <ToastHost />
    </div>
  );
}
