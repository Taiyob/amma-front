/* eslint-disable @next/next/no-img-element */
"use client";

import { CircleUserRoundIcon, XIcon, CameraIcon } from "lucide-react";

import { useFileUpload } from "@/components/ui/use-file-upload";
import { Button } from "@/components/ui/button";

interface AvatarUploadProps {
  value?: any;
  onChange?: (value: any) => void;
}

export default function AvatarUpload({ value, onChange }: AvatarUploadProps) {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
    onFilesChange: (files) => {
      if (onChange) {
        onChange(files[0]?.file || null);
      }
    },
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <button
          aria-label={previewUrl ? "Change image" : "Upload image"}
          className="relative flex cursor-pointer size-16 items-center justify-center overflow-hidden rounded-full border border-input border-dashed outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 data-[dragging=true]:bg-accent/50"
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          type="button"
        >
          {previewUrl ? (
            <img
              alt={files[0]?.file?.name || "Uploaded image"}
              className="size-full object-cover"
              height={64}
              src={previewUrl}
              style={{ objectFit: "cover" }}
              width={64}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-6 opacity-60" />
            </div>
          )}
        </button>

        {/* Camera badge - shows when no image */}
        {!previewUrl && (
          <div className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-transparent text-secondary-foreground shadow-sm ring-2 ring-background">
            <CameraIcon className="size-6 text-secondary" />
          </div>
        )}

        {/* Remove button - shows when image exists */}
        {previewUrl && (
          <Button
            aria-label="Remove image"
            className="-top-1 -right-1 absolute size-6 rounded-full border-2 border-background shadow-sm hover:shadow-none focus-visible:border-background"
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            variant="destructive"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}

        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      {/* Helper text */}
      <p className="text-muted-foreground text-center">
        {previewUrl ? "Click to change" : "Click to upload"}
      </p>
    </div>
  );
}