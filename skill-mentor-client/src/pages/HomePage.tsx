import { useEffect, useState } from "react";
import { useApi } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ClassResponse {
  classId: number;
  name: string;
  mentors: { mentorId: number; fullName: string }[];
}

export default function HomePage() {
  const api = useApi();
  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/api/student/classes");
        setClasses(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching classes:", err);
        // Use mock data when API fails
        const mockClasses = [
          {
            classId: 1,
            name: "Mathematics",
            mentors: [
              { mentorId: 1, fullName: "Dr. Sarah Johnson" },
              { mentorId: 2, fullName: "Prof. Mike Chen" },
            ],
          },
          {
            classId: 2,
            name: "Physics",
            mentors: [{ mentorId: 3, fullName: "Dr. Emily Rodriguez" }],
          },
          {
            classId: 3,
            name: "Computer Science",
            mentors: [
              { mentorId: 4, fullName: "Dr. Alex Kumar" },
              { mentorId: 5, fullName: "Prof. Lisa Wang" },
            ],
          },
          {
            classId: 4,
            name: "Chemistry",
            mentors: [{ mentorId: 6, fullName: "Dr. James Wilson" }],
          },
          {
            classId: 5,
            name: "Biology",
            mentors: [
              { mentorId: 7, fullName: "Dr. Maria Garcia" },
              { mentorId: 8, fullName: "Prof. David Brown" },
            ],
          },
          {
            classId: 6,
            name: "English Literature",
            mentors: [{ mentorId: 9, fullName: "Prof. Jennifer Smith" }],
          },
        ];
        setClasses(mockClasses);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [api]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-bold">SkillMentor</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-300">
                Tutors
              </a>
              <a href="#" className="hover:text-gray-300">
                About Us
              </a>
              <a href="#" className="hover:text-gray-300">
                Resources
              </a>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:text-gray-300 hover:bg-gray-800"
            >
              Login
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Sign up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Learn from Expert Mentors</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with experienced professionals and accelerate your learning
            journey through personalized mentorship sessions.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium"
            >
              Find a Mentor
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Become a Mentor
            </Button>
          </div>
        </div>
      </section>

      {/* Available Classes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Subjects
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our wide range of subjects and find the perfect mentor
              for you
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <p className="text-lg">Loading available classes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.length > 0 ? (
                classes.map((cls) => (
                  <Card
                    key={cls.classId}
                    className="hover:shadow-lg transition-shadow bg-white"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-bold text-xl">
                            {cls.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {cls.name}
                        </h3>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span>0 Enrollments</span>
                      </div>{" "}
                      <p className="text-gray-700 mb-4 text-sm">
                        Available mentors:{" "}
                        {cls.mentors?.length > 0
                          ? cls.mentors.map((m, index) => (
                              <span key={m.mentorId}>
                                <Link
                                  to={`/mentor/${m.mentorId}`}
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {m.fullName}
                                </Link>
                                {index < cls.mentors.length - 1 ? ", " : ""}
                              </span>
                            ))
                          : "Expert instructors available"}
                      </p>
                      <Button className="w-full bg-black hover:bg-gray-800 text-white">
                        Schedule a session
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-600">
                    No classes available at the moment.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Check back later for new opportunities!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Join</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    SkillMentor for kids
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    SkillMentor for business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Become a tutor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Become an ambassador
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Other</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms and conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-bold">SkillMentor</span>
            </div>
            <p className="text-gray-400 text-sm">
              SkillMentor Inc. © Copyright 2025. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
