import React from 'react';

interface ArticleTagsProps {
  tags: string | string[]; // Tags can be a string or an array of strings
}

function isArrayEmpty(arr: any[]): boolean {
  return arr.length === 0;
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  if (
    !tags ||
    (typeof tags === 'string' && tags.trim() === '') ||
    (Array.isArray(tags) && isArrayEmpty(tags))
  ) {
    return null;
  }

  const tagArray =
    typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : tags;

  return (
    <div className="my-1 text-xs flex items-center space-x-2 justify-left">
      {tagArray.map((tag, i) => (
        <span key={i} className="text-emerald-100">
          #{tag.toLowerCase()}
        </span>
      ))}
    </div>
  );
}
