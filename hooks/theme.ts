import Cookies from 'universal-cookie';
import Translation from "../common/translation";

const cookies = new Cookies();
export const useTheme = () => {
    const lang = cookies.get('language') ?? 'en';
    const translation = Translation[lang];
    const isRTL = lang == 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';
    return {
        translation: translation,
        lang: lang,
        isRTL: isRTL,
        dir: dir
    }
}