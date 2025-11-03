import React from "react";
import ControlFlow from "./ControlFlow";
import Preview from "./Preview";
import { useClipboard } from "../../hooks/useClipboard";
import { useLocation, useParams } from "react-router-dom";

export default function Live() {

  const {copied, copyToClipboard} =  useClipboard();
  const { pollId} = useParams();

  return (
    <div className="">
      <div className="live-header flex gap-2 bg-[#1D2432] p-2 md:p-6 mt-5">
        <div className="join-options-tab">
          <p className="title text-[8px] md:text-xs">QR Code</p>
          <button className="p-1 md:p-3 bg-[#282F3C] mt-1 text-xs md:text-base rounded">
            Download QR
          </button>
        </div>
        <div className="join-options-tab">
          <p className="title text-[8px] md:text-xs">Copy Link</p>
          <button onClick={()=>{
            copyToClipboard(`${window.location.origin}/vote/${pollId}`);;
          }} className="p-1 md:p-3 bg-[#282F3C] mt-1 text-xs md:text-base rounded">
            {copied?"Link Copied!":"Copy Link"}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <ControlFlow />
        </div>
        <div className="flex-1">
          <Preview />
        </div>
      </div>
    </div>
  );
}
