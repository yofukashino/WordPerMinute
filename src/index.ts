import { Injector, Logger } from "replugged";
import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("WordPerMinute", "#b380ff");
import Injections from "./injections/index";

export const start = (): void => {
  void Injections.applyInjections();
};

export const stop = (): void => {
  Injections.removeInjection();
};
