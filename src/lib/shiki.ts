import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type Highlighter,
} from "shiki/bundle/web";

class HighlighterManager {
  private highlighters: Highlighter | null = null;
  private loadedThemes: Set<BundledTheme> = new Set();
  private loadedLangs: Set<BundledLanguage> = new Set();
  private static instance: HighlighterManager | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new HighlighterManager();
    }
    return this.instance;
  }

  async getHighlighter(theme: BundledTheme, lang: BundledLanguage): Promise<Highlighter> {
    if (!this.highlighters) {
      const themesToLoad: BundledTheme[] = [theme];
      if (theme === "github-dark" || theme === "github-light") {
        themesToLoad.push("github-dark" as BundledTheme, "github-light" as BundledTheme);
      }
      
      this.highlighters = await createHighlighter({
        themes: [...new Set(themesToLoad)],
        langs: ["tsx", "bash", lang],
      });

      themesToLoad.forEach(t => this.loadedThemes.add(t));
      this.loadedLangs.add(lang);

      return this.highlighters;
    }

    const themeToLoad: BundledTheme[] = [];
    const langToLoad: BundledLanguage[] = [];

    if (!this.loadedThemes.has(theme)) {
      themeToLoad.push(theme);
      this.loadedThemes.add(theme);
    }

    if (!this.loadedLangs.has(lang)) {
      langToLoad.push(lang);
      this.loadedLangs.add(lang);
    }

    if (themeToLoad.length > 0) {
      await this.highlighters.loadTheme(...themeToLoad);
    }

    if (langToLoad.length > 0) {
      await this.highlighters.loadLanguage(...langToLoad);
    }

    return this.highlighters;
  }

  dispose() {
    if (this?.highlighters) {
      this.highlighters.dispose();
      this.highlighters = null;
      this.loadedThemes.clear();
      this.loadedLangs.clear();
    }
  }
}

export const codeToHtml = async ({
  code,
  lang,
  theme,
  additionalThemes = [],
}: {
  code: string;
  lang: BundledLanguage;
  theme: BundledTheme;
  additionalThemes?: BundledTheme[];
}) => {
  const manager = HighlighterManager.getInstance();
  
  const highlighterInstance = await manager.getHighlighter(theme, lang);
  
  for (const additionalTheme of additionalThemes) {
    await manager.getHighlighter(additionalTheme, lang);
  }
  
  const html = highlighterInstance.codeToHtml(code, {
    lang: lang,
    theme: theme,
  });

  return { html, dispose: manager.dispose };
};