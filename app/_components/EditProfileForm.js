"use client";

import AvatarUploader from "@/app/_components/AvatarUploader";
import Button from "@/app/_components/Button";
import InputField from "@/app/_components/InputField";
import InputTextarea from "@/app/_components/InputTextarea";
import { useState } from "react";

function EditProfileForm() {
  const [avatarBlob, setAvatarBlob] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatarBlob);
  }

  return (
    <form className="grid grid-cols-3 gap-y-4 gap-x-5" onSubmit={handleSubmit}>
      <InputField
        id="email"
        label="Email Address"
        placeholder="example@gmail.com"
        type="email"
        disabled={true}
      />
      <InputField
        id="password"
        label="Password"
        placeholder="Enter a new password (leave blank to keep current)"
        type="password"
      />
      <InputField
        id="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        type="text"
      />
      <div className="col-span-2">
        <InputTextarea
          placeholder="Tell peoples a bit about yourself..."
          label="Bio"
        />
      </div>

      <AvatarUploader onImageReady={(blob) => setAvatarBlob(blob)} />

      <Button additionalClasses="col-span-3 ml-auto mt-3" type="submit">
        Edit Profile
      </Button>
    </form>
  );
}

export default EditProfileForm;
