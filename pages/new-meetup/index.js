// our-domain.com/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    const router = useRouter();
    
    async function addMeetupHandler(enteredMeetupData) {
      // const response = await fetch('https://some-domain.com/abc'); // Absolute path - For an external API
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData), // Converting the js object into json
        headers: {
          'Content-Type': 'application/json' // We can pass headers, to make it clear that we are sending a json data
        }
      }); // Relative path - For an internal API - the path will be the api(folder)/new-meetup(file name)

      const data = await response.json();
      console.log(data);

      router.push("/");
    }
    
    return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
    );
}

export default NewMeetupPage;