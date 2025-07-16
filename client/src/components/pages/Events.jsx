import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Tilt from "react-parallax-tilt";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Users,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";
import { CreateEvent } from "../CreateEvent";
import { DeleteConfirmation } from "./ui/DeleteConfirmation";
import { View } from "./ui/View";

export const Events = () => {
  const { userRole } = useOutletContext();
  const [showEventForm, setShowEventForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    eventId: null,
  });
  const [showView, setShowView] = useState({
    show: false,
    eventId: null,
  });
  const [editEventData, setEditEventData] = useState(null);

  const eventFormRef = useRef(null);
  useEffect(() => {
    if (showEventForm && eventFormRef.current) {
      eventFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showEventForm]);

  const GET_EVENT = gql`
    query GetEvent {
      getEvents {
        _id
        title
        description
        date
        time
        location
        attendees
        category
        status
      }
    }
  `;
  const DELETE_EVENT = gql`
    mutation DeleteEvent($_id: ID!) {
      deleteEvent(_id: $_id) {
        _id
      }
    }
  `;
  const UPDATE_EVENT = gql`
    mutation UpdateEvent($_id: ID!, $input: EventInput!) {
      updateEvent(_id: $_id, input: $input) {
        _id
        title
        description
        date
        time
        location
        attendees
        category
        status
      }
    }
  `;

  const { data, loading, error, refetch } = useQuery(GET_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_EVENT }],
  });
  const [updateEvent] = useMutation(UPDATE_EVENT, {
    refetchQueries: [{ query: GET_EVENT }],
  });

  useEffect(() => {}, [data]);

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-[60vh]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#103d46] border-t-transparent"></div>
        <p className="">Loading Events...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Events: {error.message}
      </p>
    );
  const events = data?.getEvents;

  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Events</span>
          <span className="fluid-p text-gray-500">
            Manage and view all college events and activities
          </span>
        </div>
        {userRole === "admin" && (
          <div
            className="bg-[#103d46] items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900"
            onClick={() => {
              setShowEventForm(true);
              setEditEventData(null);
            }}
          >
            <CalendarCheck className="text-white w-4 h-4" />
            <span className="text-white text-sm">Create Event</span>
          </div>
        )}
      </div>
      <div className={`${showEventForm ? "block" : "hidden"}`}>
        <CreateEvent
          setShowEventForm={setShowEventForm}
          refetch={refetch}
          eventData={editEventData}
          updateEvent={updateEvent}
        />
      </div>

      {/* Event Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(events) &&
          [...events].reverse().map((item) => (
            <Tilt
              key={item.title}
              className="bg-white dark:bg-black/20 shadow-md border dark:border-0 border-gray-100 rounded-md p-4 w-full relative flex flex-col gap-2 z-10 group"
              perspective={1000}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glarePosition={"all"}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.04}
              glareColor={"#000000"}
            >
              <div className="flex items-center justify-between">
                <span className="fluid-h2">{item.title}</span>
                {userRole === "admin" && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Pencil
                      className="w-4 h-4 hover:scale-125 transition-shadow duration-200 "
                      onClick={() => {
                        setEditEventData(item);
                        setShowEventForm(true);
                      }}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-400 hover:scale-125 transition-shadow duration-200 cursor-pointer"
                      onClick={() =>
                        setDeleteConfirm({ show: true, eventId: item._id })
                      }
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-lg dark:text-black ${
                    item.status === "completed"
                      ? "bg-green-200"
                      : item.status === "ongoing"
                      ? "bg-yellow-200"
                      : item.status === "cancelled"
                      ? "bg-red-200"
                      : "bg-orange-200"
                  }`}
                >
                  {item.status}
                </span>
                <span className="bg-blue-200 dark:text-black px-2 py-0.5 rounded-lg">
                  {item.category}
                </span>
              </div>
              <p className="fluid-p text-gray-500  line-clamp-3 pr-2">
                {item.description}
              </p>
              <div className="space-y-3 px-1 text-sm text-gray-500 mt-3">
                <div className="flex gap-2 items-center">
                  <CalendarDays className="w-4 h-4" /> {item.date}
                </div>
                <div className="flex gap-2 items-center">
                  <Clock className="w-4 h-4" /> {item.time}
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4" /> {item.location}
                </div>
                <div className="flex gap-2 items-center">
                  <Users className="w-4 h-4" /> {item.attendees}
                </div>
              </div>
              <button
                className="text-sm py-2 font-bold bg-[#103d46] text-white p-1 rounded-md hover:bg-black cursor-pointer"
                onClick={() => setShowView({ show: true, eventId: item._id })}
              >
                View Details
              </button>
            </Tilt>
          ))}
      </div>
      {deleteConfirm.show && (
        <DeleteConfirmation
          onConfirm={() => {
            deleteEvent({ variables: { _id: deleteConfirm.eventId } });
            setDeleteConfirm({ show: false, eventId: null });
          }}
          onCancel={() => setDeleteConfirm({ show: false, eventId: null })}
        />
      )}
      {showView.show && (
        <View
          itemId={showView.eventId}
          getEvent={(id) => events.find((n) => n._id === id)}
          onClose={() => setShowView({ show: false, eventId: null })}
        />
      )}
    </div>
  );
};
