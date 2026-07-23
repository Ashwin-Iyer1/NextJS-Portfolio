// Stand-in for `next/navigation` outside a Next.js app.
// The real hooks read from the App Router context and throw without it; these
// return inert values so nav components render their default (no active route)
// state instead of crashing.
const noop = () => {};

export const usePathname = () => "/";
export const useRouter = () => ({
  push: noop,
  replace: noop,
  refresh: noop,
  back: noop,
  forward: noop,
  prefetch: noop,
});
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];
export const redirect = noop;
export const notFound = noop;
