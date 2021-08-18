import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
    return (
      <>
        {/* <MeetupDetail
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg"
            title="A First Meetup"
            address="Some Stree 5, Some City"
            description="The meetup description" /> */}
        <Head>
            <title>{props.meetupData?.title}</title>
            <meta name='description' content={props.meetupData?.description} />
        </Head>
        <MeetupDetail
            image={props.meetupData?.image}
            title={props.meetupData?.title}
            address={props.meetupData?.address}
            description={props.meetupData?.description} />
      </>
    );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  /* Troubleshooting
    If it shows:
        Error: getStaticPaths is required for dynamic SSG pages and is missing for '/[meetupId]'.
        It's because when you use the getStaticProps into a Dynamic page like [meetupId].js it needs an another function getStaticPaths
   */

  const client = await MongoClient.connect(
    "mongodb+srv://kiyoshi:Teste123@cluster0.ibfql.mongodb.net/base_de_dados_meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      /* meetupData: {
        id: meetupId,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
        title: "A First Meetup",
        address: "Some Stree 5, Some City",
        description: "The meetup description",
      }, */
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

// This function is necessary when using a dynamic page [meetupId].js and is using the function getStaticProps, because since getStaticProps pre-generates the page, for a dynamic page it does not know which is gonna be the meetupId that the customer is going to access, so here we have to pass all the meetupId possible to pre-generate all of them before it builds the page
export async function getStaticPaths() {
  // fetch data for a single meetup
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

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // the find method accepts 2 objects ({}) - the first is the filter, in this case it's being send empty object, because I don't want any filter; the second argument is the fields should be extracted for every document (register), by default all the fields will come, in this case { _id: 1 } - means that bring just the id and no other fields

  client.close();

  return {
    fallback: true, // fallback: false - means that we put all the paths possible, if it's not in the paths object it will generate a 404 page, if it's true it will dynamically render the page in the requisition
    /* paths: [
        {
          params: {
            meetupId: "m1",
          },
          params: {
            meetupId: "m2",
          },
          params: {
            meetupId: "m3",
          },
        },
      ], */
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export default MeetupDetails;