import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { UserView } from 'src/sections/user copy/view'

// ----------------------------------------------------------------------

export default function ProductstPage() {
  return (
    <>
      <Helmet>
        <title> Productst | tabla productos </title>
      </Helmet>

      <UserView />
    </>
  );
}
