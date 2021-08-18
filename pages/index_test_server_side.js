import MeetupList from "../components/meetups/MeetupList";

/* 
CREATED JUST FOR LEARNING PURPOSE 3 index.js, TO SEE HOW EACH WORKS, RENAME ONE OF THEM AS index.js AGAIN
THIS IS index_test_server_side.js
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
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a Second meetup!",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a Third meetup!",
  },
];

// This props is the props which will be received in the function getStaticProps
function HomePage(props) {
  /* const [loadedMeetups, setLoadedMeetups] = useState([])
    
    useEffect(() => {
        // send a http request and fetch data
        setLoadedMeetups(DUMMY_MEETUPS);
    }, []) */

  // return <MeetupList meetups={loadedMeetups} />;
  return <MeetupList meetups={props.meetups} />;
}

/* // This getStaticProps function is a reserved function which NextJs will look this function in pages/ folder before render anything; This function can only be inside the pages/ folder, can't be in any other folder like components/
// this function can have Node backend syntax, you can even connect to a database inside this function; The code inside this function is gonna be executed on the building process, in other words, in server side, will never be executed in client side (in the customer machines)
export async function getStaticProps(context) {
  // fetch data from an API
  // We can use the fetch in here (backend code) the same as in the front,
  // fetch("/api/meetups");

  // but in this case since it would request to the API which is already being created here, it would be redundant, so we can just call the mongodb directly the same as we are doing for the POST in F:\kiu\Projetos\ReactJS\nextjs\meetup-tuto\pages\api\new-meetup.js
  // Connecting to the cluster
  const client = await MongoClient.connect(
    "mongodb+srv://kiyoshi:Teste123@cluster0.ibfql.mongodb.net/base_de_dados_meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  // Collection is similar to the tables in SQL - I am calling meetups, it will generate this collection if it still doesn't exists; The documents is the same as register (registro) in SQL
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray(); // toArray - Converting this json to a js array of objects

  // --

  // The context for the getStaticProps function has an attribute params which the values are the values encoded at the URL - Note this context will be different at the other function getServerSideProps
  // const meetupId = context.params.meetupId;

  client.close();

  // it has always to return an object with props Object named attribute inside
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10, // This page will be generated in the build process and every 10 seconds, if the requests is comming from this page
  };
} */

// This getServerSideProps will not be executed just in the building of the page, neither in every 10 secs for example, but in every request; This function is also be executed just in the server side, never into the client; You can also perform operations which use credentials that should not be exposed to users
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
  };
}

export default HomePage;
