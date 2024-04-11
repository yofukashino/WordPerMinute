import { Injector, Logger } from "replugged";

import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("WordPerMinute", "#b380ff");

import Injections from "./patches/index";
import Utils from "./lib/utils";

export const start = (): void => {
  Injections.applyInjections();
  Utils.forceRerenderChat();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Utils.forceRerenderChat();
};
