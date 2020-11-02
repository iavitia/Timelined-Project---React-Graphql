import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function ({ url, name }) {
  return (
    <a className='opacity' href={url} target='_blank' rel='noopener noreferrer'>
      <Icon color='grey' name={name} />
    </a>
  );
}
