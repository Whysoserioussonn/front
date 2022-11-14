import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Spectrum Maintenence</span></h1>
            </header>
            <main className="public__main">
                <p> All employees are required to Login.</p>
                <address className="public__addr">
                   Directions:<br />
                    Login at the Bottom Lefthand Corner<br />
                    Fillout Repair Note<br />
                    Update Note as needed<br />
                    When complete, checkoff box. Manager will review.<br />
                    Any issues, please call <br />
                    <a href="tel:+15555555555">(555) 867-5309</a>
                </address>
                <br />
                <p>Ask for Tito!</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public