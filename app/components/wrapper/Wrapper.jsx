"use client"

import React, { useState } from 'react'
import styles from './wrapper.module.scss'
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import { usePathname } from 'next/navigation'
import routes from '@/plugins/routes'
import Drawer from '../drawer/Drawer'

const Wrapper = ({ children }) => {
    const pathname = usePathname()
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!isDrawerOpen);
    };

    const getTitle = () => {
        let title = "";
        routes
          ? routes.map((route, i) => {
              if (pathname.includes(route.path)) {
                title = route.title;
              }
            })
          : (title = "Dashboard");
        return title;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
              <Sidebar title={getTitle()} />
            </div>
            <main>
                <Header toggleDrawer={toggleDrawer} />
                {children}
            </main>
            {isDrawerOpen && <Drawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />}
        </div>
    )
}

export default Wrapper