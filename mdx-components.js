import Bar from "./app/components/Bar";

// External markdown links open in a new tab; internal links stay in-app.
function MDXLink({ href = "", children, ...props }) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      {...props}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function useMDXComponents(components) {
  return {
    ...components,
    a: MDXLink,
    Bar,
  };
}
