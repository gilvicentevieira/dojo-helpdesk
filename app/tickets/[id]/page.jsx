import { notFound } from 'next/navigation'
import React from 'react'
export const dynamicParams = true

export const generateStaticParams = async()=>{
    const res = await fetch('http://localhost:4000/tickets')

    const tickets = await res.json()

    //[{id: '1'}, {id: '2'}, {id: '3'}]
    return tickets.map((ticket)=>{
        id: ticket.id
    })
}

const getTicketDetails = async(id)=>{
    // imitate delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60 
        }
    })

    if(!res.ok){
        notFound()
    }

    return res.json()
}

const TicketDetails = async({params}) => {
    const ticketDetails = await getTicketDetails(params.id)


    return (
        <main>
            <nav>
                <h2>TicketDetails</h2>
            </nav>
            <div className='card'>
                <h3>{ticketDetails.title}</h3>
                <small>Created by {ticketDetails.user_email}</small>
                <p>{ticketDetails.body}</p>
                <div className={`pill ${ticketDetails.priority}`}>
                    {ticketDetails.priority} priority
                </div>
            </div>
        </main>
    )
}

export default TicketDetails