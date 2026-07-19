import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getProfile, updateProfile, changePassword } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { FiCamera } from "react-icons/fi";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

const Profile = () => {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "", profileImage: "" });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfileData({ name: data.user.name, email: data.user.email, profileImage: data.user.profileImage });
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = new FormData();
      form.append("name", profileData.name);
      form.append("email", profileData.email);
      if (imageFile) form.append("profileImage", imageFile);

      const { data } = await updateProfile(form);
      updateUser(data.user);
      setProfileData({ ...profileData, profileImage: data.user.profileImage });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordSaving(true);
    try {
      await changePassword(passwordData);
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="flex-1 max-w-xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>

        {/* Profile Info Form */}
        <form onSubmit={handleProfileSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={preview || (profileData.profileImage ? `${API_BASE}${profileData.profileImage}` : "https://ui-avatars.com/api/?name=" + profileData.name)}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
              />
              <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-700">
                <FiCamera size={14} />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2.5 font-medium disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col gap-4">
          <h2 className="font-semibold">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
            className={inputClass}
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
            minLength={6}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={passwordSaving}
            className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg py-2.5 font-medium disabled:opacity-60"
          >
            {passwordSaving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
