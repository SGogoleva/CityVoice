import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";
import { format } from "date-fns";
import "leaflet/dist/leaflet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProjectPreview } from "../../types/project";
import { City } from "../../types/cities";
import { useNavigate } from "react-router-dom";


// Import the icons using ES6 import statements
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";

// Fix leaflet's default icon issue with Webpack
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface ProjectMapProps {
  projects: ProjectPreview[];
  cities: City[];
}

const ProjectMap: React.FC<ProjectMapProps> = ({ projects, cities }) => {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yy");
  };
  const handleProjectClick = (projectName: string, projectId: string) => {
    const formattedName = projectName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/projects/${formattedName}`, {
      state: { projectId },
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <MapContainer
      center={[32.05043, 34.75224]}
      zoom={8}
      style={{ height: "500px", width: "100%" }}
      className="mt-8"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker key={city.cityId} position={[city.latitude, city.longitude]}>
          <Popup>
            <b>{city.cityName}</b>
            <br />

            <Slider {...sliderSettings}>
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="project-card cursor-pointer p-4 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg group relative"
                  onClick={() => handleProjectClick(project.name, project._id)}
                >
                  <div className="relative h-64 mb-4 bg-gray-200">
                    <div className="absolute top-2 right-2 text-sm px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#50B04C] group-hover:text-white">
                      +{project.pollPrice} scores
                    </div>
                    <div className="absolute top-0 left-2 flex space-x-1 px-1 py-0">
                      {/* <ClockIcon className="h-5 w-5" /> */}
                      <p>Vote until {formatDate(project.dueDate)}</p>
                    </div>
                    <div className="image-placeholder flex items-end justify-center text-gray-500 h-full">
                      <img
                        src={project.imageUrl}
                        alt=""
                        className="h-5/6 w-full object-cover"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                  <div className="description text-gray-700 truncate-multiline">
                    {project.description}
                  </div>
                </div>
              ))}
            </Slider>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ProjectMap;
