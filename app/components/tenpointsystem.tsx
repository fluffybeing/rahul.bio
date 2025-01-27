
function TenPointSystem({ point }: { point: string }) {
  const writingProgressMap = new Map<string, string>([
    ['0', 'TITLE ONLY'],
    ['1', 'TITLE AND NOTE TO SELF'],
    ['2', 'SUMMARY OF ROUGH THOUGHTS'],
    ['3', 'HALF-WRITTEN PARAGRAPHS / UNFINISHED ORDERING'],
    ['4', 'ALL THE KEY POINTS (POORLY WRITTEN)'],
    ['5', "HALF DECENT BUT IN THE 'VALLEY-OF-DESPAIR'"],
    ['6', 'ROUGH DRAFT IN NEED OF EDITING'],
    ['7', 'I COULD STOP HERE WITH ONLY MILD EMBARRASSMENT'],
    ['8', 'THIS COULD PASS AS A COMPLETE THOUGHT'],
    ['9', 'ALMOST THERE! NEEDS FEEDBACK AND TIME'],
    ['10', 'COMPLETE THOUGHT'],
  ]);

  return (
    <div className="my-8 w-full group text-sm rounded-md px-4 py-2 dark:bg-stone-900">
      <div className="flex flex-row items-center space-x-3 text-gray-300">
        <div className="w-20 my-0 text-center font-bold rounded-lg dark:bg-stone-800">
          <span>{point} / 10</span>
        </div>
        <div className="flex flex-col justify-between text-xs">
          <div className="my-1">{writingProgressMap.get(point)}</div>
          <a
            href="https://nickyoder.com/perfectionism/"
            rel="noopener noreferrer"
            target="_blank"
            className="transistion-all underline text-emerald-300 dark:hover:text-neutral-200"
          >
            10-Point article system
          </a>
        </div>
      </div>
    </div>
  );
}

export default TenPointSystem;