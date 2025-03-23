import Swal from "sweetalert2"

export default async function deleteBooking(token: string, bid: string) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/bookings/${bid}`,
      {
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` },
      }
    )
  
    if (response.status.toString().slice(0, 1)[0] === '4') {
      alert((await response.json()).message)
      return null
    }
  
    if (response.status === 500) return null
    
  
    if (!response.ok) throw new Error('Delete failed')

  Swal.fire({
                  title: "Good job!",
                  text: "Delete booking successfully.",
                  icon: "success"
                });
  
    return await response.json()
  }