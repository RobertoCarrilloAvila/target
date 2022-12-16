// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock t function
export const t = (key, params) => {
  if (key === 'key.with.params') {
    return `key.with.params.${params.param}`
  }

  return key
}

// Mock react-i18next
// i18n.use(initReactI18next).init({
//   fallbackLng: 'en',
//   debug: true,
//   interpolation: {
//     escapeValue: false, // not needed for react as it escapes by default
//   }
// });

// Mock your i18n
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));
