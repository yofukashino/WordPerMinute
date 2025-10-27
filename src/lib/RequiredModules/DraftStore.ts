import { webpack } from "replugged";
import type Types from "@Types";

export interface DraftStore extends Types.Store {
  /*     getDraft: DefaultTypes.AnyFunction;
    getRecentlyEditedDrafts: DefaultTypes.AnyFunction;
    getState: DefaultTypes.AnyFunction;
    getThreadDraftWithParentMessageId: DefaultTypes.AnyFunction;
    getThreadSettings: DefaultTypes.AnyFunction; */
  getDraft: (channelId: string, type: number) => string;
}

export default await webpack
  .waitForStore<DraftStore>("DraftStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find DraftStore");
  });
