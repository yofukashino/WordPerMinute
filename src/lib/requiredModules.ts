import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.Slate ??= await webpack.waitForModule<Types.Slate>(
    webpack.filters.bySource("chat input type must be set"),
  );
  Modules.PermissionStore = webpack.getByStoreName<Types.PermissionStore>("PermissionStore");
  Modules.ChatClasses ??= await webpack.waitForProps<Types.ChatClasses>("chatContent", "chat");
};

export default Modules;
