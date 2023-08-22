// Makes it possible to import .md files without
// the interpreter interpreting it as JS.
declare module '*.md' {
    const content: string
    export default content
  }