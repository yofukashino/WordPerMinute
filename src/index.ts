import { Logger } from "replugged";
import Modules from "@lib/RequiredModules";
import "./style.css";

export const PluginLogger = Logger.plugin("WordPerMinute", "#ffffff80");

export const start = (): void => {
  void Modules.loadModules().catch((err: unknown) => PluginLogger.error(err));
};

export { _WPM } from "@components/WPM";
