import { useEffect, useState } from "react";
// import PostSkeleton from "../components/postSkeletonLoading"
import SlideShow from "../components/slideshow";
import { API_URL } from "../functions/global";
import { GalleryGroup } from "../functions/interfaces";
const Gallery = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<Array<GalleryGroup>>([]);
  const [offset, setOffset] = useState(0);
  const [isMore, setIsMore] = useState(true);
  const limit = 3


  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`${API_URL}/gallery?offset=${offset}&limit=${limit}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        // setGroups((prevGroups) => prevGroups?.concat(data));

        setGroups(data);
      } catch (error) {
        console.error(error);
      }
      // } finally {
      //   setLoading(false);
      // }
    }
    fetchPost();
  }, [offset]);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight && isMore) {
        if (offset + 6 > groups.length) {
          setIsMore(false);
        } else {
          setOffset((prevOffset) => prevOffset + 6);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="bg-gradient-to-r p-5 from-tipiOrange to-tipiPink min-h-screen">
      {/* <SlideShow
        description="Spotkanie 2022 , 14 lipca w domu tam i tam blabla"
        images={[
          "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
          "https://images.photowall.com/products/42556/summer-landscape-with-river.jpg?h=699&q=85",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgSVMLJAybwkPi2a8EjrNSjQySErCvnOH1Kg&s",
        ]}
      />
      <SlideShow
        description="Spotkanie 2022 , 14 lipca w domu tam i tam blabla"
        images={[
          "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
          "https://images.photowall.com/products/42556/summer-landscape-with-river.jpg?h=699&q=85",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgSVMLJAybwkPi2a8EjrNSjQySErCvnOH1Kg&s",
        ]}
      /> */}
      {groups ? (
        groups.map((group) =>
          group.images ? (
            <SlideShow
              description={group.description}
              images={group.images.map((image) => {
                return `${API_URL}/proxy?key=${image.filename}&type=gallery`;
              })}
            />
          ) : null
        )
      ) : (
        <div></div>
      )}


    </div>
  );
};
export default Gallery;
