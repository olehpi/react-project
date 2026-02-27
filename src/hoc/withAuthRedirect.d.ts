   declare module "../../hoc/withAuthRedirect" {
       import { ComponentType } from "react";
       export function withAuthRedirect<P>(Component: ComponentType<P>): ComponentType<P>;
   }