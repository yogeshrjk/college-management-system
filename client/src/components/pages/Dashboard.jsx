import {
  UserCheck,
  BookOpen,
  Calendar,
  MessageSquare,
  Clock,
  Users,
  Bug,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export const Dashboard = () => {
  const { userRole } = useOutletContext();

  const GET_ACTIVITIES = gql`
    query GetActivities {
      getActivities {
        _id
        message
        type
        createdAt
        time
        date
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_ACTIVITIES);
  const recentActivities = data?.getActivities || [];
  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-[60vh]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
        <p className="">Loading Dashbord...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Dashboard: {error.message}
      </p>
    );

  const stats = [
    {
      title: "Attendance",
      value: "56",
      description: "Maintain your attendance.",
      icon: UserCheck,
      color: "text-blue-600",
    },
    {
      title: "Courses",
      value: "56",
      description: "8 new courses added",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Upcoming Events",
      value: "3",
      description: "Next event in 2 days",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Messages",
      value: "1,429",
      description: "89 unread messages",
      icon: MessageSquare,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col p-1">
        <span className="fluid-h1">Dashboard</span>
        <span className="fluid-p text-gray-500">
          Welcome back! Here's what's happening at your college today.
        </span>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        {stats.map((stat) => (
          <Tilt
            key={stat.title}
            className="bg-white dark:bg-black/20 shadow-md border border-gray-100 dark:border-0 rounded-md p-4 w-full md:w-1/4 relative flex flex-col"
            perspective={1000}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glarePosition={"all"}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.04}
            glareColor={"#000000"}
          >
            <span className="fluid-h2">{stat.title}</span>
            <span className="fluid-h1">{stat.value}</span>
            <p className="fluid-p text-gray-500">{stat.description}</p>
            <stat.icon className={`absolute right-2 top-2 p-1 ${stat.color}`} />
          </Tilt>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-black/20 shadow-md border border-gray-100 dark:border-0  rounded-md p-4 md:w-[60%] w-full">
          <div className="p-1 ml-2">
            <span className="fluid-h2">Recent Activity</span>
            <p className="text-gray-500 fluid-p">
              Latest updates from your college management system
            </p>
          </div>
          {recentActivities.slice(0, 4).map((activity) => (
            <div key={activity._id} className="flex flex-row gap-4 p-2">
              <div className="flex justify-center items-center bg-black/20/5 w-6 my-auto rounded-full">
                <Clock className="w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{activity.message}</span>
                <span className="fluid-p text-gray-500">
                  {activity.date} at {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Qick Actions */}
        <div className="bg-white dark:bg-black/20 shadow-md border border-gray-100 dark:border-0  rounded-md px-6 py-4 md:w-[40%] w-full mb-5 md:mb-0">
          <div>
            <span className="fluid-h2">Quick Actions</span>
            <p className="text-gray-500 fluid-p">Frequently used features</p>
          </div>
          {userRole === "admin" && (
            <div className="grid gap-3 mt-4">
              <button className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent">
                <Users className="h-4 w-4" />
                <span className="text-sm">Add New Student</span>
              </button>
              <Link to="/events" state={{ openEventForm: true }}>
                <button className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Schedule Event</span>
                </button>
              </Link>
              <Link to="/notices" state={{ openNoticeForm: true }}>
                <button className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Create Notice</span>
                </button>
              </Link>
              <button
                className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent"
                data-capture-trigger="extended"
              >
                <Bug className="h-4 w-4" />
                <span className="text-sm">Report a Bug</span>
              </button>
            </div>
          )}
          {userRole === "user" && (
            <div className="grid gap-3 mt-4">
              <Link to="/events">
                <button className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">View Events</span>
                </button>
              </Link>
              <Link to="/notices">
                <button className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">View Notices</span>
                </button>
              </Link>
              <button
                className="w-full flex items-center justify-start space-x-2 rounded-md bg-black/20/5 p-3 hover:bg-black/10 hover:dark:bg-white/10 text-left hover:bg-accent"
                data-capture-trigger="extended"
              >
                <Bug className="h-4 w-4" />
                <span className="text-sm">Report a Bug</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
