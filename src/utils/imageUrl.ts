export const imageUrl = (path: string) => {
  const modules = import.meta.glob('/src/assets/images/icons/*', { eager: true });
  const mod = modules[path] as { default: string };
  return mod.default;
};
