'use client';

import DOMPurify from 'dompurify';

export default function RenderingDetails(text: string) {
  if (!text) return;

  const sanitizedHtml = DOMPurify.sanitize(text);

  return (
    <div
      className='text-body1-reading min-h-[422px] overflow-auto'
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
