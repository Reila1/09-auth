import css from './LayoutNotes.module.css';

export default function FilterLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={css.layout}>
      {sidebar}
      {children}
    </div>
  );
}