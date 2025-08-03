import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

interface Booking {
  sessionId: number;
  className: string;
  mentorName: string;
  sessionDate: string;
  status: string; // e.g., "PENDING", "ACCEPTED", "COMPLETED"
}

export default function StudentDashboard() {
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = await getToken();
      axios
        .get("/api/student/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching dashboard:", err));
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Class</th>
              <th className="p-2">Mentor</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.sessionId} className="border-t">
                <td className="p-2">{booking.className}</td>
                <td className="p-2">{booking.mentorName}</td>
                <td className="p-2">
                  {new Date(booking.sessionDate).toLocaleDateString()}
                </td>
                <td className="p-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
