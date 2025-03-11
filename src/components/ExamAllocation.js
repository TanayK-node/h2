import { useState } from "react";

const ExamRoomAllocation = () => {
  const [examRooms, setExamRooms] = useState([]);
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");

  const allocateRoom = () => {
    if (subject && room) {
      setExamRooms([...examRooms, { subject, room }]);
      setSubject("");
      setRoom("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📝 Exam Room Allocation</h2>
      <div className="mb-4">
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
          className="border p-2 mr-2" />
        <input type="text" placeholder="Room Number" value={room} onChange={(e) => setRoom(e.target.value)}
          className="border p-2 mr-2" />
        <button onClick={allocateRoom} className="bg-blue-500 text-white px-4 py-2">Allocate</button>
      </div>
      <ul className="mt-4">
        {examRooms.map((exam, index) => (
          <li key={index} className="border p-2">{exam.subject} → Room {exam.room}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExamRoomAllocation;
