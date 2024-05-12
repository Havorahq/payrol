"use client"

import React, { useState, useContext } from 'react'
import styles from './wrapper.module.scss'
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import { redirect, usePathname } from 'next/navigation'
import routes from '@/plugins/routes'
import Drawer from '../drawer/Drawer'
import { GlobalContext } from '../../context/GlobalContext'
import Onboarding from '../../(onboarding)/page'

const Wrapper = ({ children }) => {
    const pathname = usePathname()
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { gloabalState: { user } } = useContext(GlobalContext)

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

    const getContent = () => {
      if(!user) {
        return <Onboarding />
      } else {
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
    }

    return (
      <GlobalContext>
        {getContent()}
      </GlobalContext>
    )
}

export default Wrapper