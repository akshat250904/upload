import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [editors, setEditors] = useState([]); // All editors from the database
  const [filteredEditors, setFilteredEditors] = useState([]); // Filtered editors based on user input
  const [search, setSearch] = useState(""); // User input

  // Fetch editors from the backend using Axios
  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/creator/getAllEditors");
        
        const editorData = response.data.editors;
        console.log(editorData);
        
        setEditors(editorData);
      } catch (error) {
        console.error("Failed to fetch editors:", error.message);
      }
    };

    fetchEditors();
  }, []);

  // Filter editors based on user input
  // useEffect(() => {
  //   if (search.trim() === "") {
  //     setFilteredEditors([]); // Clear dropdown if input is empty
  //   } else {
  //     const results = [];
  //     for (let i = 0; i < editors.length; i++) {
  //       results.push(editors[i].email);
  //     }
  //     console.log(results);
      
  //     setFilteredEditors(results);
  //   }
  // }, [search, editors]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredEditors([]); // Clear dropdown if input is empty
    } else {
      const results = [];
      for (let i = 0; i < editors.length; i++) {
        if (editors[i].email.toLowerCase().includes(search.toLowerCase())) {
          results.push(editors[i].email); // Store the entire editor object
        }
      }
      console.log(results);
      setFilteredEditors(results); // Set filteredEditors to the full editor objects
    }
  }, [search, editors]);

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100%] bg-purple-500">
      <div className="flex flex-col items-center font-bold text-xl h-[20%] relative">
        <form>
          <input
            type="text"
            className="rounded-md p-2"
            placeholder="Find your editor here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {/* Dropdown */}
        {filteredEditors.length > 0 && (
          <ul
            className="absolute top-full mt-2 w-full bg-white text-black rounded-md shadow-lg z-10 max-h-40 overflow-y-auto"
          >
            {filteredEditors.map((editor, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                onChange={() => setSearch(editor.email)} // Set search to the selected editor's name
              >
                {editor.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
