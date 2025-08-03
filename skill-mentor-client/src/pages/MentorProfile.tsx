import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MentorClass {
  classId: number;
  className: string;
  studentCount: number;
}

interface Mentor {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  classes: MentorClass[];
}

export default function MentorProfile() {
  const { id } = useParams();
  const api = useApi();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await api.get(`/api/mentors/${id}`);
        setMentor(response.data);
      } catch (err) {
        console.error("Error fetching mentor:", err);
        // Mock data for demonstration
        const mockMentor = {
          id: parseInt(id || "1"),
          name: "Dr. Sarah Johnson",
          bio: "Experienced mathematics professor with 15+ years of teaching experience. Specializes in calculus, algebra, and advanced mathematics.",
          imageUrl: `https://images.unsplash.com/photo-1494790108755-2616b9de7143?w=400&h=400&fit=crop&crop=face`,
          classes: [
            {
              classId: 1,
              className: "Advanced Calculus",
              studentCount: 24,
            },
            {
              classId: 2,
              className: "Linear Algebra",
              studentCount: 18,
            },
            {
              classId: 3,
              className: "Statistics",
              studentCount: 32,
            },
          ],
        };
        setMentor(mockMentor);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMentor();
    }
  }, [id, api]);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-lg text-center">Loading mentor profile...</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-lg text-center text-red-500">Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex gap-6 items-start">
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mentor.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {mentor.bio}
              </p>
              <div className="mt-4 flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Book a Session
                </Button>
                <Button variant="outline">Send Message</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Teaching Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentor.classes.map((cls) => (
              <Card
                key={cls.classId}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {cls.className}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <span>{cls.studentCount} students enrolled</span>
                  </div>
                  <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                    Schedule Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Student Reviews
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-700 italic">
                "Excellent teacher! Dr. Johnson explains complex concepts in a
                very clear way."
              </p>
              <p className="text-sm text-gray-500 mt-2">
                - Student from Advanced Calculus
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700 italic">
                "Very patient and helpful. Made statistics much easier to
                understand."
              </p>
              <p className="text-sm text-gray-500 mt-2">
                - Student from Statistics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
