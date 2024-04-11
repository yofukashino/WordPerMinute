import { util } from "replugged";
import { PluginInjector, PluginLogger } from "../index";
import { ChatClasses } from "./requiredModules";
export const forceRerenderElement = async (selector: string): Promise<void> => {
  try {
    const element = await util.waitFor(selector);
    if (!element) return;
    const ownerInstance = util.getOwnerInstance(element);
    const unpatchRender = PluginInjector.instead(ownerInstance, "render", () => {
      unpatchRender();
      return null;
    });
    ownerInstance.forceUpdate(() => ownerInstance.forceUpdate(() => {}));
  } catch (err) {
    PluginLogger.error(err);
  }
};

export const forceRerenderChat = (): void => {
  void forceRerenderElement(ChatClasses.chatContent);
};

export default { ...util, forceRerenderElement, forceRerenderChat };
