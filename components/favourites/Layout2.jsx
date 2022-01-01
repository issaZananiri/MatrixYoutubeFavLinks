export { Layout2 };

function Layout2({ children }) {
    return (
        <div className="p-4">
            <div className="container">
                {children}
            </div>
        </div>
    );
}