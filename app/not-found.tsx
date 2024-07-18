export default function NotFound() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Oh no! This page doesn't exist.
      </h1>
      <p className="ml-2 h-7">
        If you expected to see something here, let me know
        <a
          className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          rel="noopener noreferrer"
          target="_blank"
          href="https://twitter.com/fluffybeing"
        >
          @fluffybeing.
        </a>
      </p>
    </section>
  );
}
