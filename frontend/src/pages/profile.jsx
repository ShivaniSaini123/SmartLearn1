import { useState, useRef, useEffect } from "react";
import Footer from "../components/common/Footer";

function ProfilePage() {
  const [description, setDescription] = useState("");
  const [submittedDescription, setSubmittedDescription] = useState("");
  const [interests, setInterests] = useState("");
  const [submittedInterests, setSubmittedInterests] = useState("");
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "", linkedin: "" });
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const fileInputRef = useRef(null);

  const userdata = JSON.parse(localStorage.getItem("userData")) || {};
  const [userName, setUserName] = useState(userdata.username || "");
  const [userEmail, setUserEmail] = useState(userdata.email || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch('/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((userdata) => {
          if (userdata.user.username && userdata.user.email) {
            setUserName(userdata.user.username);
            setUserEmail(userdata.user.email);
            localStorage.setItem("userData", JSON.stringify(userdata));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleDocumentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDocument = { name: file.name, file };
      setUploadedDocuments([...uploadedDocuments, newDocument]);
    }
  };

  const handleViewDocument = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div className="text-white bg-gray-800 min-h-screen">
      <div className="container mx-auto p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg?w=768"
              alt="Profile Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{userName}</h2>
            <p className="text-gray-400">{userEmail}</p>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <p>Loading...</p>
          </div>
        )}

        {/* Profile Content */}
        {!loading && (
          <>
            {/* Description Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmittedDescription(description);
                  setDescription("");
                }}
                className="space-y-4"
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write about yourself..."
                  className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"

                  rows="4"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
              <div className="mt-4">
                <h4 className="font-semibold">Your Description:</h4>
                <p>{submittedDescription || "No description provided"}</p>
              </div>
            </div>

            {/* Interests Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Interested In</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmittedInterests(interests);
                  setInterests("");
                }}
                className="space-y-4"
              >
                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Write your interests here..."
                  className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
              <div className="mt-4">
                <h4 className="font-semibold">Your Interests:</h4>
                <p>{submittedInterests || "No interests provided"}</p>
              </div>
            </div>

            {/* Upload Documents Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Upload and View Documents</h3>
              <button
                onClick={handleDocumentClick}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Upload Document
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <ul className="mt-4">
                {uploadedDocuments.length > 0 ? (
                  uploadedDocuments.map((doc, index) => (
                    <li
                      key={index}
                      onClick={() => handleViewDocument(doc.file)}
                      className="cursor-pointer text-blue-400 hover:underline"
                    >
                      {doc.name}
                    </li>
                  ))
                ) : (
                  <p>No documents uploaded yet.</p>
                )}
              </ul>
            </div>

            {/* Contact Information Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-4"
              >
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="Email"
                  className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="Phone"
                  className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  value={contactInfo.linkedin}
                  onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
                  placeholder="LinkedIn URL"
                  className="mt-1 block w-full py-2 px-4 rounded-md border-gray-800 bg-[#2c2f38] text-white shadow-sm hover:bg-[#3a3f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Contact Info
                </button>
              </form>
              <div className="mt-4">
                <h4 className="font-semibold">Your Contact Information:</h4>
                <p>Email: {contactInfo.email || "Not provided"}</p>
                <p>Phone: {contactInfo.phone || "Not provided"}</p>
                <p>LinkedIn: {contactInfo.linkedin || "Not provided"}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
