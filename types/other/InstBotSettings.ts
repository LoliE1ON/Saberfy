export type InstBotSettings = {
  auth: {
    username: string;
    password: string;
  };

  bot: {
    isRemovePopular: boolean;
    isClickLike: boolean;
    isClickSubscribe: boolean;
    isWriteComment: boolean;
  };

  delays: {
    afterWriteComment: number;
    afterClickLike: number;
    afterClickSubscribe: number;
    afterEndIteration: number;
    afterChangeSource: number;
    afterUnsubscribe: number;
  };

  dayLimits: {
    likes: number;
    comments: number;
    subscribes: number;
    unsubscribes: number;
  };

  browser: {
    headless: boolean;
    args: string[];
    defaultViewport: null;
  };

  sourcesList: string[];
  commentsList: string[];
};
