import { PluginInjector } from "..";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import injectSlate from "./Slate";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectSlate();
  Utils.forceRerenderChat();
};

export const removeInjection = (): void => {
  PluginInjector.uninjectAll();
  Utils.forceRerenderChat();
};

export default { applyInjections, removeInjection };
