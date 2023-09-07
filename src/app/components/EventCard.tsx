"use client";

import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { MouseEvent, useRef } from "react";
import EditEventModal from "./EditEventModal";
import { Edit } from "@mui/icons-material";
import AttendeesTable from "./AttendeesTable";

interface EventCardProps {
  event: MatchboxEvent;
  id: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, id }) => {
  const { name, banner, visibility, attendees } = event;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("edit event");
    editDialogRef.current?.showModal();
  };

  return (
    <>
      <div
        className="card card-compact w-96 bg-gray-950 shadow-xl flex-col cursor-pointer"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <div className="banner relative h-36">
          <Image src={"/" + banner} alt="Event image" fill />
        </div>
        <div className="card-body">
          <div className="flex flex-row w-full items-center justify-between">
            <span
              className={`badge ${
                visibility === "public" ? "badge-primary" : "badge-accent"
              }`}
            >
              {visibility} event
            </span>
            <div className="card-actions">
              <button className="btn btn-ghost" onClick={handleEdit}>
                <CiEdit size={20} />
              </button>
            </div>
          </div>
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box p-0 bg-slate-800">
          <div className="banner relative h-40">
            <Image src={"/" + banner} alt="Event image" fill />
          </div>
          <div className="modal-content p-4">
            <div className="flex flex-row w-full items-center justify-between">
              <h3 className="font-bold text-lg py-4">{name}</h3>
              <span
                className={`badge ${
                  visibility === "public" ? "badge-primary" : "badge-error"
                }`}
              >
                {visibility} event
              </span>
            </div>
            <h5 className="py-2">Attendees : </h5>
            <AttendeesTable attendees={attendees} />
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <EditEventModal event={event} ref={editDialogRef} />
    </>
  );
};
export default EventCard;
