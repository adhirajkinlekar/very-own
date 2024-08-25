import React, { useContext, useEffect, useState } from 'react';
import './learn.styles.css'; // Custom styles if needed
import { useParams } from 'react-router-dom';
import AppContext from '../../context/app_context';

const CoursePage = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const { academyId } = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5001/api/academy/${academyId}/courses/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({ course }) => {
        setLectures(course.sections);
        if (course.sections.length > 0 && course.sections[0].lectures.length > 0) {
          setSelectedLecture(course.sections[0].lectures[0]);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [academyId, id]);

  const selectLecture = (sectionId, itemId) => {
    const section = lectures[sectionId];
    const item = section.lectures[itemId];
    setSelectedLecture(item);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
      <aside className="w-full md:w-1/4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
          placeholder="Search feature is not yet implemented"
        />
        {lectures.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{section.title}</h3>
            {section.lectures.map((item, j) => (
              <div
                key={j}
                className={`cursor-pointer p-3 rounded-lg flex items-center transition-colors duration-300 ${selectedLecture === item ? 'bg-indigo-100 border border-indigo-200' : 'hover:bg-indigo-50'}`}
                onClick={() => selectLecture(i, j)}
              >
                <div className="text-gray-800">
                  {j + 1}. {item.title}
                </div>
              </div>
            ))}
          </div>
        ))}
      </aside>
      <main className="w-full md:w-3/4 p-6 bg-white shadow-lg rounded-lg ml-0 md:ml-4">
        {selectedLecture ? (
          <>
            {/* <h2 className="text-3xl font-extrabold mb-4 text-gray-900">{selectedLecture?.title}</h2> */}
            <div className="video-container mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
              <video controls autoPlay muted className="w-full rounded-lg">
                <source src={`http://localhost:3004/stream/${selectedLecture?.url}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a lecture to start learning</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoursePage;
