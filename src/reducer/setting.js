import {
  CHANGE_FILTER,
  CHANGE_SORTER,
  CHANGE_DISPLAY_MODE,
  CHANGE_TAB_INDEX_DEFAULT,
  CHANGE_COLOR_STYLE,
  LOAD_TO_STORE,
  USER_LOG_OUT,
  CHANGE_LANGUAGE
} from "../helpers/constants";
import { saveData } from "../helpers/workWithServer";
import { settingDefault } from "../helpers/initialParameters";

export default (setting = settingDefault, { type, payload }) => {
  switch (type) {
    case LOAD_TO_STORE:
      return { ...setting, ...payload.setting };

    case CHANGE_FILTER:
      return save({ ...setting, filterKey: payload.filterKey });

    case CHANGE_SORTER:
      return save({ ...setting, sorterMode: payload.sorterMode });

    case CHANGE_DISPLAY_MODE:
      return save({ ...setting, displayMode: payload.displayMode });

    case CHANGE_TAB_INDEX_DEFAULT:
      return save({ ...setting, tabIndexDefault: payload.tabIndexDefault });

    case CHANGE_COLOR_STYLE:
      return save({ ...setting, colorStyle: payload.color });

    case CHANGE_LANGUAGE:
      return save({
        ...setting,
        language: setting.language === "ru" ? "en" : "ru"
      });

    case USER_LOG_OUT:
      return settingDefault;

    default:
      return setting;
  }
};

const save = list => saveData(list, "setting");
