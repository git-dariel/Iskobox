import Academic from "./academic";
import AdministrativeOfficers from "./administrative";
import Designees from "./designees";
import Faculties from "./faculties";
import StudentAffair from "./studentaffair";


export default function AdministrationContent(){
    return(
        <>
        <Designees/>
        <Academic/>
        <StudentAffair/>
        <AdministrativeOfficers/>
        <Faculties/>
        </>
    );
}