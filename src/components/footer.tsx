import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <footer className="pb-1 px-5 border-t bg-gray-50">
      <Container>
        <div className="flex justify-between">
          <Link href="/policies" className="text-sm text-gray-500">
            <i className="bi bi-shield-lock-fill"></i> Privacy Policy
          </Link>
          <p className="text-sm text-gray-500">&copy; takenorioshima</p>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
