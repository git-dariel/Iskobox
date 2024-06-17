import Footer from "../Homepages/footer";
import CertContent from "./certcontent";
import CertHeader from "./certicateheader";
// import PdfCompt from "./testing";

export default function CertifcateOfAuthenticity (){

    return (
        <div className="flex flex-col">
          <CertHeader/>
          <CertContent/>
          <Footer/>      
        </div>
    );
}