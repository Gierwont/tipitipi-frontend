interface Props {
    header:string;
    paragraph:string;
  }
const Text_Component = ({header , paragraph} : Props) => {
    return(
        <div className="bg-gradient-to-r from-tipiOrange to-tipiPink mb-12 p-12 ">
            <div className="text-center text-3xl md:text-5xl mb-6"> {header}</div>
            <div className="text-center text-md md:text-lg lg:text-xl  break-words leading-relaxed max-h-[100px] md:max-h-[150px]  overflow-y-auto">
                {paragraph}
            </div>
        </div>
    )
}
export default Text_Component