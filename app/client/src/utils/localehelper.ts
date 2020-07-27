import counterpart from "counterpart";

export default class LocaleHelper {
  private static locale: string = undefined!;

  public static initialize(locale: string, languageJson: object) {
    LocaleHelper.locale = locale;
    counterpart.registerTranslations(LocaleHelper.locale, languageJson);
    counterpart.registerTranslations(LocaleHelper.locale, languageJson);
    counterpart.setLocale(LocaleHelper.locale);
    counterpart.setFallbackLocale(LocaleHelper.locale);
  }

  public static translate(
    key: string,
    ...params: Array<string | number>
  ): string {
    if (LocaleHelper.locale) {
      let translatedText: string = counterpart.translate(key);
      for (let i = 0; i < params.length; i++) {
        translatedText = translatedText.replace(
          "{" + i + "}",
          String(params[i])
        );
      }
      return translatedText;
    } else {
      return "";
    }
  }
}
