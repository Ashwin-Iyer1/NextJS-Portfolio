import Bar from "./app/components/Bar";
export function useMDXComponents(components) {
    return {
      ...components,
      Bar,
    };
}