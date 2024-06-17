import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import Projects from "../components/Projects";
import Message from "../components/Message";
import { RootState } from "../store/store";
import { projects3Thunk } from "../store/thunks/project.thunk";
import Projects3Preview from "../components/single/Projects3Preview";

const MainPage = () => {
  return (
    <>
      <div className="relative">
        <section
          className="text-white p-8 bg-cover bg-no-repeat bg-top bg-fixed flex flex-col md:flex-row items-center"
          style={{
            backgroundImage: "url('../../src/assets/citymain.webp')",
          }}
        >
          <div className="absolute inset-0 bg-[#1F3E52] opacity-70"></div>

          <div className="relative z-10 md:w-1/2 m-4 p-4 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6">Loyalty Program</h2>
            <p className="text-lg mb-4">
              Earn points for participating in city life and exchange them for
              various city activities, such as free entry to cultural events or
              discounts on services.
            </p>
            <Link
              to="/login"
              className="inline-block mt-6 mb-6 bg-[#50B04C] text-white py-2 px-4 rounded hover:bg-opacity-90"
            >
              Let's start!
            </Link>
          </div>

          <div className="md:w-1/2 p-4 flex justify-center relative h-96">
            <img
              src="../../src/assets/vote.webp"
              alt="City activity"
              className="h-[140%] translate-y-[-13%] max-w-md rounded-lg transform rotate-3"
            />
          </div>
        </section>
      </div>

      <section className="text-sm p-8 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 hover:scale-110">
            <img
              src="../../src/assets/surveys.png"
              className="w-16 h-16 mx-auto mb-4"
              alt="Voting"
            />
            <h3 className="text-xl font-semibold mb-2">Vote on Projects</h3>
            <p className="text-gray-600">
              Participate in votes and influence the development of your city.
            </p>
          </div>
          <div className="p-4 hover:scale-110">
            <img
              src="../../src/assets/forum.png"
              className="w-16 h-16 mx-auto mb-4"
              alt="Submissions"
            />
            <h3 className="text-xl font-semibold mb-2">Submit Concerns</h3>
            <p className="text-gray-600">
              Report issues and make suggestions directly to the city
              administration.
            </p>
          </div>
          <div className="p-4 hover:scale-110">
            <img
              src="../../src/assets/trolley.png"
              className="w-16 h-16 mx-auto mb-4"
              alt="Rewards"
            />
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-600">
              Earn points for your participation and exchange them for city
              activities.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Current Projects
        </h2>
        <Projects3Preview />
        <div className="text-center mt-6">
          <Link
            to="/projects"
            className="bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90"
          >
            View All Projects
          </Link>
        </div>
      </section>

      <section className="p-8 bg-gray-100 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-4 flex justify-center">
          <img
            src="../../src/assets/gift.webp"
            alt="City activity"
            className="w-full h-auto max-w-md object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 p-4 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-6">Loyalty Program</h2>
          <p className="text-gray-600 mb-4">
            Earn points for participating in city life and exchange them for
            various city activities, such as free entry to cultural events or
            discounts on services.
          </p>
          <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
            Learn More
          </button>
        </div>
      </section>

      <section className="bg-gray-200 p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Submit a Concern
        </h2>
        <Message />
      </section>
    </>
  );
};

export default MainPage;
