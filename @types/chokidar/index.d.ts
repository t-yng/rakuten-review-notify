type path = string | string[]

declare module "chokidar" {
  export function watch(path: path, options: Object): any;
}