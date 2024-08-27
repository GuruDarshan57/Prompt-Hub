import Footer from '@components/Footer'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                        <Footer />
                    </main>
                </Provider>
                <script src="https://kit.fontawesome.com/3874570f12.js" crossOrigin="anonymous"></script>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                />
            </body>
        </html>
    )
}

export default RootLayout