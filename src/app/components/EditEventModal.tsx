"use client";
import { forwardRef, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AttendeesTable from "./AttendeesTable";
import { MouseEvent } from "react";
import Papa from "papaparse";

interface EditEventModalProps {
  event: MatchboxEvent;
}
interface EditEventFormData extends MatchboxEvent {}

const EditEventModal = forwardRef<HTMLDialogElement, EditEventModalProps>(
  (props, ref) => {
    const session = useSession();
    const [formData, setFormData] = useState<EditEventFormData>(props.event);
    const [uploading, setUploading] = useState(false);
    const uploadAttendeesRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
      const reader = new FileReader();
      setUploading(true);

      reader.onloadend = ({ target }) => {
        console.log(target);
        if (!target) return;
        const csv = Papa.parse(target.result as string, { header: true });
        setUploading(false);
        if (csv.errors.length > 0) return alert("Invalid CSV file");
        if (csv.data.length === 0) return alert("Empty CSV file");
        setFormData({
          ...formData,
          attendees: csv.data as Attendee[],
        });
      };

      reader.readAsText(file);
    };

    const handleFileInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const fileUploaded = event.target.files?.[0];
      if (!fileUploaded) {
        setUploading(false);
        return;
      }
      handleFile(fileUploaded);
    };
    const handleUploadCSVClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      uploadAttendeesRef.current?.click();
    };

    console.log(formData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    };

    return (
      <dialog ref={ref} id="my_modal_3" className="modal">
        <div className="modal-box bg-slate-800 p-7">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form className="">
            <div className="carousel w-full">
              <div
                id={`slide-edit${props.event.id}-1`}
                className="carousel-item relative w-full flex-col"
              >
                <div className="slide-content flex-grow space-y-2">
                  <h2 className="font-bold text-lg text-center w-full">
                    Event Name
                  </h2>
                  <div className="form-control">
                    <label className="label text-base">
                      <span className="label-text">Set the event name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Type here"
                      className="input w-full max-w-xs"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  {session.data?.user.group === "Admin" && (
                    <div className="form-control w-20">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Public</span>
                          <input
                            type="radio"
                            name="visibility"
                            className="radio checked:bg-red-500"
                            checked={formData.visibility === "public"}
                            value={"public"}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Private</span>
                          <input
                            type="radio"
                            name="visibility"
                            value={"private"}
                            className="radio checked:bg-blue-500"
                            checked={formData.visibility === "private"}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-end justify-self-end">
                  <a
                    href={`#slide-edit${props.event.id}-2`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
              <div
                id={`slide-edit${props.event.id}-2`}
                className="carousel-item relative w-full flex-col space-y-2"
              >
                <div className="slide-content flex-grow space-y-2">
                  <h2 className="font-bold text-lg text-center w-full">
                    Event Banner
                  </h2>
                  <div className="flex justify-end w-full">
                    <button className="btn btn-primary btn-sm">
                      Upload new image
                    </button>
                  </div>
                  <div className="banner relative h-40">
                    <Image src={`/${formData.banner}`} alt="Event image" fill />
                  </div>
                </div>

                <div className="flex justify-between w-full justify-self-end">
                  <a
                    href={`#slide-edit${props.event.id}-1`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide-edit${props.event.id}-3`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
              <div
                id={`slide-edit${props.event.id}-3`}
                className="carousel-item relative w-full flex-col space-y-2"
              >
                <div className="slide-content flex-grow space-y-2">
                  <h2 className="font-bold text-lg text-center w-full">
                    Event Attendees
                  </h2>
                  <div className="mb-4">
                    <input
                      ref={uploadAttendeesRef}
                      onChange={handleFileInputChange}
                      disabled={uploading}
                      type="file"
                      className="form-control hidden"
                    />
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleUploadCSVClick}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload CSV File"}
                    </button>
                  </div>
                  <AttendeesTable attendees={formData.attendees} />
                </div>
                <div className="flex">
                  <a
                    href={`#slide-edit${props.event.id}-2`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

export default EditEventModal;
