import React from 'react';
import { Link } from 'react-router-dom';
import Exception from 'components/Exception';

const __Stream = () => (
  <Exception
    type="123"
    desc="Sorry, currently dejavu does not support streaming in the web version."
    linkElement={Link}
    backText="Back to home"
  />
);

export default __Stream;
