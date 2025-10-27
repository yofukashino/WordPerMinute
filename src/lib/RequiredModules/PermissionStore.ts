import { webpack } from "replugged";
import type Types from "@Types";

export interface PermissionStore extends Types.Store {
  canBasicChannel: (permission: bigint, channel: Types.Channel) => boolean;
}

export default await webpack
  .waitForStore<PermissionStore>("PermissionStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find PermissionStore");
  });
