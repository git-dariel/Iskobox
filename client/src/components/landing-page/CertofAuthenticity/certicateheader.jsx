import img5 from "../../../assets/homeAssets/img5.png";

export default function CertHeader() {
  return (
    <div className="">
      <div className="h-[52vh] bg-[#810101]">
        <div
          className="h-[50vh] w-full bg-cover "
          style={{ backgroundImage: `url(${img5})` }}
        >
          <div className="bg-[#810101] bg-opacity-50 flex items-center w-full h-full">
            <h1 className="px-20 text-xl font-serif font-bold">
              CERTIFICATE OF AUTHENTICITY
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
