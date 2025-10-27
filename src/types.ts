import { types } from "replugged";
import type * as flux from "replugged/dist/renderer/modules/common/flux";

import type { DraftStore } from "@lib/RequiredModules/DraftStore";
import type { PermissionStore } from "@lib/RequiredModules/PermissionStore";

import type GeneralDiscordTypes from "discord-types/general";
export namespace Types {
  export import DefaultTypes = types;
  export type Channel = GeneralDiscordTypes.Channel;
  export type Store = flux.Store;
  export type ActionHandler = flux.ActionHandler;

  export interface Modules {
    Proxy: Exclude<Modules, "Proxy" | "loadModules">;
    loadModules?: () => Promise<void>;
    DraftStore?: DraftStore;
    PermissionStore?: PermissionStore;
  }
}
export default Types;
