import { codeToHtml } from "@/lib/shiki";
import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";

type CodeRenderer = {
  code: string;
  lang: BundledLanguage;
};

export default async function CodeRenderer({ code, lang }: CodeRenderer) {
  const normalizedCode = code.replace(/\r\n/g, "\n").trim();
  const { html: darkHtml, dispose: disposeDark } = await codeToHtml({
    code: normalizedCode.trim(),
    lang,
    theme: "github-dark" as BundledTheme,
  });

  const { html: lightHtml, dispose: disposeLight } = await codeToHtml({
    code: normalizedCode.trim(),
    lang,
    theme: "github-light" as BundledTheme,
  });

  return (
    <div>
      <pre className="hidden dark:block">
        <code dangerouslySetInnerHTML={{ __html: darkHtml }} lang={lang} />
      </pre>

      <pre className="block dark:hidden">
        <code dangerouslySetInnerHTML={{ __html: lightHtml }} lang={lang} />
      </pre>
    </div>
  );
}