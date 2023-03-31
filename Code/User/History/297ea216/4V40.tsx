import dynamic from "next/dynamic";


const CreateScreen = dynamic(() => import("../components/CreateScreen"), {
  ssr: false,
});
const page = () => {
  return (<CreateScreen />)
}
export default page;
