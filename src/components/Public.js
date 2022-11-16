import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section class="  bg-contain bg-center bg-no-repeat  bg-[url('./img/baxterdog.webp')]">
            <header>
                <h1 class="text-yellow-300 text-5xl py-2 mt-2 mx-2" >Welcome to <span class="whitespace-nowrap">Spectrum Maintenence 🛠️</span></h1>
            </header>
            <main class="mx-2">
                <p class="text-yellow-300">___________________________________________________________________________________</p>
                <p class="text-yellow-300">___________________________________________________________________________________</p>
                <p class="text-yellow-400 " > All employees are required to Login.</p>
                <address class="text-yellow-400">
                   Directions:<br />
                    Login at the Bottom Lefthand Corner<br />
                    Fillout Repair Note<br />
                    Update Note as needed<br />
                    When complete, checkoff box. Manager will review.<br />
                    Any issues, please call <br />
                    (555) 867-5309<br />                  
                </address>
                <br />
                <p class="text-white">Ask for BAXTER!</p>
                <p class="text-yellow-300">___________________________________________________________________________________</p>
                <p class="text-yellow-300">___________________________________________________________________________________</p>
            </main>
            <footer>
            <div >
                <Link to="/login" class=" mb-5 absolute bottom-0 left-0  ..."> <button type="button" class="inline-block px-6 py-2.5 bg-white
                 text-blue-700 font-bold text-lg leading-tight uppercase rounded shadow-md hover:text-black hover:bg-green-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Employee Login</button></Link>
                </div>
            </footer>
            
            

        </section>
        

    )
    return content
}
export default Public