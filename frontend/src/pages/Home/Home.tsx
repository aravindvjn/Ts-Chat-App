import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import AllProfiles from "./AllProfiles";

const Home = () => {
  return (
    <Container>
      <Header />
      <AllProfiles />
      <Footer />
    </Container>
  );
};

export default Home;
