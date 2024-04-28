"use client"

import React from 'react'
import styles from './wrapper.module.scss'
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import { usePathname } from 'next/navigation'
import routes from '@/plugins/routes'

const Wrapper = ({ children }) => {
    const pathname = usePathname()

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
            <Sidebar title={getTitle()} />
            <main>
                <Header />
                {children}
            </main>
        </div>
    )
}

export default Wrapper