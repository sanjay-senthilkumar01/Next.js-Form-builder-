import React, { useEffect, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { HiSaveAs } from "react-icons/hi";
import useDesigner from './hooks/useDesigner';
import { UpdateFormContent } from '@/action/form';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SaveFormBtn({ id }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const changeThreshold = 5; // Number of changes before auto-save

  const debouncedElements = useDebounce(elements, 1000); // 1-second debounce delay

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const autoSaveFormContent = async () => {
    try {
      setIsAutoSaving(true);
      toast({
        title: "Autosaving",
        description: "Your changes are being saved automatically.",
      });

      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);

      toast({
        title: "Autosave Successful",
        description: "Your changes have been saved automatically.",
      });
    } catch (error) {
      toast({
        title: "Autosave Error",
        description: "Something went wrong with autosaving.",
        variant: "destructive",
      });
    } finally {
      setIsAutoSaving(false);
    }
  };

  useEffect(() => {
    if (changeCount >= changeThreshold) {
      startTransition(() => {
        autoSaveFormContent();
        setChangeCount(0); // Reset the change count after auto-save
      });
    }
  }, [debouncedElements, changeCount, startTransition]);

  useEffect(() => {
    if (elements) {
      setChangeCount(prevCount => prevCount + 1);
    }
  }, [elements]);

  return (
    <>
      <Button
        variant={"outline"}
        className="gap-2"
        disabled={loading || isAutoSaving}
        onClick={() => {
          startTransition(updateFormContent);
        }}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin h-4 w-4" />
            Saving...
          </>
        ) : (
          <>
            <HiSaveAs className="h-4 w-4" />
            Save
          </>
        )}
      </Button>
      {isAutoSaving && (
        <div className="flex items-center gap-2">
          <FaSpinner className="animate-spin h-4 w-4" />
          Autosaving...
        </div>
      )}
    </>
  );
}

export default SaveFormBtn;
