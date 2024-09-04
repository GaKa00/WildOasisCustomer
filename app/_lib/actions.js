"use server";


import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
    const session = auth()
    if(!session) throw new Error("You must be logged in");

    const nationalID = formData.get('nationalID');
    const x = formData.get('nationality')
    .split('%');

    if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID");


    const updateData= {nationality, countryFlag, nationalID};


    const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session.user.guestId);

    if (error) {
      console.error(error);
      throw new Error("Guest could not be updated");
    }

    revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {

  await new Promise((res) => setTimeout(res, 2000));
   const session = auth();
   if (!session) throw new Error("You must be logged in");

    const {  error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);

      const guestBookings = await getBookings(session.user.guestId);
      const guestBookingIds = guestBookings.map((booking)=> booking.id);

      if(guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking");

    if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
    }
      revalidatePath("/account/reservations");
}


export async function updateBooking(formData){
  console.log(formData);
  const bookingId = Number(formData.get("bookingId"));
// 1. authenticate
const session = auth();
if (!session) throw new Error("You must be logged in");

//2. authorization
const guestBookings = await getBookings(session.user.guestId);
const guestBookingIds = guestBookings.map((booking) => booking.id);

if (guestBookingIds.includes(bookingId))
  throw new Error("You are not allowed to update this booking");


// 3. building the updateData variable
const updateData = { numGuests: Number(formData.get('numGuests')),
  observations: formData.get('observations').slice(0,1000),
}




//4. mutation
    const { error } = await supabase
      .from("bookings")
      .update(updatedFields)
      .eq("id", bookingId)
      .select()
      .single();
//5. error handling
    if (error) {
      console.error(error);
      throw new Error("Booking could not be updated");
    }

    //6. revalidate path
    revalidatePath("/account/reservations");
    revalidatePath(` /account/reservations/edit/${bookingId}`);

    //7. redirecrtion
    redirect('/account/reservations');
}

 export async function  signInAction(){
    await signIn("google", {redirectTo: "/account"})
}

export async function signOutAction() {
    await signOut( { redirectTo:"/"})
  
}

