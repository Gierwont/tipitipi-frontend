import { useEffect, useState } from "react";
import { GalleryGroup } from "../../../functions/interfaces";
import { getToken } from "../../../functions/postManipulatingFunctions";
import validateToken from "../../../functions/validate";
import Unauthorized from "../../errorPages/unauthorized";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../functions/global";
import { makeGalleryMultipart } from "../../../functions/gallery";

const METHOD_POST = "POST" as const;

async function addNewGroup(
  name: string,
  description: string,
  setNewGroupName: React.Dispatch<React.SetStateAction<string>>
) {
  const token = getToken();
  if (name == "") {
    toast.warn("Nie podano nazwy nowego albumu");
    return;
  }
  if (!window.confirm("Czy napewno chcesz dodać nowy album?")) {
    return;
  }
  try {
    const response = await fetch(`${API_URL}/gallery`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });

    if (response.status >= 200 && response.status < 300) {
      setNewGroupName("");
      toast.success("Dodano album");
      window.location.reload();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    toast.error("Wystąpił błąd: " + error);
  }
}

async function fetchGroups(
  setGroups: React.Dispatch<React.SetStateAction<GalleryGroup[]>>
) {
  try {
    const response = await fetch(`${API_URL}/gallery?offset=0&limit=10`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: Array<GalleryGroup> = await response.json();
    setGroups((prevGroups) => prevGroups?.concat(data));
  } catch (error) {
    console.error(error);
  }
}

const GalleryAdd = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<
    GalleryGroup | undefined
  >();
  const [images, setImages] = useState<FileList | null>();

  async function addImages() {
    if (selectedGroup === undefined) {
      toast.warn("Nie wybrano albumu docelowego");
      return;
    }

    if (images === undefined || images === null || images.length <= 0) {
      toast.warn("Formularz jest pusty. Dodaj kilka zdjęć");
      return;
    }
    
    const token = getToken();
    const [formData, errors] = makeGalleryMultipart(images);

    if (errors.length > 0) {
      for (const err of errors) {
        console.error(err);
      }

      toast.info(
        `Zignorowano ${errors.length} plików z powodu błędów. Sprawdź konsole`
      );
    }

    fetch(`${API_URL}/gallery/${selectedGroup.id}/images`, {
      method: METHOD_POST,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            toast.success(`Zdjęci${images.length > 1 ? "a" : "e"} dodane`);
            break;
          case 400:
            toast.error("Formularz jest niepoprawny");
            break;
          case 404:
            toast.error(`Grupa pod ID ${selectedGroup.id} nie istnieje`);
            break;
          case 500:
            toast.error(`Błąd serwera`);
            break;
          default:
            break;
        }
      })
      .catch((e) => {
        toast.error("Błąd wysyłania formularza. Sprawdź konsole");
        console.error(e);
      });
  }

  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const ValidateAuthorization = async () => {
      setIsAuthorized(await validateToken(setLoading));
    };
    ValidateAuthorization();
  }, []);
  useEffect(() => {
    const fetchGroupsEffect = async () => {
      if (isAuthorized && groups.length == 0) {
        await fetchGroups(setGroups);
      }
    };
    fetchGroupsEffect();
  }, [isAuthorized]);
  if (loading) {
    return <div>Loading</div>;
  }
  if (!isAuthorized) {
    return <Unauthorized />;
  }
  return (
    <div className="globalCss mt-[1%]">
      <div>
        <h1 className="text-3xl font-bold mb-6">Tworzenie albumów/grup</h1>
        <label className="text-xl" htmlFor="newAlbumName">
          Podaj nazwę nowego albumu:{" "}
        </label>
        <input
          className="border-2 "
          type="text"
          name="newAlbumName"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <br></br>

        <label className="text-xl" htmlFor="newAlbumDescription">
          Podaj opis nowego albumu:{" "}
        </label>
        <br></br>
        <input
          className="border-2 min-w-[400px] w-1/2"
          type="text"
          name="newAlbumDescription"
          value={newGroupDesc}
          onChange={(e) => setNewGroupDesc(e.target.value)}
        />
        <br></br>

        <button
          className={
            "border w-40 bg-white shadow-lg hover:bg-slate-100 hover:duration-300 mt-6"
          }
          onClick={() =>
            addNewGroup(newGroupName, newGroupDesc, setNewGroupName)
          }
        >
          Stwórz nowy album
        </button>
      </div>

      <br></br>
      <hr></hr>
      <br></br>

      <div>
        <h1 className="text-3xl font-bold mb-6">Dodawanie zdjęć</h1>

        <label htmlFor="groups" className="text-2xl">
          Do której grupy chcesz dodać zdjęcia?
        </label>
        <br></br>
        <select
          className="mb-8"
          name="groups"
          onChange={(e) => setSelectedGroup(groups[parseInt(e.target.value)])}
        >
          <option value="">--albumy--</option>
          {groups ? (
            groups.map((group, index) => {
              return (
                <option key={group.id} value={index}>
                  {group.id + " , " + group.name}
                </option>
              );
            })
          ) : (
            <div>No group found</div>
          )}
        </select>
        <br></br>

        <label className="text-2xl" htmlFor="image">
          Dodaj zdjęcia
        </label>
        <br></br>
        <input
          className="mb-8"
          type="file"
          name="image"
          accept="image/jpeg, image/png, image/webp"
          value={images ? undefined : ""}
          onChange={(e) => {
            setImages(e.target.files);
          }}
          multiple
        />
        <br></br>

        
        {selectedGroup === undefined ? (
          void 0
        ) : (
          <button
            className={
              "border w-40 bg-white shadow-lg hover:bg-slate-100 hover:duration-300"
            }
            onClick={() => addImages()}
          >
            Dodaj
          </button>
        )}
      </div>
    </div>
  );
};

export default GalleryAdd;
