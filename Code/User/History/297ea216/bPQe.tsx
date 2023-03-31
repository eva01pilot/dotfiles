import dynamic from "next/dynamic";
import CreateScreen from "../components/CreateScreen";
const ImageRedactor = dynamic(() => import("../components/ImageRedactor"), {
  ssr: false,
});

const page = () => {
  <CreateScreen />
}
export default page;
