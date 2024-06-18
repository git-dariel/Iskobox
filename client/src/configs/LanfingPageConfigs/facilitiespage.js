import buildingA from "@/assets/facilities/BuildingA.webp"
import buildingB from "@/assets/facilities/BuildingB.webp"
import buildingC from "@/assets/facilities/BuildingC.webp"
import buildingD1 from "@/assets/facilities/BuildingD1.webp"
import buildingD2 from "@/assets/facilities/BuildingD2.webp"
import buildingD3 from "@/assets/facilities/BuildingD3.webp"
import buildingD4 from "@/assets/facilities/BuildingD4.webp"
import buildingE from "@/assets/facilities/BuildingE.webp"
import buildingF from "@/assets/facilities/BuildingF.webp"
import buildingG from "@/assets/facilities/BuildingG.webp"
import ICT from "@/assets/facilities/ICT1-2.webp"
import GYM1 from  "@/assets/facilities/Gym1.webp"
import GYM2 from  "@/assets/facilities/Gym2.webp"
import GYM3 from  "@/assets/facilities/Gym3.webp"
import Lib1 from "@/assets/facilities/Library1.webp"
import Lib2 from "@/assets/facilities/Library2.webp"
import Lib3 from "@/assets/facilities/Library3.webp"

export const data = {
  //header
  building: "Buildings",
  and: "AND",
  facilities: "Facilities",


//content
title:"Virtual Tour",
video: "https://drive.google.com/file/d/1SpnWFVZ_P1FA-1fIxN6sztoJFgOXlUq4/preview",

buildingtitle: "Buildings",
facilititestitle: "Facilitites",

buildingD: "BUILDING D: ",
titleD: "Nantes Building",
buildingDimg1: buildingD1,
buildingDimg2: buildingD2,
buildingDimg3: buildingD3,
buildingDimg4: buildingD4,
};


export const building = [
  {
    id: 1,
    building:"BUILDING A: ",
    title: " Don Gregorio Yumul Sr. Memorial Bldg  ",
    img: buildingA,
  },
  {
    id: 2,
    building:"BUILDING B: ",
    title: " Administration Building   ",
    img: buildingB,
  },
  {
    id: 3,
    building:"BUILDING C: ",
    title: " Aristedes Yumul Sr. Building dministration Building   ",
    img: buildingC,
  },

]

export const buildingv2 = [
  {
    id: 1,
    building:"BUILDING E: ",
    title: " Row Building  ",
    img: buildingE,
  },
  {
    id: 2,
    building:"BUILDING F: ",
    title: "Cortuna Building    ",
    img: buildingF,
  },
  {
    id: 3,
    building:"BUILDING G: ",
    title: " STAN Building   ",
    img: buildingG,
  },

]

export const facilities = [
  {
    id: 1,
    title: " ICT- LABORATORY- 1 & 2",
    img: ICT,
  },
]

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
    title:"LIBRARY ",
    img1: Lib1,
    img2: Lib2,
    img3: Lib3,
  },
]