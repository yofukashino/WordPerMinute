import { webpack } from "replugged";
import Types from "../types";

export const Slate = webpack.getBySource<Types.Slate>("chat input type must be set");

export const PermissionStore = webpack.getByStoreName<Types.PermissionStore>("PermissionStore");
