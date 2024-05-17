import React, { useState } from "react";
import { TfiLayoutPlaceholder } from "react-icons/tfi";

const mockData = {
  profile: {
    name: "Jane Doe",
    title: "Owner at Her Company Inc.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt",
    status: "Active",
    memberSince: "Nov 07, 2016",
    image:
      "https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg",
  },
  similarProfiles: [
    {
      name: "Kojstantin",
      image:
        "https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg",
    },
    {
      name: "James",
      image: "https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4",
    },
    {
      name: "Natie",
      image:
        "https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg",
    },
    {
      name: "Casey",
      image:
        "https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png",
    },
  ],
  about: {
    firstName: "Jane",
    lastName: "Doe",
    gender: "Female",
    contactNo: "+11 998001001",
    currentAddress: "Beech Creek, PA, Pennsylvania",
    permanentAddress: "Arlington Heights, IL, Illinois",
    email: "jane@example.com",
    birthday: "Feb 06, 1998",
  },
  experience: [
    { position: "Owner at Her Company Inc.", duration: "March 2020 - Now" },
    { position: "Owner at Her Company Inc.", duration: "March 2020 - Now" },
    { position: "Owner at Her Company Inc.", duration: "March 2020 - Now" },
    { position: "Owner at Her Company Inc.", duration: "March 2020 - Now" },
  ],
  education: [
    { degree: "Masters Degree in Oxford", duration: "March 2020 - Now" },
    { degree: "Bachelors Degree in LPU", duration: "March 2020 - Now" },
  ],
};

const Profile = () => {
  return (
    <div className="flex">
      <div className="md:flex no-wrap md:-mx-2">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-green-400">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src={mockData.profile.image}
                alt="Profile"
              />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {mockData.profile.name}
            </h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">
              {mockData.profile.title}
            </h3>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              {mockData.profile.description}
            </p>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    {mockData.profile.status}
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Member since</span>
                <span className="ml-auto">{mockData.profile.memberSince}</span>
              </li>
            </ul>
          </div>
          <div className="my-4"></div>
          <div className="bg-white p-3 hover:shadow">
            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
              <span className="text-green-500">
                <TfiLayoutPlaceholder />
              </span>
              <span>Similar Profiles</span>
            </div>
            <div className="grid grid-cols-3">
              {mockData.similarProfiles.map((profile, index) => (
                <div className="text-center my-2" key={index}>
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src={profile.image}
                    alt={profile.name}
                  />
                  <a href="#" className="text-main-color">
                    {profile.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <TfiLayoutPlaceholder />
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">{mockData.about.firstName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{mockData.about.lastName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">{mockData.about.gender}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">{mockData.about.contactNo}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Current Address</div>
                  <div className="px-4 py-2">
                    {mockData.about.currentAddress}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Permanent Address
                  </div>
                  <div className="px-4 py-2">
                    {mockData.about.permanentAddress}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    <a
                      className="text-blue-800"
                      href={`mailto:${mockData.about.email}`}
                    >
                      {mockData.about.email}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">{mockData.about.birthday}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4"></div>

          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
              <span className="text-green-500">
                <TfiLayoutPlaceholder />
              </span>
              <span className="tracking-wide">Experience</span>
            </div>
            <ul className="list-inside space-y-2">
              {mockData.experience.map((exp, index) => (
                <li key={index}>
                  <div className="text-teal-600">{exp.position}</div>
                  <div className="text-gray-500 text-xs">{exp.duration}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-4"></div>

          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
              <span className="text-green-500">
                <TfiLayoutPlaceholder />
              </span>
              <span className="tracking-wide">Education</span>
            </div>
            <ul className="list-inside space-y-2">
              {mockData.education.map((edu, index) => (
                <li key={index}>
                  <div className="text-teal-600">{edu.degree}</div>
                  <div className="text-gray-500 text-xs">{edu.duration}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
