import { useState } from "react";
import Layout from "./components/layout";
import Input from "./components/input"; // Importing the Input component

export default function NewEvent() {
  // State for individual fields
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  return (
    <Layout title="New Event">
      <form className="space-y-4">
        {/* Event Name */}
        <Input
          field={eventName}
          setField={setEventName}
          label="Event Name"
          type="text"
        />
        {/* Event Date */}
        <Input
          field={eventDate}
          setField={setEventDate}
          label="Event Date"
          type="date"
        />
        {/* Event Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-600"
          >
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 bg-white text-gray-500 rounded-md focus:outline-none focus:ring-4 transition focus:ring-slate-200"
            rows={4}
            placeholder="Enter event description"
            required
          />
        </div>
        {/* Google Form Link */}
        <Input
          field={googleFormLink}
          setField={setGoogleFormLink}
          label="Google Form Link"
          type="url"
        />
        {/* Payment Amount */}
        <Input
          field={paymentAmount}
          setField={setPaymentAmount}
          label="Payment Amount (THB)"
          type="number"
        />
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Create Event
          </button>
        </div>
      </form>
    </Layout>
  );
}
