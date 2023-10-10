declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    const width: string | number; 
    const height: string | number; 
    const style: React.CSSProperties;
    export default src;
  }