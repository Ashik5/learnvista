import { useEffect, useState } from "react";

const ProfileOverview = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://learnvistaserver.onrender.com/users/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error fetching profile:', errorText);
          throw new Error(`Failed to fetch profile: ${errorText}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="flex w-full flex-col gap-5">
      {profile !== null && (
        <div>
          <h1 className="text-3xl font-bold text-navy-700 dark:text-white">
            Profile Overview
          </h1>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-navy-700 dark:text-white">
              Name: {profile.displayName}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
