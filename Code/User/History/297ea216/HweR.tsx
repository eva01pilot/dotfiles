import dynamic from "next/dynamic";


const CreateScreen = dynamic(() => import("../components/CreateScreen"), {
  ssr: false,
});
const page = async () => {
  return (<CreateScreen />)
}
export default page;
