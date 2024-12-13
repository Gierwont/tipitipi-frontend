import background_example from "../assets/example_background.jpg";
import landscapeImage from "../assets/landscape.jpg";
import Image_Text from "../components/image_text";
import { useState, useEffect } from "react";
import Post from "../components/post";
import { BlogPostDataBodyJson } from "../functions/interfaces";
import PostSkeleton from "../components/postSkeletonLoading";
import 'react-toastify/dist/ReactToastify.css';
const Mainpage = () => {
  const [posts, setPosts] = useState<Array<BlogPostDataBodyJson>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `http://localhost:8080/blog/posts?limit=3&sort=newest`,
          {
            method: "GET",
          }
        );
        console.log(response)
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
    if(posts.length==0){
      fetchPost();
    }
  }, []);

  useEffect(() => {
console.log(posts)
  },[posts])

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="globalCss ">
      {/* <h1>Mainpage</h1>
            <Link to="/admin">Admin</Link>
            <h1 className="text-center">{props.mainpageFirstHeader}</h1> */}

        <Image_Text
        image={background_example}
        header="Jakiś nagłówek"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Suspendisse tellus lectus, pharetra a aliquet sed, 
                    sagittis vel sapien."
        leftSide={true}
      />
      
        {posts.length > 0 ? (<h1 className="text-3xl mb-[1%]">Oto kilka najnowszych postów</h1>) : (<div></div>)}
      
      {posts.length>0 ? (
        posts.map((post,index) => {
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
        <div>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </div>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Image_Text
        image={landscapeImage}
        header="Jakiś nagłówek"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Suspendisse tellus lectus, pharetra a aliquet sed, 
                    sagittis vel sapien.orem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Suspendisse tellus lectus, pharetra a aliquet sed, 
                    sagittis vel sapien.orem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Suspendisse tellus lectus, pharetra a aliquet sed, 
                    sagittis vel sapien.orem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Suspendisse tellus lectus, pharetra a aliquet sed, 
                    sagittis vel sapien.orem ipsum dolor sit amet, consectetur adipiscing 
                    elit. Suspendisse tellus lectus, pharetra a aliquet sed, 
                    sagittis vel sapien."
        leftSide={false}
      />
    </div>
  );
};
export default Mainpage;
