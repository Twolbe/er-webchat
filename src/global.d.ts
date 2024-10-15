declare module "*.module.less" {
  interface I_ClassNames {
    [className: string]: string;
  }
  const classNames: I_ClassNames;

  export = classNames;
}

declare module "*.module.css" {
  interface I_ClassNames {
    [className: string]: string;
  }
  const classNames: I_ClassNames;

  export = classNames;
}

declare module "*.png";
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
