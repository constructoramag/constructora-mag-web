import React from 'react';
import { PortableText } from '@portabletext/react';

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <img
          src={value.asset.url}
          alt={value.alt || 'Imagen'}
          className="rounded-xl my-8 shadow-lg w-full object-cover"
        />
      );
    },
  },
  block: {
    h2: ({children}) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl font-bold mt-8 mb-4 text-[var(--primary)]">{children}</h3>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2 my-8 bg-[var(--surface)]/50 rounded-r-lg italic text-lg text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({children}) => <p className="mb-6 leading-relaxed text-[var(--text-secondary)] text-lg">{children}</p>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--text-secondary)] text-lg">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[var(--text-secondary)] text-lg">{children}</ol>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
    link: ({children, value}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="text-[var(--primary)] hover:underline">
          {children}
        </a>
      );
    },
  },
};

export default function RichTextRenderer({ content }) {
  if (!content) return null;
  return (
    <div className="portable-text-container w-full">
      <PortableText value={content} components={components} />
    </div>
  );
}
