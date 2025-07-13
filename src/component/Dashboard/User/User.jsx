import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";
import useUser from "../../Hook/useUser";

const User = () => {
  const [ users , isLoading , refetch]= useUser() || []
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("/user.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //     });
  // }, []);

  const axiosSecure = useAxios()


      function handleAdmin(id) {
      console.log("Attempting to update biodata ID:", id);
    
      Swal.fire({
        title: "Are you sure?",
        text: "Make this admin",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${id}`)
            .then((res) => {
              console.log("Response from server:", res.data);
    
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `This is admin now`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  icon: "info",
                  title: "No changes were made.",
                });
              }
            })
            .catch((err) => {
              console.error("Error updating premium biodata:", err);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Could not update, Please try again.",
              });
            });
        }
      });
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
          👥 Registered Customers
        </h2>

{    users ?    <div className="overflow-x-auto rounded-2xl shadow-xl bg-white p-6">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase">#</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase">Name</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase">Role</th>
                <th className="px-6 py-4 text-center font-bold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition duration-200">
                    <td className="px-6 py-4 text-gray-600 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                          ${user.role === "customer"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-200 text-yellow-700"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={()=>handleAdmin(user._id)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1 rounded-full shadow transition">
                        Make Admin
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500 font-medium">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> : <p className="text-center">No Registered User</p>}
      </div>
    </div>
  );
};

export default User;
