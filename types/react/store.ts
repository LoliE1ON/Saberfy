import { InstBotSettings } from "..";

export const EmptySettings: InstBotSettings = {
  auth: {
    username: "",
    password: "",
  },

  bot: {
    isRemovePopular: true,
    isClickLike: true,
    isClickSubscribe: true,
    isWriteComment: true,
  },

  delays: {
    afterWriteComment: 5,
    afterClickLike: 5,
    afterClickSubscribe: 5,
    afterEndIteration: 5,
    afterChangeSource: 5,
    afterUnsubscribe: 5,
  },

  dayLimits: {
    likes: 180,
    comments: 180,
    subscribes: 180,
    unsubscribes: 100,
  },

  browser: {
    headless: true,
    args: [],
    defaultViewport: null,
  },

  sourcesList: [],
  commentsList: [],
};

export type StoreEvents = {
  // Settings setters
  "settings/set": InstBotSettings;
  "settings/auth/setUserName": string;
  "settings/auth/setPassword": string;
  "settings/dayLimits/setLikes": number;
  "settings/dayLimits/setComments": number;
  "settings/dayLimits/setSubscribes": number;
  "settings/dayLimits/setUnSubscribes": number;
  "settings/sourcesList/set": string[];
  "settings/commentsList/set": string[];
  "settings/delays/setComments": number;
  "settings/delays/setLikes": number;
  "settings/delays/setSubscribes": number;
  "settings/delays/setIteration": number;
  "settings/delays/setChangeSource": number;
  "settings/delays/setUnsubscribe": number;
  "settings/browser/setArgs": string[];
  "settings/browser/setHeadless": boolean;
  "errorMessage/set": string;
  "successMessage/set": string;
  // Active processes setters
  "activeProcesses/save/set": boolean;
  "activeProcesses/bot/set": boolean;
  // Async Tasks
  "settings/asyncTask/get": void;
  "settings/asyncTask/set": InstBotSettings;
};

export type StoreState = {
  settings: InstBotSettings;
  errorMessage: string;
  successMessage: string;
  activeProcesses: {
    save: boolean;
    bot: boolean;
  };
};
