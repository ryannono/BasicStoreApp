import {Outlet, ScrollRestoration} from 'react-router-dom';
import Nav from '../components/nav';

export default function GlobalLayout() {
  return (
    <>
      <Nav />
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
