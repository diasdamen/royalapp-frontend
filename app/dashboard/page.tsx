import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import GlobalApi from "../_utils/GlobalApi";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CancelReservation from "@/components/CancelReservation";


interface Room {
  id: number;
  attributes: {
      title: string;
  };
}
interface Reservation {
  id: number;
  attributes: {
      checkIn: string;
      checkOut: string;
      room: {
          data: {
              attributes: {
                  title: string;
              };
          };
      };
  };
}

// const getUserReservations = async (userEmail: any) => {
//   const res = await fetch(
//     `https://royalapp-backend.onrender.com/api/reservations?[filters][email][$eq]=${userEmail}&populate=*`, 
//     {
//       next: {
//         revalidate: 0
//       },
//     }
//   );
//   return await res.json();
// };

const getUserReservations = async (userEmail: string) => {
  const res = await GlobalApi.getUserReservations(userEmail);
  return res.data;
};

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  // Ensure user.email is a string
  const userEmail = user?.email || "";

  const userReservations = userEmail ? await getUserReservations(userEmail) : [];

  return (
      <section className="min-h-[80vh]">
          <div className="container mx-auto py-8 h-full">
              <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
                  My bookings
              </h3>
              <div className="flex flex-col gap-8 h-full">
                  {userReservations.length < 1 ? (
                      <div className="flex flex-col items-center justify-center h-[50vh]">
                          <p className="text-xl text-center text-secondary/70 mb-4">
                              You don't have any reservations.
                          </p>
                          {/* back to homepage button */}
                          <Link href="/">
                              <Button size="md">Go to homepage</Button>
                          </Link>
                      </div>
                  ) : (
                      userReservations.map((reservation: Reservation) => {
                          return (
                              <div key={reservation.id} className="bg-tertiary py-8 px-12">
                                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                      <h3 className="text-2xl font-medium w-[200px] text-center lg:text-left">
                                          {reservation.attributes.room.data.attributes.title}
                                      </h3>
                                      {/* check-in & check-out text */}
                                      <div className="flex flex-col lg:flex-row gap-2 lg:w-[380px]">
                                          {/* check-in */}
                                          <div className="flex items-center gap-1 flex-1">
                                              <span className="text-accent font-bold uppercase tracking-[2px]">
                                                  from:
                                              </span>
                                              <span className="text-secondary font-semibold">
                                                  {format(new Date(reservation.attributes.checkIn), "PPP")}
                                              </span>
                                          </div>
                                          {/* check-out */}
                                          <div className="flex items-center gap-1 flex-1">
                                              <span className="text-accent font-bold uppercase tracking-[2px]">
                                                  to:
                                              </span>
                                              <span className="text-secondary font-semibold">
                                                  {format(new Date(reservation.attributes.checkOut), "PPP")}
                                              </span>
                                          </div>
                                      </div>
                                      <CancelReservation reservation={reservation} />
                                  </div>
                              </div>
                          );
                      })
                  )}
              </div>
          </div>
      </section>
  );
};

export default Dashboard;