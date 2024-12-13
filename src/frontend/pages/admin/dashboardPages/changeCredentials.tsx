import { useState ,useEffect } from "react";
import validateToken from "../../../functions/validate";
import Unauthorized from "../../errorPages/unauthorized";
import { getToken } from "../../../functions/postManipulatingFunctions";
import { useNavigate } from "react-router-dom";

const validateAdminForm = (login : string , password : string) : boolean => {
  if (login == "" || password =="") {
    alert("Nie podano nowego loginu lub hasła")
    return false;
  }
  if(password.length < 8) {
    alert("Twoje hasło powinno mieć conajmniej 8 znaków")
    return false;
  }
  return window.confirm("Czy jesteś pewien że chcesz edytować dane profilu?")
}

const ChangeCredentials = () => {
  const [newLogin,setNewLogin] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const navigate = useNavigate()

async function updateCredentials() {
    if(!validateAdminForm(newLogin,newPassword)) {
      return;
    }

    const token = getToken()

    try{
    const response = await fetch("http://localhost:8080/admin/account", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        Password: newPassword,
        Username: newLogin
      })
    });

    if (response.status >= 200 && response.status < 300) {
      alert("Zaktualizowano");
      localStorage.setItem("token",'')
      navigate('/admin/login')
    }
    //  else {
    //   //TODO nie wiem co zwraca /admin/account , ponizej linijka skopiowana z post creating
    //   // const data: BlogPostDataBodyJson = await response.json();
    //   alert("Błąd: ");
    // }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error){
    console.error(error)
    alert("Wystąpił błąd: " + error)
  }
  }





  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const ValidateAuthorization = async () => {
      setIsAuthorized(await validateToken(setLoading));
    };
    ValidateAuthorization();
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  if (!isAuthorized) {
    return <Unauthorized />;
  }
  return (
   
  <div>
    <div className="m-auto mt-[20vh] p-4 border-2 border-gray-800  text-center w-[30%] min-w-60 rounded-lg">
            <form>
                <div className="p-[5%]">
                    <label className="text-xl font-semibold" htmlFor="login">Podaj nowy login: </label>
                    <input className="border-2 w-1/2" type="text" name="login" value={newLogin} onChange={(e) => setNewLogin(e.target.value)}/><br></br>
                </div>
                
                <div className="p-[3%]">
                    <label className="text-xl font-semibold" htmlFor="password">Podaj nowe Hasło: </label>
                    <input className="border-2 w-1/2"  type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/><br></br>
                </div>

            </form>
            <button className={"m-[5%] p-[1%] border w-1/2 shadow-lg hover:bg-slate-100 hover:duration-300"} onClick={() => updateCredentials()}>Zaktualizuj profil</button>
        </div>
    {/* <h1>Podaj nowy login</h1>
    <input value={newLogin} onChange={(e) => setNewLogin(e.target.value)}/>
    <h1>Podaj nowe hasło</h1>
    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

    <button onClick={() => updateCredentials()}>Zaktualizuj profil</button> */}
  </div>
  )
};

export default ChangeCredentials;
