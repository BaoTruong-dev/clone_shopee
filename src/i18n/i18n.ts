import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLanguageLS } from 'src/utils/auth.ls'
import HOME_EN from '../locales/en/home.json'
import HOME_VI from '../locales/vi/home.json'
import PRODUCT_EN from '../locales/en/product.json'
import PRODUCT_VI from '../locales/vi/product.json'
import CART_EN from '../locales/en/cart.json'
import CART_VI from '../locales/vi/cart.json'
import PROFILE_VI from '../locales/vi/profile.json'
import PROFILE_EN from '../locales/en/profile.json'
import FORM_EN from '../locales/en/form.json'
import FORM_VI from '../locales/vi/form.json'
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    profile: PROFILE_EN,
    form: FORM_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    profile: PROFILE_VI,
    form: FORM_VI
  }
}
export const defaultNS = 'home'
const language = getLanguageLS()
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: ['home', 'product', 'cart', 'profile', 'form'],
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
