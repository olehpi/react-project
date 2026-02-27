declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '../common/Preloader/Preloader' {
  import React from 'react';
  const Preloader: React.FC;
  export default Preloader;
}