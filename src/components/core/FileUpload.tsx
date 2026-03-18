import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useField, useFormikContext } from "formik";
import {
  Stack,
  Typography,
  CardMedia,
  IconButton,
  InputLabel
} from "@mui/material";
import { DocumentUpload, Trash } from "iconsax-reactjs"; // or your icons

type FileUploadProps = {
  name: string;
  accept?: Record<string, string[]>;
   label?: string;
};

const FileUpload: React.FC<FileUploadProps> = ({ name, label, accept }) => {
  const [field, , helpers] = useField<File | null>(name);
  const { setFieldValue } = useFormikContext<any>();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept || { "*/*": [] }, // default all files
    multiple: false
  });

  useEffect(() => {
    if (field.value && field.value.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(field.value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [field.value]);

  const handleRemove = () => {
    helpers.setValue(null);
    setPreview(null);
  };

  return (
    <Stack sx={{ gap: 0 }}>
    <InputLabel htmlFor={String(name)}>{label}</InputLabel>
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      
      <input {...getInputProps()} />

      {field.value ? (
        preview ? (
          // Image preview
          <Stack direction="row" spacing={1} alignItems="center">
            <CardMedia
              component="img"
              alt={field.value.name}
              src={preview}
              sx={{ borderRadius: 2, width: 80, height: 80, objectFit: "cover" }}
            />
            <IconButton color="error" onClick={handleRemove}>
              <Trash size={20} />
            </IconButton>
          </Stack>
        ) : (
          // Non-image file
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <DocumentUpload />
            <Typography variant="body2">{field.value.name}</Typography>
            <IconButton color="error" onClick={handleRemove}>
              <Trash size={20} />
            </IconButton>
          </Stack>
        )
      ) : (
        <>
          <DocumentUpload fontSize="large" />
          <Typography variant="body1">Choose File</Typography>
        </>
      )}
    </div>
    </Stack>
  );
};

export default FileUpload;
