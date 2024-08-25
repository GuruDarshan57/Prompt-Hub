import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
    title: "Prompt Hub"
    , description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
    return (
        <html>
            <link rel="shortcut icon" href="assets/images/logo.png" />
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout