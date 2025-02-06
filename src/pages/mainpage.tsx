import { useEffect, useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import background_example from "../assets/example_background.jpg"
import landscapeImage from "../assets/landscape.jpg"
import Image_Text from "../components/image_text"
import Post from "../components/post"
import PostSkeleton from "../components/postSkeletonLoading"
import { API_URL } from '../functions/global'
import { BlogPostDataBodyJson } from "../functions/interfaces"
import fb from '../assets/facebook.svg'
import instagram from '../assets/instagram.svg'
import Text_Component from "../components/text_component"
const Mainpage = () => {
  const [posts, setPosts] = useState<Array<BlogPostDataBodyJson>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `${API_URL}/blog/posts?limit=3&sort=newest`,
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
        image={background_example}
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
        image={landscapeImage}
        header="Dlaczego my?"
        paragraph="Nasi animatorzy to nie przypadkowe osoby - wszyscy posiadają
          odpowiednie kwalifikacje i doświadczenie, dzięki czemu każda animacja
          jest na najwyższym poziomie. Jeśli chcesz, aby twoje wydarzenie było
          pełne uśmiechu i świetnej zabawy - jesteśmy do Twojej dyspozycji!"
        leftSide={false}
      />

      <div>
    <a  href="#">
  
      <button className="bg-blue-400">
        <img src={fb}/>
        sfafsaf
      </button></a>
      
      <a  href="#">
  
  <button className="bg-orange-400">
    <img src={instagram}/>
    sfafsaf
  </button></a>
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
              willBeUsedManyTimes={true}
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
