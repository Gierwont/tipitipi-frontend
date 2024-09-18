import Post from "../components/post";
import { useState, useEffect } from "react";

interface BlogPostDataBodyJson {
  Content: string;
  Created_At: string;
  Edited_At: string;
  ID: number;
  Images: string;
  Title: string;
}

const Blog = () => {
  const limit = 6
  const [offset, setOffset] = useState(0);
  const [sortBy,setSortBy] = useState<"newest" | "oldest" | "likes">("newest")

  const [posts, setPosts] = useState<Array<BlogPostDataBodyJson>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMore , setIsMore] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `http://localhost:2333/blog/posts?offset=${offset}&limit=${limit}&sort=${sortBy}`,
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
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [offset]);



  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight && isMore) {
        console.log("Scrolled to bottom");
        if(offset + 6> posts.length) {
          setIsMore(false)
        }
        else {
          setOffset((prevOffset) => prevOffset + 6 );
        }
        
      }
    }

    window.addEventListener("scroll" , handleScroll);
    return () => {
      window.removeEventListener("scroll" , handleScroll)
      }
  });


  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="globalCss">
      <h1 className="text-3xl mt-5">Blog</h1>
      {posts ? (
        posts.map((post) => {
          return <Post id={post.ID} key={post.ID} title={post.Title} content={post.Content} date={post.Edited_At}/>;
        })
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default Blog;
