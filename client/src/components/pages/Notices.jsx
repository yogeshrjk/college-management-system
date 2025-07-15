import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ClipboardCheck,
  CalendarDays,
  Pin,
  Pencil,
  Trash2,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { CreateNotice } from "../CreateNotice";
import { gql, useQuery, useMutation } from "@apollo/client";
import { DeleteConfirmation } from "./ui/DeleteConfirmation";
import { ReadMore } from "./ui/ReadMore";
export const Notices = () => {
  const { userRole } = useOutletContext();
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    noticeId: null,
  });
  const [showReadMore, setShowReadMore] = useState({
    show: false,
    noticeId: null,
  });
  const [editNoticeData, setEditNoticeData] = useState(null);
  const noticeFormRef = useRef(null);

  // This effect will scroll into view when the form is shown
  useEffect(() => {
    if (showNoticeForm && noticeFormRef.current) {
      noticeFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showNoticeForm]);
  const GET_NOTICE = gql`
    query GetNotice {
      getNotice {
        _id
        title
        content
        date
        priority
        category
        isPinned
        author
      }
    }
  `;
  const UPDATE_NOTICE = gql`
    mutation UpdateNotice($_id: ID!, $input: NoticeInput!) {
      updateNotice(_id: $_id, input: $input) {
        _id
        title
        content
        date
        priority
        category
        isPinned
        author
      }
    }
  `;
  const DELETE_NOTICE = gql`
    mutation DeleteNotice($_id: ID!) {
      deleteNotice(_id: $_id) {
        _id
      }
    }
  `;
  const { data, loading, error, refetch } = useQuery(GET_NOTICE);
  const [deleteNotice] = useMutation(DELETE_NOTICE, {
    refetchQueries: [{ query: GET_NOTICE }],
  });
  const [updateNotice] = useMutation(UPDATE_NOTICE, {
    refetchQueries: [{ query: GET_NOTICE }],
  });
  useEffect(() => {}, [data]);

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-[60vh]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#103d46] border-t-transparent"></div>
        <p className="">Loading Notice...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Notice: {error.message}
      </p>
    );
  const notices = data?.getNotice;
  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Notices</span>
          <span className="fluid-p text-gray-500">
            Important announcements and updates from the college administration
          </span>
        </div>
        {userRole === "admin" && (
          <div
            className="bg-[#103d46] items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900"
            onClick={() => {
              setShowNoticeForm(true);
              setEditNoticeData(null);
            }}
          >
            <ClipboardCheck className="text-white w-4 h-4" />
            <span className="text-white text-sm">Create Notice</span>
          </div>
        )}
      </div>
      <div className={`${showNoticeForm ? "block" : "hidden"}`}>
        <CreateNotice
          setShowNoticeForm={setShowNoticeForm}
          refetch={refetch}
          noticeData={editNoticeData}
          updateNotice={updateNotice}
        />
      </div>
      {/* Notice Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(notices) &&
          [...notices].reverse().map((item) => (
            <Tilt
              key={item.title}
              className={`bg-white dark:bg-black/20 group shadow-md border border-gray-100 dark:border-gray-800 rounded-md p-4 w-full relative flex flex-col gap-2 z-10 ${
                item.isPinned
                  ? "border-l-4 border-l-blue-500 dark:border-l-blue-500"
                  : ""
              }`}
              perspective={1000}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glarePosition={"all"}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.04}
              glareColor={"#000000"}
            >
              {/* Top Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="fluid-h2">{item.title}</span>
                  {item.isPinned ? (
                    <Pin className="text-blue-500 h-4 w-4" />
                  ) : (
                    ""
                  )}
                </div>
                {userRole === "admin" && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Pencil
                      className="w-4 h-4 hover:scale-125 transition-shadow duration-200 "
                      onClick={() => {
                        setEditNoticeData(item);
                        setShowNoticeForm(true);
                      }}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-400 hover:scale-125 transition-shadow duration-200"
                      onClick={() =>
                        setDeleteConfirm({ show: true, noticeId: item._id })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-3 text-xs">
                <span
                  className={`px-2 py-0.5 dark:text-black rounded-lg ${
                    item.priority === "low"
                      ? "bg-green-200"
                      : item.priority === "medium"
                      ? "bg-orange-200"
                      : "bg-red-200"
                  }`}
                >
                  {item.priority}
                </span>
                <span className="bg-blue-200 dark:text-black px-2 py-0.5 rounded-lg">
                  {item.category}
                </span>
              </div>
              <p className="fluid-p pr-2 text-gray-500 line-clamp-3">
                {item.content}
              </p>
              <div className="mt-auto">
                {/* Metadata Section */}
                <div className="flex gap-6 space-y-3 text-sm text-gray-500 mt-3">
                  <div className="flex justify-center items-center gap-2 ">
                    <CalendarDays className="w-4 h-4" /> {item.date}
                  </div>
                  <div>
                    <span className="w-4 h-4">By {item.author}</span>
                  </div>
                </div>
                {/* Button Section */}
                <button
                  className="w-full text-sm font-bold py-2 bg-[#103d46] text-white p-1 rounded-md hover:bg-black cursor-pointer"
                  onClick={() =>
                    setShowReadMore({ show: true, noticeId: item._id })
                  }
                >
                  Read More
                </button>
              </div>
            </Tilt>
          ))}
      </div>
      {deleteConfirm.show && (
        <DeleteConfirmation
          onConfirm={() => {
            deleteNotice({ variables: { _id: deleteConfirm.noticeId } });
            setDeleteConfirm({ show: false, noticeId: null });
          }}
          onCancel={() => setDeleteConfirm({ show: false, noticeId: null })}
        />
      )}
      {showReadMore.show && (
        <ReadMore
          itemId={showReadMore.noticeId}
          getNotice={(id) => notices.find((n) => n._id === id)}
          onClose={() => setShowReadMore({ show: false, noticeId: null })}
        />
      )}
    </div>
  );
};
