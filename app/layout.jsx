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
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
                <script src="https://kit.fontawesome.com/3874570f12.js" crossOrigin="anonymous"></script>
            </body>
        </html>
    )
}

export default RootLayout