export default function Footer() {
  return (
    <footer className=" border-t border-gray-200 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Ecoform</h2>
          <p className="text-muted-foreground">
            Build beautiful forms faster. Simple, responsive & smart.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <span>Home</span>
            </li>
            <li>
              <span>Templates</span>
            </li>
            <li>
              <span>Pricing</span>
            </li>
            <li>
              <span>Contact</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Resources</h3>
          <ul className="space-y-1">
            <li>
              <span>Blog</span>
            </li>
            <li>
              <span>FAQ</span>
            </li>
            <li>
              <span>Terms</span>
            </li>
            <li>
              <span>Privacy</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Get in Touch</h3>
          <p>Email: support@ecoform.dev</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Ecoform. All rights reserved.
      </div>
    </footer>
  );
}
