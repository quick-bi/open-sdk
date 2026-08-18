// Style files are compiled by the style loaders built into @quickbi/qbi-dev-tools.
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';

// Static assets are bundled by @quickbi/qbi-dev-tools and resolved to URLs.
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.ico' {
  const src: string;
  export default src;
}
declare module '*.eot' {
  const src: string;
  export default src;
}
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
