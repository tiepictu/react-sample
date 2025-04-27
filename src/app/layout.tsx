"use client";

import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/">Note</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/create">Create Note</Link>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </body>
  </html>
);

export default Layout;