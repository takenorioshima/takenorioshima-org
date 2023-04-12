import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-10 px-5 border-t bg-gray-50">
      <div class="flex justify-between">
        <Link href="/policies" className="text-sm text-gray-500">
          <i className="bi bi-shield-lock-fill"></i> Privacy Policy
        </Link>
        <p className="text-sm text-gray-500">&copy; takenorioshima</p>
      </div>
    </footer>
  );
};
export default Footer;
