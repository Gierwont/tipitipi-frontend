import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import validateToken from "../../functions/validate"
import Unauthorized from "../errorPages/unauthorized"
import { toast } from "react-toastify"
import { API_URL } from "../../functions/global"
import { getToken } from "../../functions/postManipulatingFunctions"

const buttonCSS = "border p-3 ml-[1%] min-w-[300px] bg-white mb-8 border-gray-900 hover:bg-gray-900 hover:text-white hover:duration-300 rounded-md"


const Dashboard = () => {
    const navigate = useNavigate()
    //const BORDER_CSS = "border"
    //edycja tekstu na stronie
    //const [mainpageFirstHeader , setMainpageFirstHeader] = useState(props.mainpageFirstHeader)  //tworzymy stan lokalny ktorego poczatkowym stanem jest to co widzą wszyscy , czyli state z app.tsx
    
    const Logout = () => {
        if(window.confirm("Czy napewno chcesz się wylogować?")) {
            toast.success("Wylogowano");
            localStorage.removeItem("token")
            navigate('/admin/login')
        }
    }
    async function Deauth() {
        if(window.confirm("Czy napewno chcesz deautoryzować wszystkie konta? Nastąpi wylogowanie")) {
            try{
                const token = getToken();
                const response = await fetch(`${API_URL}/admin/deauth`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                })
                
                if(response.status >= 200 && response.status < 300) {
                    localStorage.removeItem("token")
                    navigate('/admin/login')
                }
                else{
                    throw new Error(response.statusText)
                }
            }
            catch(error){
                toast.error("something went wrong: " +  error)
            }
        }
    }

    const [loading ,setLoading] = useState(true)
    const [isAuthorized , setIsAuthorized] = useState(false) 
    useEffect(() => {
        const ValidateAuthorization = async () => {
            setIsAuthorized(await validateToken(setLoading))
        }
        ValidateAuthorization()
    },[])
    if(loading) {
        return(<div>
            Loading
        </div>)
    }
    if(!isAuthorized) {
        return <Unauthorized/>
    }

    
    return(
        <>
        {/* <div>
            wyświetlamy to co widzi użytkownik
            <h1>Pierwszy nagłówek strony głównej : {props.mainpageFirstHeader}</h1> 

            zmieniamy stan lokalny na to co wpisze admin
            <input className={BORDER_CSS} onChange={(event) => setMainpageFirstHeader(event.target.value)}></input><br></br>

            po wcisnieciu przycisku wywolywana jest funkcja podana w props , stan globalny dostaje wartosc lokalnego
            <button className={BORDER_CSS+" w-40 ml-5"} onClick={() => props.changeMainpageFirstHeader(mainpageFirstHeader)}>fin</button>
            
            <hr></hr>
        </div> */}


            {/* <div className="m-8">
                <div className="float-left w-1/3 text-center">
                    <h1 className="text-3xl font-bold mb-6">Zarządzanie postami</h1>
                    <Link to="/admin/dashboard/create-post"><button className={buttonCSS}>Dodawanie postów</button></Link><br></br>
                    <Link to="/admin/dashboard/edit-post"><button className={buttonCSS}>Edycja i usuwanie postów</button></Link><br></br>
                </div>
                <div className="float-left w-1/3 text-center">
                    <h1 className="text-3xl font-bold mb-6">Zarządzanie galerią</h1>
                    <Link to="/admin/dashboard/gallery-add"><button className={buttonCSS}>Dodaj zdjęcia do galerii</button></Link> <br></br>
                    <Link to="/admin/dashboard/gallery-edit"><button className={buttonCSS}>Edycja galerii</button></Link> <br></br>
                </div>
                <div className="float-left w-1/3 text-center">
                    <h1 className="text-3xl font-bold mb-6">Zarządzanie kontem</h1>
                    <Link to="/admin/dashboard/change-credentials"><button className={buttonCSS}>Zmień login/hasło</button></Link>  <br></br>
                    <button onClick={() => Logout()} className={buttonCSS}>Wyloguj się</button><br></br>
                    <button onClick={() => Deauth()} className={buttonCSS}>Deautoryzuj wszystkie konta</button>
                </div>
             
            </div> */}
            <div className="flex justify-evenly content-center flex-wrap gap-4">

            <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-6">Zarządzanie postami</h1>
                    <Link to="/admin/dashboard/create-post"><button className={buttonCSS}>Dodawanie postów</button></Link><br></br>
                    <Link to="/admin/dashboard/edit-post"><button className={buttonCSS}>Edycja i usuwanie postów</button></Link><br></br>
                </div>
                <div className="flex flex-col items-center"> 
                    <h1 className="text-3xl font-bold mb-6">Zarządzanie galerią</h1>
                    <Link to="/admin/dashboard/gallery-add"><button className={buttonCSS}>Dodaj zdjęcia do galerii</button></Link> <br></br>
                    <Link to="/admin/dashboard/gallery-edit"><button className={buttonCSS}>Edycja galerii</button></Link> <br></br>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-6">Zarządzanie kontem</h1>
                    <Link to="/admin/dashboard/change-credentials"><button className={buttonCSS}>Zmień login/hasło</button></Link>  <br></br>
                    <button onClick={() => Logout()} className={buttonCSS}>Wyloguj się</button><br></br>
                    <button onClick={() => Deauth()} className={buttonCSS}>Deautoryzuj wszystkie sesje</button>
                </div>

            </div>
          




        </>
    )
}
export default Dashboard