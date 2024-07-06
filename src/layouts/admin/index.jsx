import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Dashboard from "views/admin/default";
import ProfileOverview from "views/admin/profile";
import Books from "views/admin/books";
import Reasources from "views/dashboard";

export default function Admin(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText="Dashboard"
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                <Route path="/default" element={<Dashboard/>} />
                <Route path="/profile" element={<ProfileOverview/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/main-dashboard" element={<Reasources/>} />
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
