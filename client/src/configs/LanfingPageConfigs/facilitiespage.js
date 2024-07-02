import BuildingA from "@/assets/facilities/BuildingA.webp";
import BuildingB from "@/assets/facilities/BuildingB.webp";
import BuildingB2 from "@/assets/facilities/BuildingB-2.webp";
import buildingD1 from "@/assets/facilities/BuildingD1.webp";
import buildingD2 from "@/assets/facilities/BuildingD2.webp";
import buildingD3 from "@/assets/facilities/BuildingD3.webp";
import buildingD4 from "@/assets/facilities/BuildingD4.webp";
import ScienceBuilding from "@/assets/facilities/ScienceBuilding.webp";
import buildingF from "@/assets/facilities/BuildingF.webp";
import buildingG from "@/assets/facilities/buildingnewG.webp";
import ICT from "@/assets/facilities/ictlab.jpg";
import GYM1 from "@/assets/facilities/Gym1.webp";
import GYM2 from "@/assets/facilities/Gym2.webp";
import GYM3 from "@/assets/facilities/Gym3.webp";
import Lib1 from "@/assets/facilities/Library1.webp";
import Lib2 from "@/assets/facilities/Library2.webp";
import Lib3 from "@/assets/facilities/Library3.webp";

export const data = {
  //header
  building: "Buildings",
  and: "AND",
  facilities: "Facilities",

  //content
  title: "Virtual Tour",
  video:
    "https://drive.google.com/file/d/1SpnWFVZ_P1FA-1fIxN6sztoJFgOXlUq4/preview",

  buildingtitle: "Buildings",
  facilititestitle: "Facilitites",

  buildingD: "BUILDING C: ",
  titleD: "Nantes Building",
  buildingDimg1: buildingD1,
  buildingDimg2: buildingD2,
  buildingDimg3: buildingD3,
  buildingDimg4: buildingD4,
};

export const building = [
  {
    id: 1,
    building: "BUILDING A: ",
    title: " Administration Building   ",
    img: [
      {
        id: 1,
        img: BuildingA,
      },
    ],
  },
  {
    id: 2,
    building: "BUILDING B: ",
    title: " Aristedes Yumul Sr. Building Administration Building   ",
    img: [
      {
        id: 1,
        img: BuildingB,
      },
      { id: 2, img: BuildingB2 },
    ],
  },
];

export const buildingv2 = [
  {
    id: 1,
    building: "BUILDING D: ",
    title: "Health Science Building",
    img: ScienceBuilding,
  },
  {
    id: 2,
    building: "BUILDING E: ",
    title: "Cortuna Building    ",
    img: buildingF,
  },
  {
    id: 3,
    building: "BUILDING F: ",
    title: " STAN Building   ",
    img: buildingG,
  },
];

export const facilities = [
  {
    id: 1,
    title: " ICT- LABORATORY- 1 & 2",
    img: ICT,
  },
];

export const facilitiesv2 = [
  {
    id: 1,
    title: "GYMNASIUM ",
    img1: GYM1,
    img2: GYM2,
    img3: GYM3,
  },
  {
    id: 2,
    title: "LIBRARY ",
    img1: Lib1,
    img2: Lib2,
    img3: Lib3,
  },
];
