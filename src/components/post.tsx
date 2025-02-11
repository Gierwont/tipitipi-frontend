import "react-quill/dist/quill.snow.css";
// import { Link } from "react-router-dom"
import { API_URL } from "../functions/global";
import { BlogFiles } from "../functions/interfaces";
import { useCallback, useState } from "react";

interface Props {
  id: number;
  title: string;
  content?: string | null;
  date: number;
  attachments?: BlogFiles[] | null;
  // willBeUsedManyTimes: boolean;
  // loading?: boolean;
}

const Post = ({
  id,
  title,
  content = null,
  date,
  attachments = null,
}: Props) => {
  const [show, setShow] = useState(false);
  const toggleShow = useCallback(() => setShow((prev) => !prev), [setShow]);
  // if (attachments && content) {
  //   attachments.forEach((attachment, index) => {
  //     if (!content) {
  //       return;
  //     }
  //     content = content.replace(
  //       `{{${index}}}`,
  //       `<img style="max-height:200px;" src="${API_URL}/proxy?key=${attachment.filename}&type=blog" alt="${attachment.filename}"/>`

  //     );
  //   });
  // } else {
  //   if (content) {
  //     content = content?.replace(/{{\d+}}/g, "");
  //   }
  // }
  const processedContent =
    attachments && content
      ? attachments.reduce(
          (acc, attachment, index) =>
            acc.replace(
              `{{${index}}}`,
              `<img style="max-height:200px;" src="${API_URL}/proxy?key=${attachment.filename}&type=blog" alt="${attachment.filename}"/>`
            ),
          content
        )
      : content?.replace(/{{\d+}}/g, "");

  return (
    <div className=" mb-6 border-4 bg-white border-gray-800 rounded-lg ">
      <div className="bg-gray-900 text-white pt-4 p-4 text-xl md:text-3xl">
        <div className="float-left ">{title}</div>
        <div className="float-right">
          {" "}
          {new Date(date * 1000).toLocaleDateString("en-GB") +
            " " +
            new Date(date * 1000).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
        <div className="clear-both"></div>
      </div>
      {processedContent ? (
        // <div
        //   className={`ql-editor quill px-4 pt-4 text-medium overflow-hidden ${
        //     show ? "" : "max-h-[150px] mb-[10px]"
        //   }`}
        //   dangerouslySetInnerHTML={{ __html: processedContent }}
        // ></div>
        <div
          className={`ql-editor quill mb-[10px] px-4 pt-4 text-medium overflow-hidden transition-max-height  ease-in-out
    ${show ? "max-h-[3000px] duration-[2s]" : "max-h-[100px] duration-[0.5s]"}
  `}
          dangerouslySetInnerHTML={{ __html: processedContent }}
        ></div>
      ) : (
        <div></div>
      )}

      {/* <h1 className="pt-4 pl-4">
        {new Date(date * 1000).toLocaleDateString("en-pl").toString()}
      </h1> */}

      {/* {show ? ( */}
      {/* //<Link to={`/blog/${id}`}> */}
      <button
        onClick={() => toggleShow()}
        className="flex justify-center items-center border w-[50px] text-4xl  h-[50px] p-2 ml-4 mb-4 border-gray-900 hover:bg-gray-900 hover:text-white hover:duration-300 rounded-full"
      >
        {show ? <>&uarr;</> : <>&darr;</> }
      </button>
      {/* //</Link>
      // ) : (
      //   <div></div>
      // )} */}
    </div>
  );
};
export default Post;
