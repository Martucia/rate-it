import styles from './Layout.module.sass';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    );
}

export default Layout;