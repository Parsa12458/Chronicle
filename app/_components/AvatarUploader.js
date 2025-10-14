"use client";

import { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import InputField from "./InputField";

export default function AvatarUploader({ onImageReady }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1.2);
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  useEffect(() => {
    if (!selectedImage || !editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob((blob) => {
      if (blob) onImageReady(blob);
    });
  }, [selectedImage, scale]);

  // Handle scroll zoom (desktop)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((prev) => Math.min(3, Math.max(1, prev + delta)));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Handle pinch zoom (mobile)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialDistance = null;

    const getDistance = (touches) => {
      const [a, b] = touches;
      return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const currentDistance = getDistance(e.touches);
        if (initialDistance !== null) {
          const delta = (currentDistance - initialDistance) / 200;
          setScale((prev) => Math.min(3, Math.max(1, prev + delta)));
        }
        initialDistance = currentDistance;
      }
    };

    const resetDistance = () => {
      initialDistance = null;
    };

    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", resetDistance);
    container.addEventListener("touchcancel", resetDistance);

    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", resetDistance);
      container.removeEventListener("touchcancel", resetDistance);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4" ref={containerRef}>
      <InputField
        id="avatar"
        label="Avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {selectedImage && (
        <div className="flex flex-col items-center gap-4">
          <AvatarEditor
            ref={editorRef}
            image={selectedImage}
            width={150}
            height={150}
            border={0}
            scale={scale}
            className="rounded-full"
          />
          <p className="text-sm">
            Use scroll (desktop) or pinch (mobile) to zoom
          </p>
        </div>
      )}
    </div>
  );
}
