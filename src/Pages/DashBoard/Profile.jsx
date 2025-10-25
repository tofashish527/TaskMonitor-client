import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard, FaMoneyBillWave, FaSave, FaCrown, FaIdCard } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user details by email
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/user/email/${user.email}`)
      .then((res) => {
        setUserData(res.data);
        setEditableData({
          address: res.data.address || "",
          phone: res.data.phone || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  // Handle Save button (update address/phone)
  // const handleSave = () => {
  //   axiosSecure
  //     .patch(`/user/update/${user.email}`, editableData)
  //     .then(() => {
  //       toast.success("Profile updated successfully!");
  //       // Update local state so UI shows changes immediately
  //       setUserData({ ...userData, ...editableData });
  //     })
  //     .catch((err) => {
  //       console.error("Error updating profile:", err);
  //     });
  // };
 
  const handleSave = async () => {
  try {
    const res = await axiosSecure.patch(`/user/update/${user.email}`, editableData);

    // ✅ Check if backend returned success
    if (res.data?.message === "Profile updated successfully" || res.status === 200) {
      toast.success("Profile updated successfully!");

      // ✅ Immediately update UI
      setUserData((prev) => ({
        ...prev,
        address: editableData.address,
        phone: editableData.phone,
      }));
    } else {
      toast.error("Update failed. Please try again.");
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    toast.error("Failed to update profile!");
  }
};



  if (loading) return (
    <div className="min-h-screen bg-purple-300 flex items-center justify-center">
      <div className="text-white text-xl">Loading your profile...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-600 mb-6">
            <FaUser className="text-white" />
            <span className="text-white font-semibold">Personal Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-white">Profile</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Manage your personal information and contact details
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-600/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-violet-600/10"></div>
          
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left relative z-10">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={userData?.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-purple-300">
                  <FaUser className="text-white text-sm" />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{userData?.name}</h2>
              <p className="text-purple-200 text-lg mb-1">{userData?.designation}</p>
              <p className="text-purple-300 text-sm">{userData?.email}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="mt-8 space-y-6 relative z-10">
            {/* Read-only Information */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <FaCreditCard className="text-purple-300" />
                  <span className="text-white font-semibold">Bank Account</span>
                </div>
                <p className="text-white text-lg">{userData?.bank_account_no || "Not provided"}</p>
              </div>

              <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <FaMoneyBillWave className="text-purple-300" />
                  <span className="text-white font-semibold">Monthly Salary</span>
                </div>
                <p className="text-white text-lg">{userData?.salary ? `${userData.salary} BDT` : "Not specified"}</p>
              </div>

              <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <FaIdCard className="text-purple-300" />
                  <span className="text-white font-semibold">Role</span>
                </div>
                <p className="text-white text-lg bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full inline-block">
                  {userData?.role}
                </p>
              </div>

              <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <FaCrown className="text-purple-300" />
                  <span className="text-white font-semibold">Status</span>
                </div>
                <p className="text-white text-lg bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full inline-block">
                  Active
                </p>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
    <div className="flex items-center gap-3 mb-2">
      <FaCreditCard className="text-purple-300" />
      <span className="text-white font-semibold">Bank Account</span>
    </div>
    <p className="text-white text-lg">{userData?.bank_account_no || "Not provided"}</p>
  </div>

  <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
    <div className="flex items-center gap-3 mb-2">
      <FaMoneyBillWave className="text-purple-300" />
      <span className="text-white font-semibold">Monthly Salary</span>
    </div>
    <p className="text-white text-lg">{userData?.salary ? `${userData.salary} BDT` : "Not specified"}</p>
  </div>

  <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
    <div className="flex items-center gap-3 mb-2">
      <FaIdCard className="text-purple-300" />
      <span className="text-white font-semibold">Role</span>
    </div>
    <p className="text-white text-lg bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full inline-block">
      {userData?.role}
    </p>
  </div>

  <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
    <div className="flex items-center gap-3 mb-2">
      <FaCrown className="text-purple-300" />
      <span className="text-white font-semibold">Status</span>
    </div>
    <p className="text-white text-lg bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full inline-block">
      Active
    </p>
  </div>
</div>
            {/* Editable Contact Information */}
            <div className="bg-purple-700/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <FaUser className="text-purple-300" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <FaMapMarkerAlt className="text-purple-300" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editableData.address}
                    onChange={handleChange}
                    placeholder="Enter your current address"
                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <FaPhone className="text-purple-300" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={editableData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Profile Status */}
            <div className="bg-purple-700/20 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">Profile Completion</h4>
                  <p className="text-purple-200 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold">
                    {editableData.address && editableData.phone ? '100%' : '50%'} Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;