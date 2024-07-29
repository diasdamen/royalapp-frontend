import RoomList from "./RoomList";
import GlobalApi from "@/app/_utils/GlobalApi";

// const getRooms = async ()=> {
//   const res = await fetch(`https://royalapp-backend.onrender.com/api/rooms?populate=*`, {
//     next: {
//       revalidate: 0,
//     },
//   });
//   return await res.json();
// };

const getRooms = async () => {
  const res = await GlobalApi.getRoom();
  return res.data;
};

const Rooms = async () => {
  const rooms = await getRooms();

  return (
    <section>
      <div className="container mx-auto">
        <RoomList rooms={rooms} />
      </div>
    </section>
  );
};

export default Rooms;