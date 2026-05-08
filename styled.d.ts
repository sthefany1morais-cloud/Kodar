import "styled-components";
import { defaultTheme } from "./constants/defaultTheme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof defaultTheme.colors;
    spacing: typeof defaultTheme.spacing;
    borderRadius: typeof defaultTheme.borderRadius;
  }
}
