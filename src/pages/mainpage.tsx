import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import zdj1 from "../assets/mainpage1.jpeg";
import zdj2 from "../assets/mainpage2.jpg";
import Image_Text from "../components/image_text";
import Post from "../components/post";
import PostSkeleton from "../components/postSkeletonLoading";
import { API_URL } from "../functions/global";
import { BlogPostDataBodyJson } from "../functions/interfaces";
import fb from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import Text_Component from "../components/text_component";
const Mainpage = () => {
  const [posts, setPosts] = useState<Array<BlogPostDataBodyJson>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `${API_URL}/blog/posts?limit=3&sort=newest&files=true`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data: Array<BlogPostDataBodyJson> = await response.json();
        setPosts((prevPosts) => prevPosts?.concat(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (posts.length == 0) {
      fetchPost();
    }
  }, []);

  return (
    <div className="globalCss ">
      {/* <h1>Mainpage</h1>
            <Link to="/admin">Admin</Link>
            <h1 className="text-center">{props.mainpageFirstHeader}</h1> */}
      {/* 
<ul className="list-disc pl-5 mt-5">
        <li className="text-xl pt-5">
          Od lat tworzymy niezapomniane chwile dla dzieci, organizując animacje
          zarówno w naszej sali zabaw, jak i poza nią. Obsługujemy komunie,
          wesela, imprezy okolicznościowe oraz duże eventy, zapewniając
          profesjonalną opiekę i świetną zabawę.
        </li>
        <li className="text-xl pt-5">
          Nasza kadra to młode, pełne energii i doskonale przeszkolone
          animatorki, które mają ogromne serce do pracy z dziećmi i głowy pełne
          kreatywnych pomysłów. Co nas wyróżnia? Jako jedyni w okolicy oferujemy
          gry wielkoformatowe oraz niezwykle bogaty program animacyjny.
        </li>
        <li className="text-xl pt-5">
          Nasi animatorzy to nie przypadkowe osoby - wszyscy posiadają
          odpowiednie kwalifikacje i doświadczenie, dzięki czemu każda animacja
          jest na najwyższym poziomie. Jeśli chcesz, aby twoje wydarzenie było
          pełne uśmiechu i świetnej zabawy - jesteśmy do Twojej dyspozycji!
        </li>
      </ul> */}

      <Image_Text
        image={zdj2}
        header="Kim jesteśmy?"
        paragraph="Nasza kadra to młode, pełne energii i doskonale przeszkolone
          animatorki, które mają ogromne serce do pracy z dziećmi i głowy pełne
          kreatywnych pomysłów. Co nas wyróżnia? Jako jedyni w okolicy oferujemy
          gry wielkoformatowe oraz niezwykle bogaty program animacyjny."
        leftSide={true}
      />

      <Text_Component
        header="Czym się zajmujemy?"
        paragraph="Od lat tworzymy niezapomniane chwile dla dzieci, organizując animacje
          zarówno w naszej sali zabaw, jak i poza nią. Obsługujemy komunie,
          wesela, imprezy okolicznościowe oraz duże eventy, zapewniając
          profesjonalną opiekę i świetną zabawę."
      />

      <Image_Text
        image={zdj1}
        header="Dlaczego my?"
        paragraph="Nasi animatorzy to nie przypadkowe osoby - wszyscy posiadają
          odpowiednie kwalifikacje i doświadczenie, dzięki czemu każda animacja
          jest na najwyższym poziomie. Jeśli chcesz, aby twoje wydarzenie było
          pełne uśmiechu i świetnej zabawy - jesteśmy do Twojej dyspozycji!"
        leftSide={false}
      />

      <div className="flex justify-center gap-x-24 gap-y-6 mb-6 flex-wrap">
        <a
          href="https://www.facebook.com/tipitipick/?locale=pl_PL"
          target="_blank"
        >
          <button className="bg-[#1877F2] p-2 border border-black w-[300px] hover:opacity-90 shadow-2xl">
            <img className="float-left" src={fb} />
            <h1 className="text-center mt-2 font-bold text-2xl text-white">
              Nasz facebook!
            </h1>
          </button>
        </a>

        <a href="https://www.instagram.com/_tipi_tipi_/" target="_blank">
          <button className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-2 border border-black w-[300px] hover:opacity-90 shadow-2xl">
            <img className="float-left" src={instagram} />
            <h1 className="text-center mt-2 font-bold text-2xl text-white">
              Nasz instagram!
            </h1>
          </button>
        </a>
      </div>

      {loading ? (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (
        <div></div>
      )}
      {posts.length > 0 && !loading ? (
        <h1 className="text-3xl mb-[1%]">Oto kilka najnowszych postów</h1>
      ) : (
        <div></div>
      )}

      {posts.length > 0 && !loading ? (
        posts.map((post, index) => {
          return (
            <Post
              key={index}
              id={post.id}
              content={post.content}
              title={post.title}
              date={post.edited_at}
              attachments={post.files}
            />
          );
        })
      ) : (
        <div></div>
      )}
      <br></br>
    </div>
  );
};
export default Mainpage;
