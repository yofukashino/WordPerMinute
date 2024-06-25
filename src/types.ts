import { types } from "replugged";
import GeneralDiscordTypes from "discord-types/general";
import type util from "replugged/util";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

export namespace Types {
  export import DefaultTypes = types;
  export type Channel = GeneralDiscordTypes.Channel;
  export type UtilTree = util.Tree;
  export type ReactTree = UtilTree & React.ReactElement;
  export interface DraftStore extends Store {
    getDraft: DefaultTypes.AnyFunction;
    getRecentlyEditedDrafts: DefaultTypes.AnyFunction;
    getState: DefaultTypes.AnyFunction;
    getThreadDraftWithParentMessageId: DefaultTypes.AnyFunction;
    getThreadSettings: DefaultTypes.AnyFunction;
  }
  export interface PermissionStore extends Store {
    can: DefaultTypes.AnyFunction;
    canAccessGuildSettings: DefaultTypes.AnyFunction;
    canBasicChannel: DefaultTypes.AnyFunction;
    canImpersonateRole: DefaultTypes.AnyFunction;
    canManageUser: DefaultTypes.AnyFunction;
    canWithPartialContext: DefaultTypes.AnyFunction;
    computePermissions: DefaultTypes.AnyFunction;
    getChannelPermissions: DefaultTypes.AnyFunction;
    getChannelsVersion: DefaultTypes.AnyFunction;
    getGuildPermissionProps: DefaultTypes.AnyFunction;
    getPermissionUtils: DefaultTypes.AnyFunction;
    getGuildVersion: DefaultTypes.AnyFunction;
    getHighestRole: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    isRoleHigher: DefaultTypes.AnyFunction;
    clearVars: DefaultTypes.AnyFunction;
  }

  export interface Modules {
    loadModules?: () => void;
    DraftStore?: DraftStore;
    PermissionStore?: PermissionStore;
  }
}
export default Types;
