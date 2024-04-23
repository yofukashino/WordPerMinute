import { types } from "replugged";
import GeneralDiscordTypes from "discord-types/general";
import type util from "replugged/util";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

export namespace Types {
  export import DefaultTypes = types;
  export type Channel = GeneralDiscordTypes.Channel;
  export type UtilTree = util.Tree;
  export type ReactTree = UtilTree & React.ReactElement;
  export interface Slate {
    $$typeof: symbol;
    compare: null;
    type: { $$typeof: symbol; render: DefaultTypes.AnyFunction };
  }
  export interface SlateArgs {
    accessibilityLabel: string;
    channel: Channel;
    className: string;
    focused: boolean;
    highlighted: boolean;
    onBlur: DefaultTypes.AnyFunction;
    onChange: DefaultTypes.AnyFunction;
    onFocus: DefaultTypes.AnyFunction;
    onKeyDown: DefaultTypes.AnyFunction;
    onResize: undefined | DefaultTypes.AnyFunction;
    onSubmit: DefaultTypes.AnyFunction;
    pendingReply: undefined | string;
    placeholder: string;
    promptToUpload: DefaultTypes.AnyFunction;
    renderApplicationCommandIcon: DefaultTypes.AnyFunction;
    renderAttachButton: DefaultTypes.AnyFunction;
    richValue: [];
    setEditorRef: DefaultTypes.AnyFunction;
    textValue: string;
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
  export interface ChatClasses {
    avatar: string;
    channelName: string;
    channelTextArea: string;
    chat: string;
    chatContent: string;
    content: string;
    cursorPointer: string;
    editPartyIcon: string;
    followButton: string;
    form: string;
    forumPostTitle: string;
    guildBreadcrumbContainer: string;
    guildBreadcrumbIcon: string;
    loader: string;
    noChat: string;
    parentChannelName: string;
    status: string;
    subtitleContainer: string;
    threadSidebarFloating: string;
    threadSidebarOpen: string;
    title: string;
    titleWrapper: string;
    typing: string;
    uploadArea: string;
  }
  export interface Modules {
    loadModules?: () => Promise<void>;
    Slate?: Slate;
    PermissionStore?: PermissionStore;
    ChatClasses?: ChatClasses;
  }
}
export default Types;
