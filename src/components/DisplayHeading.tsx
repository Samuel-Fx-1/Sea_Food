import { Fragment } from 'react';
import type { HeadingContent } from '../types';

type HeadingTag = 'h1' | 'h2' | 'p';

interface DisplayHeadingProps {
  content: HeadingContent;
  as?: HeadingTag;
  id?: string;
}

export function DisplayHeading({
  content,
  as: Tag = 'h2',
  id,
}: DisplayHeadingProps) {
  return (
    <Tag id={id}>
      {content.lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {line}
          <br />
        </Fragment>
      ))}
      {content.prefix}
      <em>{content.emphasis}</em>
    </Tag>
  );
}
