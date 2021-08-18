import {useEffect, useState} from 'react';
import MeetupList from "../components/meetups/MeetupList";

/* 
CREATED JUST FOR LEARNING PURPOSE 3 index.js, TO SEE HOW EACH WORKS, RENAME ONE OF THEM AS index.js AGAIN
THIS IS index_test_dummy_data.js
- index_test_dummy_data.js
- index_test_getStaticProps.js
- index_test_server_side.js
*/

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
      address: 'Some address 5, 12345 Some City',
      description: 'This is a first meetup!'
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
      address: 'Some address 5, 12345 Some City',
      description: 'This is a Second meetup!'
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
      address: 'Some address 5, 12345 Some City',
      description: 'This is a Third meetup!'
  },
];

function HomePage() {
    const [loadedMeetups, setLoadedMeetups] = useState([])
    
    useEffect(() => {
        // send a http request and fetch data
        setLoadedMeetups(DUMMY_MEETUPS);
    }, [])
    
    return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;