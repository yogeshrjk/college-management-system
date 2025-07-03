import { useState } from "react";
import { BookOpen, FileText, Download, Search, Calendar } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { UploadPaper } from "../UploadPaper";
import { gql, useQuery, useMutation } from "@apollo/client";
export const Paper = () => {
  const [showPaperForm, setShowPaperForm] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const GET_PAPER = gql`
    query GetPaper {
      getPaper {
        id
        title
        subject
        semester
        year
        examType
        duration
        maxMarks
        uploadDate
        downloads
        fileSize
        fileUrl
      }
    }
  `;
  const SEARCH_PAPER = gql`
    query SearchPaper($keyword: String!) {
      searchPaper(keyword: $keyword) {
        id
        title
        subject
        semester
        year
        examType
        duration
        maxMarks
        uploadDate
        downloads
        fileSize
        fileUrl
      }
    }
  `;

  const INCREMENT_DOWNLOAD = gql`
    mutation IncrementDownloadCount($id: ID!) {
      incrementDownloadCount(id: $id)
    }
  `;

  const { data, loading, error } = useQuery(GET_PAPER);
  const [incrementDownload] = useMutation(INCREMENT_DOWNLOAD);
  const { data: searchData } = useQuery(SEARCH_PAPER, {
    variables: { keyword: searchKeyword },
    skip: searchKeyword.trim() === "",
  });

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-[60vh]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
        <p className="">Loading Paper...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Paper: {error.message}
      </p>
    );

  const papers =
    searchKeyword.trim() !== "" && searchData?.searchPaper
      ? searchData.searchPaper
      : data?.getPaper;

  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Question Papers</span>
          <span className="fluid-p text-gray-500">
            Access previous year examination papers for better preparation
          </span>
        </div>
        <div
          className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900 cursor-pointer"
          onClick={() => setShowPaperForm(true)}
        >
          <FileText className="text-white w-4 h-4" />
          <span className="text-white text-sm">Upload Paper</span>
        </div>
      </div>
      {/* Search bar */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search question paper by subject."
          className="pl-10 py-2 text-sm border border-gray-300 bg-white rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      {showPaperForm && <UploadPaper setShowPaperForm={setShowPaperForm} />}
      {/* Papers Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(papers) &&
          [...papers].reverse().map((item) => (
            <Tilt
              key={item.title}
              className="bg-white shadow-md border border-gray-100 rounded-md p-5 w-full relative flex flex-col z-10 h-full"
              perspective={1000}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glarePosition={"all"}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.04}
              glareColor={"#000000"}
            >
              <div className="flex flex-col h-full">
                {/* Top Section */}
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="fluid-h2">{item.title}</span>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-lg bg-purple-200">
                      {item.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-blue-200">
                      {item.semester}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-yellow-200">
                      {item.examType}
                    </span>
                  </div>
                </div>

                {/* Metadata Section */}
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Year: {item.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Duration: {item.duration}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-xs">
                      <span>Max Marks: {item.maxMarks}</span>
                      <span>Size: {item.fileSize}</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <span>Uploaded: {item.uploadDate}</span>
                    <span>{item.downloads} downloads</span>
                  </div>
                </div>

                {/* Button Section */}
                <div className="mt-4 grid grid-cols-3 gap-x-2">
                  <button
                    onClick={() => {
                      console.log("Downloading paper ID:", item.id);
                      if (item.id) {
                        incrementDownload({ variables: { id: item.id } });
                        fetch(item.fileUrl)
                          .then((res) => res.blob())
                          .then((blob) => {
                            const blobUrl = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = blobUrl;
                            link.download = item.title || "papers";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(blobUrl);
                          });
                      } else {
                        console.warn("Missing id for paper:", item);
                      }
                    }}
                    className=" text-white bg-black/60 rounded-md py-2 hover:bg-black/70 cursor-pointer col-span-2"
                  >
                    <span className="flex items-center justify-center gap-1 text-sm font-bold">
                      <Download className="w-4 h-4" />
                      Download
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      window.open(item.fileUrl, "_blank");
                    }}
                    className="text-sm font-bold bg-black/10 rounded-md py-2 hover:bg-black/40 hover:text-white cursor-pointer col-span-1"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </Tilt>
          ))}
      </div>
    </div>
  );
};
