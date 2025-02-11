// interface Props {
//   image:string;
//   header:string;
//   paragraph:string;
//   leftSide: boolean;
// }

// const Image_Text = ({image,header,paragraph,leftSide} : Props) => {
//   const imageBlock  =  <div id="imageContainer" className="w-full md:w-[50%]"><img src={image} className="w-full h-full object-cover"></img></div>;
//   const textBlock = <div className="bg-gradient-to-r from-tipiOrange to-tipiPink w-full md:w-[50%] flex ">
//   <div className="p-[5%] self-center max-h-[300px] overflow-y-auto">
//     <h1 className="pb-[10%] text-3xl md:text-5xl">{header}</h1>
//     <p className="mr-[15%] text-md md:text-lg lg:text-xl">{paragraph}</p>
//   </div>
// </div>;

//   return (
//     <div className="flex flex-col md:flex-row items-stretch justify-center pb-[5%] max-h-[400px] md:max-h-[600px]  overflow-hidden">
//       {leftSide ? imageBlock: textBlock}
//       {leftSide ? textBlock : imageBlock}
//     </div>
//   );
// };

// export default Image_Text;

// interface Props {
//   image: string;
//   header: string;
//   paragraph: string;
//   leftSide: boolean;
// }

// interface Props {
//   image: string;
//   header: string;
//   paragraph: string;
//   leftSide: boolean;
// }

// const Image_Text = ({ image, header, paragraph, leftSide }: Props) => {
//   return (
//     <div className="flex flex-col md:flex-row h-[400px] md:h-[600px] w-full">
//       {/* Blok obrazu */}
// <div className={`w-full md:w-1/2 h-1/2 md:h-full order-${leftSide ? '1' : '2'}`}>
//   <img
//     src={image}
//     className="w-full h-full object-cover"
//     alt={header}
//   />
// </div>

//       {/* Blok tekstu */}
//       <div className={`w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-r from-tipiOrange to-tipiPink order-${leftSide ? '2' : '1'}`}>
//         <div className="h-full p-4 md:p-8 flex flex-col overflow-y-auto">
//           <h1 className="text-2xl md:text-4xl font-bold mb-4">{header}</h1>
//           <p className="text-base md:text-lg flex-grow">{paragraph}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Image_Text;

interface Props {
  image: string;
  header: string;
  paragraph: string;
  leftSide: boolean;
}

const Image_Text = ({ image, header, paragraph, leftSide }: Props) => {
  const imageBlock = (
    <div className="w-full md:w-1/2 h-1/2 md:h-full">
      <img src={image} className="w-full h-full object-cover" alt={header} />
    </div>
  );
  const textBlock = (
    <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-r from-tipiOrange to-tipiPink ">
      <div className="h-full p-4 pl-8 md:p-8 flex flex-col overflow-y-auto">
        <h1 className="text-4xl md:text-5xl mb-4">{header}</h1>
        <p className="text-base md:text-2xl flex-grow leading-relaxed">{paragraph}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-[400px] mb-12 w-full">
      {leftSide ? imageBlock : textBlock}
      {leftSide ? textBlock : imageBlock}
    </div>
  );
};

export default Image_Text;
