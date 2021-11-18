import intl from "react-intl-universal";

const locales = {
    "en-us": require('@/locales/en-US.json'),
    "zh-cn": require('@/locales/zh-CN.json'),
};

 const localesReducer = (
  state = {
    language: "zh-cn",
  },
  action
) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      intl
        .init({
          currentLocale: action.language,
          locales,
        })
        .then(() => {
          window.location.search=`?lang=${action.language}`
        });
      return { ...state, language: action.language };
    default:
      return state;
  }
};

export default localesReducer