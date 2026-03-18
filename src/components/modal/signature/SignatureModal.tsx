import React, { useState, useRef, useEffect } from 'react';

// MUI Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';

// Signature Canvas
import SignatureCanvas from 'react-signature-canvas';

// Icons from react-iconsax
import { Edit, CloseCircle } from 'iconsax-reactjs'; // Import CloseCircle

// --- Define the props our component will accept ---
interface SignatureModalProps {
  value: string | null; // The current signature data (from the parent)
  onChange: (dataUrl: string | null) => void; // Function to send data *up* to the parent
}

export default function SignatureModal({ value, onChange }: SignatureModalProps) {
  // State for modal visibility (still managed internally)
  const [open, setOpen] = useState(false);

  // Ref to access the signature canvas API
  const sigPadRef = useRef<SignatureCanvas>(null);

  // --- This hook loads the existing signature into the canvas when the modal opens ---
  useEffect(() => {
    // Check if the modal is open and the canvas ref is ready
    if (open && sigPadRef.current) {
      // Use a small timeout to ensure the canvas is rendered after the dialog opens
      setTimeout(() => {
        // Clear the canvas first (in case it had a previous drawing)
        sigPadRef.current?.clear();

        // If we have a signature value, load it into the canvas
        if (value) {
          sigPadRef.current?.fromDataURL(value);
        }
      }, 100); // 100ms delay is usually safe
    }
  }, [open, value]); // Re-run this effect if 'open' or 'value' changes

  // --- Handlers ---

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Clears the canvas *during* the signing session
  const handleClear = () => {
    sigPadRef.current?.clear();
  };

  // Saves the signature and closes the modal
  const handleSave = () => {
    if (sigPadRef.current) {
      let dataUrl: string | null;

      // Check if the canvas is empty
      if (sigPadRef.current.isEmpty()) {
        dataUrl = null;
      } else {
        // Get the image data as a base64 string
        dataUrl = sigPadRef.current
          .getTrimmedCanvas()
          .toDataURL('image/png');
      }

      // --- This is the key change ---
      // Instead of 'setSignatureImage', we call the 'onChange' prop
      // to send the data (or null) back to the parent component.
      onChange(dataUrl);
      handleClose();
    }
  };
  
  // Handler to remove the signature directly
  const handleRemove = () => {
    onChange(null); // Tell the parent the signature is gone
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
        <Typography variant="h6">Signature:</Typography>
        <Tooltip title="Add/Edit Signature">
          <IconButton color="primary" onClick={handleOpen}>
            <Edit />
          </IconButton>
        </Tooltip>
        {/* Show a "Remove" button only if a signature exists */}
        {value && (
           <Tooltip title="Remove Signature">
             <IconButton color="error" size="small" onClick={handleRemove}>
               <CloseCircle />
             </IconButton>
           </Tooltip>
        )}
      </Box>

      {/* Display the saved signature (now uses the 'value' prop) */}
      <Box
        sx={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '0px',
          textAlign: 'center',
          minHeight: '70px', // Added minHeight for better layout
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        {value ? ( // Check the 'value' prop
          <img
            src={value}
            alt="Signature"
            style={{ maxWidth: '100%', maxHeight: '150px' }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No Signature Added
          </Typography>
        )}
      </Box>

      {/* The Modal Dialog (no changes here) */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Please Sign Below</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              width: '100%',
              height: 250,
            }}
          >
            <SignatureCanvas
              ref={sigPadRef}
              penColor="black"
              canvasProps={{
                style: { width: '100%', height: '100%' },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={handleClear} color="secondary">
            Clear
          </Button>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Signature
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}