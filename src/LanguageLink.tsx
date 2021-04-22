import React, { FC, BaseSyntheticEvent as Event } from 'react';

type LanguageLinkProps = {
  lang: {
    name: string;
    url: string;
    title: string;
  };
  onClick?: (e: Event) => void;
};

const LanguageLink: FC<LanguageLinkProps> = ({ lang, onClick }) => {
  return (
    <a
      onClick={onClick}
      href={lang.url}
      title={lang.title}
    >
      {lang.name}
    </a>
  );
};

export default LanguageLink;
