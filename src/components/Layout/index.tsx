import React, { ReactNode } from 'react';
import classes from "./Layout.module.css";

interface LayoutProps {
    children: ReactNode;
}

const Index = ({children}: LayoutProps): JSX.Element  => {
    return (
        <article className={classes.article}>
            <header className={classes.header}>
                <h1 className={classes.title}>This is an Aroundhome task</h1>
            </header>
            <main>{children}</main>
            <footer className={classes.footer}>
                Made by Tony Tettinger 2022
            </footer>
        </article>
    )
}

export default Index;