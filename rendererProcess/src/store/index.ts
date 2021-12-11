import { createStoreon, StoreonModule } from "storeon";
import { EmptySettings, StoreEvents, StoreState } from "../../../types";

const { ipcRenderer } = window.require("electron");

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
  store.on("@init", () => {
    store.dispatch("settings/asyncTask/get");
    return {
      settings: EmptySettings,
      errorMessage: "",
      successMessage: "",
      activeProcesses: {
        save: false,
        bot: false,
      },
    };
  });
  store.on("settings/asyncTask/get", async () => {
    try {
      //const settings = await ipcRenderer.invoke("bot/getSettings");
      //store.dispatch("settings/set", settings);
    } catch (error) {
      store.dispatch("errorMessage/set", "Ошибка чтения настроек бота");
    }
  });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
