import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = (): void => {
  Modules.PermissionStore ??= webpack.getByStoreName<Types.PermissionStore>("PermissionStore");
  Modules.DraftStore ??= webpack.getByStoreName<Types.DraftStore>("DraftStore");
};

export default Modules;
