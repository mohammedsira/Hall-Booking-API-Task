# Hall Booking api

##  creating room with number of seats available, amenties in room, price for 1 hour. 

 Post:  http://localhost:3000/rooms

  {

    "name":"room1",

    "numberOfSeats":50,

    "amenities":"amenties1",

    "pricePerHour":1000

  }

  reponse:

  {

    "id": "_dg0lzsxkf",

    "name": "room1",

    "numberOfSeats": 50,

    "amenities": "amenties1",

    "pricePerHour": 1000,

    "bookings": []

}


## Booking a room with customer name, date, start time, end time, roomid. 

Post : http://localhost:3000/book-room

{

    "customerName": "Customer1",

    "date": "2024-05-14",

    "startTime": "14:00",

    "endTime": "16:00",

    "roomId": "_dg0lzsxkf"

}

reponse:

{
    "id": "_f0sir0cmu",

    "customerName": "Customer1",

    "date": "2024-05-14",

    "startTime": "14:00",

    "endTime": "16:00",

    "roomId": "_dg0lzsxkf",

    "bookingDate": "2024-05-14T20:48:03.569Z",

    "bookingStatus": "confirmed"

}

### if you want to book the same room on same date

response:
  Room not found

## List all rooms booked data with room name, booked status, customer name, date, start time, end time. 

Get: http://localhost:3000/rooms

reponse:

[

    {

        "id": "_dg0lzsxkf",

        "name": "room1",

        "numberOfSeats": 50,

        "amenities": "amenties1",

        "pricePerHour": 1000,

        "bookings": [

            {

                "customerName": "Customer1",

                "date": "2024-05-14",

                "startTime": "14:00",

                "endTime": "16:00",

                "bookingStatus": "confirmed"

            }

        ]

    }

]

## List all customers with booked data with customer name, room name, date, start time, end time.

Get: http://localhost:3000/customers

response:

[

    {

        "customerName": "Customer1",

        "roomName": "room1",

        "date": "2024-05-14",

        "startTime": "14:00",

        "endTime": "16:00"

    }

]

## List how many times a customer has booked the room with details customer name, room name, date, start time, end time, booking id, booking date, booking status

Get: http://localhost:3000/customer-bookings/Customer1

response

[

    {

        "customerName": "Customer1",

        "roomName": "room1",

        "date": "2024-05-14",

        "startTime": "14:00",

        "endTime": "16:00",

        "bookingId": "_f0sir0cmu",

        "bookingDate": "2024-05-14T20:48:03.569Z",

        "bookingStatus": "confirmed"

    }

]