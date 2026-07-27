import React, { ReactNode } from 'react';

import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

interface SiteLayoutProps {
  children: ReactNode;
}

export interface SiteLayoutComposition extends React.FunctionComponent<SiteLayoutProps> {
  Header: typeof Header;
  Footer: typeof Footer;
  Main: typeof Main;
}

const Layout = ({ children }: SiteLayoutProps) => {
  return <div className='relative flex flex-col bg-background text-foreground'>{children}</div>;
};

export const SiteLayout = Layout as SiteLayoutComposition;

SiteLayout.Footer = Footer;
SiteLayout.Main = Main;
SiteLayout.Header = Header;
