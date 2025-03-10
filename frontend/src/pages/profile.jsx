import { useState, useRef, useEffect } from "react";
import Footer from "../components/common/Footer";

function DocumentUploader() {
  const [uploadedDocuments, setUploadedDocuments] = useState(() => {
    return JSON.parse(localStorage.getItem("uploadedDocuments")) || [];
  });
  const fileInputRef = useRef(null);

  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDocument = {
        name: file.name,
        url: URL.createObjectURL(file), // Creates a viewable URL
      };

      const updatedDocuments = [...uploadedDocuments, newDocument];
      setUploadedDocuments(updatedDocuments);
      localStorage.setItem("uploadedDocuments", JSON.stringify(updatedDocuments));
    }
  };

  const handleViewDocument = (url) => {
    window.open(url, "_blank"); // Opens the file in a new tab
  };

  const handleDeleteDocument = (index) => {
    const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
    setUploadedDocuments(updatedDocuments);
    localStorage.setItem("uploadedDocuments", JSON.stringify(updatedDocuments));
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Uploaded Documents</h3>
      <button
        onClick={handleDocumentClick}
        className="py-2 px-4 bg-green-500 text-white rounded-lg"
      >
        Upload Document
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.png"
      />

      {uploadedDocuments.length > 0 && (
        <ul className="mt-4">
          {uploadedDocuments.map((doc, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg my-2">
              <span className="text-white">{doc.name}</span>
              <div>
              <button
                onClick={() => handleViewDocument(doc.url)}
                className="text-blue-400 underline"
              >
                View
              </button>
              <button
                  onClick={() => handleDeleteDocument(index)}
                  className="text-red-400 underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProfilePage() {
  const [description, setDescription] = useState(localStorage.getItem("description") || "");
  const [submittedDescription, setSubmittedDescription] = useState(description);

  const [interests, setInterests] = useState(localStorage.getItem("interests") || "");
  const [submittedInterests, setSubmittedInterests] = useState(interests);

  const [contactInfo, setContactInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("contactInfo")) || { email: "", phone: "", linkedin: "" };
  });
  const [, setSubmittedContactInfo] = useState(contactInfo);

  const userdata = JSON.parse(localStorage.getItem("userData")) || {};
  const [userName, setUserName] = useState(userdata.username || "");
  const [userEmail, setUserEmail] = useState(userdata.email || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((userdata) => {
          if (userdata.user) {
            setUserName(userdata.user.username);
            setUserEmail(userdata.user.email);
            localStorage.setItem("userData", JSON.stringify(userdata));
          }
        })
        .catch((err) => console.error("Error fetching user data:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleDescriptionSubmit = (e) => {
    e.preventDefault();
    setSubmittedDescription(description);
    localStorage.setItem("description", description);
  };

  const handleInterestsSubmit = (e) => {
    e.preventDefault();
    setSubmittedInterests(interests);
    localStorage.setItem("interests", interests);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmittedContactInfo(contactInfo);
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
    alert("Contact information saved successfully!");
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

        {loading && <p className="text-center mt-8">Loading...</p>}

        {!loading && (
          <>
            {/* Description Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <form onSubmit={handleDescriptionSubmit} className="space-y-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write about yourself..."
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800"
                  rows="4"
                />
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Submit
                </button>
              </form>
              <p className="mt-4">{submittedDescription || "No description provided"}</p>
            </div>

            {/* Interests Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Interested In</h3>
              <form onSubmit={handleInterestsSubmit} className="space-y-4">
                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Write your interests here..."
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800"
                  rows="3"
                />
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Submit
                </button>
              </form>
              <p className="mt-4">{submittedInterests || "No interests provided"}</p>
            </div>

            {/* Contact Information */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  placeholder="Email"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-800"
                />
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Submit
                </button>
              </form>
            </div>

            <DocumentUploader />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
