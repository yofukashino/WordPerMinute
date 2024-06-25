import { Logger } from "replugged";
import "./style.css";
export const PluginLogger = Logger.plugin("WordPerMinute", "#b380ff");
import Modules from "./lib/requiredModules";

export const start = (): void => {
  Modules.loadModules();
};

export { default as _WPM } from "./Components/WPM";
