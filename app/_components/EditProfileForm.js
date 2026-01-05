"use client";

import AvatarUploader from "@/app/_components/AvatarUploader";
import Button from "@/app/_components/Button";
import InputField from "@/app/_components/InputField";
import InputTextarea from "@/app/_components/InputTextarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editProfileSchema } from "../_lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfile } from "../_lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function EditProfileForm({ currentUser }) {
  const router = useRouter();
  const [avatarBlob, setAvatarBlob] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: currentUser?.fullName,
      bio: currentUser?.bio,
      avatar: null,
    },
    resolver: zodResolver(editProfileSchema),
  });

  async function onSubmit(data) {
    const formData = new FormData();
    formData.set("fullName", data.fullName);
    formData.set("bio", data.bio);
    if (avatarBlob) {
      formData.set("avatar", avatarBlob);
    }

    const result = await editProfile(
      formData,
      currentUser.id,
      currentUser.avatar
    );

    if (result.errorType === "validation") {
      Object.entries(result.errors).forEach(([field, err]) => {
        toast.error(`${field}: ${err.message}`);
      });
      return;
    }

    if (result.errorType === "server") {
      toast.error(result.error.message || "Something went wrong!");
      return;
    }

    toast.success("Your profile has been updated successfully!");
    router.push(`/users/${currentUser.id}`);
  }

  return (
    <form
      className="grid grid-cols-3 gap-y-4 gap-x-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        id="email"
        label="Email Address"
        placeholder="example@gmail.com"
        type="email"
        disabled={true}
        defaultValue={currentUser?.email}
        {...register("email")}
        error={errors.email?.message}
      />
      <InputField
        id="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        type="text"
        defaultValue={currentUser?.fullName}
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <div className="row-span-3">
        <AvatarUploader
          initialImageUrl={currentUser?.avatar}
          onFileChange={(file) => {
            setValue("avatar", file, { shouldValidate: true });
          }}
          onImageReady={(blob) => {
            setAvatarBlob(blob);
          }}
        />
        {errors.avatar?.message && (
          <span className="text-xs text-red-700 mt-0.5">
            {errors.avatar?.message}
          </span>
        )}
      </div>
      <div className="col-span-2">
        <InputTextarea
          id="bio"
          placeholder="Tell peoples a bit about yourself..."
          label="Bio"
          defaultValue={currentUser?.bio}
          {...register("bio")}
          error={errors.bio?.message}
        />
      </div>

      <Button
        additionalClasses="col-span-3 ml-auto mt-3"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Editing Profile..." : "Edit Profile"}
      </Button>
    </form>
  );
}

export default EditProfileForm;
